'use client'
import 'globalthis/auto';
import React, { useState } from 'react';
import styles from '../mycss.module.css';
const DateInputComponent = () => {
    const [dateOfBirth, setDateOfBirth] = useState('');

    const formatDate = (inputValue) => {
        // Remove all non-digit characters
        const cleanedValue = inputValue.replace(/\D/g, '');

        // Check if the value is empty or exceeds 8 digits
        if (!cleanedValue || cleanedValue.length > 8) {
            setDateOfBirth(cleanedValue);
            return;
        }

        // Split the cleaned value into day, month, and year parts
        let day = cleanedValue.slice(0, 2);
        let month = cleanedValue.slice(2, 4);
        let year = cleanedValue.slice(4, 8);

        // Construct the formatted date string
        let formattedDate = '';
        if (day) formattedDate += day;
        if (month) formattedDate += '/' + month;
        if (year) formattedDate += '/' + year;

        setDateOfBirth(formattedDate);
    };

    const handleChange = (e) => {
        formatDate(e.target.value);
    };

    return (
    <div className="row mb-3">
        <div className="col-sm-10">
        <input type="text" placeholder='Date of Birth (DD/MM/YYYY)' name="date" value={dateOfBirth} onChange={handleChange} inputMode="numeric" maxLength={10} minLength={10} className={`form-control ${styles.formControl}`} required />
        </div>
    </div>
    );
};

export default DateInputComponent;
