import { Injectable } from '@angular/core';
import { Blockchain, Block } from './blockchain.service';
declare var elliptic: any;
// const ec = new elliptic.ec('secp256k1');
// const key = ec.genKeyPair();


@Injectable({
  providedIn: 'root'
})
export class BlockchainAppService {

  public blockchainInst = new Blockchain();
  public walletKeys = [];

  constructor() {
    this.blockchainInst.difficulty = 1;
    this.blockchainInst.miningPendingTransactions('wallet-address');
    
    // console.log('mining block 1');
    // this.blockchainInst.addBlockWithProofOfWork(new Block(new Date().toLocaleString(), { amount: 4 }));
    // console.log('mining block 2');
    // this.blockchainInst.addBlockWithProofOfWork(new Block(new Date().toLocaleString(), { amount: 8 }));
    // console.log(this.blockchainInst);
    this.generateWalletKeys();
  }

  private generateWalletKeys() {
    const ec = new elliptic.ec('secp256k1');
    const key = ec.genKeyPair();
    this.walletKeys.push({
      keyObj: key,
      publicKey: key.getPublic('hex'),
      privateKey: key.getPrivate('hex')
    });
  }

  getBlocks() {
    return this.blockchainInst.chain;
  }
}
