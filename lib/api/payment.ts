import { Payment } from '@/types/chat';
import { WalletContextState } from '@solana/wallet-adapter-react';
import { Connection, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';

import { chatsApi } from './chats';

export const MESSAGE_PRICE = 100_000;

export const paymentApi = {
  baseQueryKey: 'payment',
  payWithSol: async ({
    fromPubkey,
    recipient,
    connection,
    message,
    sendTransaction,
  }: {
    fromPubkey: PublicKey;
    recipient: string;
    connection: Connection;
    message: string;
    sendTransaction: WalletContextState['sendTransaction'];
  }) => {
    const tx = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey,
        toPubkey: new PublicKey(recipient),
        lamports: MESSAGE_PRICE,
      }),
    );

    const txHash = await sendTransaction(tx, connection);

    await chatsApi.sendMessage({
      wallet: fromPubkey.toBase58(),
      transaction_hash: txHash,
      payment_type: Payment.SOLANA,
      message,
    });
  },
};
