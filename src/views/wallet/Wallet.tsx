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
import { useQuery } from '@tanstack/react-query';
import { Outlet, useOutletContext } from 'react-router-dom';
import { createContext, useMemo, useState } from 'react';
import { getTransactions } from '@/api/transactions';
import { IWalletTransactionType } from '@/configs/types/Transaction';
import { ScrollArea } from '@/components/ui/scroll-area';
init({ data });

export const userWalletsQuery = () => ({
  queryKey: ['userWallets'],
  queryFn: async () => getUserWallets()
});

export const useUserWalletsQuery = () => useQuery({
  ...userWalletsQuery(),
});


interface WalletsContextType {
  isDebtAccount: boolean;
  selectedWallet:IWalletType
}

const Wallet = () => {
  console.log("RERENDER")
  const { data: wallets = [] } = useUserWalletsQuery();
  const [selectedWallet, setSelectedWallet] = useState<IWalletType>(
    wallets[0]
  );

  const selectWallet = async (wallet: IWalletType) => {
    if(selectedWallet?.id !== wallet.id){
      setSelectedWallet(wallet); // Set selected wallet ID when a wallet is selected
    }
  };

  const setActiveWalletStyle = (walletId: string) => {
  const baseStyle = "flex items-end gap-1 rounded-md p-1 transition ease-in-out hover:-translate-y-1 hover:cursor-pointer";
  const activeStyle = selectedWallet?.id === walletId ? "bg-primary-50" : "hover:bg-primary-50";

  return `${baseStyle} ${activeStyle}`;
  };

  return (
    <>
      <div className="flex min-h-[93vh] flex-col gap-2 p-4">
        <Card className="align-center bg-neutral-100 p-4">
          <CardHeader>
            <span className="flex w-full justify-center text-2xl text-primary-900">
              Charts
            </span>
          </CardHeader>
          <CardContent>
            Maybe a bar chart comparing total credit and debit for each account?{' '}
          </CardContent>
        </Card>
        <div className="flex flex-1 flex-wrap gap-2">
          <Card className="flex w-full flex-col p-4 md:w-5/12">
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
                        className={setActiveWalletStyle(item.id)}
                        onClick={() => selectWallet(item)}
                      >
                        <em-emoji
                          className="h-12 w-12 rounded-full"
                          id={item.emoji}
                          size="2rem"
                        ></em-emoji>
                        <div className="grow overflow-hidden text-ellipsis text-nowrap text-lg text-black">
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
            <Card className="align-center flex flex-1 flex-col p-4">
              <Outlet context={{
                  selectedWallet: selectedWallet,
                  isDebtAccount: selectedWallet?.walletType.id === 3,
                }satisfies WalletsContextType}/>
            </Card>
        </div>
      </div>
    </>
  );
};
export function userWalletsContext() {
  return useOutletContext<WalletsContextType>();
}
export { Wallet };
