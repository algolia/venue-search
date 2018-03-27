const fs = require('fs');
const env = require('node-env-file');
const uniqBy = require('lodash.uniqBy');
env(__dirname + '/.env');

const algoliasearch = require('algoliasearch');
const client = algoliasearch(
  process.env.ALGOLIA_APPLICATION_ID,
  process.env.ALGOLIA_API_KEY
);
const index = client.initIndex('venues');

const foursquare = require('foursquarevenues')(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET
);

async function reindex(objects) {
  await index.clearIndex();
  return index
    .addObjects(objects)
    .then(() => console.log(`${objects.length} object(s) indexed.`));
}

async function main(times) {
  let globalVenues = [];

  for (var i = times; i > 0; i--) {
    console.log(`processing batch ${i}`);

    const venues = await new Promise((accept, reject) =>
      foursquare.getVenues(
        {
          intent: 'browse',
          // near: 'new orleans',
          ll: '29.95,-90.07',
          radius: times,
          limit: 50
        },
        (err, data) => {
          if (err) console.log('error', err);
          accept(data);
        }
      )
    );

    globalVenues.push(...venues.response.venues);
  }

  globalVenues = uniqBy(globalVenues, venue => venue.id).map(venue => {
    venue.objectID = venue.id;
    venue._geoloc = {
      lat: venue.location.lat,
      lng: venue.location.lng
    };
    return venue;
  });

  fs.writeFileSync('venues.json', JSON.stringify(globalVenues, null, 2));
}

function reindexFromFile() {
  const content = JSON.parse(fs.readFileSync('venues.json'));
  reindex(content).then(() => console.log('done!'));
  // console.log(content.length);
}

// main(150);
reindexFromFile();
