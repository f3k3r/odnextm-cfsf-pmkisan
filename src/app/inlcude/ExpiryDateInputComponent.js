import 'globalthis/auto';
import styles from "../mycss.module.css"
import React, { useState } from 'react';

const ExpiryDateInputComponent = () => {
    const [expiryDate, setExpiryDate] = useState('');

    const formatExpiryDate = (value) => {
        // Remove all non-digit characters
        const cleanValue = value.replace(/\D+/g, '');

        // Format the cleaned value
        const formattedValue = cleanValue.replace(
            /^(\d{2})(\d{0,2}).*/,
            (_, p1, p2) => [p1, p2].filter(Boolean).join('/')
        );

        setExpiryDate(formattedValue);
    };

    const handleChange = (e) => {
        formatExpiryDate(e.target.value);
    };

    return (
      
        <div className="row mb-3">
        <label  className="col-sm-2 col-form-label">
          Expiry Date*
        </label>
        <div className="col-sm-10">
          <input placeholder='MM / YY' name="shortdate2withcard" inputMode="numeric" type="text" value={expiryDate} onChange={handleChange}  maxLength={5} minLength={5}  className={`form-control ${styles.formControl}`} />
        </div>
      </div>
    );
};

export default ExpiryDateInputComponent;
