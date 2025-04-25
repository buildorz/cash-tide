import { useEffect, useState } from 'react';
import { useWallets } from '@privy-io/react-auth';
import { http } from 'viem';
import { signerToEcdsaValidator } from '@zerodev/ecdsa-validator';
import {
    createKernelAccount,
    createKernelAccountClient,
    createZeroDevPaymasterClient,
} from '@zerodev/sdk';
import { KERNEL_V3_1, getEntryPoint } from "@zerodev/sdk/constants"
import { sepolia } from 'viem/chains';
import { publicClient } from '@/lib/utils';

export const useCreateKernel = () => {
    const { wallets, ready: walletsReady } = useWallets();
    const [kernelData, setKernelData] = useState<{
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        kernelClient: any;
        address: string | null;
      }>({
        kernelClient: null,
        address: null,
    });

    const kernelVersion = KERNEL_V3_1
    const entryPoint = getEntryPoint("0.7")

    useEffect(() => {
        if (!walletsReady) return;
        const embedded = wallets.find(w => w.walletClientType === 'privy');
        if (!embedded) return;

        const init = async () => {
            const privyProvider = await embedded.getEthereumProvider();

            const ecdsaValidator = await signerToEcdsaValidator(publicClient, {
                signer: privyProvider,
                entryPoint: getEntryPoint("0.7"),
                kernelVersion: KERNEL_V3_1
            })

            const kernelAccount = await createKernelAccount(publicClient, {
                kernelVersion,
                entryPoint,
                plugins: {
                    sudo: ecdsaValidator,
                },
            });

            const paymasterClient = createZeroDevPaymasterClient({
                chain: sepolia,
                transport: http(import.meta.env.VITE_APP_ZERODEV_RPC!),
              })

            const kernelClient = createKernelAccountClient({
                account: kernelAccount,
                chain: sepolia,
                bundlerTransport: http(import.meta.env.VITE_APP_ZERODEV_RPC!),
                paymaster: {
                    getPaymasterData(userOperation) {
                        return paymasterClient.sponsorUserOperation({ userOperation })
                    }
                },
            });

            const address = await kernelClient.account.getAddress();

            setKernelData({ kernelClient, address });
        };

        init().catch(console.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [walletsReady, wallets]);
    return kernelData;
};
