import { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { Button } from "@/components/ui/button"
  import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  import { Input } from "@/components/ui/input"
  import { CirclePlusIcon } from "lucide-react"
  import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { date, z } from "zod"
import { addWallet } from "@/api/wallet"
import { EventHandler, useEffect } from "react"
import { IWalletCreationType } from "@/configs/types/Wallet"

//Form Definition
const twoDecimalPlacesRegex = /^\d+(\.\d{1,2})?$/;
const formSchema = z.object({
    walletName: z.string().min(2).max(50),
    walletType: z.string().min(2).max(50),
    balance: z
    .string() // Accepts string input first (since form inputs are strings)
    .max(19,{ message:"Value is to large to be a valid currency"})
    .refine((value) => twoDecimalPlacesRegex.test(value), {
      message: 'Balance must be a valid number with up to 2 decimal places',
    })
    .transform((value) => parseFloat(value)), // Transforms to a number after validation,
    currency: z.string()
  })
  interface formType{
    walletName:string,
    walletType: string,
    balance: number,
    currency:string
  }
const AddWalletModal = () => {
  const [open, setOpen] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            walletName: "",
            walletType:"",
            balance: 0,
            currency: 'USD'
        },
      })
      // 2. Define a submit handler.
      async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.

        console.log(values)
        const wallet:IWalletCreationType = {
          accountName:values.walletName,
          accountType: values.walletType,
          balance: values.balance,
          currency: 'USD'
        }
        await addWallet(wallet);
        form.reset();
        setOpen(false)
      }
      
    return (<>
    <Dialog open={open} onOpenChange={() => {
      form.reset();
      return setOpen(!open)
    }}>
        <DialogTrigger  className="border-transparent">
        <span className="flex items-center gap-1 text-primary"> 
            <CirclePlusIcon className="w-4 h-4"/>Add Wallet
        </span>
        </DialogTrigger>
        <DialogContent >
            <DialogHeader>
                <DialogTitle className="mb-8">Create a New Wallet</DialogTitle>
                <DialogDescription>
                    
                </DialogDescription>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="walletName"
          render={({ field}) => (
            <FormItem className="px-24 flex flex-col gap-4">
                <div className="flex flex-col gap-1 ">
                    <FormLabel>Wallet Name</FormLabel>
                    <FormControl>
                        <Input placeholder="shadcn" {...field
                        } />
                    </FormControl>
                </div>
                <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="walletType"
          render={({field}) => (
            <FormItem className="px-24 flex flex-col gap-4">
                <div className="flex flex-col gap-1 ">
                    <FormLabel>Type</FormLabel>
                    <FormControl>
                        <Input placeholder="shadcn"  {...field}/>
                    </FormControl>
                </div>
                <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="balance"
          render={({field}) => (
            <FormItem className="px-24 flex flex-col gap-4">
                <div className="flex flex-col gap-1 ">
                    <FormLabel>Initial Balance</FormLabel>
                    <FormControl>
                        <Input type="number" {...field}/>
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
    </>)
}

export default AddWalletModal;