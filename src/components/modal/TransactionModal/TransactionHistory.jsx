import React from 'react';


const TransactionHistory = ({ transactions }) => (
    <div className="transaction-history">
        <ul>
            {transactions.map((transaction, index) => (
                <li key={index}>
                    <span style={{fontSize:'smaller'}}> {transaction.transaction}: {transaction.timestamp}</span>
                </li>
            ))}
        </ul>
    </div>
);

export default TransactionHistory;



