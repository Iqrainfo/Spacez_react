import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import BuyModal from '../../components/modal/buyModal/BuyModal';
import SellModal from '../../components/modal/sellModal/SellModal';
import PaymentModal from '../../components/modal/paymentModal/paymentModal';
import TransactionHistory from '../../components/modal/TransactionModal/TransactionHistory';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/Buysell.css';

const coinPrices = {
    BTC: 40000,
    ETH: 2500,
    LTC: 150,
    ADA: 1.5,
    XRP: 0.8,
    BCH: 600,
    BNB: 350,
};

const coinLogos = {
    BTC: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
    ETH: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
    LTC: 'https://assets.coingecko.com/coins/images/2/large/litecoin.png',
    ADA: 'https://assets.coingecko.com/coins/images/975/large/cardano.png',
    XRP: 'https://assets.coingecko.com/coins/images/44/large/xrp.png',
    BCH: 'https://assets.coingecko.com/coins/images/780/large/bitcoin-cash.png',
    BNB: 'https://assets.coingecko.com/coins/images/825/large/binance-coin.png',
};

const Trade = () => {
    const initialWalletBalance = 1000000; // Initial wallet balance
    const [walletBalance, setWalletBalance] = useState(initialWalletBalance);
    const [quantity, setQuantity] = useState(1);
    const [coin, setCoin] = useState('BTC');
    const [boughtCoins, setBoughtCoins] = useState(() => {
        const savedCoins = localStorage.getItem('boughtCoins');
        return savedCoins ? JSON.parse(savedCoins) : [];
    });
    const [showBuyModal, setShowBuyModal] = useState(false);
    const [showSellModal, setShowSellModal] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [selectedCoinDetails, setSelectedCoinDetails] = useState(null);
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [showTransactionHistory, setShowTransactionHistory] = useState(false); // State to manage transaction history visibility
    const [transactionHistory, setTransactionHistory] = useState([]); // State to store transaction history

    // Effect to save boughtCoins to localStorage
    useEffect(() => {
        localStorage.setItem('boughtCoins', JSON.stringify(boughtCoins));
    }, [boughtCoins]);

    // Handlers for quantity change
    const handleIncrement = () => setQuantity(prevQuantity => prevQuantity + 1);
    const handleDecrement = () => setQuantity(prevQuantity => Math.max(prevQuantity - 1, 1));

    // Handler for buying coins
    const handleBuy = () => {
        const totalAmount = quantity * coinPrices[coin];
        if (totalAmount > walletBalance) {
            setFeedbackMessage('Insufficient funds');
            setTimeout(() => setFeedbackMessage(''), 3000);
            return;
        }
        setSelectedCoinDetails({
            coin,
            quantity,
            totalAmount,
            currentPrice: coinPrices[coin],
        });
        setShowBuyModal(true);
    };

    // Handler for selling coins
    const handleSell = () => {
        if (boughtCoins.length === 0) {
            setFeedbackMessage('No coins to sell');
            setTimeout(() => setFeedbackMessage(''), 3000);
        } else {
            setShowSellModal(true);
        }
    };

    // Handler for coin selection change
    const handleCoinChange = (event) => setCoin(event.target.value);

    // Calculated total amount based on selected quantity and coin price
    const totalAmount = quantity * coinPrices[coin];

    // Calculated total invested value from boughtCoins array
    const totalInvestedValue = boughtCoins.reduce((total, item) => total + item.totalAmount, 0);

    // Function to confirm buying a coin
    const confirmBuy = () => {
        const updatedBoughtCoins = [...boughtCoins];
        const existingCoinIndex = updatedBoughtCoins.findIndex(item => item.coin === selectedCoinDetails.coin);
        if (existingCoinIndex !== -1) {
            updatedBoughtCoins[existingCoinIndex].quantity += selectedCoinDetails.quantity;
            updatedBoughtCoins[existingCoinIndex].totalAmount += selectedCoinDetails.totalAmount;
        } else {
            updatedBoughtCoins.push({
                coin: selectedCoinDetails.coin,
                quantity: selectedCoinDetails.quantity,
                totalAmount: selectedCoinDetails.totalAmount,
            });
        }
        setBoughtCoins(updatedBoughtCoins);
        setWalletBalance(walletBalance - selectedCoinDetails.totalAmount); // Deduct bought amount from wallet
        // setFeedbackMessage(`Bought ${selectedCoinDetails.quantity} ${selectedCoinDetails.coin}`);
        // setTimeout(() => setFeedbackMessage(''), 3000);
        addToTransactionHistory(`Bought ${selectedCoinDetails.quantity} ${selectedCoinDetails.coin}`);
    };

    // Function to confirm selling a coin
    const confirmSell = () => {
        const existingCoinIndex = boughtCoins.findIndex(item => item.coin === coin);
        if (existingCoinIndex !== -1) {
            const coinToSell = boughtCoins[existingCoinIndex];
            const sellAmount = quantity * coinPrices[coin];
            const updatedBoughtCoins = [...boughtCoins];
            if (coinToSell.quantity >= quantity) {
                updatedBoughtCoins[existingCoinIndex].quantity -= quantity;
                updatedBoughtCoins[existingCoinIndex].totalAmount -= sellAmount;
                if (updatedBoughtCoins[existingCoinIndex].quantity === 0) {
                    updatedBoughtCoins.splice(existingCoinIndex, 1);
                }
                setBoughtCoins(updatedBoughtCoins);
                setWalletBalance(walletBalance + sellAmount); // Add sold amount to wallet
                // setFeedbackMessage(`Sold ${quantity} ${coin}`);
                // setTimeout(() => setFeedbackMessage(''), 3000);
                addToTransactionHistory(`Sold ${quantity} ${coin}`);
            } else {
                setFeedbackMessage('Not enough coins to sell');
                setTimeout(() => setFeedbackMessage(''), 3000);
            }
        } else {
            setFeedbackMessage('No coins to sell');
            setTimeout(() => setFeedbackMessage(''), 3000);
        }
        setShowSellModal(false);
    };

    // Function to add transaction to history
    const addToTransactionHistory = (transaction) => {
        const updatedHistory = [...transactionHistory, { transaction, timestamp: new Date().toLocaleString() }];
        setTransactionHistory(updatedHistory);
    };

    // Toggle transaction history visibility
    const toggleTransactionHistory = () => {
        setShowTransactionHistory(!showTransactionHistory);
    };

    return (
        <div className="main-div-buysell">

            <div className="buy-sell-container">
                <div className="coin-selector">
                    <select value={coin} onChange={handleCoinChange} className="select-coin">
                        {Object.keys(coinPrices).map(key => (
                            <option key={key} value={key}>{key} - {key}</option>
                        ))}
                    </select>
                </div>
                <div className="quantity-container">
                    <button className="decrement-button animated-button" onClick={handleDecrement}>-</button>
                    <span className="quantity">{quantity}</span>
                    <button className="increment-button animated-button" onClick={handleIncrement}>+</button>
                </div>
                <div className="selected-info">
                    <div className='si-div'>
                        <span className='iscqa'><b>Current Price:</b><br /> ${coinPrices[coin].toFixed(2)} per {coin}</span>
                    </div>
                    <div className='si-div'>
                        <span className='iscqa'><b>Quantity:</b><br /> {quantity} {coin}</span>
                    </div>
                    <div className='si-div'>
                        <span className='iscqa'><b>Total Amount:</b><br /> ${totalAmount.toFixed(2)}</span>
                    </div>
                </div>
                <div className="button-container">
                    <button className="buy-button animated-button" onClick={handleBuy}><span className="arrow-down">↓</span> Buy</button>
                    <button className="sell-button animated-button" onClick={handleSell}><span className="arrow-up">↑</span> Sell</button>
                </div>
            </div>


            <div className="cards-container1">

                <div className="bought-coins-list">
                    <h4>Invested Coins</h4>
                    {boughtCoins.length === 0 ? (
                        <div>  <p>No coins invested yet.</p> </div>
                    ) : (
                        <TransitionGroup component="ul">
                            {boughtCoins.map((item, index) => (
                                <CSSTransition key={index} timeout={500} classNames="coin-item">
                                    <li className="iqita">
                                        <span>
                                            <span className="imgcoin">
                                                <img src={coinLogos[item.coin]} alt={item.coin} width="25" />
                                            </span>
                                            <span className="iq">{item.quantity} </span>
                                            <span className="ic">{item.coin} </span>
                                        </span>
                                        <span className="totala">${item.totalAmount.toFixed(2)}</span>
                                    </li>
                                </CSSTransition>
                            ))}
                        </TransitionGroup>
                    )}
                </div>

            </div>


            <div className="cards-container2">
                <div className="invested-value-card-wallet bought-coins-list2">
                    <div className="value">
                        <h5>Wallet Balance</h5>
                        <p>${walletBalance.toFixed(2)}</p>
                    </div>
                    <div className="values">
                        <div className="value">
                            <h5>Current</h5>
                            <p>${totalInvestedValue.toFixed(2)}</p>
                        </div>
                        <div className="value">
                            <h5>Invested</h5>
                            <p>${totalInvestedValue.toFixed(2)}</p>
                        </div>
                    </div>
                </div>

                <div className="transaction-toggle" onClick={toggleTransactionHistory} style={{ cursor: 'pointer', paddingLeft: '10px' }}>
                    {showTransactionHistory ? 'Hide Transaction History' : 'Show Transaction History'}
                </div>
                {showTransactionHistory && (
                    <div className="transaction-history-container">
                        <TransactionHistory transactions={transactionHistory} />
                    </div>
                )}
            </div>



            {/* For Modal */}
            <BuyModal
                showModal={showBuyModal}
                setShowModal={setShowBuyModal}
                selectedCoinDetails={selectedCoinDetails}
                confirmBuy={confirmBuy}
                openPaymentModal={() => setShowPaymentModal(true)} // Ensure this function is defined
            />
            <SellModal
                showModal={showSellModal}
                setShowModal={setShowSellModal}
                confirmSell={confirmSell}
                coinDetails={{ coin, quantity, currentPrice: coinPrices[coin] }}
            />
            <PaymentModal
                showModal={showPaymentModal}
                setShowModal={setShowPaymentModal}
            />
            {feedbackMessage && (
                <div className={`feedback-popup ${feedbackMessage === 'Insufficient funds' ? 'red' : ''}`}>
                    {feedbackMessage}
                </div>
            )}
        </div>
    );
};

export default Trade;
