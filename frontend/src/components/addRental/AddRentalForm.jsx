import React, { useState } from 'react';
import FormField from '../common/FormField';
import FormDropdown from '../common/FormDropdown';
import FormButton from '../common/FormButton';

function AddRentalForm() {
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
    price: '',
    squareFeet: '',
    Amenities: [],
    officialWebsite: '',
    images: []
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Rental Added:', rental);
    // You would typically handle the form submission with an API call here
  };

  return (
    <form className="add-rental-form" onSubmit={handleSubmit}>
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
      <FormField label="Highlights" type="text" name="highlights" placeholder="Comma-separated values" value={rental.highlights.join(', ')} onChange={(e) => handleArrayChange(e, 'highlights')} />
      <FormField label="Price Per Night (EUR)" type="number" name="price" value={rental.price} onChange={handleChange} />
      <FormField label="Square Feet" type="number" name="squareFeet" value={rental.squareFeet} onChange={handleChange} />
      <FormField label="Official Website" type="text" name="officialWebsite" value={rental.officialWebsite} onChange={handleChange} />
      <FormButton type="submit">Add Rental</FormButton>
    </form>
  );
}

export default AddRentalForm;
