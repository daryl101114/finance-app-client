import { ReactNode } from 'react';
import { useState, useEffect } from 'react';
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
import { EllipsisVerticalIcon, LoaderCircleIcon } from 'lucide-react';


init({ data });
const Wallet = () => {
  const [userWallets, setUserWallets] = useState<IWalletType[]>([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    const getWallets = getUserWallets;
    getWallets().then((res) => {
      setUserWallets(res.data.wallets);
      setLoading(false);
    }).finally(()=>{
      setLoading(false);
    })
    
  }, []);

  return (
    <>
      <div className="grid h-full grid-flow-col grid-rows-4 gap-4 p-4">
        <Card className="min-w-[31rem] row-span-4 flex flex-col p-4">
          <CardHeader className="border-b-2">
            <div className="flex items-end justify-between">
              <span className="text-4xl text-neutral-800">Wallets</span>
            </div>
          </CardHeader> 
          <CardContent className="grow">
         {isLoading ? <div className='flex justify-center items-center text-2xl text-neutral-700 h-full'> <LoaderCircleIcon className='animate-spin h-5 w-5 mr-3 text-xl' />
          Loading Wallets...</div> : ''}
            <div className="mt-4 transition ease-in-out">
              {/* <ul className="mt-5 flex flex-col gap-3"> */}
              {userWallets.map((item: IWalletType) => {
                return (
                  <div
                    key={item.id}
                    className="flex items-end gap-1 rounded-md p-1 hover:bg-primary-50 hover:-translate-y-1 transition ease-in-out hover:cursor-pointer"
                  >
                    <em-emoji
                      className="h-12 w-12 rounded-full"
                      id={item.emoji}
                      size="2rem"
                    ></em-emoji>
                    <div className="grow text-3xl text-neutral-700">
                      {item.accountName}
                    </div>
                    <Button variant="ghost" size="icon">
                      <EllipsisVerticalIcon className="text-neutral-700" />
                    </Button>
                  </div>
                );
              })}
              {/* </ul> */}
            </div>
          </CardContent>
          <CardFooter className="itmes-center flex w-full justify-center border-t-2 p-4">
            <AddWalletModal />
          </CardFooter>
        </Card>
        <Card className="align-center col-span-4 row-span-2 bg-neutral-50 p-4">
          <CardHeader className=" ">
            <span className="flex w-full justify-center text-4xl text-neutral-800">
              Balance
            </span>
          </CardHeader>
          <CardContent>Under Maintenance</CardContent>
        </Card>
        <Card className="align-center bg-neutral-0 col-span-4 row-span-2 flex flex-col p-4">
          <CardHeader>
            <span className="flex justify-center text-4xl text-neutral-800">
              Transactions
            </span>
          </CardHeader>
          <CardContent className="grow"></CardContent>
          <CardFooter className="itmes-center flex w-full justify-center border-t-2 p-4">
            <AddWalletModal />
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default Wallet;
