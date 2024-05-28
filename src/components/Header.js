import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './../utils/api';
import { Button } from 'react-bootstrap/Button';

export default function Header({ children }) {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState();
  const [loginState, setLoginState] = useState(false);

  const getUserInfo = async () => {
    const info = await api.get('/user/me');
    if (info.data) {
      setLoginState(true);
      setUserInfo(info.data.data);
    } else {
      setLoginState(false);
      setUserInfo();
    }
  };

  const onLogout = async () => {
    const logout = await api.get('/user/logout');
    if (logout.status === 200) navigate('/');
  };

  useEffect(() => {
    getUserInfo();
  }, [window.location]);

  return (
    <div className='headerWrapper'>
      <div className='header'>
        <button className='headerbtn' onClick={() => navigate('/')}>
          홈
        </button>

        {userInfo ? (
          <div className='headerloginbox'>
            <div>{userInfo && userInfo.name}님 반갑습니다.</div>
            <button className='headerbtn' onClick={onLogout}>
              로그아웃
            </button>
          </div>
        ) : (
          <div className='headerloginbox'>
            <button className='headerbtn' onClick={() => navigate('/login')}>
              로그인
            </button>
            <button className='headerbtn' onClick={() => navigate('/register')}>
              회원가입
            </button>
          </div>
        )}
      </div>
      <div className='content'>{children}</div>
    </div>
  );
}
