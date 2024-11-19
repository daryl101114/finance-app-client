import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { AlignJustifyIcon } from 'lucide-react';
import SideBar from './SideBar';
import AddTransactionModal from '@/components/modals/AddTransaction';
import { useTransactionCategoriesQuery } from '../wallet/components/Transactions';
export const NavBar = () => {
  const { data: transactionCategories } = useTransactionCategoriesQuery()
  return (
    <>
    <div className='flex justify-between items-center w-full px-5'>
      <span className="flex items-center gap-3">
        <Drawer direction="left">
          <DrawerTrigger asChild>
            <AlignJustifyIcon className="hover:bg-neutral-100  rounded" />
          </DrawerTrigger>
          <DrawerContent className="right-[200px] h-full sm:right-[70%] md:right-[80%]">
            <DrawerHeader>
              <DrawerTitle className="flex items-center text-neutral-900">
                <span className="flex">
                  <img
                    className="w-7 overflow-hidden transition-all"
                    src="../../public/5.svg"
                  />
                  <span className="w-15 overflow-hidden text-3xl font-medium text-primary transition-all">
                    Budgify
                  </span>
                </span>
              </DrawerTitle>
              <DrawerDescription></DrawerDescription>
            </DrawerHeader>
            <SideBar />
          </DrawerContent>
        </Drawer>
        <p className="w-15 overflow-hidden text-2xl font-medium text-primary transition-all">
          Budgify
        </p>
      </span>
      <div>
      <AddTransactionModal transactionCategories={transactionCategories || []}/>
      </div>
    </div>
    </>
  );
};
