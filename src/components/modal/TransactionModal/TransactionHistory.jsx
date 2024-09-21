const TransactionHistory = ({ show, onHide, transactionHistory = [] }) => {
    return (
        <div className={`transaction-history-modal ${show ? 'show' : ''}`}>
            <button onClick={onHide}>Close</button>
            {transactionHistory.length === 0 ? (
                <p>No transactions to show</p>
            ) : (
                <ul>
                    {transactionHistory.map((entry, index) => (
                        <li key={index}>
                            {entry.transaction} - {entry.timestamp}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TransactionHistory;
