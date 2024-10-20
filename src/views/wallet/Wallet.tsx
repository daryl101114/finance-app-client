import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import AddWalletModal from './AddWalletModal';
import { getUserWallets } from '@/api/wallet';
import { IWalletType } from '@/configs/types/Wallet';
import { init } from 'emoji-mart';
import data from '@emoji-mart/data';
import { Button } from '@/components/ui/button';
import { EllipsisVerticalIcon } from 'lucide-react';
import { useQuery, QueryClient } from '@tanstack/react-query';
import { LoaderFunctionArgs, Outlet } from 'react-router-dom';
import { createContext } from 'react';
init({ data });

const userWalletsQuery = () => ({
  queryKey: ['userWallets'],
  queryFn: async () => getUserWallets(),
});

const loader =
  (queryClient: QueryClient) =>
  async ({ request }: LoaderFunctionArgs) => {
    console.log(request);
    await queryClient.ensureQueryData(userWalletsQuery());

    const url = new URL(request.url);
    return url;
  };

export const WalletsContext = createContext<IWalletType[] | undefined>(
  undefined,
);

const Wallet = () => {
  const { data: wallets } = useQuery({
    ...userWalletsQuery(),
  });

  return (
    <>
      <div className="grid h-full grid-cols-3 grid-rows-3 gap-4 p-4">
        <Card className="col-span-1 row-span-3 flex flex-col p-4">
          <CardHeader className="border-b-2">
            <div className="flex items-end justify-between">
              <span className="text-4xl text-primary-900">Wallets</span>
            </div>
          </CardHeader>
          <CardContent className="grow">
            <div className="mt-4 transition ease-in-out">
              {wallets?.map((item: IWalletType) => {
                return (
                  <div
                    key={item.id}
                    className="flex items-end gap-1 rounded-md p-1 transition ease-in-out hover:-translate-y-1 hover:cursor-pointer hover:bg-primary-50"
                  >
                    <em-emoji
                      className="h-12 w-12 rounded-full"
                      id={item.emoji}
                      size="2rem"
                    ></em-emoji>
                    <div className="grow text-xl text-black">
                      {item.accountName}
                    </div>
                    <Button variant="ghost" size="icon">
                      <EllipsisVerticalIcon className="text-neutral-700" />
                    </Button>
                  </div>
                );
              })}
            </div>
          </CardContent>
          <CardFooter className="itmes-center flex w-full justify-center border-t-2 p-4">
            <AddWalletModal />
          </CardFooter>
        </Card>
        <Card className="align-center col-span-2 row-span-1 bg-neutral-50 p-4">
          <CardHeader className=" ">
            <span className="flex w-full justify-center text-4xl text-neutral-800">
              Balance
            </span>
          </CardHeader>
          <CardContent>Under Maintenance</CardContent>
        </Card>
        <WalletsContext.Provider value={wallets}>
          <Card className="align-center bg-neutral-0 col-span-2 row-span-2 flex flex-col p-4">
            <Outlet />
          </Card>
        </WalletsContext.Provider>
      </div>
    </>
  );
};

export { Wallet, loader };
