import React from 'react';
import './Transactions.css';
import { FaCoffee, FaGift, FaEnvelope } from 'react-icons/fa'; // Sample icons, replace as needed

const transactions = [
  {
    date: 'Today',
    items: [
      { icon: <FaCoffee />, title: 'Coffee', description: 'with Peter Bower', amount: '$50' },
      { icon: <FaGift />, title: 'Gift', description: 'for Audrey Campbell', amount: '$1,500' },
      { icon: <FaEnvelope />, title: 'Subscription', description: 'made with Chapman', amount: '$500' },
    ],
  },
  {
    date: 'Yesterday',
    items: [
      { icon: <FaCoffee />, title: 'Tea & Snacks', description: 'with Peter Bower', amount: '$50' },
      { icon: <FaEnvelope />, title: 'Subscription', description: 'made with Chapman', amount: '$500' },
      { icon: <FaCoffee />, title: 'Tea & Snacks', description: 'with Peter Bower', amount: '$50' },
      { icon: <FaEnvelope />, title: 'Subscription', description: 'made with Chapman', amount: '$500' },
      { icon: <FaCoffee />, title: 'Tea & Snacks', description: 'with Peter Bower', amount: '$50' },
      { icon: <FaEnvelope />, title: 'Subscription', description: 'made with Chapman', amount: '$500' },
    ],
  },
];

const Transactions = () => {
  return (
    <div className="transaction-list">
      {transactions.map((group, index) => (
        <div key={index} className="transaction-group">
          <div className="transaction-date">{group.date}</div>
          {group.items.map((item, idx) => (
            <div key={idx} className="transaction-item">
              <div className="icon-details">
                <div className="icon">{item.icon}</div>
                <div className="details">
                  <strong>{item.title}</strong>
                  <span>{item.description}</span>
                </div>
              </div>
              <div className="amount">{item.amount}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Transactions;
