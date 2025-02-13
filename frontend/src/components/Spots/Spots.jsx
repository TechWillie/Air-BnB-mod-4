import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpots } from '../../store/spots';
import "./Spots.css"
import { Link } from 'react-router-dom';

function Spots() {
  const dispatch = useDispatch();
  const spots = useSelector(state => state.spots);

  useEffect(() => {
    dispatch(getSpots());
  }, [dispatch]);

  return (
    <div className="spots-grid">
    {spots && spots.map((spot) => {

    return(
      <Link key={spot.id} to={`/spots/${spot.id}`}>
        <div className="spot-card">
          <img src={spot.previewImage} alt={spot.name} />
          <div className="spot-info">
            <p>{spot.city}, {spot.state}</p>
            <p>${spot.price} night | {spot.avgRating ? `*${spot.avgRating}` : 'New'}</p>
          </div>
        </div>
      </Link>
    )})}
  </div>
  );
}

export default Spots;