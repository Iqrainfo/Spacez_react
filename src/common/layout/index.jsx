import React from 'react';
import './Layout.css'
import Header from '../header';
const DefaultLayout = ({ children }) => {

  return (
    <>
      <div id='mastheader'>
        <Header />
      </div>
      <main className='main_container'>{children}</main>
    </>
  );
};

export default DefaultLayout;
