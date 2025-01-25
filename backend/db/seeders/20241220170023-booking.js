'use strict';

const {Booking} = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Booking.bulkCreate([
      {
        spotId: 1,
        userId: 1,
        spot: "Cornre Store",
        startDate: "2025-02-15",
        endDate: "2025-02-20"
      },
      {
        spotId: 2,
        userId: 2,
        spot: "Cornre shop",
        startDate: "2025-03-01",
        endDate: "2025-03-07"
      },
      {
        spotId: 3,
        userId: 3,
        spot: "Luxury Ocean Villa",
        startDate: "2025-03-15",
        endDate: "2025-03-20"
      },
      {
        spotId: 4,
        userId: 4,
        spot: "Ski Lodge Haven",
        startDate: "2025-04-01",
        endDate: "2025-04-07"
      },
      {
        spotId: 5,
        userId: 5,
        spot: "Desert Oasis",
        startDate: "2025-04-15",
        endDate: "2025-04-20"
      },
      {
        spotId: 6,
        userId: 6,
        spot: "Wine Country Cottage",
        startDate: "2025-05-01",
        endDate: "2025-05-07"
      },
      {
        spotId: 7,
        userId: 7,
        spot: "Urban Penthouse",
        startDate: "2025-05-15",
        endDate: "2025-05-20"
      },
      {
        spotId: 8,
        userId: 8,
        spot: "Treehouse Retreat",
        startDate: "2025-06-01",
        endDate: "2025-06-07"
      },
      {
        spotId: 9,
        userId: 9,
        spot: "seven eleven",
        startDate: "2025-06-15",
        endDate: "2025-06-20"
      },
      {
        spotId: 10,
        userId: 10,
        spot: "Hair shop",
        startDate: "2025-07-01",
        endDate: "2025-07-07"
      },
      {
        spotId: 11,
        userId: 11,
        spot: "Horse stable",
        startDate: "2025-07-15",
        endDate: "2025-07-20"
      },
      {
        spotId: 12,
        userId: 1,
        spot: "Fast food",
        startDate: "2025-08-01",
        endDate: "2025-08-07"
      },
      {
        spotId: 13,
        userId: 2,
        spot: "The hangover",
        startDate: "2025-08-15",
        endDate: "2025-08-20"
      },
      {
        spotId: 14,
        userId: 3,
        spot: "crudy creepy",
        startDate: "2025-09-01",
        endDate: "2025-09-07"
      },
      {
        spotId: 15,
        userId: 4,
        spot: "coffee pub",
        startDate: "2025-09-15",
        endDate: "2025-09-20"
      },
      {
        spotId: 16,
        userId: 5,
        spot: "Spa and such",
        startDate: "2025-10-01",
        endDate: "2025-10-07"
      },
      {
        spotId: 17,
        userId: 6,
        spot: "tiny Penthouse",
        startDate: "2025-10-15",
        endDate: "2025-10-20"
      },
      {
        spotId: 18,
        userId: 7,
        spot: "Coorperate Retreat",
        startDate: "2025-11-01",
        endDate: "2025-11-07"
      },
      {
        spotId: 19,
        userId: 8,
        spot: "Listen hard",
        startDate: "2025-11-15",
        endDate: "2025-11-20"
      },
      {
        spotId: 20,
        userId: 9,
        spot: "paper mill",
        startDate: "2025-12-01",
        endDate: "2025-12-07"
      },
      // Second set of 20 bookings
      {
        spotId: 1,
        userId: 10,
        spot: "Cornre Store",
        startDate: "2025-12-15",
        endDate: "2025-12-20"
      },
      {
        spotId: 2,
        userId: 11,
        spot: "Cornre shop",
        startDate: "2026-01-01",
        endDate: "2026-01-07"
      },
      {
        spotId: 3,
        userId: 1,
        spot: "Luxury Ocean Villa",
        startDate: "2026-01-15",
        endDate: "2026-01-20"
      },
      {
        spotId: 4,
        userId: 2,
        spot: "Ski Lodge Haven",
        startDate: "2026-02-01",
        endDate: "2026-02-07"
      },
      {
        spotId: 5,
        userId: 3,
        spot: "Desert Oasis",
        startDate: "2026-02-15",
        endDate: "2026-02-20"
      },
      {
        spotId: 6,
        userId: 4,
        spot: "Wine Country Cottage",
        startDate: "2026-03-01",
        endDate: "2026-03-07"
      },
      {
        spotId: 7,
        userId: 5,
        spot: "Urban Penthouse",
        startDate: "2026-03-15",
        endDate: "2026-03-20"
      },
      {
        spotId: 8,
        userId: 6,
        spot: "Treehouse Retreat",
        startDate: "2026-04-01",
        endDate: "2026-04-07"
      },
      {
        spotId: 9,
        userId: 7,
        spot: "seven eleven",
        startDate: "2026-04-15",
        endDate: "2026-04-20"
      },
      {
        spotId: 10,
        userId: 8,
        spot: "Hair shop",
        startDate: "2026-05-01",
        endDate: "2026-05-07"
      },
      // Third set of 20 bookings
      {
        spotId: 11,
        userId: 9,
        spot: "Horse stable",
        startDate: "2026-05-15",
        endDate: "2026-05-20"
      },
      {
        spotId: 12,
        userId: 10,
        spot: "Fast food",
        startDate: "2026-06-01",
        endDate: "2026-06-07"
      },
      {
        spotId: 13,
        userId: 11,
        spot: "The hangover",
        startDate: "2026-06-15",
        endDate: "2026-06-20"
      },
      {
        spotId: 14,
        userId: 1,
        spot: "crudy creepy",
        startDate: "2026-07-01",
        endDate: "2026-07-07"
      },
      {
        spotId: 15,
        userId: 2,
        spot: "coffee pub",
        startDate: "2026-07-15",
        endDate: "2026-07-20"
      },
      {
        spotId: 16,
        userId: 3,
        spot: "Spa and such",
        startDate: "2026-08-01",
        endDate: "2026-08-07"
      },
      {
        spotId: 17,
        userId: 4,
        spot: "tiny Penthouse",
        startDate: "2026-08-15",
        endDate: "2026-08-20"
      },
      {
        spotId: 18,
        userId: 5,
        spot: "Coorperate Retreat",
        startDate: "2026-09-01",
        endDate: "2026-09-07"
      },
      {
        spotId: 19,
        userId: 6,
        spot: "Listen hard",
        startDate: "2026-09-15",
        endDate: "2026-09-20"
      },
      {
        spotId: 20,
        userId: 7,
        spot: "paper mill",
        startDate: "2026-10-01",
        endDate: "2026-10-07"
      },
      // Fourth set of 20 bookings
      {
        spotId: 1,
        userId: 8,
        spot: "Cornre Store",
        startDate: "2026-10-15",
        endDate: "2026-10-20"
      },
      {
        spotId: 2,
        userId: 9,
        spot: "Cornre shop",
        startDate: "2026-11-01",
        endDate: "2026-11-07"
      },
      {
        spotId: 3,
        userId: 10,
        spot: "Luxury Ocean Villa",
        startDate: "2026-11-15",
        endDate: "2026-11-20"
      },
      {
        spotId: 4,
        userId: 11,
        spot: "Ski Lodge Haven",
        startDate: "2026-12-01",
        endDate: "2026-12-07"
      },
      {
        spotId: 5,
        userId: 1,
        spot: "Desert Oasis",
        startDate: "2026-12-15",
        endDate: "2026-12-20"
      },
      {
        spotId: 6,
        userId: 2,
        spot: "Wine Country Cottage",
        startDate: "2027-01-01",
        endDate: "2027-01-07"
      },
      {
        spotId: 7,
        userId: 3,
        spot: "Urban Penthouse",
        startDate: "2027-01-15",
        endDate: "2027-01-20"
      },
      {
        spotId: 8,
        userId: 4,
        spot: "Treehouse Retreat",
        startDate: "2027-02-01",
        endDate: "2027-02-07"
      },
      {
        spotId: 9,
        userId: 5,
        spot: "seven eleven",
        startDate: "2027-02-15",
        endDate: "2027-02-20"
      },
      {
        spotId: 10,
        userId: 6,
        spot: "Hair shop",
        startDate: "2027-03-01",
        endDate: "2027-03-07"
      },
      {
        spotId: 11,
        userId: 7,
        spot: "Horse stable",
        startDate: "2027-03-15",
        endDate: "2027-03-20"
      },
      {
        spotId: 12,
        userId: 8,
        spot: "Fast food",
        startDate: "2027-04-01",
        endDate: "2027-04-07"
      },
      {
        spotId: 13,
        userId: 9,
        spot: "The hangover",
        startDate: "2027-04-15",
        endDate: "2027-04-20"
      },
      {
        spotId: 14,
        userId: 10,
        spot: "crudy creepy",
        startDate: "2027-05-01",
        endDate: "2027-05-07"
      },
      {
        spotId: 15,
        userId: 11,
        spot: "coffee pub",
        startDate: "2027-05-15",
        endDate: "2027-05-20"
      },
      {
        spotId: 16,
        userId: 1,
        spot: "Spa and such",
        startDate: "2027-06-01",
        endDate: "2027-06-07"
      },
      {
        spotId: 17,
        userId: 2,
        spot: "tiny Penthouse",
        startDate: "2027-06-15",
        endDate: "2027-06-20"
      },
      {
        spotId: 18,
        userId: 3,
        spot: "Coorperate Retreat",
        startDate: "2027-07-01",
        endDate: "2027-07-07"
      },
      {
        spotId: 19,
        userId: 4,
        spot: "Listen hard",
        startDate: "2027-07-15",
        endDate: "2027-07-20"
      },
      {
        spotId: 20,
        userId: 5,
        spot: "paper mill",
        startDate: "2027-08-01",
        endDate: "2027-08-07"
      }
    ], {validate: true})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      spot: {[Op.in]: [
        "Cornre Store", "Cornre shop", "Luxury Ocean Villa", "Ski Lodge Haven",
        "Desert Oasis", "Wine Country Cottage", "Urban Penthouse", "Treehouse Retreat",
        "seven eleven", "Hair shop", "Horse stable", "Fast food", "The hangover",
        "crudy creepy", "coffee pub", "Spa and such", "tiny Penthouse",
        "Coorperate Retreat", "Listen hard", "paper mill"
      ]}
    }, {});
  }
};