import { Component, OnInit } from '@angular/core';
import { BlockchainService, Block, Transaction } from '../services/blockchain.service';

@Component({
  selector: 'blockchain-mining-reward',
  templateUrl: './mining-reward.component.html',
  styleUrls: ['./mining-reward.component.scss']
})
export class MiningRewardComponent implements OnInit {
  blockChain: any;
  transaction: any;

  constructor() {

  }

  ngOnInit(): void {
  }

  generateBlockChain() {
    this.miningRewardsAndTransactions();
  }

  miningRewardsAndTransactions() {
    this.transaction = new BlockchainService();
    this.transaction.addTransaction(new Transaction('a', 'b', 50));
    this.transaction.addTransaction(new Transaction('b', 'a', 25));

    console.log('start mining');
    this.transaction.miningPendingTransactions('miner-address');
    console.log('miner mining reward is', this.transaction.getAddressBalance('miner-address'));

    console.log('start mining');
    this.transaction.miningPendingTransactions('miner-address');
    console.log('miner mining reward is', this.transaction.getAddressBalance('miner-address'));
  }

  /**
   * create blocks in blockchain
   */
  createBlock() {
    this.blockChain = new BlockchainService();
    console.log('mining block 1');
    this.blockChain.addBlock(new Block(new Date().toLocaleString(), { amount: 4 }));
    console.log('mining block 2');
    this.blockChain.addBlock(new Block(new Date().toLocaleString(), { amount: 8 }));
  }

  changingExistingBlock() {
    console.log(this.blockChain);
    // isValidChain will return true
    console.log(`is Block Valid ? ${this.blockChain.isValidChain()}`);
    this.blockChain.chain[1].data = { amount: 50 };
    // isValidChain will return false
    console.log(`is Block Valid ? ${this.blockChain.isValidChain()}`);
  }

}
