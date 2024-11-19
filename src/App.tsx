import { NavBar } from '@/views/navigation/NavBar';
import { userWalletsQuery } from './views/wallet/Wallet';
import { QueryClient } from '@tanstack/react-query';
import { LoaderFunctionArgs, Outlet } from 'react-router-dom';

export const loader =
  (queryClient: QueryClient) =>
  async ({ request }: LoaderFunctionArgs) => {
    await queryClient.ensureQueryData(userWalletsQuery());

    const url = new URL(request.url);
    return url;
  };

function App() {
  console.log("APP RENDERED")
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
