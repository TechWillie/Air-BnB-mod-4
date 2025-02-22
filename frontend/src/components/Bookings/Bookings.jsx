import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// import { Link } from "react-router-dom";
// import "./Bookings.css"
import { getbookings } from "../../store/bookings";

function GetAllBookings() {
    const dispatch = useDispatch()
    const bookings = useSelector((state) => state.bookings.bookings)
    const {spotId} = useParams()

    useEffect(() => {
        dispatch(getbookings(spotId))
    }, [dispatch, spotId])

    console.log("Redux State (Bookings):", bookings);

    if(!bookings) return console.log("No Reservations yet...");
    
    return (
        <div>
            {/* {bookings.Images.url ? 
            ( <div>bookings.Images.url</div> ): ("")}
            {bookings.spot}<br/><br />{bookings.startDate} */}
            {bookings.map((reserve, indx) => (
                <h4 key={indx}>{reserve.spot}</h4>
            ))}
        </div>
    )
}

export default GetAllBookings