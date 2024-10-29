import { CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import AddTransactionModal from '@/components/modals/AddTransaction';
import { getTransactionCategories, getTransactions } from '@/api/transactions';
import { LoaderFunctionArgs } from 'react-router-dom';
import { useQuery, QueryClient } from '@tanstack/react-query';
import { WalletsContext } from '@/views/wallet/Wallet';
import { useContext, useEffect, useState } from 'react';
import { formatCurrency } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon'
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
  const [isComponentLoading, setComponentLoading] = useState(false);

  useEffect(() => {
   
    try{
      if (!walletsContext?.walletTransactions) return;
      setComponentLoading(true);
      const total = walletsContext.walletTransactions.reduce((acc, { transactionType, amount }) => {
        const isCredit = transactionType === 'credit';
      
        // Adjust based on account type and transaction type
        const adjustedAmount = walletsContext.isDebtAccount 
          ? (isCredit ? amount : -amount) 
          : (isCredit ? -amount : amount);
        return acc + adjustedAmount;
      }, 0);
    
      setTotalAmount(total);
    }
    finally{
      setComponentLoading(false);
    }
   
  }, [walletsContext?.walletTransactions]);
  if(isComponentLoading){
    return(<>
    <div className='h-full w-full flex justify-center items-center'>
      <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"> </path>
      </svg> LOADING...
    </div>
    </>)
  }
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
              className="align flex items-center justify-between font-medium my-2 "
              key={item.id}
            >
              <span className='flex items-center gap-1'>
                <Icon className="text-primary-600" name={item.transactionCategory.icon} size="1.5rem" />
                {item.transactionName }</span>
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
