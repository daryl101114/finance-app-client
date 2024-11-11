import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { PlusIcon, ReceiptIcon, CalendarIcon } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  TransactionCategoriesTypes,
  ITransaction,
} from '@/configs/types/Transaction';
import { useContext, useState } from 'react';
import { WalletsContext } from '@/views/wallet/Wallet'; //*
import { addTransaction } from '@/api/transactions';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface transactionCategoriesProps {
  transactionCategories: TransactionCategoriesTypes[];
}

//Form Definition
const twoDecimalPlacesRegex = /^\d+(\.\d{1,2})?$/;
const formSchema = z.object({
  walletId: z.string().min(2, {
    message: 'Please Select a Wallet',
  }),
  transactionName: z.string().min(2, {
    message: 'Name reqruired',
  }),
  transactionDescription: z.string().max(100),
  amount: z
    .string() // Accepts string input first (since form inputs are strings)
    .max(19, { message: 'Value is to large to be a valid currency' })
    .refine((value) => twoDecimalPlacesRegex.test(value), {
      message: 'Balance must be a valid number with up to 2 decimal places',
    })
    .transform((value) => parseFloat(value)), // Transforms to a number after validation,
  transactionDate: z.date(),
  isRecurring: z.boolean(),
  transactionType: z.string().min(2, {
    message: 'Please select transaction type',
  }),
  transactionCategoryId: z.string().min(2, {
    message: 'Please select category',
  }),
});

//Component
const AddTransactionModal = ({
  transactionCategories,
}: transactionCategoriesProps) => {
  //COMPONENT STATES
  const queryClient = useQueryClient(); //Query qlient to interact with query cache
  const walletsContext = useContext(WalletsContext); //*
  const [open, setOpen] = useState(false);
  const [selectedWalletId, setSelectedWalletId] = useState('');
  const [isLoading, setLoading] = useState(false);

  //FORM
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      walletId: '',
      transactionName: '',
      transactionDescription: '',
      amount: 0, // Transforms to a number after validation,
      transactionDate: new Date(),
      isRecurring: false,
      transactionType: '',
      transactionCategoryId: '',
    },
  });

  //Query
  const mutation = useMutation({
    mutationFn: async (form: ITransaction) => {
      await addTransaction(form);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['transactions', selectedWalletId],
      });
    },
  });

  //Submit form
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    let transaction: ITransaction = {
      ...values,
      createdAt: new Date(),
    };
    setSelectedWalletId(values.walletId);
    mutation.mutate(transaction);
    form.reset();
    setLoading(false);
    setOpen(false);
  }

  return (
    <>
      <Drawer>
        <DrawerTrigger asChild>
          <Button
            className="rounded-full p-2 transition ease-in-out hover:scale-110"
            variant="default"
          >
            <PlusIcon className="mr-1 h-4 w-4" />
            Transaction
          </Button>
        </DrawerTrigger>
        <DrawerContent
          // The gap between the edge of the screen and the drawer is 8px in this case.
          style={
            { '--initial-transform': 'calc(100% + 8px)' } as React.CSSProperties
          }
        >
          <div className="bg-zinc-50 flex h-full w-full grow flex-col rounded-[16px] p-5">
            <div className="mx-auto max-w-md">
              <DrawerHeader>
                <DrawerTitle className="flex items-center text-neutral-900">
                  <ReceiptIcon></ReceiptIcon>
                  <span className="text-2xl">Transaction</span>
                </DrawerTitle>
                <DrawerDescription></DrawerDescription>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                  >
                    <FormField
                      control={form.control}
                      name="walletId"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Wallet" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {walletsContext?.wallets?.map((wallet) => {
                                return (
                                  <SelectItem key={wallet.id} value={wallet.id}>
                                    <em-emoji id={wallet.emoji} size="1rem" />
                                    {wallet.accountName}
                                  </SelectItem>
                                );
                              })}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="transactionName"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <div className="flex flex-col">
                            <FormControl>
                              <Input
                                placeholder="Transaction Name"
                                {...field}
                              />
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="transactionDescription"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <div className="flex flex-col">
                            <FormControl>
                              <Input placeholder="Description" {...field} />
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="amount"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <div className="flex flex-col">
                            <FormControl>
                              <Input placeholder="Amount" {...field} />
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="transactionDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={'outline'}
                                  className={cn(
                                    'pl-3 text-left font-normal',
                                    !field.value && 'text-muted-foreground',
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, 'PPP')
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date > new Date() ||
                                  date < new Date('1900-01-01')
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormDescription></FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="transactionType"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a Type of Wallet" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value={'debit'}>
                                <em-emoji id="dollar" size="1rem" /> Debit
                              </SelectItem>
                              <SelectItem value={'credit'}>
                                <em-emoji id="credit_card" size="1rem" /> Credit
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="transactionCategoryId"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {transactionCategories.map((categories) => {
                                return (
                                  <SelectItem
                                    key={categories.id}
                                    value={categories.id}
                                  >
                                    {categories.transactionCategoryName}
                                  </SelectItem>
                                );
                              })}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="isRecurring"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                          <div className="space-y-0.5">
                            <FormLabel>Recurring Transaction</FormLabel>
                            <FormDescription>
                              Refers to a type of transaction that repeats.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <Button className="w-full" type="submit">
                      {isLoading ? (
                        <div>
                          <svg
                            className="... mr-3 h-5 w-5 animate-spin"
                            viewBox="0 0 24 24"
                          >
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            >
                              {' '}
                            </path>
                          </svg>{' '}
                          Processing...
                        </div>
                      ) : (
                        <div>Add Transaction</div>
                      )}
                    </Button>
                    <DrawerClose asChild>
                      <Button className="w-full" variant="outline">
                        Cancel
                      </Button>
                    </DrawerClose>
                  </form>
                </Form>
              </DrawerHeader>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default AddTransactionModal;
