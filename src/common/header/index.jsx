import React, { useEffect, useState } from 'react';
import logo from '../../assets/logo/logo.jpg';
import logoutLogo from '../../assets/logo/log_2.png';
import suvidhaLogo from '../../assets/logo/logo.jpg';
import './Header.css';
import CustomNavLink from './CustomNavlink';
// import { IoMdLogOut } from "react-icons/io";
import { MdMenu } from "react-icons/md";
import { useNavigate } from "react-router-dom";



const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const isDisabled = true;

  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const closeMenu = () => {
    // setMenuOpen(false);
  };

  const onClickLogout = () => {
    sessionStorage.clear()
    localStorage.clear()

    navigate("/");

  }
  const goDashboard=()=>{
    navigate("/trade");
  }
  useEffect(() => {
    setUserName(sessionStorage.getItem('UserName'))

    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 60000);

    // Clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const options = {
    hour: 'numeric',
    minute: 'numeric',
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  };

  const formattedDateTime = currentDateTime.toLocaleString('en-US', options);

  return (
    < >
      <div className="container-fluid">
        <div className="row mt-1">
          <div className="col-6 col-lg-4 mt-1 d-flex  align-items-center">
            <img className='img_style' alt='pt logo' src={logo} height={44} onClick={goDashboard} />
          </div>
          <div className="col-6 col-lg-4 d-flex  justify-content-center align-items-center">
            <img  src={suvidhaLogo} alt="suvidha logo" width={160} height={50} />
          </div>
          <div className="col-12 col-lg-4 d-flex align-items-center">
            <div className='right-side-item'>
             
                 <button className="menu_button" onClick={toggleMenu}>
                  {/* <MdMenu /> */}
                </button>
                <span className='data_time'>{formattedDateTime.replace(' at', '')}</span> 
                <span className='user_name'> Welcome <br></br> {userName}</span>
                <span className='logout-logo' onClick={onClickLogout}> <img className='log-out-logo' src={logoutLogo} alt="Logout" height={20} /></span>

             
            </div>
          </div>
        </div>

      </div>
      <nav className={`nav_bar ${menuOpen ? 'open' : ''}`}>
        <ul className={`nav_list ${menuOpen ? 'open' : ''}`}>
          <li><CustomNavLink to="/home" className="nav_link" >Home</CustomNavLink></li>
          <li><CustomNavLink to="/trade" className="nav_link" onClick={closeMenu}>Trade</CustomNavLink></li>
          <li><CustomNavLink to="/support" className="nav_link" >Support</CustomNavLink></li>
          

          {/* <li><CustomNavLink to="/travel" disabled={isDisabled} className="nav_link" onClick={closeMenu}>Travel</CustomNavLink></li>
          <li><CustomNavLink to="/hr-services" disabled={isDisabled} className="nav_link" onClick={closeMenu}>HR Services</CustomNavLink></li>
          <li><CustomNavLink to="/project-control" disabled={isDisabled} className="nav_link" onClick={closeMenu}>Project Control</CustomNavLink></li>
          <li><CustomNavLink to="/commercial" disabled={isDisabled} className="nav_link" onClick={closeMenu}>Commercial</CustomNavLink></li> */}
        </ul>
      </nav>
    </>
  );
};

export default Header;
