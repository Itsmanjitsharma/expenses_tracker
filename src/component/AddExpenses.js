import React, { useState } from 'react';
import { SlClose } from "react-icons/sl";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AddExpenses = ({ onClose }) => {
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('Food');
    const [notes, setNotes] = useState('');
    const [dates, setDates] = useState(new Date());
    const categories = [
        "Food",
        "Grocery",
        "Movie",
        "Online Transaction",
        "Clothing",
        "Electronics",
        "Books",
        "Health & Beauty",
        "Home & Kitchen",
        "Sports & Outdoors",
        "Automotive",
        "Toys & Games",
        "Stationery",
        "Jewelry",
        "Furniture",
        "Pets",
        "Travel",
        "Music",
        "Art & Crafts",
        "Gifts",
        "Tools & Home Improvement",
        "Outing",
        "Others"
    ];
    const formatDate = (dates) => {
        return dates.toISOString().split('T')[0]; // Format the date to yyyy-mm-dd
    };
    const handleAddPayment = async () => {
        // Replace the URL with your actual API endpoint
        const apiUrl = 'http://localhost:3333/save';

        // Create the payload to send to the API
        const payload = {
            amount,
            category,
            dates:formatDate(dates),
            notes
        };

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            if (response.ok) {
                // Handle successful response
                console.log('Payment added successfully');
                // Optionally, you can clear the form or close the modal
            } else {
                // Handle error response
                console.error('Error adding payment');
            }
        } catch (error) {
            console.error('Error adding payment:', error);
        }
        setAmount('');
        setCategory('');
        setNotes('');
        setDates(new Date());
    };

    return (
        <div className="addexpenses-container">
            <div className="header-container">
                <h3>Add Payment</h3>
                <SlClose className="left-icon" onClick={onClose} />
            </div>
            <div className="expenses-amount">
                <strong>Amount</strong>
                <div className="amount-input-container">
                    <p>INR</p>
                    <input
                        type="text"
                        placeholder="enter your amount here"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>
            </div>
            <div className="expenses-category">
                <strong>Select Category</strong>
                <div className="expenses-category-container">
                    <p>Food</p>
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    {categories.map((cat, index) => (
                            <option key={index}>{cat}</option>
                    ))}
                    </select>
                </div>
            </div>
            <div className="expenses-date">
                <strong>Select Date</strong>
                <DatePicker
                    selected={dates}
                    onChange={(date) => setDates(date)}
                    dateFormat="yyyy/MM/dd"
                    className="date-picker-input expenses-date-container"
                />
            </div>
            <div className="expenses-notes">
                <strong>Write Notes</strong>
                <div className="notes-input-container">
                    <input
                        type="text"
                        placeholder="write notes ....."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    />
                </div>
            </div>
            <button className="payment-button" onClick={handleAddPayment}>Add Payment</button>
        </div>
    );
};

export default AddExpenses;
