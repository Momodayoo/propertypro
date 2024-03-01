import React from 'react';
import Login from '../../features/AuthManager/components/Login/Login';
import logo from '../../images/logo.png';

const LoginPage = () => {
  return (
    <div style={{ position: 'relative' }}>
      {/* Background Logo */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1 }}>
        <img src={logo} alt="Background Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, paddingTop: '50px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <img src={logo} alt="Logo" style={{ width: '300px', height: '300px' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
            <h1><Login/></h1>
            </div>
      </div>
    </div>
    );
}

export default LoginPage;