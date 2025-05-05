import { useState, useEffect } from 'react';
import { useCreateKernel } from './use-create-kernel';      
import { publicClient } from '@/lib/utils';
import { USDC_ADDRESS } from '@/utils/constants';
import { erc20Abi } from 'viem';

export function useSmartWalletBalance() {
  const kernelClient = useCreateKernel();
  const [balanceWei, setBalanceWei] = useState<bigint>(0n);

  useEffect(() => {
    if (!kernelClient) return;
    let cancelled = false;

    (async () => {
      const address = await kernelClient.kernelClient.account.getAddress();
      
      const bal = await publicClient.readContract({
        address:        USDC_ADDRESS,
        abi:            erc20Abi,
        functionName:   'balanceOf',
        args:           [address as `0x${string}`],
      });

      if (!cancelled) {
        setBalanceWei(bal);
      }
    })();

    return () => { cancelled = true; };
  }, [kernelClient]);

  return balanceWei;
}
