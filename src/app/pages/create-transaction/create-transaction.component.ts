import { Component, OnInit } from '@angular/core';
import { BlockchainAppService } from 'src/app/services/frontend/blockchain-app.service';
import { Transaction } from 'src/app/services/frontend/blockchain.service';

@Component({
  selector: 'app-create-transaction',
  templateUrl: './create-transaction.component.html',
  styleUrls: ['./create-transaction.component.scss']
})
export class CreateTransactionComponent implements OnInit {

  newTransaction;
  walletKey;

  constructor(private blockchainServiceInst: BlockchainAppService) {
    this.walletKey = this.blockchainServiceInst.walletKeys[0];
  }

  ngOnInit(): void {
    this.newTransaction = new Transaction();
  }

  createTransaction() {
    this.newTransaction.fromAddress = this.walletKey.publicKey;
    this.newTransaction.signTransaction(this.walletKey.keyObj);

    this.newTransaction = new Transaction();
  }

}
