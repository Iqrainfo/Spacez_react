import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css'

const CustomNavLink = ({ to, children, disabled, ...rest }) => {
  if (disabled) {
    return <span className="nav_link_disable">{children}</span>;
  }

  return <NavLink  to={to} {...rest}>{children}</NavLink>;
};

export default CustomNavLink;
