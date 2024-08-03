import { Outlet } from 'react-router-dom';

import Navbar from './views/navigation/Navbar';
function App() {
  return (
    <>
      <div className="px-44 py-3">
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
