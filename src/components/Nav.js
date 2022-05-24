import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './Nav.css';

const Nav = ({ token }) => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [token]);

  return (
    <>
      <div className='navbar'>
        <div id='nav-links'>
          <span>
            <Link to='/posts' style={{ fontSize: '40px' }}>
              Items for Sale
            </Link>
          </span>
          <div>
            {isAuth ? (
              <div style={{ fontSize: '40px' }}>
                <span>
                  <Link to='/posts/new' style={{ fontSize: '40px' }}>
                    Add a Post
                  </Link>
                </span>
                <span>
                  <Link to='/profile' style={{ fontSize: '40px' }}>
                    Profile
                  </Link>
                </span>
                <span>
                  <Link
                    to='/'
                    onClick={() => {
                      localStorage.removeItem('token');
                      setIsAuth(false);
                    }}
                    style={{ fontSize: '40px' }}
                  >
                    Logout
                  </Link>
                </span>
              </div>
            ) : (
              <div>
                <div className='auth'>
                  <span>
                    <Link to='/login' style={{ fontSize: '40px' }}>
                      Login
                    </Link>
                  </span>
                  <span>
                    <Link to='/register' style={{ fontSize: '40px' }}>
                      Register
                    </Link>
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
