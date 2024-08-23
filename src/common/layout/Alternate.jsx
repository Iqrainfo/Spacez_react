import React from 'react';
import Header from '../header';
import './Layout.css'
import PageSidebar from '../../components/sidebar/Sidebar';


const AlternateLayout = ({ children }) => {
  return (
    <div >
      <div id='mastheader'>
        <Header />
      </div>
      <div className='contain_sidebar'>
        <PageSidebar />
        <main className='main_container_sidebar'>{children}</main>
      </div>
    </div>
  );
};

export default AlternateLayout;
