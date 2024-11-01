import { Sidebar, SidebarItem } from '@/components/ui/sidebar';
import {
  WalletMinimalIcon,
  HandCoinsIcon,
  ReceiptTextIcon,
} from 'lucide-react';
import { useEffect } from 'react';
import { useAppContext } from '@/context/AppContextProvider';
import { useLocation } from 'react-router-dom';

const SideBar = () => {
const {activeSideBarItem, setActiveSidebarItem} = useAppContext();

//We're using the url ton determine which sidebar item to set active
const location = useLocation();
useEffect(()=>{
  setActiveSidebarItem(location.pathname)
},[location.pathname])

const pages = [{
  iconElement:<WalletMinimalIcon />,
  text: 'WALLETS',
  navigateEndpoint: '/Wallets'
},
{
  iconElement:<HandCoinsIcon />,
  text: 'BUDGETS',
  navigateEndpoint: '/Budgets'
},{
  iconElement:<ReceiptTextIcon />,
  text: 'EXPENSES',
  navigateEndpoint: '/Expense'
}
]
  return (
    <>
      <Sidebar>
      {
        pages.map((item) => (
          <SidebarItem
            key={item.navigateEndpoint} // adding a unique key prop if `navigateEndpoint` is unique
            icon={item.iconElement}
            text={item.text}
            active={activeSideBarItem === item.navigateEndpoint}
            navigateTo={item.navigateEndpoint}
          />
        ))
      }
      </Sidebar>
    </>
  );
};

export default SideBar;
