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
  console.log('spots.js / Fetching spot details for ID:', spotId);
  const response = await fetch(`/api/spots/${spotId}`);
  // const response = await csrfFetch(`/api/spots/${spotId}`);
  console.log('spots.js / API Response:', response);
  const spot = await response.json();
  // console.log(spot);
  
  dispatch(loadSpotDetails(spot));
  
};



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
