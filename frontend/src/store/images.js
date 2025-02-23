// Action Types
const LOAD_IMAGES = 'images/loadImages';
const ADD_IMAGE = 'images/addImage';
const REMOVE_IMAGE = 'images/removeImage';

// Action Creators
const loadImages = (images) => ({
  type: LOAD_IMAGES,
  images
});

const addImage = (image) => ({
  type: ADD_IMAGE,
  image
});

// const removeImage = (imageId) => ({
//   type: REMOVE_IMAGE,
//   imageId
// });

// Thunks
export const getImages = (spotId) => async dispatch => {
  const response = await fetch(`/api/spots/${spotId}/images`);
  const images = await response.json();
  dispatch(loadImages(images));
  return images;
};

export const createImage = (spotId, imageUrl) => async dispatch => {
  const response = await fetch(`/api/spots/${spotId}/images`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        url: imageUrl,
        imageableType: 'spot',
        imageableId: spotId
      })
  });
  const newImage = await response.json();
  dispatch(addImage(newImage));
  return newImage;
};

// Reducer
const imagesReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_IMAGES:
      return { ...state, list: action.images };
    case ADD_IMAGE:
      return { ...state, list: [...state.list, action.image] };
    case REMOVE_IMAGE:
      return {
        ...state,
        list: state.list.filter(image => image.id !== action.imageId)
      };
    default:
      return state;
  }
};

export default imagesReducer;