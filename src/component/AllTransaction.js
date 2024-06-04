import React, { useState, useEffect } from 'react';
import './AllTransaction.css';
import { Bar } from 'react-chartjs-2';
import { IoMdCash } from 'react-icons/io';


const AllTransaction = () => {
    const [period, setPeriod] = useState('Day');
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });
    const [transactions, setTransactions] = useState([]);
    const handlePeriodChange = (event) => {
        setPeriod(event.target.value);
    };


    useEffect(() => {
        fetch('your-api-endpoint')
        .then(response => response.json())
        .then(data => setTransactions(data))
        .catch(error => console.error('Error fetching transaction data:', error)); 
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
