import { Outlet } from 'react-router-dom';

import Navbar from './views/navigation/Navbar';
function App() {
  return (
    <>
      <div className="bg-primary-900 w-screen h-screen">
        <Navbar />
        <div>
          {/* Child components are injected here */}
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default App;
