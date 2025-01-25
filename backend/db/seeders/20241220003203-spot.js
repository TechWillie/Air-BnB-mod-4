'use strict';

const {Spot} = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Spot.bulkCreate([
      {
        id: 1,
        ownerId: 1,
        spotImage: 1,
        address: '123 drive court',
        city: "Smyrna",
        state: "Georgia",
        country: "United Kingdom",
        lat: 3123,
        lng: 2345,
        name: "Cornre Store",
        description: "Not your ordinary store...",
        price: 234
      },
      {
        id: 2,
        ownerId: 1,
        spotImage: 1,
        address: '123 dve court',
        city: "Smyruuua",
        state: "Geoa",
        country: "United states",
        lat: 3123,
        lng: 2345,
        name: "Cornre shop",
        description: "Not your fav store...",
        price: 34
      },
      {
        id: 3,
        ownerId: 1,
        spotImage: 2,
        address: '1243 drive court',
        city: "Smyrna",
        state: "Georgia",
        country: "United Kingdom",
        lat: 3123,
        lng: 2345,
        name: "Study Lounge",
        description: "easly lisening music.",
        price: 234
      },
      {
        id: 4,
        ownerId: 2,
        spotImage: 1,
        address: '145 court st',
        city: "Smyruuua",
        state: "Geoa",
        country: "United states",
        lat: 3123,
        lng: 2345,
        name: "Mary holidays",
        description: "happy stuff.",
        price: 34
      },
      {
        id: 5,
        ownerId: 2,
        spotImage: 3,
        address: '789 Beachfront Ave',
        city: "Miami",
        state: "Florida",
        country: "United States",
        lat: 25.7617,
        lng: -80.1918,
        name: "Luxury Ocean Villa",
        description: "Stunning beachfront property with private pool",
        price: 599
      },
      {
        id: 6,
        ownerId: 2,
        spotImage: 1,
        address: '456 Mountain View Rd',
        city: "Aspen",
        state: "Colorado",
        country: "United States",
        lat: 39.1911,
        lng: -106.8175,
        name: "Ski Lodge Haven",
        description: "Cozy mountain retreat with hot tub",
        price: 450
      },
      {
        id: 7,
        ownerId: 3,
        spotImage: 1,
        address: '321 Desert Palm Dr',
        city: "Phoenix",
        state: "Arizona",
        country: "United States",
        lat: 33.4484,
        lng: -112.0740,
        name: "Desert Oasis",
        description: "Modern desert home with infinity pool",
        price: 325
      },
      {
        id: 8,
        ownerId: 3,
        spotImage: 2,
        address: '567 Vineyard Lane',
        city: "Napa",
        state: "California",
        country: "United States",
        lat: 38.2975,
        lng: -122.2869,
        name: "Wine Country Cottage",
        description: "Charming cottage surrounded by vineyards",
        price: 275
      },
      {
        id: 9,
        ownerId: 3,
        spotImage: 1,
        address: '890 Lake Shore Dr',
        city: "Chicago",
        state: "Illinois",
        country: "United States",
        lat: 41.8781,
        lng: -87.6298,
        name: "Urban Penthouse",
        description: "Luxury high-rise with lake views",
        price: 399
      },
      {
        id: 10,
        ownerId: 4,
        spotImage: 1,
        address: '234 Forest Path',
        city: "Portland",
        state: "Oregon",
        country: "United States",
        lat: 45.5155,
        lng: -122.6789,
        name: "Treehouse Retreat",
        description: "Unique treehouse experience in the forest",
        price: 289
      },
      {
        id: 11,
        ownerId: 4,
        spotImage: 2,
        address: '11 jay-z court',
        city: "calhoon",
        state: "Georgia",
        country: "United Kingdom",
        lat: 3123,
        lng: 2345,
        name: "seven eleven",
        description: "your store",
        price: 234
      },
      {
        id: 12,
        ownerId: 4,
        spotImage: 3,
        address: '123 old english ave',
        city: "Smyruuua",
        state: "Geoa",
        country: "United states",
        lat: 3123,
        lng: 2345,
        name: "Hair shop",
        description: "Bald and all",
        price: 34
      },
      {
        id: 13,
        ownerId: 5,
        spotImage: 1,
        address: '678 Why Me st.',
        city: "Smyrna",
        state: "Georgia",
        country: "United Kingdom",
        lat: 3123,
        lng: 2345,
        name: "Horse stable",
        description: "No large animaLS",
        price: 234
      },
      {
        id: 14,
        ownerId: 5,
        spotImage: 2,
        address: '333 for get it',
        city: "Smyruuua",
        state: "Geoa",
        country: "United states",
        lat: 3123,
        lng: 2345,
        name: "Fast food",
        description: "Bathroom rentals...",
        price: 34
      },
      {
        id: 15,
        ownerId: 5,
        spotImage: 3,
        address: '4565 whats good ave',
        city: "Miami",
        state: "Florida",
        country: "United States",
        lat: 25.7617,
        lng: -80.1918,
        name: "The hangover",
        description: "We got roofies...",
        price: 599
      },
      {
        id: 16,
        ownerId: 6,
        spotImage: 1,
        address: '56 the rock',
        city: "Aspen",
        state: "Colorado",
        country: "United States",
        lat: 39.1911,
        lng: -106.8175,
        name: "crudy creepy",
        description: "Cozy to creeps",
        price: 450
      },
      {
        id: 17,
        ownerId: 6,
        spotImage: 2,
        address: '439 dj cir',
        city: "Phoenix",
        state: "Arizona",
        country: "United States",
        lat: 33.4484,
        lng: -112.0740,
        name: "coffee pub",
        description: "For moms",
        price: 325
      },
      {
        id: 18,
        ownerId: 6,
        spotImage: 3,
        address: '231 horns drv',
        city: "Napa",
        state: "California",
        country: "United States",
        lat: 38.2975,
        lng: -122.2869,
        name: "Spa and such",
        description: "It's hot...",
        price: 275
      },
      {
        id: 19,
        ownerId: 7,
        spotImage: 1,
        address: '890 Liar st',
        city: "Chicago",
        state: "Illinois",
        country: "United States",
        lat: 41.8781,
        lng: -87.6298,
        name: "tiny Penthouse",
        description: "Expensive",
        price: 399
      },
      {
        id: 20,
        ownerId: 7,
        spotImage: 2,
        address: 'north pole',
        city: "Portland",
        state: "Oregon",
        country: "United States",
        lat: 45.5155,
        lng: -122.6789,
        name: "Coorperate Retreat",
        description: "Please clock in..",
        price: 289
      },
      {
        id: 21,
        ownerId: 7,
        spotImage: 3,
        address: '123 marret',
        city: "Smyrna",
        state: "Georgia",
        country: "United Kingdom",
        lat: 3123,
        lng: 2345,
        name: "Listen hard",
        description: "studio for music",
        price: 234
      },
      {
        id: 22,
        ownerId: 8,
        spotImage: 1,
        address: '123 dve grf',
        city: "Smyruuua",
        state: "Geoa",
        country: "United states",
        lat: 3123,
        lng: 2345,
        name: "paper mill",
        description: "for email onmly",
        price: 34
      },
      {
        id: 23,
        ownerId: 8,
        spotImage: 2,
        address: '553 Chicken lane',
        city: "Smyrna",
        state: "Georgia",
        country: "United Kingdom",
        lat: 3123,
        lng: 2345,
        name: "Zone for seniors",
        description: "Not your ordinary oldies...",
        price: 234
      },
      {
        id: 24,
        ownerId: 8,
        spotImage: 3,
        address: '398 Piano park',
        city: "Smyruuua",
        state: "Geoa",
        country: "United states",
        lat: 3123,
        lng: 2345,
        name: "Bike bells",
        description: "Watch your feet",
        price: 34
      },
      {
        id: 25,
        ownerId: 9,
        spotImage: 1,
        address: '789 Talk that ish st.',
        city: "Miami",
        state: "Florida",
        country: "United States",
        lat: 25.7617,
        lng: -80.1918,
        name: "bounce house",
        description: "Run and jump",
        price: 599
      },
      {
        id: 26,
        ownerId: 9,
        spotImage: 2,
        address: '454 Hot cocanut',
        city: "Aspen",
        state: "Colorado",
        country: "United States",
        lat: 39.1911,
        lng: -106.8175,
        name: "Ski of jelly",
        description: "Cozy sweet",
        price: 450
      },
      {
        id: 27,
        ownerId: 9,
        spotImage: 3,
        address: '321 lets go monoly',
        city: "Phoenix",
        state: "Arizona",
        country: "United States",
        lat: 33.4484,
        lng: -112.0740,
        name: "Desert Storm",
        description: "Modern pool",
        price: 325
      },
      {
        id: 28,
        ownerId: 10,
        spotImage: 1,
        address: '47 more than you know',
        city: "Napa",
        state: "California",
        country: "United States",
        lat: 38.2975,
        lng: -122.2869,
        name: "Wine Country Juveniles",
        description: "Charming budweiser",
        price: 275
      },
      {
        id: 29,
        ownerId: 10,
        spotImage: 2,
        address: '754 Sand mill',
        city: "Chicago",
        state: "Illinois",
        country: "United States",
        lat: 41.8781,
        lng: -87.6298,
        name: "Urban Borrow",
        description: "Luxury food stamps",
        price: 399
      },
      {
        id: 30,
        ownerId: 10,
        spotImage: 3,
        address: '234 Bling bling beach',
        city: "Portland",
        state: "Oregon",
        country: "United States",
        lat: 45.5155,
        lng: -122.6789,
        name: "Treehouse basement",
        description: "why not",
        price: 289
      },
      {
        id: 31,
        ownerId: 11,
        spotImage: 1,
        address: '123 small face court',
        city: "Smyrna",
        state: "Georgia",
        country: "United Kingdom",
        lat: 3123,
        lng: 2345,
        name: "High rise 7 floors",
        description: "leave now.",
        price: 234
      },
      {
        id: 32,
        ownerId: 11,
        spotImage: 2,
        address: '123 color me bad bv',
        city: "Smyruuua",
        state: "Geoa",
        country: "United states",
        lat: 3123,
        lng: 2345,
        name: "regular place",
        description: "somewhere cool",
        price: 34
      },
      {
        id: 33,
        ownerId: 11,
        spotImage: 3,
        address: '1243 picture court',
        city: "Smyrna",
        state: "Georgia",
        country: "United Kingdom",
        lat: 3123,
        lng: 2345,
        name: "Matilac room",
        description: "basket",
        price: 234
      },
      {
        id: 34,
        ownerId: 2,
        spotImage: 1,
        address: '123 court st',
        city: "Smyruuua",
        state: "Geoa",
        country: "United states",
        lat: 3123,
        lng: 2345,
        name: "Brownsville",
        description: "underneath",
        price: 34
      }
    ],
    {validate: true});
  },
  
  async down(queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      name: {[Op.in]: [
        "Cornre Store", "Cornre shop", "Luxury Ocean Villa", "Ski Lodge Haven", 
        "Desert Oasis", "Wine Country Cottage", "Urban Penthouse", "Treehouse Retreat",
        "seven eleven", "Hair shop", "Horse stable", "Fast food", "The hangover",
        "crudy creepy", "coffee pub", "Spa and such", "tiny Penthouse", 
        "Coorperate Retreat", "Listen hard", "paper mill", "Zone for seniors",
        "Bike bells", "bounce house", "Ski of jelly", "Desert Storm",
        "Wine Country Juveniles", "Urban Borrow", "Treehouse basement",
        "High rise 7 floors", "regular place", "Matilac room", "Brownsville"
      ]}
    }, {});
  }
};