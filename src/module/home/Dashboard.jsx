import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/Dashboard.css';
import 'chartjs-adapter-date-fns';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Profile from '../../components/profile/Profile';

Chart.register(...registerables);

const API_URL = 'https://api.coingecko.com/api/v3/';

const Dashboard = () => {
  const [coinData, setCoinData] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [selectedCoin, setSelectedCoin] = useState('bitcoin');
  const [selectedPeriod, setSelectedPeriod] = useState('7');
  const [loading, setLoading] = useState(true);

  const fetchCoinData = async () => {
    try {
      setLoading(true);
      const coins = ['bitcoin', 'ethereum', 'litecoin', 'ripple', 'cardano', 'dogecoin', 'polkadot', 'binancecoin'];
      const responses = await Promise.all(coins.map(coin =>
        axios.get(`${API_URL}coins/${coin}`)
      ));
      setCoinData(responses.map(response => response.data));
    } catch (error) {
      console.error('Error fetching coin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchChartData = async (coin, period) => {
    try {
      const response = await axios.get(`${API_URL}coins/${coin}/market_chart`, {
        params: {
          vs_currency: 'usd',
          days: period
        }
      });
      const prices = response.data.prices.map(price => ({
        x: new Date(price[0]),
        y: price[1]
      }));
      setChartData({
        datasets: [
          {
            label: `${coin.charAt(0).toUpperCase() + coin.slice(1)} Price (USD)`,
            data: prices,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
            tension: 0.1,
          }
        ]
      });
    } catch (error) {
      console.error('Error fetching chart data:', error);
    }
  };

  const getTimeUnit = (period) => {
    switch (period) {
      case '1':
        return 'hour';
      case '7':
      case '30':
        return 'day';
      case '365':
        return 'month';
      default:
        return 'year';
    }
  };

  useEffect(() => {
    fetchCoinData();
  }, []);

  useEffect(() => {
    fetchChartData(selectedCoin, selectedPeriod);
    const interval = setInterval(() => {
      fetchChartData(selectedCoin, selectedPeriod);
    }, 60000); // Update every 60 seconds

    return () => clearInterval(interval);
  }, [selectedCoin, selectedPeriod]);

  const handleCoinChange = (event) => {
    setSelectedCoin(event.target.value);
  };

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
  };

  const handleCardClick = (coinId) => {
    setSelectedCoin(coinId);
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="container-fluid h-100 dashboard-container">
      <div className='sidebar'>
        <Profile />
      </div>
      <div className="row page_content">
        <div className="col-12 mt-2">
          <div className="row mt-4 px-4">
            {loading ? (
              <div className="loading-container">
                <div className="loading">Loading...</div>
              </div>
            ) : (
              <Slider {...sliderSettings}>
                {coinData.map(coin => (
                  <div className="col-12" key={coin.id} onClick={() => handleCardClick(coin.id)}>
                    <div className="card mb-4 crypto-card">
                      <div className="card-body">
                        <h5 className="card-title">{coin.name}</h5>
                        <p className="card-text">Current Price: ${coin.market_data.current_price.usd}</p>
                        <p className="card-text">Market Cap: ${coin.market_data.market_cap.usd}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            )}
            <div className="col-12 mt-4">
              {chartData && (
                <div className="card chart-card">
                  <div className="card-body">
                    <div className="row mb-3">
                      <div className="col-6">
                        <select className="form-select" value={selectedCoin} onChange={handleCoinChange}>
                          <option value="bitcoin">BTC - Bitcoin</option>
                          <option value="ethereum">ETH - Ethereum</option>
                          <option value="litecoin">LTC - Litecoin</option>
                          <option value="cardano">ADA - Cardano</option>
                          <option value="ripple">XRP - Ripple</option>
                          <option value="bitcoin-cash">BCH - Bitcoin Cash</option>
                          <option value="binancecoin">BNB - Binance Coin</option>
                        </select>
                      </div>
                      <div className="col-6">
                        <ButtonGroup>
                          {['1', '7', '30', '365', 'max'].map(period => (
                            <Button
                              key={period}
                              variant={selectedPeriod === period ? 'primary' : 'outline-primary'}
                              onClick={() => handlePeriodChange(period)}
                            >
                              {period === '1' ? '24h' : period === '7' ? '7d' : period === '30' ? '30d' : period === '365' ? '1y' : 'All Time'}
                            </Button>
                          ))}
                        </ButtonGroup>
                      </div>
                    </div>
                    <div className="chart-container">
                      <Line
                        data={chartData}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          scales: {
                            x: {
                              type: 'time',
                              time: {
                                unit: getTimeUnit(selectedPeriod)
                              },
                              title: {
                                display: true,
                                text: 'Date'
                              }
                            },
                            y: {
                              title: {
                                display: true,
                                text: 'Price (USD)'
                              },
                              beginAtZero: false
                            }
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Dashboard;
