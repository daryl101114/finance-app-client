import { useState } from 'react';
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
import AddExpenseModal from '../../components/modals/AddExpenseModal';

const Navbar = () => {
  const [isExpenseModalOpen, setExpenseModalOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();
  /**
   * Redirect user to a given end point
   * @param endpoint
   */
  const navigateTo = (endpoint: string): void => {
    navigate(`/${endpoint}`);
  };
  /**
   * Handle logout on the app
   */
  const handleLogout = () => {
    logout();
    navigateTo('login');
  };

  /**
   * Handle modal close
   */
  const handleModalClose = () => {
    setExpenseModalOpen(false);
  };
  return (
    <>
      <div>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" className="rounded-full bg-primary-400">
            {' '}
            <Toolbar className="flex flex-wrap justify-between">
              <div className="flex flex-wrap">
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
              </div>
              <div className="flex">
                <Button
                  color="inherit"
                  onClick={() => {
                    setExpenseModalOpen(true);
                  }}
                >
                  + Expense
                </Button>
                <Button color="inherit" onClick={handleLogout}>
                  logout
                </Button>
              </div>
            </Toolbar>
          </AppBar>
        </Box>
        <AddExpenseModal
          isOpen={isExpenseModalOpen}
          handleClose={handleModalClose}
        ></AddExpenseModal>
      </div>
    </>
  );
};

export default Navbar;
