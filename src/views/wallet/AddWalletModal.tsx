import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PlusIcon } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { addWallet } from '@/api/wallet';
import { IWalletCreationType } from '@/configs/types/Wallet';
import { init } from 'emoji-mart';
import data from '@emoji-mart/data';
import { AccountTypes, WalletIcons } from '@/lib/constants/AccountTypes';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useMutation, useQueryClient } from '@tanstack/react-query';
init({ data });

const twoDecimalPlacesRegex = /^\d+(\.\d{1,2})?$/;
//Form Definition
const formSchema = z.object({
  walletName: z.string().min(2).max(50),
  walletType: z.string().min(1, { message: 'Must select wallet type' }).max(50),
  balance: z
    .string() // Accepts string input first (since form inputs are strings)
    .max(19, { message: 'Value is to large to be a valid currency' })
    .refine((value) => twoDecimalPlacesRegex.test(value), {
      message: 'Balance must be a valid number with up to 2 decimal places',
    })
    .transform((value) => parseFloat(value)), // Transforms to a number after validation,
  currency: z.string(),
});

const AddWalletModal = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  // const [pickedEmoji, setPickedEmoji] = useState('bank');
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      walletName: '',
      walletType: '',
      balance: 0,
      currency: 'USD',
    },
  });

  const mutation = useMutation({
    mutationFn: async (form: IWalletCreationType) => {
      await addWallet(form);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userWallets'] });
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    //Map form values to IWalletCreationType
    const wallet: IWalletCreationType = {
      accountName: values.walletName,
      walletTypeId: AccountTypes[values.walletType],
      balance: values.balance,
      currency: 'USD',
      emoji: WalletIcons[values.walletType],
    };

    //Add Wallet
    mutation.mutate(wallet);
    form.reset();
    setOpen(false);
  }

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={() => {
          form.reset();
          return setOpen(!open);
        }}
      >
        <DialogTrigger asChild>
          <Button
            className="rounded-full p-3 transition delay-100 ease-in-out hover:scale-110"
            variant="default"
          >
            <PlusIcon className="mr-1 h-4 w-4" />
            Wallet
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-8">Create a New Wallet</DialogTitle>
            <DialogDescription></DialogDescription>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="walletName"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-4 px-24">
                      <div className="flex flex-col gap-1">
                        <FormControl>
                          <Input placeholder="shadcn" {...field} />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="walletType"
                  render={({ field }) => (
                    <FormItem className="flex flex-col px-24">
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
                          <SelectItem value={'Cash Account'}>
                            <em-emoji id="dollar" size="1rem" /> Cash Account
                          </SelectItem>
                          <SelectItem value={'Savings Account'}>
                            <em-emoji id="moneybag" size="1rem" /> Savings
                            Account
                          </SelectItem>
                          <SelectItem value={'Debt Account'}>
                            <em-emoji id="credit_card" size="1rem" /> Debt
                            Account
                          </SelectItem>
                          <SelectItem value={'Asset Account'}>
                            <em-emoji id="gem" size="1rem" /> Asset Account
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="balance"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-4 px-24">
                      <div className="flex flex-col gap-1">
                        <FormLabel>Initial Balance</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Create Wallet</Button>
              </form>
            </Form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddWalletModal;
