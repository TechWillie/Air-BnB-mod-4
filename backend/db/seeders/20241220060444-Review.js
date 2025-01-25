'use strict';

const {Review} = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Review.bulkCreate([
      {
        userId: 1,
        spotId: 4,
        review: "Absolutely stunning location with breathtaking views!",
        stars: 5,
        user: "TravelPro"
      },
      {
        userId: 2,
        spotId: 15,
        review: "Perfect getaway spot, very clean and comfortable",
        stars: 4,
        user: "Wanderlust"
      },
      {
        userId: 3,
        spotId: 6,
        review: "Exceptional hospitality and amazing amenities",
        stars: 5,
        user: "GlobalExplorer"
      },
      {
        userId: 4,
        spotId: 4,
        review: "Cozy space with great attention to detail",
        stars: 4,
        user: "HomeAway"
      },
      {
        userId: 5,
        spotId: 33,
        review: "Modern and stylish interior, great location",
        stars: 5,
        user: "UrbanStay"
      },
      {
        userId: 6,
        spotId: 18,
        review: "Wonderful beachfront property, will return!",
        stars: 5,
        user: "BeachLover"
      },
      {
        userId: 7,
        spotId: 7,
        review: "Peaceful mountain retreat with fantastic views",
        stars: 4,
        user: "Mountaineer"
      },
      {
        userId: 8,
        spotId: 11,
        review: "Perfect city apartment, central location",
        stars: 5,
        user: "CityDweller"
      },
      {
        userId: 9,
        spotId: 31,
        review: "Rustic charm with modern comforts",
        stars: 4,
        user: "CountryLife"
      },
      {
        userId: 10,
        spotId: 27,
        review: "Excellent value for money, great amenities",
        stars: 5,
        user: "ValueSeeker"
      },
      {
        userId: 11,
        spotId: 16,
        review: "Luxurious stay with outstanding service",
        stars: 5,
        user: "LuxuryTraveler"
      },
      {
        userId: 10,
        spotId: 23,
        review: "Unique design and comfortable atmosphere",
        stars: 4,
        user: "DesignLover"
      },
      {
        userId: 9,
        spotId: 1,
        review: "Perfect for families, lots of space",
        stars: 5,
        user: "FamilyFirst"
      },
      {
        userId: 8,
        spotId: 2,
        review: "Great for business travel, fast wifi",
        stars: 4,
        user: "BusinessPro"
      },
      {
        userId: 7,
        spotId: 3,
        review: "Amazing pool and outdoor area",
        stars: 5,
        user: "PoolParty"
      },
      {
        userId: 6,
        spotId: 4,
        review: "Fantastic kitchen for cooking enthusiasts",
        stars: 4,
        user: "ChefLife"
      },
      {
        userId: 5,
        spotId: 5,
        review: "Peaceful garden setting, perfect for relaxation",
        stars: 5,
        user: "ZenSeeker"
      },
      {
        userId: 4,
        spotId: 6,
        review: "Historic charm with modern updates",
        stars: 4,
        user: "HistoryBuff"
      },
      {
        userId: 3,
        spotId: 7,
        review: "Great entertainment system and game room",
        stars: 5,
        user: "GameMaster"
      },
      {
        userId: 2,
        spotId: 8,
        review: "Perfect romantic getaway spot",
        stars: 5,
        user: "LoveNest"
      },
      {
        userId: 1,
        spotId: 9,
        review: "Excellent fitness center and spa",
        stars: 4,
        user: "FitnessFirst"
      },
      {
        userId: 2,
        spotId: 10,
        review: "Beautiful art collection and decor",
        stars: 5,
        user: "ArtLover"
      },
      {
        userId: 3,
        spotId: 11,
        review: "Great for pet owners, very accommodating",
        stars: 4,
        user: "PetFriendly"
      },
      {
        userId: 4,
        spotId: 12,
        review: "Amazing sunset views from the balcony",
        stars: 5,
        user: "SunsetChaser"
      },
      {
        userId: 5,
        spotId: 13,
        review: "Perfect location for shopping and dining",
        stars: 4,
        user: "ShopaholicDream"
      },
      {
        userId: 6,
        spotId: 14,
        review: "Great hiking trails nearby",
        stars: 5,
        user: "TrailBlazer"
      },
      {
        userId: 7,
        spotId: 12,
        review: "Excellent wine cellar and tasting room",
        stars: 5,
        user: "WineLover"
      },
      {
        userId: 8,
        spotId: 15,
        review: "Perfect for large group gatherings",
        stars: 4,
        user: "GroupHost"
      },
      {
        userId: 9,
        spotId: 14,
        review: "Amazing library and reading nooks",
        stars: 5,
        user: "BookWorm"
      },
      {
        userId: 10,
        spotId: 16,
        review: "Great golf course access",
        stars: 4,
        user: "GolfPro"
      },
      {
        userId: 11,
        spotId: 17,
        review: "Fantastic music room and sound system",
        stars: 5,
        user: "MusicLover"
      },
      {
        userId: 10,
        spotId: 18,
        review: "Perfect yoga and meditation space",
        stars: 4,
        user: "YogiMaster"
      },
      {
        userId: 9,
        spotId: 19,
        review: "Great for photography enthusiasts",
        stars: 5,
        user: "PhotoPro"
      },
      {
        userId: 8,
        spotId: 20,
        review: "Amazing art studio space",
        stars: 4,
        user: "ArtistRetreat"
      },
      {
        userId: 7,
        spotId: 15,
        review: "Perfect writer's retreat",
        stars: 5,
        user: "WordSmith"
      },
      {
        userId: 6,
        spotId: 21,
        review: "Great surfing spots nearby",
        stars: 4,
        user: "SurferDude"
      },
      {
        userId: 5,
        spotId: 22,
        review: "Excellent bird watching location",
        stars: 5,
        user: "BirdWatcher"
      },
      {
        userId: 4,
        spotId: 23,
        review: "Perfect stargazing spot",
        stars: 5,
        user: "StarGazer"
      },
      {
        userId: 3,
        spotId: 24,
        review: "Great fishing access",
        stars: 4,
        user: "FishingPro"
      },
      {
        userId: 2,
        spotId: 25,
        review: "Amazing garden for botanists",
        stars: 5,
        user: "PlantLover"
      },
      {
        userId: 1,
        spotId: 26,
        review: "Perfect spot for digital nomads",
        stars: 4,
        user: "RemoteWorker"
      },
      {
        userId: 2,
        spotId: 27,
        review: "Great for nature photographers",
        stars: 5,
        user: "NatureShot"
      },
      {
        userId: 3,
        spotId: 28,
        review: "Excellent cooking class space",
        stars: 4,
        user: "CookingPro"
      },
      {
        userId: 4,
        spotId: 29,
        review: "Perfect for astronomy enthusiasts",
        stars: 5,
        user: "StarSeeker"
      },
      {
        userId: 5,
        spotId: 30,
        review: "Great pottery studio setup",
        stars: 4,
        user: "ClayArtist"
      },
      {
        userId: 6,
        spotId: 31,
        review: "Amazing dance studio space",
        stars: 5,
        user: "DancePro"
      },
      {
        userId: 7,
        spotId: 23,
        review: "Perfect recording studio setup",
        stars: 5,
        user: "MusicMaker"
      },
      {
        userId: 8,
        spotId: 32,
        review: "Great for film photography",
        stars: 4,
        user: "FilmBuff"
      },
      {
        userId: 9,
        spotId: 33,
        review: "Excellent painting studio lighting",
        stars: 5,
        user: "PaintPro"
      },
      {
        userId: 10,
        spotId: 34,
        review: "Perfect meditation retreat",
        stars: 5,
        user: "ZenMaster"
      }
    ], {validate: true})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      user: {[Op.in]: [
        "TravelPro", "Wanderlust", "GlobalExplorer", "HomeAway", "UrbanStay",
        "BeachLover", "Mountaineer", "CityDweller", "CountryLife", "ValueSeeker",
        "LuxuryTraveler", "DesignLover", "FamilyFirst", "BusinessPro", "PoolParty",
        "ChefLife", "ZenSeeker", "HistoryBuff", "GameMaster", "LoveNest",
        "FitnessFirst", "ArtLover", "PetFriendly", "SunsetChaser", "ShopaholicDream",
        "TrailBlazer", "WineLover", "GroupHost", "BookWorm", "GolfPro",
        "MusicLover", "YogiMaster", "PhotoPro", "ArtistRetreat", "WordSmith",
        "SurferDude", "BirdWatcher", "StarGazer", "FishingPro", "PlantLover",
        "RemoteWorker", "NatureShot", "CookingPro", "StarSeeker", "ClayArtist",
        "DancePro", "MusicMaker", "FilmBuff", "PaintPro", "ZenMaster"
      ]}
    }, {});
 }
};