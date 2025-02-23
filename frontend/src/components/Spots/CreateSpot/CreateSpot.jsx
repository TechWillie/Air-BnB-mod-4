import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import "./CreateSpot.css"
import { createImage } from '../../../store/images';
import { csrfFetch } from '../../../store/csrf';



function CreateSpot() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [additionalImages, setAdditionalImages] = useState(['', '', '', '']);
  // const user = useSelector(state => state.session.user);



  const [formData, setFormData] = useState({
    address: '',
    city: '',
    state: '',
    country: '',
    lat: '',
    lng: '',
    name: '',
    description: '',
    price: '',
    previewImage: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('1. Submitting Willie Form Data:', formData); 

    // Validate if any field is empty
    let newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
        if (!value.trim()) {
            newErrors[key] = `${key} is required`;
        }
    });

    // If errors exist, update state and stop submission
    if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
    }

    try {
      console.log('1. About to make fetch request');
        const response = await csrfFetch(`/api/spots`, {  
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          });
          console.log('2. Response status:', response.status);


        if (response.ok) {
            const spot = await response.json();
            console.log('3. Response data:', spot);
            dispatch({ type: 'CREATE_SPOT', payload: spot });

            additionalImages.forEach(imageUrl => {
              if (imageUrl.trim()) {
                dispatch(createImage(spot.id, { url: imageUrl }));
              }
            });

            navigate(`/spots/${spot.id}`);
        } else {
            const data = await response.json();
            setErrors(data.errors);
        }
    } catch (error) {
        console.error("Error submitting form:", error);
        setErrors({ general: "An error occurred. Please try again." });
    }
};

  return (
    <div className="create-spot-container">
      <h1>Create a New Spot</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <h2>Country</h2>
          <input
            type="text"
            name="country"
            placeholder=' Country'
            value={formData.country}
            onChange={handleChange}
          />
          {errors.country && <span className="error">{errors.country}</span>}
        </div>
        <div>
          <h2>Street Address</h2>
          <input
            type="text"
            name="address"
            placeholder=' Street Address'
            value={formData.address}
            onChange={handleChange}
          />
          {errors.street_address && <span className="error">{errors.street_address}</span>}
        </div>
        <div>
          <h2>City</h2>
          <input
            type="text"
            name="city"
            placeholder=' City'
            value={formData.city}
            onChange={handleChange}
          />
          {errors.city && <span className="error">{errors.city}</span>}
        </div>
        <div>
          <h2>State</h2>
          <input
            type="text"
            name="state"
            placeholder=' State'
            value={formData.state}
            onChange={handleChange}
          />
          {errors.state && <span className="error">{errors.state}</span>}
        </div>
        <div>
          <h2>Latitude</h2>
          <input
            type="number"
            name="lat"
            placeholder='  Latitude'
            value={formData.lat}
            onChange={handleChange}
          />
          {errors.lat && <span className="error">{errors.lat}</span>}
        </div>
        <div>
          <h2>Longitude</h2>
          <input
            type="number"
            name="lng"
            placeholder=' Longitude'
            value={formData.lng}
            onChange={handleChange}
          />
          {errors.lng && <span className="error">{errors.lng}</span>}
        </div>
        <div>
          <h2>Describe your place to guests..</h2>
          <h5>Mention the best features of your space, any special amenities likr
          fast wifi or parking, and what you love about he neighborhood.</h5>
          <textarea
            type="text"
            name="description"
            placeholder='Please write at least 30 characters'
            value={formData.description}
            onChange={handleChange}
          />
          {errors.describe && <span className="error">{errors.describe}</span>}
        </div>
        <div className='break-bar'></div>
        <div>
          <h2>Create a title for your spot</h2>
          <h5>Catch guests&apos; attention woth a spot title that highlights what makes your place special</h5>
          <input
            type="text"
            name="name"
            placeholder=' Name of your spot'
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
        <div className='break-bar'></div>
        <div className='price-input'>
          <h2>Set a base price for your spot</h2>
          <h5>Competitive pricing can help your listing stand out and rank higher in search results</h5>
          <span className='money'>$ </span><input
            type="number"
            name="price"
            placeholder='Price per night (USD)'
            value={formData.price}
            onChange={handleChange}
          />
          {errors.price && <span className="error">{errors.price}</span>}
        </div>
        <div className='break-bar'></div>
        <div>
          <h2>Liven up your spot with photos</h2>
          <h5>Submit a link to at least one photo to publish your spot</h5>
          <input
            type="text"
            name="previewImage"
            placeholder=' Preview Image URL'
            value={formData.previewImage}
            onChange={handleChange}
          />
          {errors.previewImage && <span className="error">{errors.previewImage}</span>}
          {/* Then add the 4 additional image inputs */}
          {additionalImages.map((url, index) => (
            <input
              key={index}
              type="text"
              placeholder="Image URL"
              value={url}
              onChange={(e) => {
                const newImages = [...additionalImages];
                newImages[index] = e.target.value;
                setAdditionalImages(newImages);
              }}
            />
          ))}
        </div>
        <div className='break-bar'></div>
        <button className='submit' type="submit">Create Spot</button>
      </form>
    </div>
  );
}

export default CreateSpot;