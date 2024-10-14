import { Outlet } from 'react-router-dom';

import Navbar from './views/navigation/Navbar';
function App() {
  return (
    <>
      <div className="w-screen h-screen flex">
        <Navbar />
        <div className='flex-1 bg-neutral-50'>
          {/* Child components are injected here */}
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default App;
