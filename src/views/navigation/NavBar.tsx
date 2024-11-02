
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { AlignJustifyIcon } from 'lucide-react';
import { lazy } from 'react';
import SideBar from './SideBar';

export const NavBar = () => {
  return (
    <>
      <span className="flex items-center">
        <Drawer direction="left">
          <DrawerTrigger asChild>
            <AlignJustifyIcon className="mx-4" />
          </DrawerTrigger>
          <DrawerContent className="right-[200px] sm:right-[70%] md:right-[80%]  h-full">
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
        <img
          className="w-7 overflow-hidden transition-all"
          src="../../public/5.svg"
        />
        <p className="w-15 overflow-hidden text-2xl font-medium text-primary transition-all">Budgify</p>
      </span>
    </>
  );
};
