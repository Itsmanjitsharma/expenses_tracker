import './Expenses.css';
import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { IoMdCash } from 'react-icons/io';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
const Expenses = () => {
    
    const [period, setPeriod] = useState('Day');
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });
    const [transactions, setTransactions] = useState([]);
    const handlePeriodChange = (event) => {
        setPeriod(event.target.value);
    };
    useEffect(() => {
    const fetchTransactionData = async () => {
        try {
            const response = await fetch('http://localhost:3333/transactions');
            if (response.ok) {
                const data = await response.json();
                setTransactions(data);
            } else {
                console.error('Failed to fetch transaction data:', response.status);
            }
        } catch (error) {
            console.error('Error fetching transaction data:', error);
        }
    };
        const processTransactions = () => {
            const sortedTransactions = [...transactions].sort((a, b) => new Date(b.dates) - new Date(a.dates));
            const labels = [];
            const data = [];
            if (period === 'Day') {
                const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                const uniqueDates = Array.from(new Set(sortedTransactions.map(tx => new Date(tx.dates).toDateString())));
                const last7Days = uniqueDates.slice(0, 7).reverse();

                last7Days.forEach(dateStr => {
                    const date = new Date(dateStr);
                    labels.push(daysOfWeek[date.getDay()]);
                    const totalAmount = sortedTransactions
                        .filter(transaction => new Date(transaction.dates).toDateString() === dateStr)
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
                    const date = new Date(transaction.dates);
                    return `${months[date.getMonth()]} ${date.getFullYear()}`;
                }))];

                uniqueMonths.forEach(month => {
                    labels.push(month);
                    const [monthName, year] = month.split(' ');
                    const totalAmount = transactions
                        .filter(transaction => {
                            const date = new Date(transaction.dates);
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

        fetchTransactionData(); // Fetch transaction data on component mount
        processTransactions(); // Process transactions on component mount
        }, [period]);

    return (
        <div className='expenses'>
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
                            <strong>{transaction.notes}</strong>
                            <p className='transaction-date'>{transaction.dates}</p>
                        </div>
                        <p>${transaction.amount}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Expenses;