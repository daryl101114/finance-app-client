import { Outlet } from 'react-router-dom';
// import SideBar from './views/navigation/SideBar';
import { NavBar } from '@/views/navigation/NavBar';
import { useEffect } from 'react';
import { useAppContext } from '@/context/AppContextProvider';

function App() {
  const { screenSize, setScreenSize } = useAppContext();
  useEffect(() => {
    const handleResize = () => {
      return setScreenSize(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [screenSize]);

  return (
    <>
      {/* <SideBar /> */}
      <div className="flex h-14 w-full">
        <NavBar />
      </div>

      {/* <div className="flex-1 bg-neutral-50">
          <Outlet />
      </div> */}
    </>
  );
}

export default App;
