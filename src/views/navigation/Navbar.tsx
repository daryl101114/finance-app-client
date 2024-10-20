import { Sidebar, SidebarItem } from '@/components/ui/sidebar';
import {
  WalletMinimalIcon,
  HandCoinsIcon,
  ReceiptTextIcon,
} from 'lucide-react';

const Navbar = () => {
  return (
    <>
      <Sidebar>
        <SidebarItem
          icon={<WalletMinimalIcon />}
          text="WALLETS"
          active={false}
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
