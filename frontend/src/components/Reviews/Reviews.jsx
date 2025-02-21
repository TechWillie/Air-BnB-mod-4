import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReviews } from "../../store/reviews";
import { useParams } from "react-router-dom";
// import { Link } from "react-router-dom";
import "./Reviews.css"

function Reviews () {
    const dispatch = useDispatch()
    // const reviews = useSelector((state) => Object.values(state.reviews.reviews))
    const reviews = useSelector((state) => state.reviews.reviews)
    const {spotId} = useParams()
    useEffect(() => {
        dispatch(getReviews(spotId))
    }, [dispatch, spotId])

    console.log("Redux State (reviews):", reviews);



    return (
        <div className="review-box-details">
          <h1>Reviews...</h1>
          {Array.isArray(reviews) && reviews.length > 0 ? (
            reviews.map((review, ind) => (
              <div key={ind}>
                <h2>{review.User.firstName}</h2>
                <h3>{review.review}</h3>
              </div>
            ))
          ) : (
            <p>No reviews available</p> 
          )}
        </div>
      );
      
}

export default Reviews