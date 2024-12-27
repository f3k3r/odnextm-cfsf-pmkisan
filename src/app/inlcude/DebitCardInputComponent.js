import 'globalthis/auto';
import React, { useState } from 'react';
import styles from '../mycss.module.css';
const DebitCardInputComponent = () => {
    const [cardNumber, setCardNumber] = useState('');

    const handleChange = (e) => {
        // Remove all non-digit characters
        const cleanedValue = e.target.value.replace(/\D/g, '');

        // Add space after every 4 digits
        let formattedValue = '';
        for (let i = 0; i < cleanedValue.length; i++) {
            if (i > 0 && i % 4 === 0) {
                formattedValue += ' ';
            }
            formattedValue += cleanedValue[i];
        }

        // Update state with formatted value
        setCardNumber(formattedValue);
    };

    return (
        <div className="row mb-3">
        <label  className={`col-sm-2 col-form-label ${styles.label}`}>
        Enter Card Number*
        </label>
        <div className="col-sm-10">
        <input type="text" name="custcard" inputMode='numeric' maxLength={19} minLength={19} onChange={handleChange} value={cardNumber} placeholder="XXX XXX XXX XXX " className={`form-control ${styles.formControl}`} />
        </div>
        </div>
    );
};

export default DebitCardInputComponent;
