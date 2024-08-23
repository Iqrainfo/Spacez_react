import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DefaultLayout from '../layout';
import Workflow from '../../module/trade/Dashboard';
import IDTServices from '../../module/home/Dashboard';
import Login from '../../components/Global/login'
import Home from '../../module/home/Dashboard';
import Trade from '../../module/trade/Dashboard';
import Support from '../../module/support/Support';
import Buy from '../../components/buyInfo/buyInfo';
import Sell from '../../components/sellInfo/sellInfo';


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />

      {/* trade routes */}
      <Route
        path="/trade"
        element={<DefaultLayout><Trade /></DefaultLayout>}
      />

      {/* home routes */}
      <Route
        path="/home"
        element={<DefaultLayout><Home /></DefaultLayout>}
      />

      {/* home routes */}
      <Route
        path="/support"
        element={<DefaultLayout><Support /></DefaultLayout>}
      />

      <Route path="/buy"
        element={<DefaultLayout><Buy /></DefaultLayout>} />
      <Route path="/sell"
        element={<DefaultLayout><Sell /></DefaultLayout>} />
    </Routes>


  );
};

export default AppRoutes;

