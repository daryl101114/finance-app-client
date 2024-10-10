import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ILoginUser } from '../../configs/types/User';
import { loginUser } from '../../api/login/login';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
    <div className='grid grid-cols-2'>
        <div className="bg-neutral-100">
          <div className='h-lvh p-5 flex flex-col justify-center items-center'>
            <div className='text-2xl text-primary-900 font-medium w-full '>Budgify</div>
            <img
              className="h-auto w-full"
              src="../../../public/money-investment.svg"
              alt="Money Invest"
            />
          <div className='text-lg text-primary-900 font-medium'>"You're friendly neighborhood Budgetting App"</div>
          </div>
        
        </div>
        <div className="flex h-lvh flex-col items-center justify-center gap-2 ">
              <span className="font-medium text-4xl text-primary-900">Login</span>
              <span className="text-lg font-medium text-neutral-600">
                Continue your financial journey!
              </span>
              {/* <div className='w-full'>
              <Input type="email" placeholder="Email" />
              </div> */}
              <form onSubmit={()=>{}}>
        <div className="grid gap-2">
          <div className="grid gap-1 w-80">
            {/* <Label className="sr-only" htmlFor="email">
              Email
            </Label> */}
            <Input
              id="email"
              placeholder="Email"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={false}
            />
          </div>
          {/* <Button disabled={false}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In with Email
          </Button> */}
        </div>
      </form>
        </div>
    </div>

      {/* <div className="grid grid-cols-2">
        <div className="bg-primary-100">
          <img
            className="h-lvh w-full"
            src="../../../public/money-investment.svg"
            alt="Money Invest"
          />
        </div>
        <div className="flex h-full flex-wrap content-center justify-center border-solid border-neutral-500 border-l-4 border-r-0 border-t-0 border-b-0"> */}
          {/* <div className="flex w-full justify-center">
            
          </div> */}
          {/* <Box
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
          </Box> */}
        {/* </div>
      </div> */}

      {/*  */}
    </>
  );
};

export default Login;
