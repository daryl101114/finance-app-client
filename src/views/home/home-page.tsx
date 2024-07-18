import { useState, useEffect } from 'react';
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import '@/App.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import { IUser } from '../../configs/types/User';
import registerUser from '../../api/login/login';
import { Button } from '@mui/material';

const HomePage = () => {
  // const [fname, setFname] = useState<string>("");
  // const [lname, setlname] = useState<string>("");
  const [username, setUserName] = useState<string>('');
  // const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();
  // useEffect(registerUser(),[])
  const handleRegister = async () => {
    const userObj: IUser = {
      username: username,
      password: password,
    };
    console.log(userObj);
    const res = await registerUser(userObj);
    if (res.status !== 200) clearInputFields();
  };

  const handleRedirect = () => {
    navigate('/register-user');
  };
  /**
   * Clear Input Fields
   */
  const clearInputFields = () => {
    // setFname("")
    // setlname("")
    setUserName('');
    // setEmail("")
    setPassword('');
  };
  return (
    <>
      <div className="flex h-full flex-wrap content-center justify-center bg-neutral-100">
        <div className="m-3 w-full">
          <h1 className="text-bold text-3xl text-primary-600">FinTracker</h1>
        </div>
        <Box
          className="gap flex w-1/2 flex-wrap gap-3"
          component="form"
          noValidate
          autoComplete="off"
        >
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
            className="w-full"
            variant="contained"
          >
            Login User
          </Button>
          <Button onClick={handleRedirect} className="w-full">
            Register User
          </Button>
        </Box>
      </div>
    </>
  );
};

export default HomePage;
