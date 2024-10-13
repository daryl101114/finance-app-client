import { ReactNode } from "react"
import { useState, useEffect } from 'react';

interface WalletProps{
    child: ReactNode
    isPrimary: boolean
}

const Wallet = ({child, ...props}:WalletProps) => {
return (<>
<div className="text-5xl font-medium text-neutral-500">WALLET PAGE</div>
</>)
}

export default Wallet