import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
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

const API_URL = 'https://spacez.onrender.com/user_buy_coin/';

const BuySell = () => {
    const [quantity, setQuantity] = useState(1);
    const [coin, setCoin] = useState('BTC');
    const [boughtCoins, setBoughtCoins] = useState(() => {
        const savedCoins = localStorage.getItem('boughtCoins');
        return savedCoins ? JSON.parse(savedCoins) : [];
    });

    useEffect(() => {
        localStorage.setItem('boughtCoins', JSON.stringify(boughtCoins));
    }, [boughtCoins]);

    const handleIncrement = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };

    const handleBuy = async () => {
        const totalAmount = quantity * coinPrices[coin];
        try {
            await axios.post(API_URL, {
                user_id: 0, // Replace with the actual user ID
                coin_name: coin,
                coin_qty: quantity,
                coin_price: coinPrices[coin],
                order_type: 'buy'
            });
            
            const existingCoinIndex = boughtCoins.findIndex(item => item.coin === coin);
            if (existingCoinIndex !== -1) {
                const updatedBoughtCoins = [...boughtCoins];
                updatedBoughtCoins[existingCoinIndex].quantity += quantity;
                updatedBoughtCoins[existingCoinIndex].totalAmount += totalAmount;
                setBoughtCoins(updatedBoughtCoins);
            } else {
                setBoughtCoins(prevBoughtCoins => [...prevBoughtCoins, { coin, quantity, totalAmount }]);
            }
            alert(`Bought ${quantity} ${coin}`);
        } catch (error) {
            console.error('Error buying coin:', error);
            alert('Error buying coin');
        }
    };

    const handleSell = async () => {
        const existingCoinIndex = boughtCoins.findIndex(item => item.coin === coin);
        if (existingCoinIndex !== -1) {
            const updatedBoughtCoins = [...boughtCoins];
            if (updatedBoughtCoins[existingCoinIndex].quantity >= quantity) {
                try {
                    await axios.post(API_URL, {
                        user_id: 0, // Replace with the actual user ID
                        coin_name: coin,
                        coin_qty: quantity,
                        coin_price: coinPrices[coin],
                        order_type: 'sell'
                    });
                    
                    updatedBoughtCoins[existingCoinIndex].quantity -= quantity;
                    updatedBoughtCoins[existingCoinIndex].totalAmount -= quantity * coinPrices[coin];
                    if (updatedBoughtCoins[existingCoinIndex].quantity === 0) {
                        updatedBoughtCoins.splice(existingCoinIndex, 1);
                    }
                    setBoughtCoins(updatedBoughtCoins);
                    alert(`Sold ${quantity} ${coin}`);
                } catch (error) {
                    console.error('Error selling coin:', error);
                    alert('Error selling coin');
                }
            } else {
                alert('Not enough coins to sell');
            }
        } else {
            alert('No coins to sell');
        }
    };

    const handleCoinChange = (event) => {
        setCoin(event.target.value);
    };

    const totalAmount = quantity * coinPrices[coin];
    const totalInvestedValue = boughtCoins.reduce((total, item) => total + item.totalAmount, 0);

    return (
        <div className="main-div-buysell">
            <div className="bought-coins-list">
                <h3>Coins</h3>
                <ul>
                    {boughtCoins.map((item, index) => (
                        <li key={index}>
                            {item.quantity} {item.coin} - ${item.totalAmount.toFixed(2)}
                        </li>
                    ))}
                </ul>
                <h4>Total Invested Value: ${totalInvestedValue.toFixed(2)}</h4>
            </div>
            <div className="buy-sell-container">
                <div className="coin-selector">
                    <select value={coin} onChange={handleCoinChange} className="select-coin">
                        <option value="BTC">BTC - Bitcoin</option>
                        <option value="ETH">ETH - Ethereum</option>
                        <option value="LTC">LTC - Litecoin</option>
                        <option value="ADA">ADA - Cardano</option>
                        <option value="XRP">XRP - Ripple</option>
                        <option value="BCH">BCH - Bitcoin Cash</option>
                        <option value="BNB">BNB - Binance Coin</option>
                    </select>
                </div>
                <div className="quantity-container">
                    <button className="decrement-button" onClick={handleDecrement}>-</button>
                    <span className="quantity">{quantity}</span>
                    <button className="increment-button" onClick={handleIncrement}>+</button>
                </div>
                <div className="selected-info">
                    <div className='si-div'>
                        <span className='iscqa'><b>Quantity:</b><br /> {quantity} {coin}</span>
                    </div>
                    <div className='si-div'>
                        <span className='iscqa'><b>Total Amount:</b><br /> ${totalAmount.toFixed(2)}</span>
                    </div>
                </div>
                <div className="button-container">
                    <button className="buy-button" onClick={handleBuy}><span className="arrow-down">↓</span> Buy</button>
                    <button className="sell-button ml-2" onClick={handleSell}><span className="arrow-up">↑</span> Sell</button>
                </div>
            </div>
        </div>
    );
};

export default BuySell;
