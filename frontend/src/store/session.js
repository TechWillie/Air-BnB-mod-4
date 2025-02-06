import { csrfFetch } from "./csrf";

const SET_USER = 'session/SET_USER'
const REMOVE_USER = 'session/REMOVE_USER'

// Create two POJO action creators. ..
// One should create an action that will cause the reducer
// to set the user (SET_USER) in the session slice of state 
// to the action creator's input parameter. 
const setUser = (user) => {
    return {
        type: SET_USER, // 'session/SET_USER'
        payload: user
    };
};
// The other should create an action that will 
// cause the reducer to remove the session user. 
// Extract their types into a constant that the action creator...
// and session reducer will both use. Enable the reducer to adjust 
// the session slice of state appropriately for both of these actions.
const removeUser = () => {
    return {
        type: REMOVE_USER // 'session/REMOVE_USER'
    }
};

// You need to call your backend API to log in, and then set the session user from the response.
// Export the login thunk action 
export const userLogin = (user) => async (dispatch) => {
    // deconstruct the cred and passwd from the user passed in..
    const { credential, password } = user;
    // To do this, create a thunk action for making a request to POST /api/session. 
    // Make sure to use the custom csrfFetch function from frontend/src/store/csrf.js. 
    const response = await csrfFetch('api/session', {
        method: 'POST',
        body: JSON.stringify({
            // The POST /api/session route expects the request body to have a key of credential with an existing username or email and a key of password. 
            credential,
            password
        })
    })
    
    // After the response from the AJAX call comes back, parse the JSON body of the response, 
    const data = await response.json()
    // and dispatch the action for setting the session user to the user in the response's body.
    dispatch(setUser(data.user))
    return response
}
 const initialState = {user: null}

 const sessionReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_USER:
            return {...state, user: action.payload}
        case REMOVE_USER:
            return {...state, initialState}
        default:
            return state;
    }
 }

// export the reducer as the default export.
export default sessionReducer;

