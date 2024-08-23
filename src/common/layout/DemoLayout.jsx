import React from 'react';
import './Layout.css'
import Header from '../header';
import PageSidebar from '../../components/sidebar/Sidebar';
const DemoLayout = ({ children }) => {

    return (
        < >
            <div id='mastheader'>
                <Header />
            </div>
            <main className='main_container'>{children}</main>
        </>
    );
};

export default DemoLayout;
