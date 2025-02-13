import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSpotDetails } from '../../store/spots';
// import './SpotDetails.css'

function SpotDetails() {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const spot = useSelector(state => state.spots.currentSpot);

console.log(spotId, spot);


  useEffect(() => {
    dispatch(getSpotDetails(spotId));
    console.log("Hello");
    
  }, [dispatch, spotId]);

  console.log("spotDetails / Current spot: ", spot);

  if (!spot) return console.error("not a spot");
  

  return (
    <div>
      <h1>{spot.name}</h1>
      <p>{spot.city}, {spot.state}, {spot.country}</p>
      
      {/* <div>
        <img src={spot.spotImages[0]?.url} alt={spot.name} />
        <div className="secondary-images">
          {spot.SpotImages.slice(1, 5).map((image, index) => (
            <img key={index} src={image.url} alt={`${spot.name} ${index + 2}`} />
          ))}
        </div>
      </div> */}

      <div>
        <div>
          <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
        </div>
        
        <div>
          <p>{spot.description}</p>
        </div>

        <div>
          <p><span>${spot.price}</span> night</p>
        </div>
      </div>
    </div>
  );
}

export default SpotDetails;
