import { Outlet } from 'react-router-dom';
import SideBar from './views/navigation/SideBar';
import { useEffect } from 'react';
import {useAppContext} from '@/context/AppContextProvider';

function App() {
  const {screenSize, setScreenSize} = useAppContext();
  useEffect(()=> {
    const handleResize = () => {
      return setScreenSize(window.innerWidth)
    };
    window.addEventListener('resize', handleResize)
    handleResize();
    console.log(screenSize)

    return () => window.removeEventListener('resize', handleResize);
  },[screenSize])

  return (
    <>
      <div className="flex h-screen w-screen">
          <SideBar />
      <div className="flex-1 bg-neutral-50">
          <Outlet />
      </div>
      </div>
    </>
  );
}

export default App;
