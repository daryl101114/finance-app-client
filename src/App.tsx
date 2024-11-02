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
      <div className="flex h-[7vh] w-full">
        <NavBar />
      </div>
      <article className="flex min-h-[93vh] justify-center bg-neutral-50">
        <section className="min-w-[390px] max-w-[80%] flex-1">
          <Outlet />
        </section>
      </article>
    </>
  );
}

export default App;
