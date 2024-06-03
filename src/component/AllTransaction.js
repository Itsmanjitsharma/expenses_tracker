import { Chart } from 'chart.js';
import React, { useState, useEffect } from 'react';
import './AllTransaction.css';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { IoMdCash } from 'react-icons/io';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AllTransaction = () => {
    const [period, setPeriod] = useState('Day');
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });
    const today = new Date();
    const handlePeriodChange = (event) => {
        setPeriod(event.target.value);
    };
    const transactions = [
        { amount: 20, category: 'Food', date: '2024-05-12', note: 'Had drink with Friends' },
        { amount: 50, category: 'Entertainment', date: '2024-05-11', note: 'Went to a movie' },
        { amount: 30, category: 'Transport', date: '2024-05-10', note: 'Taxi fare' },
        { amount: 60, category: 'Shopping', date: '2024-05-09', note: 'Bought a new shirt' },
        { amount: 15, category: 'Food', date: '2024-05-08', note: 'Lunch at work' },
        { amount: 100, category: 'Bills', date: '2024-05-07', note: 'Electricity bill' },
        { amount: 80, category: 'Groceries', date: '2024-05-06', note: 'Weekly grocery shopping' },
        { amount: 40, category: 'Health', date: '2024-05-05', note: 'Bought vitamins' },
        { amount: 25, category: 'Transport', date: '2024-05-04', note: 'Gas for car' },
        { amount: 45, category: 'Entertainment', date: '2024-05-03', note: 'Concert tickets' },
        { amount: 35, category: 'Food', date: '2024-05-02', note: 'Dinner with family' },
        { amount: 20, category: 'Shopping', date: '2024-05-01', note: 'Bought a book' },
        { amount: 90, category: 'Bills', date: '2024-04-30', note: 'Water bill' },
        { amount: 10, category: 'Transport', date: '2024-04-29', note: 'Bus fare' },
        { amount: 70, category: 'Groceries', date: '2024-04-28', note: 'Bought vegetables' },
        { amount: 25, category: 'Health', date: '2024-04-27', note: 'Doctor visit' },
        { amount: 15, category: 'Food', date: '2024-04-26', note: 'Breakfast at cafe' },
        { amount: 40, category: 'Shopping', date: '2024-04-25', note: 'Bought new shoes' },
        { amount: 55, category: 'Entertainment', date: '2024-04-24', note: 'Bought video game' },
        { amount: 75, category: 'Bills', date: '2024-04-23', note: 'Internet bill' },
        { amount: 50, category: 'Transport', date: '2024-04-22', note: 'Car maintenance' }
    ];

    useEffect(() => {
        const processTransactions = () => {
            const sortedTransactions = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));
            const labels = [];
            const data = [];

            if (period === 'Day') {
                const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                const uniqueDates = Array.from(new Set(sortedTransactions.map(tx => new Date(tx.date).toDateString())));
                const last7Days = uniqueDates.slice(0, 7).reverse();

                last7Days.forEach(dateStr => {
                    const date = new Date(dateStr);
                    labels.push(daysOfWeek[date.getDay()]);
                    const totalAmount = sortedTransactions
                        .filter(transaction => new Date(transaction.date).toDateString() === dateStr)
                        .reduce((sum, transaction) => sum + transaction.amount, 0);
                    data.push(totalAmount);
                });
            } else if (period === 'Week') {
                const last24DaysTransactions = sortedTransactions.slice(0, 24);
                const weeks = Array.from({ length: 4 }, (_, i) => last24DaysTransactions.slice(i * 6, (i + 1) * 6));

                weeks.reverse().forEach((week, index) => {
                    labels.push(`Week ${index + 1}`);
                    const totalAmount = week.reduce((sum, transaction) => sum + transaction.amount, 0);
                    data.push(totalAmount);
                });
            } else if (period === 'Month') {
                const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                const uniqueMonths = [...new Set(transactions.map(transaction => {
                    const date = new Date(transaction.date);
                    return `${months[date.getMonth()]} ${date.getFullYear()}`;
                }))];

                uniqueMonths.forEach(month => {
                    labels.push(month);
                    const [monthName, year] = month.split(' ');
                    const totalAmount = transactions
                        .filter(transaction => {
                            const date = new Date(transaction.date);
                            return months[date.getMonth()] === monthName && date.getFullYear() === parseInt(year);
                        })
                        .reduce((sum, transaction) => sum + transaction.amount, 0);
                    data.push(totalAmount);
                });
            }

            setChartData({
                labels,
                datasets: [
                    {
                        label: 'Expenses',
                        data,
                        fill: false,
                        backgroundColor: '#007bff',
                        borderColor: '#007bff',
                    },
                ],
            });
        };

        processTransactions();
    }, [period]);

    return (
        <div className='add-expenses-container'>
            <div className='add-expenses-chart neumorphism-expense'>
                <Bar
                    data={chartData}
                    options={{
                        indexAxis: 'x', // Change to 'y' if you're working with a horizontal bar chart
                        scales: {
                            x: {
                                grid: {
                                    display: false,
                                }
                            },
                            y: {
                                grid: {
                                    display: false,
                                }
                            }
                        }
                    }}
                />
            </div>
            <div className='allTransaction-dayweakmonth'>
                <h2>Transactions</h2>
                <select value={period} onChange={handlePeriodChange}>
                    <option value="Day">Day</option>
                    <option value="Week">Week</option>
                    <option value="Month">Month</option>
                </select>
            </div>
            <div className='allTransactions'>
                {transactions.map((transaction, index) => (
                    <div key={index} className='allTransactions-sub'>
                        <div className='icons'> <IoMdCash /></div>
                        <div className='transaction-details'>
                            <strong>{transaction.note}</strong>
                            <p className='transaction-date'>{transaction.date}</p>
                        </div>
                        <p>${transaction.amount}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllTransaction;
