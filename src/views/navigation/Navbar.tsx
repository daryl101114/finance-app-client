import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from '../../hooks/useAuth';
import {
  MenuItem,
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const navigateTo = (endpoint: string): void => {
    navigate(`/${endpoint}`);
  };

  const handleLogout = () => {
    logout();
    navigateTo('login');
  };
  return (
    <>
      <div>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar
            position="static"
            className="rounded-full"
            sx={{ bgcolor: 'primary.light' }}
          >
            <Toolbar>
              <MenuItem
                onClick={() => navigateTo('')}
                sx={{ py: '6px', px: '12px' }}
              >
                <Typography variant="body2" color="">
                  FinTracker
                </Typography>
              </MenuItem>
              <MenuItem
                onClick={() => navigateTo('dashboard')}
                sx={{ py: '6px', px: '12px' }}
              >
                <Typography variant="body2" color="">
                  Expenses
                </Typography>
              </MenuItem>
              <MenuItem
                onClick={() => navigateTo('other-features')}
                sx={{ py: '6px', px: '12px' }}
              >
                <Typography variant="body2" color="">
                  Other
                </Typography>
              </MenuItem>

              <Button color="inherit" onClick={handleLogout}>
                logout
              </Button>
            </Toolbar>
          </AppBar>
        </Box>
      </div>
    </>
  );
};

export default Navbar;
