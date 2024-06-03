import React, { useState } from 'react';
import './Dashboard.css';
import Expenses from './Expenses';
import AddExpenses from './AddExpenses'
import Income from './Income';
import AllTransaction from './AllTransaction';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('expenses');
    const [showAddExpense, setShowAddExpense] = useState(false); 

    const toggleAddExpense = () => {
        setShowAddExpense(!showAddExpense); 
    };

    return (
        <div className="dashboard">
            <header className="header">
                <div className="logo">Logo</div>
                <div className="profile">
                    <span>John Doe</span>
                    <div className="profile-icon">JD</div>
                </div>
            </header>
            <div className="balance-card neumorphism">
                <p>My Balance</p>
                <h2>₹ 16,000</h2>
                <p className="spending">Spending (this month)</p>
                <h3>₹ 10,000</h3>
            </div>
            <div className="tabs">
                <span className={activeTab === 'expenses' ? 'active' : ''} onClick={() => setActiveTab('expenses')}>Expenses</span>
                <span className={activeTab === 'Transactions' ? 'active' : ''} onClick={() => setActiveTab('Transactions')}>Goals</span>
                <span className={activeTab === 'income' ? 'active' : ''} onClick={() => setActiveTab('income')}>Income</span>
            </div>
            <div className='sub-container'>            
            {activeTab === 'expenses' && <Expenses />}
            {activeTab === 'income' && <Income />}
            {activeTab === 'Transactions' && <AllTransaction/>}
            </div>
            <div className="button-container">
            {activeTab === 'expenses' && (
                    <button className="button neumorphism" onClick={toggleAddExpense}>Add Expense</button>
                )}
                {activeTab === 'income' && <button className="button neumorphism">Add Income</button>}
            </div>
            {showAddExpense && <AddExpenses onClose={toggleAddExpense}/>}
        </div>
    );
};

export default Dashboard;
