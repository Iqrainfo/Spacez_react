import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import BuyModal from '../../components/modal/buyModal/BuyModal';
import SellModal from '../../components/modal/sellModal/SellModal';
import PaymentModal from '../../components/modal/paymentModal/paymentModal';
import TransactionHistory from '../../components/modal/TransactionModal/TransactionHistory';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/Buysell.css';
import axios from 'axios';

const Trade = () => {
    const initialWalletBalance = 10000000; // Example initial wallet balance in INR
    const [walletBalance, setWalletBalance] = useState(initialWalletBalance);
    const [quantity, setQuantity] = useState(1);
    const [coin, setCoin] = useState('');
    const [boughtCoins, setBoughtCoins] = useState(() => {
        const savedCoins = localStorage.getItem('boughtCoins');
        return savedCoins ? JSON.parse(savedCoins) : [];
    });
    const [showBuyModal, setShowBuyModal] = useState(false);
    const [showSellModal, setShowSellModal] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [selectedCoinDetails, setSelectedCoinDetails] = useState(null);
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [showTransactionHistory, setShowTransactionHistory] = useState(false);
    const [transactionHistory, setTransactionHistory] = useState([]);
    const [coinData, setCoinData] = useState({}); // Store coin data like price and logos
    const [allCoins, setAllCoins] = useState([]); // Store all coins
    const [searchTerm, setSearchTerm] = useState(''); // State for the search bar
    const [dropdownOpen, setDropdownOpen] = useState(false);

    // Fetch all coin data from CoinGecko
    useEffect(() => {
        const fetchCoinData = async () => {
            try {
                const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
                    params: {
                        vs_currency: 'inr', // Change currency to INR
                    },
                });

                const coinInfo = {};
                const allCoinsData = response.data.map((coin) => ({
                    id: coin.id,
                    name: coin.name,
                    logo: coin.image,
                    price: coin.current_price,
                }));

                allCoinsData.forEach((coin) => {
                    coinInfo[coin.id] = coin;
                });

                setCoinData(coinInfo);
                setAllCoins(allCoinsData);
                if (allCoinsData.length > 0) {
                    setCoin(allCoinsData[0].id); // Set default coin
                }
            } catch (error) {
                console.error('Error fetching coin data', error);
            }
        };

        fetchCoinData();
    }, []);

    // Save boughtCoins to localStorage
    useEffect(() => {
        localStorage.setItem('boughtCoins', JSON.stringify(boughtCoins));
    }, [boughtCoins]);

    // Handlers for quantity change
    const handleIncrement = () => setQuantity((prevQuantity) => prevQuantity + 1);
    const handleDecrement = () => setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));

    // Handler for buying coins
    const handleBuy = () => {
        const totalAmount = quantity * coinData[coin]?.price;
        if (totalAmount > walletBalance) {
            setFeedbackMessage('Insufficient funds');
            setTimeout(() => setFeedbackMessage(''), 3000);
            return;
        }
        setSelectedCoinDetails({
            coin,
            quantity,
            totalAmount,
            currentPrice: coinData[coin]?.price,
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
    const handleCoinChange = (event) => {
        setCoin(event.target.value);
        setDropdownOpen(false); // Close dropdown on coin selection
    };

    // Handler for the search bar
    const handleSearchChange = (event) => {
        const term = event.target.value.toLowerCase();
        setSearchTerm(term);
        setDropdownOpen(term.length > 0); // Open the dropdown if search term is not empty
    };

    // Filter the allCoins based on the search term
    const filteredCoins = allCoins.filter((coin) =>
        coin.name.toLowerCase().includes(searchTerm)
    );

    // Limit dropdown options
    const displayedCoins = filteredCoins.slice(0, 6);

    const totalAmount = quantity * (coinData[coin]?.price || 0);
    const totalInvestedValue = boughtCoins.reduce((total, item) => total + item.totalAmount, 0);

    const confirmBuy = () => {
        const updatedBoughtCoins = [...boughtCoins];
        const existingCoinIndex = updatedBoughtCoins.findIndex((item) => item.coin === selectedCoinDetails.coin);
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
        setWalletBalance(walletBalance - selectedCoinDetails.totalAmount);
        addToTransactionHistory(`Bought ${selectedCoinDetails.quantity} ${selectedCoinDetails.coin}`);
    };

    const confirmSell = () => {
        const existingCoinIndex = boughtCoins.findIndex((item) => item.coin === coin);

        if (existingCoinIndex !== -1) {
            const coinToSell = boughtCoins[existingCoinIndex];
            const sellAmount = quantity * coinData[coin]?.price;

            if (coinToSell.quantity >= quantity) {
                const updatedBoughtCoins = [...boughtCoins];
                updatedBoughtCoins[existingCoinIndex].quantity -= quantity;
                updatedBoughtCoins[existingCoinIndex].totalAmount -= sellAmount;

                if (updatedBoughtCoins[existingCoinIndex].quantity === 0) {
                    updatedBoughtCoins.splice(existingCoinIndex, 1);
                }

                setBoughtCoins(updatedBoughtCoins);
                setWalletBalance(walletBalance + sellAmount);
                addToTransactionHistory(`Sold ${quantity} ${coin}`);
                setShowSellModal(false);
                setFeedbackMessage(`Successfully sold ${quantity} ${coin}`);
                setTimeout(() => setFeedbackMessage(''), 3000);
            } else {
                setFeedbackMessage('Not enough coins to sell');
                setTimeout(() => setFeedbackMessage(''), 3000);
            }
        } else {
            setFeedbackMessage('No coins to sell');
            setTimeout(() => setFeedbackMessage(''), 3000);
        }
    };

    const addToTransactionHistory = (transaction) => {
        const updatedHistory = [...transactionHistory, { transaction, timestamp: new Date().toLocaleString() }];
        setTransactionHistory(updatedHistory);
    };

    const toggleTransactionHistory = () => {
        setShowTransactionHistory(!showTransactionHistory);
    };

    return (
        <div className="main-div-buysell">
            <div className="buy-sell-container">
                {/* Search Bar for filtering coins */}
                <div className="search-bar-t">
                    <input
                        type="text"
                        placeholder="Search coin..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="search-input"
                    />
                </div>

                {/* Coin Selector */}

                {dropdownOpen && (
                    <div className="coin-selector">
                        <select value={coin} onChange={handleCoinChange} className="select-coin">
                            {displayedCoins.map((coin) => (
                                <option
                                    key={coin.id}
                                    value={coin.id}
                                    style={{
                                        backgroundImage: `url(${coin.logo})`,
                                        backgroundSize: '20px 20px',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'left center',
                                        paddingLeft: '30px',
                                    }}
                                >
                                    {coin.name}
                                </option>
                            ))}
                        </select>
                    </div>
                )}


                <div className="quantity-container">
                    <button className="decrement-button animated-button" onClick={handleDecrement}>-</button>
                    <input
                        type="number"
                        className="quantity-input"
                        value={quantity}
                        onChange={(e) => {
                            const value = parseInt(e.target.value, 10);
                            if (!isNaN(value) && value > 0) {
                                setQuantity(value);
                            }
                        }}
                        onBlur={() => {
                            if (quantity < 1) setQuantity(1);
                        }}
                    />
                    <button className="increment-button animated-button" onClick={handleIncrement}>+</button>
                </div>

                <div className="selected-info">
                    <div className="coin-div">
                        <span className="coin-logo">
                            <img src={coinData[coin]?.logo} alt={coin} width="25" /> <b>{coin}</b>
                        </span>
                    </div>
                    <div className="si-div">
                        <div className="si-div">
                            <p className="iscqa"><b>Current Price:</b> ₹{coinData[coin]?.price ? coinData[coin].price.toFixed(2) : 'N/A'}</p>
                            <p className="iscqa"><b>Quantity:</b> {quantity}</p>
                            <p className="iscqa"><b>Total Amount:</b> ₹{coinData[coin]?.price ? (quantity * coinData[coin].price).toFixed(2) : 'N/A'}</p>
                        </div>
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
                        <p>No coins invested yet.</p>
                    ) : (
                        <TransitionGroup component="ul">
                            {boughtCoins.map((item, index) => (
                                <CSSTransition key={index} timeout={500} classNames="coin-item">
                                    <li className="iqita">
                                        <span>
                                            <span className="imgcoin">
                                                <img src={coinData[item.coin]?.logo} alt={item.coin} width="25" />
                                            </span>
                                            <span className="iq">{item.quantity} </span>
                                            <span className="ic">{item.coin} </span>
                                        </span>
                                        <span className="totala">₹{item.totalAmount.toFixed(2)}</span>
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
                        <p>₹{walletBalance.toFixed(2)}</p>
                    </div>
                    <div className="values">
                        <div className="value">
                            <h5>Current</h5>
                            <p>₹{totalInvestedValue.toFixed(2)}</p>
                        </div>
                        <div className="value">
                            <h5>Invested</h5>
                            <p>₹{totalInvestedValue.toFixed(2)}</p>
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

            <BuyModal
                showModal={showBuyModal}
                setShowModal={setShowBuyModal}
                selectedCoinDetails={selectedCoinDetails}
                confirmBuy={confirmBuy}
                openPaymentModal={() => setShowPaymentModal(true)}
            />
            <SellModal
                showModal={showSellModal}
                setShowModal={setShowSellModal}
                confirmSell={confirmSell}
                coinDetails={{ coin, quantity, currentPrice: coinData[coin]?.price }}
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
