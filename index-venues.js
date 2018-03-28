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

const zomato = require('zomato').createClient({
  userKey: process.env.ZOMATO_API_KEY
});

const foursquare = require('foursquarevenues')(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET
);

const categoryId =
  '56aa371be4b08b9a8d5734db,4bf58dd8d48988d1e5931735,5267e4d9e4b0ec79466e48d1,52741d85e4b0d5d1e3c6a6d9,4bf58dd8d48988d155941735,52e81612bcbc57f1066b7a06,4d4b7105d754a06376d81259';

async function reindex(objects) {
  await index.clearIndex();
  return index
    .addObjects(objects)
    .then(() => console.log(`${objects.length} object(s) indexed.`));
}

async function main(times) {
  let globalVenues = [];

  for (var i = times; i > 0; i = i - 100) {
    console.log(`processing batch ${i}`);
    const venues = await new Promise((accept, reject) =>
      foursquare.getVenues(
        {
          near: 'New Orleans',
          intent: 'browse',
          radius: times,
          limit: 50,
          categoryId
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

function restaurants() {
  zomato.getCities({ q: 'New Orleans' }, (err, data) => console.log(data));
}

function reindexFromFile() {
  const content = JSON.parse(fs.readFileSync('venues.json'));
  reindex(content).then(() => console.log('done!'));
}

// main(1000);
reindexFromFile();
