import { Component, OnInit } from '@angular/core';
import { BlockchainService, Block, Transaction } from '../services/blockchain.service';
declare var elliptic: any;
const ec = new elliptic.ec('secp256k1');

@Component({
  selector: 'app-signing-transactions',
  templateUrl: './signing-transactions.component.html',
  styleUrls: ['./signing-transactions.component.scss']
})
export class SigningTransactionsComponent implements OnInit {

  blockChain: any;
  transaction: any;
  publicKey = '047c994f9134146d8a00c20dfacb334d216775c8babf61d01c88d9158aa539e91e942a8bb6583d27c5c7cf8cc720bcf9fb83c52adebb0183d0b515436e2e517a3d';
  privateKey = 'b875af53c3df75857e7dfc8de15d5eb211beaa3ad1b3a1e0023025fee273f429';

  constructor() { }

  ngOnInit(): void {
  }

  generateBlockChain() {
    this.signedTransactions();
  }

  signedTransactions() {
    this.transaction = new BlockchainService();
    const myKey = ec.keyFromPrivate(this.privateKey);
    const walletAddress = myKey.getPublic('hex');
    const tx1 = new Transaction(myKey, this.publicKey, 10);
    tx1.signTransaction(myKey);
    this.transaction.addTransaction(tx1);
    console.log('start mining');
    this.transaction.miningPendingTransactions(walletAddress);
    console.log('miner mining reward is', this.transaction.getAddressBalance(walletAddress));
  }

}
