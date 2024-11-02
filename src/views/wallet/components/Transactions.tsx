import { CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import AddTransactionModal from '@/components/modals/AddTransaction';
import { getTransactionCategories, getTransactions } from '@/api/transactions';
import { LoaderFunctionArgs } from 'react-router-dom';
import { useQuery, QueryClient } from '@tanstack/react-query';
import { WalletsContext } from '@/views/wallet/Wallet';
import { useContext, useEffect, useState } from 'react';
import { formatCurrency } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';
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

  let isComponentLoading = false;
  let totalAmount = 0;
  try {
    if (!walletsContext?.walletTransactions) return;
    isComponentLoading = true;
    const total = walletsContext.walletTransactions.reduce(
      (acc, { transactionType, amount }) => {
        const isCredit = transactionType === 'credit';

        // Adjust based on account type and transaction type
        const adjustedAmount = walletsContext.isDebtAccount
          ? isCredit
            ? amount
            : -amount
          : isCredit
            ? -amount
            : amount;
        return acc + adjustedAmount;
      },
      0,
    );
    totalAmount = total;
  } finally {
    isComponentLoading = false;
  }

  if (isComponentLoading) {
    return (
      <>
        <div className="flex h-full w-full items-center justify-center">
          <svg className="... mr-3 h-5 w-5 animate-spin" viewBox="0 0 24 24">
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            >
              {' '}
            </path>
          </svg>{' '}
          LOADING...
        </div>
      </>
    );
  }
  return (
    <>
      <CardHeader className="border-b-2">
        <div className="flex justify-between text-2xl">
          <span className="text-primary-900">Transactions</span>
          <span className="text-primary">{formatCurrency(totalAmount)}</span>
        </div>
      </CardHeader>
      <CardContent className="grow">
        <ScrollArea>
          {walletsContext?.walletTransactions?.map((item) => {
            return (
              <div
                className="align my-2 flex flex-nowrap items-center justify-between font-medium"
                key={item.id}
              >
                <div className="flex flex-nowrap items-center gap-1">
                  <Icon
                    className="text-primary-600"
                    name={item.transactionCategory.icon}
                    size="1.5rem"
                  />
                  <p>{item.transactionName}</p>
                </div>
                {item.transactionType === 'credit' ? (
                  <span className="text-neutral-500">
                    {formatCurrency(item.amount)}
                  </span>
                ) : (
                  <span className="text-green-600">
                    {formatCurrency(item.amount)}
                  </span>
                )}
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
