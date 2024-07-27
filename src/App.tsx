import { Outlet } from 'react-router-dom';

import Navbar from './views/navigation/Navbar';
function App() {
  return (
    <>
      <Navbar />
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default App;
