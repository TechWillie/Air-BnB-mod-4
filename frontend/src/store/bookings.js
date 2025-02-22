const LOAD_BOOKINGS = 'reviews/loadbookings';

const loadbookings = bookings => ({
  type: LOAD_BOOKINGS,
  bookings
});

export const getbookings = (spotId) => async dispatch => {
  const response = await fetch(`/api/spots/${spotId}/bookings`);
  console.log('!. bookings.js / Fetching bookings for ID:', spotId);
  
  console.log('2. bookings.js / API Response:', response);
  const bookings = await response?.json();
  console.log("3. bookiing = response.json()", bookings);
  dispatch(loadbookings(bookings));
  
};



// export const getSpots = () => async dispatch => {
//   const response = await fetch('/api/spots');
//   const spots = await response.json();
//   dispatch(loadSpots(spots));
// };

const bookingsReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_BOOKINGS:
      return {
        ...state, bookings: action.bookings
      }
    // case LOAD_SPOT_DETAILS:
    //   return {
    //     ...state,
    //     currentSpot: action.spot
    //   };
    default:
      return state;
      }
    };



export default bookingsReducer;
