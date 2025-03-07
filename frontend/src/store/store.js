import {createStore, combineReducers, applyMiddleware, compose} from 'redux' 
import {thunk} from 'redux-thunk'
import sessionReducer from './session';
import spotsReducer from './spots';
import reviewsReducer from './reviews';
import bookingsReducer from './bookings';
import imagesReducer from './images';



// Create a rootReducer that calls combineReducers and pass in an empty object for now.
const rootReducer = combineReducers({
  session: sessionReducer,
  spots: spotsReducer,
  reviews: reviewsReducer,
  bookings: bookingsReducer,
  images: imagesReducer
});

// Initialize an enhancer variable 
let enhancer;

if (import.meta.env.MODE === 'production') {
    enhancer = applyMiddleware(thunk);
  } else {
    const logger = (await import("redux-logger")).default;
    const composeEnhancers =
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
  }

  const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer)
  }

  export default configureStore