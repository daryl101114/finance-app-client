import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { ILoginUser } from '../../configs/types/User';
import { loginUser } from '../../api/login/login';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Login: React.FC = () => {
  const [username, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const { authenticate, isAuthenticated } = useAuth();

  useEffect(() => {
    console.log(isAuthenticated, 'AUTH');
  }, []);

  const handleRegister = async () => {
    const userObj: ILoginUser = {
      username: username,
      password: password,
    };
    const res = await loginUser(userObj);
    if (res.status !== 200) {
      clearInputFields();
      return;
    }
    axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
    localStorage.setItem('token', JSON.stringify(res.data.token));
    localStorage.setItem('isAuthorized', 'true');

    // setting time of when 10 minute session should expire & storing in localStorage
    const now = new Date();
    const accessTokenExpiryTime = new Date(
      now.setMinutes(now.getMinutes() + 9),
    );

    localStorage.setItem(
      'accessTokenExpiryTime',
      JSON.stringify(accessTokenExpiryTime),
    );

    authenticate();
    handleRedirect('/');
    clearInputFields();
  };

  const handleRedirect = (text: string): void => {
    navigate(text);
  };
  /**
   * Clear Input Fields
   */
  const clearInputFields = () => {
    setUserName('');
    setPassword('');
  };
  return (
    <>
      <div className="grid grid-cols-2">
        <div className="bg-primary-100">
          <img
            className="h-lvh w-full"
            src="../../../public/money-investment.svg"
            alt="Money Invest"
          />
        </div>
        <div className="flex h-full flex-wrap content-center justify-center">
          {/* <div className="flex w-full justify-center">
            
          </div> */}
          <Box
            className="gap flex w-1/2 flex-wrap gap-3"
            component="form"
            noValidate
            autoComplete="off"
          >
            <span className="m-0">
              <p className="text-bold text-3xl text-primary-600">FinTracker</p>
              <p className="text-neutral-600">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
            </span>
            <TextField
              className="flex-auto"
              required
              id="outlined-required"
              label="User Name"
              onChange={(e: any) => {
                setUserName(e.target.value);
              }}
              value={username ?? ''}
            />
            <TextField
              className="w-full"
              required
              id="outlined-required"
              label="Password"
              onChange={(e: any) => {
                setPassword(e.target.value);
              }}
              value={password ?? ''}
            />
            <Button
              onClick={handleRegister}
              className="w-full bg-primary-600"
              variant="contained"
            >
              Login User
            </Button>
            <Button
              onClick={() => handleRedirect('/register-user')}
              className="w-full text-primary-600"
            >
              Register User
            </Button>
          </Box>
        </div>
      </div>

      {/*  */}
    </>
  );
};

export default Login;
