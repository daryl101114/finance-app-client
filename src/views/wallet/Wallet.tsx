import { ReactNode } from 'react';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import AddWalletModal from './AddWalletModal';

const Wallet = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  return (
    <>
      <div className="grid h-full grid-flow-col grid-rows-4 gap-4 p-4">
        <Card className="w-90 row-span-4 p-4">
          <CardHeader className="border-b-2">
            <div className="flex items-end justify-between">
              <span className="text-4xl text-neutral-600">Wallets</span>
              <AddWalletModal />
            </div>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
        <Card className="align-center col-span-4 row-span-2 flex justify-center p-4">
          <CardHeader className="">
            <span className="text-4xl text-neutral-600">Income</span>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
        <Card className="align-center col-span-4 row-span-2 flex justify-center p-4">
          <CardHeader>
            <span className="text-4xl text-neutral-600">Expense</span>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
      </div>
    </>
  );
};

export default Wallet;
