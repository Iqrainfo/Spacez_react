import React, { useState } from 'react';
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

const Sell = () => {
    const [quantity, setQuantity] = useState(1);
    const [coin, setCoin] = useState('BTC');
    const [isLoading, setIsLoading] = useState(false); // To manage loading state
    const [error, setError] = useState(null); // To manage errors

    const handleIncrement = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };

    const handleCoinChange = (event) => {
        setCoin(event.target.value);
    };

    const totalAmount = quantity * coinPrices[coin];

    const handleSell = async () => {
        const userId = 0; // Replace this with the actual user ID
        const orderType = 'sell'; // Adjust according to your needs

        const requestData = {
            user_id: userId,
            coin_name: coin,
            coin_qty: quantity,
            coin_price: coinPrices[coin],
            order_type: orderType,
        };

        try {
            setIsLoading(true); // Set loading state
            setError(null); // Reset error state

            const response = await fetch('https://spacez.onrender.com/user_sell_coin/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            await response.json(); // Process response, but no need to store it

            alert(`Sold ${quantity} ${coin}`);
            // Optionally, update the boughtCoins state or handle the response data as needed
        } catch (error) {
            setError(error.message); // Set error message
            console.error('Error during sell operation:', error);
        } finally {
            setIsLoading(false); // Reset loading state
        }
    };

    return (
        <div className="main-div-buysell">
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
                    <button
                        className="sell-button"
                        onClick={handleSell}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Selling...' : <><span className="arrow-up">↑</span> Sell</>}
                    </button>
                </div>
                {error && <p className="error-message">{error}</p>}
            </div>
        </div>
    );
};

export default Sell;
