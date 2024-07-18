import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '@/App.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { IUser } from '@/configs/types/User';
import registerUser from '@/api/login/login';
import { Button } from '@mui/material';

const Register = () => {
  const [fname, setFname] = useState<string>('');
  const [lname, setlname] = useState<string>('');
  const [username, setUserName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();
  // useEffect(registerUser(),[])
  const handleRegister = async () => {
    const userObj: IUser = {
      firstName: fname,
      lastName: lname,
      username: username,
      email: email,
      password: password,
    };
    console.log(userObj);
    const res = await registerUser(userObj);
    if (res.status !== 200) clearInputFields();
    navigate('/');
  };

  /**
   * Clear Input Fields
   */
  const clearInputFields = () => {
    setFname('');
    setlname('');
    setUserName('');
    setEmail('');
    setPassword('');
  };
  return (
    <>
      <div className="flex h-full flex-wrap content-center justify-center">
        <div className="m-3 w-full">
          <h1 className="text-bold text-3xl text-primary-600">FinTracker</h1>
          <p className="text-neutral-600">
            Register to keep track of your finances!
          </p>
        </div>
        <Box
          className="gap flex w-1/2 flex-wrap gap-3"
          component="form"
          noValidate
          autoComplete="off"
        >
          <TextField
            className="w-1/2 flex-auto"
            required
            onChange={(e: any) => {
              setFname(e.target.value);
            }}
            id="outlined-required"
            label="First Name"
            value={fname}
          />

          <TextField
            className="w-1/2 flex-auto"
            required
            id="outlined-required"
            label="Last Name"
            onChange={(e: any) => {
              setlname(e.target.value);
            }}
            value={lname ?? ''}
          />

          <TextField
            className="w-1/2 flex-auto"
            required
            id="outlined-required"
            label="User Name"
            onChange={(e: any) => {
              setUserName(e.target.value);
            }}
            value={username ?? ''}
          />

          <TextField
            className="w-1/2 flex-auto"
            required
            id="outlined-required"
            label="Email"
            onChange={(e: any) => {
              setEmail(e.target.value);
            }}
            value={email ?? ''}
          />

          <TextField
            className="w-1/2 w-full"
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
            Register User
          </Button>
        </Box>
      </div>
    </>
  );
};

export default Register;
