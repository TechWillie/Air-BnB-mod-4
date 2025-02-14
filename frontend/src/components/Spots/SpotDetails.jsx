import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSpotDetails } from '../../store/spots';
// import './SpotDetails.css'

function SpotDetails() {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const spot = useSelector(state => state.spots.currentSpot);

  // const imageUrl = spot.Images?.[0]?.url;
  // console.log(imageUrl);

console.log(spotId, spot);


  useEffect(() => {
    dispatch(getSpotDetails(spotId));
    console.log("Dispatched getSpotDetials / SpotDetails.jsx");
    
  }, [dispatch, spotId]);

  console.log("spotDetails / Current spot: ", spotId);

  if (!spot) return console.error("not a spot"); // Don't really need
  

  return (
    <div>
      <h1>{spot.name}</h1>
      <p>{spot.city}, {spot.state}, {spot.country}</p>
      
      <div>
        <img src={spot?.previewImage} alt={spot.name} />
        <div className="secondary-images">
         
        </div>
      </div>

      <div>
        {/* <div>
          <h2>Hosted by {spot.Owner} {spot.Owner}</h2>
        </div> */}
        
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
