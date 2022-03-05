import { Component, OnInit } from '@angular/core';
import { BlockchainAppService } from 'src/app/services/frontend/blockchain-app.service';

@Component({
  selector: 'app-pending-transactions',
  templateUrl: './pending-transactions.component.html',
  styleUrls: ['./pending-transactions.component.scss']
})
export class PendingTransactionsComponent implements OnInit {

  pendingTransactions = [];

  constructor(private blockchainServiceInst: BlockchainAppService) {
    this.pendingTransactions = blockchainServiceInst.getPendingTransactions();
  }

  ngOnInit(): void {
  }

  minePendingTransactions() {
    this.blockchainServiceInst.getPendingTransactions();
  }

}
