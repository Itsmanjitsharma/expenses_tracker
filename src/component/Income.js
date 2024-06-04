import React from 'react';
import './Income.css';
const Income = () => {
    return (
        <div className="income-section">
                <h4>Monthly Income</h4>
                <div className="income-item neumorphism">
                    <span>Monthly Salary</span>
                    <span>₹ 40,000</span>
                </div>
                <div className="income-item neumorphism">
                    <span>House Rent</span>
                    <span>₹ 15,000</span>
                </div>
                <h4>Extra Income</h4>
                <div className="income-item neumorphism">
                    <span>Freelancing Project</span>
                    <span>₹ 12,000</span>
                </div>
            </div>
    )
}
export default Income;
