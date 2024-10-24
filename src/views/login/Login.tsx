import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ILoginUser } from '../../configs/types/User';
import { loginUser } from '../../api/login/login';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { jwtDecode } from 'jwt-decode';
const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const { authenticate } = useAuth();

  // useEffect(() => {
  //   console.log( 'AUTH');

  // }, []);
  interface DecodedTokenType {
    exp?: number | undefined;
    given_name: string;
    family_name: string;
    email: string;
  }
  const handleLogin = async () => {
    const userObj: ILoginUser = {
      email: email,
      password: password,
    };
    const res = await loginUser(userObj);
    if (res.status !== 200) {
      console.log('UNAUTHORIZED');
      clearInputFields();
      localStorage.clear();
      return;
    }

    axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.value}`;
    localStorage.setItem('token', JSON.stringify(res.data.value));
    // localStorage.setItem('isAuthorized', 'true');

    // setting time of when 10 minute session should expire & storing in localStorage
    const decoded: DecodedTokenType = jwtDecode(res.data.value);
    console.log(decoded);
    const exp = decoded.exp || 0;
    const accessTokenExpiryTime = new Date(exp * 1000).toString();

    localStorage.setItem('accessTokenExpiryTime', accessTokenExpiryTime);
    localStorage.setItem(
      'fullName',
      `${decoded['given_name']} ${decoded['family_name']}`,
    );

    localStorage.setItem('email', email);

    authenticate();
    handleRedirect('/');
    clearInputFields();
  };

  const handleRedirect = (text: string): void => {
    console.log('hit', text);
    navigate(text);
  };
  /**
   * Clear Input Fields
   */
  const clearInputFields = () => {
    setEmail('');
    setPassword('');
  };
  return (
    <>
      <div className="grid grid-cols-2">
        <div className="bg-primary-300">
          <div className="flex h-lvh flex-col items-center justify-center gap-12 p-5">
            <div className="flex items-end justify-center text-5xl font-medium text-primary-foreground">
              <img className="mr-2 h-11 w-11" src="../../public/5.svg" />{' '}
              Budgetman
            </div>
            <img
              className="h-auto w-full"
              src="../../../public/money-investment.svg"
              alt="Money Invest"
            />

            <div className="text-4xl font-medium text-primary-foreground">
              "You're friendly neighborhood Budgetting App"
            </div>
          </div>
        </div>
        <div className="flex h-lvh flex-col items-center justify-center gap-3">
          <span className="text-6xl font-medium text-primary">Login</span>
          <span className="text-xl font-medium text-neutral-600">
            Continue your financial journey!
          </span>
          <div className="w-72">
            <Input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="w-72">
            <Input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button
            className="delay-50 text-md flex items-center justify-center bg-primary transition-all duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
            onClick={handleLogin}
          >
            Login User
          </Button>
        </div>
      </div>
    </>
  );
};

export default Login;
