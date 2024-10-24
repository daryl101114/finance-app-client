import { CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import AddTransactionModal from '@/components/modals/AddTransaction';
import { getTransactionCategories, getTransactions } from '@/api/transactions';
import { LoaderFunctionArgs } from 'react-router-dom';
import { useQuery, QueryClient } from '@tanstack/react-query';
import { WalletsContext } from '@/views/wallet/Wallet';
import { useContext, useEffect, useState } from 'react';
import { formatCurrency } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
const transactionCategoriesQuery = () => ({
  queryKey: ['transactCategories'],
  queryFn: async () => getTransactionCategories(),
});

const loader =
  (queryClient: QueryClient) =>
  async ({ request }: LoaderFunctionArgs) => {
    await queryClient.ensureQueryData(transactionCategoriesQuery());
    const url = new URL(request.url);
    return url;
  };
  
const Transactions = () => {

  const { data: transactionCategories } = useQuery({
    ...transactionCategoriesQuery(),
  });

  const walletsContext = useContext(WalletsContext);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    if (!walletsContext?.walletTransactions) return;

    const total = walletsContext.walletTransactions.reduce((acc, { transactionType, amount }) => {
      const isCredit = transactionType === 'credit';
    
      // Adjust based on account type and transaction type
      const adjustedAmount = walletsContext.isDebtAccount 
        ? (isCredit ? amount : -amount) 
        : (isCredit ? -amount : amount);
      return acc + adjustedAmount;
    }, 0);
  
    setTotalAmount(total);
  }, [walletsContext?.walletTransactions]);
  
  return (
    <>
      <CardHeader>
      <div className="flex justify-between text-4xl">
          <span className='text-primary-900'>Transactions</span>
          <span className='text-primary-700'>{formatCurrency(totalAmount)}</span>
        </div>
      </CardHeader>
      <CardContent className="grow">
        <ScrollArea>
        {walletsContext?.walletTransactions?.map((item) => {
          return (
            <div
              className="align flex items-center justify-between font-medium gap-3"
              key={item.id}
            >
              <span className='text-md'>{item.transactionName}</span>
              {
                item.transactionType === 'credit' ? <span className='text-red-500'>{formatCurrency(item.amount)}</span>: <span className='text-green-600'>{formatCurrency(item.amount)}</span>
                
              }
            </div>
          );
        })}
        </ScrollArea>
      </CardContent>
      <CardFooter className="itmes-center flex w-full justify-center border-t-2 p-4">
        <AddTransactionModal
          transactionCategories={transactionCategories || []}
        />
      </CardFooter>
    </>
  );
};
export { Transactions, loader };
