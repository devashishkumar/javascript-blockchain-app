import { Component, OnInit } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
import { BlockchainService, Block, Transaction } from './services/blockchain.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-blockchain-app';
  blockChain: any;

  constructor() {

  }

  ngOnInit(): void {
  }

  generateBlockChain() {
    this.createBlock();
    // this.changingExistingBlock();
  }

  /**
   * create blocks in blockchain
   */
  createBlock() {
    this.blockChain = new BlockchainService();
    console.log('mining block 1');
    this.blockChain.addBlockWithProofOfWork(new Block(new Date().toLocaleString(), { amount: 4 }));
    console.log('mining block 2');
    this.blockChain.addBlockWithProofOfWork(new Block(new Date().toLocaleString(), { amount: 8 }));
    console.log(this.blockChain);
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
