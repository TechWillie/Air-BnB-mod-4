import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import "./CreateSpot.css"

function CreateSpot() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
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
    
    const response = await fetch('/api/spots/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      const spot = await response.json();
      dispatch({ type: 'CREATE_SPOT', payload: spot })
      navigate(`/spots/${spot.id}`);
    } else {
      const data = await response.json();
      setErrors(data.errors);
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
            name="street-adress"
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
            type="text"
            name="latitude"
            placeholder='  Latitude'
            value={formData.lat}
            onChange={handleChange}
          />
          {errors.latitude && <span className="error">{errors.latitude}</span>}
        </div>
        <div>
          <h2>Longitude</h2>
          <input
            type="text"
            name="longitude"
            placeholder=' Longitude'
            value={formData.lng}
            onChange={handleChange}
          />
          {errors.longitude && <span className="error">{errors.longitude}</span>}
        </div>
        <div>
          <h2>Describe your place to guests..</h2>
          <h5>Mention the best features of your space, any special amenities likr
          fast wifi or parking, and what you love about he neighborhood.</h5>
          <textarea
            type="text"
            name="describe"
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
        <div>
          <h2>Set a base price for your spot</h2>
          <h5>Competitive pricing can help your listing stand out and rank higher in search results</h5>
          <>$ </><input
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
            name="preview"
            placeholder=' Preview Image URL'
            value={formData.address}
            onChange={handleChange}
          />
          {errors.preview && <span className="error">{errors.preview}</span>}
          <input
            type="text"
            name="preview"
            placeholder=' Image URL'
            value={formData.address}
            onChange={handleChange}
          />
          {errors.preview && <span className="error">{errors.preview}</span>}
          <input
            type="text"
            name="preview"
            placeholder=' Image URL'
            value={formData.address}
            onChange={handleChange}
          />
          {errors.preview && <span className="error">{errors.preview}</span>}
          <input
            type="text"
            name="preview"
            placeholder=' Image URL'
            value={formData.address}
            onChange={handleChange}
          />
          {errors.preview && <span className="error">{errors.preview}</span>}
          <input
            type="text"
            name="preview"
            placeholder=' Image URL'
            value={formData.address}
            onChange={handleChange}
          />
          {errors.preview && <span className="error">{errors.preview}</span>}
        </div>
        <div className='break-bar'></div>
        <button type="submit">Create Spot</button>
      </form>
    </div>
  );
}

export default CreateSpot;