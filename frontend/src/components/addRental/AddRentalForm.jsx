import React, { useEffect, useState } from 'react';
import FormField from '../common/FormField';
import FormDropdown from '../common/FormDropdown';
import FormButton from '../common/FormButton';
import PropTypes from 'prop-types';

function AddRentalForm({ rental:initialRentalData, onSave }) {
  const [rental, setRental] = useState({
    name: '',
    city: '',
    state: '',
    country: '',
    PropertyType: '',
    contactInfo: {
      email: '',
      phone: ''
    },
    concerns: [],
    highlights: [],
    price: 0, // Changed to a number
    squareFeet: 0, // Changed to a number
    Amenities: [],
    officialWebsite: '',
  });

  useEffect(() => {
    // Initialize rental state if needed
    console.log("Initial Rental Data:", initialRentalData); 
    if (initialRentalData) {
      setRental({
        ...initialRentalData,
        concerns: initialRentalData.concerns.join(', '),
        highlights: initialRentalData.highlights.join(', '),
        Amenities: initialRentalData.Amenities.join(', '),
        contactInfo: {
          ...initialRentalData.contactInfo
        }
      });
    } else {
      setRental({
        name: '',
        city: '',
        state: '',
        country: '',
        PropertyType: '',
        contactInfo: {
          email: '',
          phone: ''
        },
        concerns: [],
        highlights: [],
        price: 0,
        squareFeet: 0,
        Amenities: [],
        officialWebsite: '',
      });
    }
  }, [initialRentalData]);

  
  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in rental.contactInfo) {
      setRental(prev => ({
        ...prev,
        contactInfo: { ...prev.contactInfo, [name]: value }
      }));
    } else {
      setRental(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleArrayChange = (e, field) => {
    const { value } = e.target;
    setRental(prev => ({
      ...prev,
      [field]: value.split(',').map(item => item.trim())
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("Submitting rental:", rental);
    const url = initialRentalData
      ? `api/rentals/update/${initialRentalData._id}`
      : `api/rentals/create`;
    const method = initialRentalData ? 'PUT' : 'POST';

    try {
         const bodyData = {
          ...rental,
          concerns: typeof rental.concerns === 'string' ? rental.concerns.split(',').map(item => item.trim()) : rental.concerns,
          highlights: typeof rental.highlights === 'string' ? rental.highlights.split(',').map(item => item.trim()) : rental.highlights,
          Amenities: typeof rental.Amenities === 'string' ? rental.Amenities.split(',').map(item => item.trim()) : rental.Amenities,
         }
         console.log("Sending data:", bodyData);

         const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bodyData),
        });
        const data = await response.json();
        if (response.ok) {
          alert(`Rental ${initialRentalData ? 'updated' : 'added'} successfully!`);
          onSave && onSave(data);
        } else {
          throw new Error(data.message || 'Failed to save rental');
    }
    } catch (error) {
        console.error('Error:', error);
        alert('Error adding rental. Please try again.');
    }
  };

  console.log("Form State:", rental);
  console.log(typeof rental.concerns); // 查看数据类型


  return (
    <form className="add-rental-form" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
      <FormField label="Name" type="text" name="name" value={rental.name} onChange={handleChange} />
      <FormField label="City" type="text" name="city" value={rental.city} onChange={handleChange} />
      <FormField label="State" type="text" name="state" value={rental.state} onChange={handleChange} />
      <FormField label="Country" type="text" name="country" value={rental.country} onChange={handleChange} />
      <FormDropdown
        name="PropertyType"
        value={rental.PropertyType}
        onChange={handleChange}
        options={[
          { value: '', label: 'Select Property Type' },
          { value: 'apartment', label: 'Apartment' },
          { value: 'house', label: 'House' },
          { value: 'condo', label: 'Condo' }
        ]}
      />
      <FormField label="Email" type="email" name="email" value={rental.contactInfo.email} onChange={handleChange} />
      <FormField label="Phone" type="text" name="phone" value={rental.contactInfo.phone} onChange={handleChange} />
      <FormField label="Concerns" type="text" name="concerns" placeholder="Comma-separated values" value={rental.concerns} onChange={(e) => handleArrayChange(e, 'concerns')} />
      <FormField label="Highlights" type="text" name="highlights" placeholder="Comma-separated values" value={rental.highlights} onChange={(e) => handleArrayChange(e, 'highlights')} />
      <FormField label="Price Per Night (USD)" type="number" name="price" value={rental.price} onChange={handleChange} />
      <FormField label="Square Feet" type="number" name="squareFeet" value={rental.squareFeet} onChange={handleChange} />
      <FormField label="Amenities" type="text" name="amenities" placeholder="Comma-separated values" value={rental.Amenities} onChange={(e) => handleArrayChange(e, 'Amenities')} />
      <FormField label="Official Website" type="text" name="officialWebsite" value={rental.officialWebsite} onChange={handleChange} />
      <FormButton type="submit" onClick={handleSubmit} className="primary">
        Add new rental
      </FormButton>
    </form>
  );
}
AddRentalForm.propTypes = {
  rental: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    country: PropTypes.string,
    PropertyType: PropTypes.string,
    contactInfo: PropTypes.shape({
      email: PropTypes.string,
      phone: PropTypes.string,
    }),
    concerns: PropTypes.arrayOf(PropTypes.string),
    highlights: PropTypes.arrayOf(PropTypes.string),
    price: PropTypes.number,
    squareFeet: PropTypes.number,
    Amenities: PropTypes.arrayOf(PropTypes.string),
    officialWebsite: PropTypes.string,
  }),
  onSave: PropTypes.func,
};

export default AddRentalForm;
