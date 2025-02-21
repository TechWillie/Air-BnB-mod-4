const LOAD_REVIEWS = 'reviews/loadreviews';

// Add to existing actions
// const LOAD_REVIEW_DETAILS = 'spots/loadSpotDetails';

// const loadSpotDetails = spot => ({
//   type: LOAD_SPOT_DETAILS,
//   spot
// });

const loadreview = reviews => ({
  type: LOAD_REVIEWS,
  reviews
});

export const getReviews = (spotId) => async dispatch => {
  const response = await fetch(`/api/spots/${spotId}/reviews`);
  console.log('!. reviews.js / Fetching spot details for ID:', spotId);
  
  console.log('2. spots.js / API Response:', response);
  const reviews = await response?.json();
  console.log("3. spot = response.json()", reviews);
  dispatch(loadreview(reviews));
  
};



// export const getSpots = () => async dispatch => {
//   const response = await fetch('/api/spots');
//   const spots = await response.json();
//   dispatch(loadSpots(spots));
// };

const reviewsReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_REVIEWS:
      return {
        ...state, reviews: action.reviews
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



export default reviewsReducer;
