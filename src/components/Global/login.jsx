import React, { useRef, useState } from 'react';
import '../../styles/login.css';
import { useNavigate } from "react-router-dom";
import Loader from './Loader';
import herologo from '../../assets/logo/logo.jpg';
import { Toast } from 'primereact/toast';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userIdentity, setUserIdentity] = useState('');
  const [showSignIn, setShowSignIn] = useState(true);
  const [loading, setLoading] = useState(false);
  const toast = useRef(null);
  const [showOTPInput, setShowOTPInput] = useState(false);
  const [otpValue, setOtpValue] = useState(['', '', '', '', '', '']);

  const handleEmailChange = (e) => {
    setUserEmail(e.target.value);
  }
  
  const handlePasswordChange = (e) => {
    setUserPassword(e.target.value);
  }
  const handleNameChange = (e) => {
    setUserName(e.target.value);
  }
  const handlePhoneChange = (e) => {
    setUserPhone(e.target.value);
  }
  const handleIdentityChange = (e) => {
    setUserIdentity(e.target.value);
  }

  const handleOtpChange = (e, index) => {
    const newOtpValue = [...otpValue];
    newOtpValue[index] = e.target.value;
    setOtpValue(newOtpValue);

    if (e.target.value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    } else if (e.target.value === '' && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
      }
    }
  }

  const handleLogin = (user) => {
    sessionStorage.setItem('UserName', user.name);
    navigate("/home");
  };

  const onSubmitForm = async () => {
    if (!showOTPInput && userEmail.trim() !== '' && userPassword.trim() !== '') {
      setLoading(true);
      try {
        const response = await axios.post('https://spacez.onrender.com/login', {
          username: userName,
          email: userEmail,
          password_hash: userPassword
        });

        if (response.data) {
          setLoading(false);
          showWarn('Please enter OTP.');
          setShowOTPInput(true);
        }
      } catch (error) {
        setLoading(false);
        showError('Login failed. Please check your credentials.');
      }
    } else if (showOTPInput && otpValue.join('').length === 6) {
      if (otpValue.join('') === '123456') {
        showSuccess('Sign in successful!');
        setTimeout(() => {
          handleLogin({ name: userName }); // Handle login here
        }, 2000);
      } else {
        showError('Please enter correct OTP.');
      }
    } else {
      showError('Please enter email and password.');
    }
  }

  const onSubmitFormReg = async () => {
    if (!showOTPInput && userName.trim() !== '' && userPhone.trim() !== '') {
      setLoading(true);
      try {
        const response = await axios.post('https://spacez.onrender.com/insert-data/', {
          username: userName,
          email: userEmail,
          password_hash: userPassword,
          mobile_number: userPhone,
          identity_card_no: userIdentity,
          issuing_authority: 'Some Authority1',
          kyc_done: false,
          id_created_on: '2024-06-08',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          last_login: new Date().toISOString(),
        });
  
        if (response.data) {
          setLoading(false);
          showWarn('Please enter OTP.');
          setShowOTPInput(true);
        }
      } catch (error) {
        setLoading(false);
        showError('Registration failed. Please try again.');
      }
    } else if (showOTPInput && otpValue.join('').length === 6) {
      if (otpValue.join('') === '123456') {
        showSuccess('Sign up successful!');
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        showError('Please enter correct OTP.');
      }
    } else {
      showError('Please enter name and phone.');
    }
  }
  

  const toggleForm = () => {
    setShowSignIn(!showSignIn);
  }

  const showSuccess = (data) => {
    toast.current.show({ severity: 'success', summary: 'Success', detail: data, life: 3000 });
  }

  const showWarn = (data) => {
    toast.current.show({ severity: 'warn', summary: 'Warning', detail: data, life: 3000 });
  }

  const showError = (data) => {
    toast.current.show({ severity: 'error', summary: 'Error', detail: data, life: 3000 });
  }

  return (
    <div className="two-part-page">
      {/* Left side part */}
      <div className="left-side">
        <img src={herologo} alt="suvidha logo" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Right side part */}
      <div className="right-side">
        {/* For Sign-in */}
        {showSignIn ? (
          <div className="sign-in-form">
            <label className='label2' htmlFor="user">Sign-In</label>
            <label className='label3' htmlFor="user">Name</label>
            <input type="text" id="user" className='input_box ' name="user" placeholder='Enter your name'
              value={userName} onChange={handleNameChange}
            />
            <label className='label3' htmlFor="user">Email</label>
            <input type="text" id="user" className='input_box ' name="user" placeholder='Enter your email'
              value={userEmail} onChange={handleEmailChange}
            />
            <label className='label3' htmlFor="password">Password</label>
            <input type="password" className='input_box ' id="password" name="password" placeholder='password'
              value={userPassword} onChange={handlePasswordChange}
            />

            {showOTPInput && ( // Render OTP input if showOTPInput is true
              <>
                <label className='label3'>OTP</label>
                <div style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
                  {otpValue.map((value, index) => (
                    <input
                      style={{ width: 30, height: 30, fontSize: 18, textAlign: 'center' }}
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      className='input_box'
                      maxLength={1}
                      value={value}
                      onChange={(e) => handleOtpChange(e, index)}
                    />
                  ))}
                </div>
              </>
            )}

            <div className="row-container">
              <input type="checkbox" id="rememberMe" name="rememberMe" style={{ marginRight: '5px' }} />
              <label className='remeb' htmlFor="rememberMe">Remember me</label>
              <label className='forgot_password' onClick={toggleForm}>Sign up?</label>
            </div>

            <button className="sign" type="submit" onClick={onSubmitForm}>Sign In</button>
          </div>
        ) : (
          /* For Sign-up */
          <div className="sign-in-form">
            <label className='label4' htmlFor="user">Sign-Up</label>
            <label className='label3' htmlFor="user">Name</label>
            <input type="text" id="user" className='input_box' name="user" placeholder='Enter your name'
              value={userName} onChange={handleNameChange}
            />
            <label className='label3' htmlFor="user">Email</label>
            <input type="text" id="user" className='input_box' name="user" placeholder='Enter your email'
              value={userEmail} onChange={handleEmailChange}
            />
            <label className='label3' htmlFor="user">Password</label>
            <input type="password" id="password" className='input_box' name="password" placeholder='password'
              value={userPassword} onChange={handlePasswordChange}
            />
            <label className='label3' htmlFor="user">Phone Number</label>
            <input type="text" id="phone" className='input_box' name="phone" placeholder='Enter your phone'
              value={userPhone} onChange={handlePhoneChange}
            />
            <label className='label3' htmlFor="identity">Identity No</label>
            <input type="text" id="identity" className='input_box' name="identity" placeholder='Enter your PAN'
              value={userIdentity} onChange={handleIdentityChange}
            />

            {showOTPInput && ( // Render OTP input if showOTPInput is true
              <>
                <label className='label3'>OTP</label>
                <div style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
                  {otpValue.map((value, index) => (
                    <input
                      style={{ width: 30, height: 30, fontSize: 18, textAlign: 'center' }}
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      className='input_box'
                      maxLength={1}
                      value={value}
                      onChange={(e) => handleOtpChange(e, index)}
                    />
                  ))}
                </div>
              </>
            )}

            <div className="row-container">
              <label className='remeb' htmlFor="rememberMe">Do you want to sigin??</label>
              <label className='forgot_password' onClick={toggleForm}>Sign In?</label>
            </div>

            <button className="sign" type="submit" onClick={onSubmitFormReg}>Sign Up</button>
          </div>
        )}

        <Toast ref={toast} position="top-right" />
        {loading && <Loader />}
      </div>
    </div>
  );
};

export default Login;
