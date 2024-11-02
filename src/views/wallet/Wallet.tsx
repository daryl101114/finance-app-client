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
import { createContext, useEffect, useState } from 'react';
import { getTransactions } from '@/api/transactions';
import { IWalletTransactionType } from '@/configs/types/Transaction';
import { ScrollArea } from '@/components/ui/scroll-area';
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
interface WalletsContextType {
  wallets: IWalletType[];
  walletTransactions: IWalletTransactionType[];
  isDebtAccount: boolean;
}
export const WalletsContext = createContext<WalletsContextType | undefined>(
  undefined,
);

const Wallet = () => {
  const { data: wallets } = useQuery({
    ...userWalletsQuery(),
  });

  const [selectedWallet, setSelectedWalletId] = useState<
    IWalletType | undefined
  >(undefined);
  // const [walletTransactions, setWalletTransactions] = useState<IWalletTransactionType[]>([])

  const { data: walletTransactions } = useQuery({
    queryKey: ['transactions', selectedWallet?.id],
    queryFn: async () => await getTransactions(selectedWallet?.id || ''),
    enabled: !!selectedWallet?.id, // disable this query from automatically running
    refetchOnWindowFocus: false,
  });

  const selectWallet = async (wallet: IWalletType) => {
    setSelectedWalletId(wallet); // Set selected wallet ID when a wallet is selected
  };
  useEffect(() => {
    if (wallets) {
      selectWallet(wallets[0]);
    }
  }, []);
  return (
    <>
      <div className="flex flex-col min-h-[93vh] gap-2 p-4">
        <Card className="align-center bg-neutral-100 p-4">
          <CardHeader className=" ">
            <span className="flex w-full justify-center text-2xl text-primary-900">
              Charts
            </span>
          </CardHeader>
          <CardContent>Maybe a bar chart comparing total credit and debit for each account? </CardContent>
        </Card>
        <div className="flex flex-1 flex-wrap gap-2">
          <Card className=' flex  flex-col w-full md:w-5/12 p-4' >
            <CardHeader className="border-b-2">
              <div className="flex items-end justify-between">
                <span className="text-2xl text-primary-900">Wallets</span>
              </div>
            </CardHeader>
            <CardContent className="grow">
              <ScrollArea>
                <div className="mt-4 transition ease-in-out">
                  {wallets?.map((item: IWalletType) => {
                    return (
                      <div
                        key={item.id}
                        className="flex items-end gap-1 rounded-md p-1 transition ease-in-out hover:-translate-y-1 hover:cursor-pointer hover:bg-primary-50"
                        onClick={() => selectWallet(item)}
                      >
                        <em-emoji
                          className="h-12 w-12 rounded-full"
                          id={item.emoji}
                          size="2rem"
                        ></em-emoji>
                        <div className="grow text-lg text-black text-ellipsis overflow-hidden text-nowrap">
                          {item.accountName}
                        </div>
                        <Button variant="ghost" size="icon">
                          <EllipsisVerticalIcon className="text-neutral-700" />
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            </CardContent>
            <CardFooter className="itmes-center flex w-full justify-center border-t-2 p-4">
              <AddWalletModal />
            </CardFooter>
          </Card>
         <WalletsContext.Provider
          value={{
            wallets: wallets || [],
            walletTransactions: walletTransactions || [],
            isDebtAccount: selectedWallet?.walletType.id === 3,
          }}
        >
          <Card className="align-center flex-1 flex flex-col p-4 ">
            <Outlet />
          </Card>
        </WalletsContext.Provider>
      </div></div>
        
    </>
  );
};

export { Wallet, loader };
