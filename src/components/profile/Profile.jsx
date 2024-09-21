import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import '../../styles/Profile.css';
import { Sidenav, Nav, Toggle } from 'rsuite';
import DashboardIcon from '@rsuite/icons/legacy/Dashboard';
import GroupIcon from '@rsuite/icons/legacy/Group';
import MagicIcon from '@rsuite/icons/legacy/Magic';
import GearCircleIcon from '@rsuite/icons/legacy/GearCircle';
import { Modal, Button, Form } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const storedUser = JSON.parse(sessionStorage.getItem('User'));

  // Initial user data
  const initialUserData = {
    photo: '',
    username: storedUser?.username || '',
    email: storedUser?.email || '',
    password: '',
    confirmPassword: '',
    mobile_number: storedUser?.mobile_number || '',
    pan_card: storedUser?.pan_card || '',
  };

  // State hooks
  const [expanded, setExpanded] = useState(true);
  const [activeKey, setActiveKey] = useState('1');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [formData, setFormData] = useState(initialUserData);
  const [preview, setPreview] = useState(initialUserData.photo);
  const [userName, setUserName] = useState(initialUserData.username);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  useEffect(() => {
    if (storedUser) {
      setPreview(storedUser.photo || '');
      setUserName(storedUser.username || '');
      setFormData({
        ...initialUserData,
        username: storedUser.username || '',
        email: storedUser.email || '',
        mobile_number: storedUser.mobile_number || '',
        pan_card: storedUser.pan_card || '',
      });
    }
  }, [storedUser]);

  const handleProfileClick = () => setShowProfileModal(true);
  const handleCloseProfileModal = () => setShowProfileModal(false);

  const handleEditClick = () => setShowEditModal(true);
  const handleCloseEditModal = () => setShowEditModal(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setFormData((prevData) => ({
          ...prevData,
          photo: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('username', formData.username);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('password', formData.password);
    formDataToSend.append('mobile_number', formData.mobile_number);
    formDataToSend.append('pan_card', formData.pan_card);
    if (formData.photo) {
      formDataToSend.append('photo', formData.photo);
    }

    try {
      const response = await fetch('https://spacez.onrender.com/update-data/', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        sessionStorage.setItem('User', JSON.stringify({
          username: formData.username,
          email: formData.email,
          mobile_number: formData.mobile_number,
          pan_card: formData.pan_card,
          photo: formData.photo,
        }));
        setUserName(formData.username);
        handleCloseEditModal();
        alert('Profile updated successfully!');
      } else {
        console.error('Update failed');
        alert('Failed to update profile.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <Sidenav expanded={expanded} defaultOpenKeys={['3', '4']} 
      style={{ height: '100%', width: expanded ? '220px' : '', transition: 'width 0.3s' }}>


        <Sidenav.Body >
          <Nav activeKey={activeKey} onSelect={(eventKey) => {
            setActiveKey(eventKey);
            // Handle navigation here
            if (eventKey === '1') {
              navigate('/home');
            }
            if (eventKey === '2') {
              navigate('/trade');
            }
            if (eventKey === '3') {
              navigate('/support');
            }
          }}>
            <img
              src={preview || 'https://via.placeholder.com/150'}
              className="card-img-top img-fluid"
              alt="User Profile"
              style={{
                borderRadius: '50%',
                width: expanded ? '100px' : '40px',
                height: expanded ? '100px' : '40px',
                objectFit: 'cover',
                display: 'block',
                margin: '0 auto',
                marginTop: '20px'
              }}
              onClick={handleProfileClick}
            />
            <div className="user_name">
              <p>Welcome back</p>
              <h3>{userName}</h3>
            </div>


            <Nav.Item eventKey="1" icon={<DashboardIcon />}>
              Dashboard
            </Nav.Item>
            <Nav.Item eventKey="2" icon={<GroupIcon />}>
              By or Sell

            </Nav.Item>
            <Nav.Item eventKey="3" icon={<GroupIcon />}>
              Help
            </Nav.Item>
            {/* <Nav.Menu placement="rightStart" eventKey="3" title="Advanced" icon={<MagicIcon />}>
              <Nav.Item eventKey="3-1">Geo</Nav.Item>
              <Nav.Item eventKey="3-2">Devices</Nav.Item>
            </Nav.Menu> */}

          </Nav>
        </Sidenav.Body>
        <Sidenav.Toggle onToggle={setExpanded} />
      </Sidenav>

      {/* View Profile Modal */}
      <Modal show={showProfileModal} onHide={handleCloseProfileModal}>
        <Modal.Header closeButton>
          <Modal.Title>User Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <img
              src={preview || 'https://via.placeholder.com/150'}
              alt="User Profile"
              className="img-thumbnail mb-3"
              style={{ width: '150px', height: '150px', objectFit: 'cover' }}
            />
            <h5>{userName || 'User'}</h5>
            <p>Email: {formData.email || 'N/A'}</p>
            <p>Mobile: {formData.mobile_number || 'N/A'}</p>
            <p>PAN Card: {formData.pan_card || 'N/A'}</p>
            <Button variant="primary" onClick={handleEditClick}>
              Edit
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      {/* Edit Profile Modal */}
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="photo">
              <Form.Label>Profile Photo</Form.Label>
              <Form.Control
                type="file"
                name="photo"
                onChange={handleFileChange}
                accept="image/*"
              />
            </Form.Group>

            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="mobile_number">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                type="text"
                name="mobile_number"
                placeholder="+91XXXXXXXXXX"
                value={formData.mobile_number}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="pan_card">
              <Form.Label>PAN Card</Form.Label>
              <Form.Control
                type="text"
                name="pan_card"
                placeholder="XXXXXX1234"
                value={formData.pan_card}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <div className="password-wrapper">
                <Form.Control
                  type={passwordVisible ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <span onClick={() => setPasswordVisible(!passwordVisible)}>
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </Form.Group>

            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <div className="password-wrapper">
                <Form.Control
                  type={confirmPasswordVisible ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <span onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
                  {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update Profile
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Profile;
