import { useState, useEffect } from 'react';
import { useCreateKernel } from './use-create-kernel';      
import { publicClient } from '@/lib/utils';

export function useSmartWalletBalance() {
  const kernelClient = useCreateKernel();
  const [balanceWei, setBalanceWei] = useState<bigint>(0n);

  useEffect(() => {
    if (!kernelClient) return;
    let cancelled = false;

    (async () => {
      const address = await kernelClient.kernelClient.account.getAddress();  
      console.log("kernel address", address)
      const bal = await publicClient.getBalance({ address });  

      if (!cancelled) {
        setBalanceWei(bal);
      }
    })();

    return () => { cancelled = true; };
  }, [kernelClient]);

  return balanceWei;
}
