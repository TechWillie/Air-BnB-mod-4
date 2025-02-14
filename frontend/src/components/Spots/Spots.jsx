import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpots } from "../../store/spots";
import "./Spots.css";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

function Spots() {
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spots.spots);

  const scrollLeft = () => {
    const container = document.querySelector('.spots-grid');
    container.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    const container = document.querySelector('.spots-grid');
    container.scrollBy({ left: 300, behavior: 'smooth' });
  };
  
  useEffect(() => {
    dispatch(getSpots());
  }, [dispatch]);

  return (
    <div className="spots-container">
      <button className="carousel-arrow left" onClick={scrollLeft}>
        <FaChevronLeft />
      </button>
      <div className="spots-grid">
        {spots?.map((spot) => (
            <Link key={spot.id} to={`/spots/${spot.id}`}>

              <div className="spot-card">

                <img src={spot.previewImage} alt={spot.name} />
                <div className="spot-info">

                  <p>
                    {spot.city}, {spot.state}
                  </p>
                  <p>
                    ${spot.price} night |
                    {spot.avgRating ? `*${spot.avgRating}` : "New"}
                  </p>
                </div>
              </div>
            </Link>
          ))}
      </div>
      <button className="carousel-arrow right" onClick={scrollRight}>
        <FaChevronRight />
      </button>
    </div>
  );
}



export default Spots;
