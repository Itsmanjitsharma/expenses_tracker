import React, { useState } from 'react';
import './Expenses.css';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
const Expenses = () => {
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June'],
        datasets: [
            {
                label: 'Expenses',
                data: [30000, 40000, 35000, 20000, 10000, 60000],
                fill: false,
                backgroundColor: '#007bff',
                borderColor: '#007bff',
            },
        ],
    };
    return (
        <div className='expenses'>
            <div className="chart-container">
                <Line data={data} />
            </div>
            <div className="expenses-section">
                <h4>June Expenses</h4>
                <div className="expense-item neumorphism">
                    <span>Fuel</span>
                    <span>₹ 2,000</span>
                </div>
                <div className="expense-item neumorphism">
                    <span>Fuel</span>
                    <span>₹ 2,000</span>
                </div>
                <div className="expense-item neumorphism">
                    <span>Fuel</span>
                    <span>₹ 2,000</span>
                </div>
                <div className="expense-item neumorphism">
                    <span>Fuel</span>
                    <span>₹ 2,000</span>
                </div>
                <div className="expense-item neumorphism">
                    <span>Rental</span>
                    <span>₹ 20,000</span>
                </div>
            </div>
        </div>
    )
}
export default Expenses;