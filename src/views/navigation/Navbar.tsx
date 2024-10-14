import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Sidebar, SidebarItem } from '@/components/ui/sidebar';
import {
  WalletMinimalIcon,
  HandCoinsIcon,
  ReceiptTextIcon,
} from 'lucide-react';
import Icon from '@/components/ui/icon';
import { ColorWheelIcon } from '@radix-ui/react-icons';
import EmojiPicker from '@/components/ui/emojiPicker';

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
      <Sidebar>
        <SidebarItem
          icon={<WalletMinimalIcon />}
          text="WALLETS"
          active={true}
          navigateTo="/Wallets"
        ></SidebarItem>
        <SidebarItem
          icon={<HandCoinsIcon />}
          text="BUDGETS"
          active={false}
          navigateTo="/Budgets"
        ></SidebarItem>
        <SidebarItem
          icon={<ReceiptTextIcon />}
          text="EXPENSES"
          active={false}
          navigateTo="/Expense"
        ></SidebarItem>
      </Sidebar>
    </>
  );
};

export default Navbar;
