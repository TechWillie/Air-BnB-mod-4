const LOAD_SPOTS = 'spots/loadSpots';

// Add to existing actions
const LOAD_SPOT_DETAILS = 'spots/loadSpotDetails';

const loadSpotDetails = spot => ({
  type: LOAD_SPOT_DETAILS,
  spot
});

const loadSpots = spots => ({
  type: LOAD_SPOTS,
  spots
});

export const getSpotDetails = (spotId) => async dispatch => {
  const response = await fetch(`/api/spots/${spotId}`);
  console.log('!. spots.js / Fetching spot details for ID:', spotId);
  // const response = await csrfFetch(`/api/spots/${spotId}`);
  console.log('2. spots.js / API Response:', response);
  const spot = await response?.json();
  console.log("3. spot = response.json()", spot);
  dispatch(loadSpotDetails(spot));
  
};
// export const getSpotImage = (spotId) => async dispatch => {
//    const imageResponse = await fetch(`/api/images/${spotId}`);
// console.log(`first image api call ${imageResponse}`, imageResponse);

// const images = await imageResponse.json();
// console.log("to JSON: ", images[0].url);
// const imageUrl = images[spotId].url

// dispatch(loadImages(imageUrl));
// }



export const getSpots = () => async dispatch => {
  const response = await fetch('/api/spots');
  const spots = await response.json();
  dispatch(loadSpots(spots));
};

const spotsReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_SPOTS:
      return {
        spots: Object.values(action.spots)
      }
    case LOAD_SPOT_DETAILS:
      return {
        ...state,
        currentSpot: action.spot
      };
    default:
      return state;
      }
    };



export default spotsReducer;
