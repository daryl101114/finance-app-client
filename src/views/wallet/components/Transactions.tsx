import { CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import AddTransactionModal from '@/components/modals/AddTransaction';
import { getTransactionCategories } from '@/api/transactions';
import { LoaderFunctionArgs } from 'react-router-dom';
import { useQuery, QueryClient } from '@tanstack/react-query';

const useTransactionCategoriesQuery = () => ({
  queryKey: ['transactCategories'],
  queryFn: async () => getTransactionCategories(),
});

const loader =
  (queryClient: QueryClient) =>
  async ({ request }: LoaderFunctionArgs) => {
    await queryClient.ensureQueryData(useTransactionCategoriesQuery());
    const url = new URL(request.url);
    return url;
  };

const Transactions = () => {
  const { data: transactionCategories } = useQuery({
    ...useTransactionCategoriesQuery(),
  });

  return (
    <>
      <CardHeader>
        <span className="flex justify-center text-4xl text-neutral-800">
          Transactions
        </span>
      </CardHeader>
      <CardContent className="grow"></CardContent>
      <CardFooter className="itmes-center flex w-full justify-center border-t-2 p-4">
        <AddTransactionModal
          transactionCategories={transactionCategories || []}
        />
      </CardFooter>
    </>
  );
};

export { Transactions, loader };
