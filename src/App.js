
import React from 'react';
import {
  // BrowserRouter , 
  HashRouter as Router
} from "react-router-dom";
import AppRoutes from './common/routes';





function App() {
  return (
    <div className="App">
      <Router >
        {/* <NavigationBar navLinks={navLinks} logo={logo} /> */}
        <AppRoutes />
      </Router>
    </div>
  );
}

export default App;
