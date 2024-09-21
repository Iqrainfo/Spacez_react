import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/Dashboard.css';
import 'chartjs-adapter-date-fns';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Profile from '../../components/profile/Profile';

Chart.register(...registerables);

const API_URL = 'https://api.coingecko.com/api/v3/';

const Dashboard = () => {
  const [coinData, setCoinData] = useState([]);
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [selectedCoin, setSelectedCoin] = useState('bitcoin');
  const [selectedPeriod, setSelectedPeriod] = useState('7');
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const cardsPerPage = 4; // Number of coin cards per slide

  // Fetch coin data
  const fetchCoinData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}coins/markets`, {
        params: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          per_page: 50,
          page: 1,
        },
      });
      const data = response.data;
      setCoinData(data);
      setFilteredCoins(data);
    } catch (error) {
      console.error('Error fetching coin data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch chart data for selected coin
  const fetchChartData = async (coin, period) => {
    try {
      const response = await axios.get(`${API_URL}coins/${coin}/market_chart`, {
        params: {
          vs_currency: 'usd',
          days: period,
        },
      });
      const prices = response.data.prices.map((price) => ({
        x: new Date(price[0]),
        y: price[1],
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
          },
        ],
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

  const handleCoinChange = (coinId, coinIndex) => {
    setSelectedCoin(coinId);

    // Calculate the page containing the clicked card and set it as the current page
    const pageIndex = Math.floor(coinIndex / cardsPerPage);
    setCurrentPage(pageIndex);
  };

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    const filtered = coinData.filter((coin) =>
      coin.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredCoins(filtered);
    setCurrentPage(0); // Reset to the first page when searching
  };

  // Handle changing the current page of coin cards
  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  // Pagination logic: split the filtered coins into pages
  const paginatedCoins = [];
  for (let i = 0; i < filteredCoins.length; i += cardsPerPage) {
    paginatedCoins.push(filteredCoins.slice(i, i + cardsPerPage));
  }

  // Automatically change pages every 30 seconds
  useEffect(() => {
    const autoSlide = setInterval(() => {
      setCurrentPage((prevPage) =>
        prevPage === paginatedCoins.length - 1 ? 0 : prevPage + 1
      );
    }, 10000); // 10 seconds interval

    return () => clearInterval(autoSlide); // Cleanup interval on component unmount
  }, [paginatedCoins.length]);

  return (
    <div className="container-fluid h-100 dashboard-container">
      <Profile />
      <div className="page_content" style={{ paddingTop: "30px" }}>
        {loading ? (
          <div className="loading-container">
            <div className="loading">Loading...</div>
          </div>
        ) : (
          <>
            {/* Search Bar */}
            <div className="search-bar-container">
              <input
                type="text"
                className="search-bar"
                placeholder="Search here for coin..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>

            {/* Coin Cards Section */}
            <div className="crypto-card-container mb-4">
              {paginatedCoins.length > 0 &&
                paginatedCoins[currentPage].map((coin, index) => (
                  <div
                    key={coin.id}
                    className="card crypto-card"
                    onClick={() => handleCoinChange(coin.id, index + currentPage * cardsPerPage)}
                  >
                    <div className="card-body-slider d-flex align-items-center">
                      <img src={coin.image} alt={coin.name} className="coin-logo" />
                      <h5 className="card-title-h">{coin.name}</h5>
                    </div>
                    <div className="card-body-slider">
                      <p className="card-text-price">Price: ${coin.current_price}</p>
                      <p className="card-text-marketcap">
                        Market Cap: ${coin.market_cap.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
            </div>

            {/* Dot Slider */}
            <div className="dot-slider-container">
              {paginatedCoins.map((_, index) => (
                <span
                  key={index}
                  className={`dot ${index === currentPage ? 'active' : ''}`}
                  onClick={() => handlePageChange(index)}
                />
              ))}
            </div>

            {/* Chart Section */}
            <div className="chart-section mt-4">
              {chartData && (
                <div className="card chart-card">
                  <div className="card-body">
                    <ButtonGroup className="mb-3">
                      {['1', '7', '30', '365', 'max'].map((period) => (
                        <Button
                          key={period}
                          variant={
                            selectedPeriod === period ? 'primary' : 'outline-primary'
                          }
                          onClick={() => handlePeriodChange(period)}
                        >
                          {period === '1'
                            ? '24h'
                            : period === '7'
                              ? '7d'
                              : period === '30'
                                ? '30d'
                                : period === '365'
                                  ? '1y'
                                  : 'All Time'}
                        </Button>
                      ))}
                    </ButtonGroup>
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
                                unit: getTimeUnit(selectedPeriod),
                              },
                              title: {
                                display: true,
                                text: 'Date',
                              },
                            },
                            y: {
                              title: {
                                display: true,
                                text: 'Price (USD)',
                              },
                              beginAtZero: false,
                            },
                          },
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
