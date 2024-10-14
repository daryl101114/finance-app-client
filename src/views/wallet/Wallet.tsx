import { ReactNode } from "react"
import { useState, useEffect } from 'react';
import {Card, CardContent, CardHeader} from '@/components/ui/card'
import AddWalletModal from "./AddWalletModal";



const Wallet = () => {
    const [isModalOpen, setModalOpen] = useState(false)

    // const openModal = () => {
    //     setModalOpen(!isModalOpen);
    //     console.log(isModalOpen)
    // }
return (<>
{/* <main className="mx-auto flex flex-wrap justify-center items-center text-5xl font-medium text-neutral-500 w-9/12 h-full bg-neutral-50 ">
        <Card className="w-full h-64">
            Test
        </Card>
        <Card className="w-full h-96">
            Test
        </Card>

</main> */}
<div className="p-4 grid grid-rows-4 grid-flow-col gap-4 h-full">
    <Card className="row-span-4 w-90 p-4">
        <CardHeader className="border-b-2">
            <div className="flex justify-between items-end">
            <span className="text-4xl text-neutral-600">Wallets</span>
            <AddWalletModal />
            </div>
        </CardHeader>
        <CardContent>

        </CardContent>
    </Card>
    <Card className="row-span-2 col-span-4 flex justify-center align-center p-4">
        <CardHeader className="">
            <span className="text-4xl text-neutral-600">Income</span>
        </CardHeader>
        <CardContent>

        </CardContent>
    </Card>
    <Card className="row-span-2 col-span-4 flex justify-center align-center p-4">
    <CardHeader>
            <span className="text-4xl text-neutral-600">Expense</span>
        </CardHeader>
        <CardContent>

        </CardContent>
    </Card>
    
</div>
</>)
}

export default Wallet