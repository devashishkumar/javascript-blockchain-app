import { Md5 } from 'ts-md5/dist/md5';
declare var elliptic: any;
const ec = new elliptic.ec('secp256k1');
const key = ec.genKeyPair();


class BlockchainService {
  chain: any = [];
  difficulty = 2;
  pendingTransactions: any = [];
  miningReward = 100;
  constructor() {
    // we can comment this code in case we don't want to generate first block (genesis block) having previous hash zero
    this.chain = [this.createGenesisBlock()];
  }
  /**
   * create first block in Blockchain
   * @returns Block
   */
  createGenesisBlock() {
    return new Block(new Date(), { amount: 4 }, "0");
  }

  /**
   * @returns last block
   */
  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  /**
   * add block without proof of work
   * @param newBlock block object
   */
  addBlockWithoutProofOfWork(newBlock: any) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }

  /**
   * add block with proof of work
   * @param newBlock block object
   */
  addBlockWithProofOfWork(newBlock: any) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.blockMining(this.difficulty);
    this.chain.push(newBlock);
  }

  /**
   * check block is valid/invalid
   * @returns boolean
   */
  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];
      if (!currentBlock.hashValidTransactions()) {
        return false;
      }
      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }
      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }

  addTransaction(transaction: any) {
    console.log(transaction);
    if (!transaction.fromAddress || !transaction.toAddress) {
      throw new Error('From and to address must valid');
    }
    if (!transaction.isValidTransaction()) {
      throw new Error('Cannot add invalid tranasction');
    }
    this.pendingTransactions.push(transaction);
  }

  getAddressBalance(address: any) {
    let balance = 0;
    for (const b of this.chain) {
      if (b && b.transactions && b.transactions.length) {
        for (const trans of b.transactions) {
          if (trans.fromAddress === address) {
            balance -= trans.amount;
          }
          if (trans.toAddress === address) {
            balance += trans.amount;
          }
        }
      }
    }
    return balance;
  }

  /**
   * mining pending transactions
   * @param miningRewardAddress address
   */
  miningPendingTransactions(miningRewardAddress: any) {
    let block = new Block(new Date().toLocaleString(), this.pendingTransactions);
    block.blockMining(this.difficulty);
    this.chain.push(block);
    this.pendingTransactions = [new Transaction(null, miningRewardAddress, this.miningReward)];
  }
}

class Transaction {
  fromAddress;
  toAddress;
  amount;
  signature = '';
  constructor(_from: any, _to: string, _amount: any) {
    this.fromAddress = _from;
    this.toAddress = _to;
    this.amount = _amount;
  }

  calculateHash() {
    return Md5.hashStr(`${this.fromAddress}${this.toAddress}${this.amount}`);
  }

  signTransaction(signingKey) {
    if (this.fromAddress !== signingKey) {
      throw new Error('You cannot make transaction');
    }
    const hashVal = this.calculateHash();
    const sign = signingKey.sign(hashVal, 'hex');
    this.signature = sign.toDER('hex');
  }

  isValidTransaction() {
    console.log(this.signature);
    if (!this.fromAddress) {
      return true;
    }
    if (!this.signature || this.signature.length === 0) {
      throw new Error('No signature found for address');
    }
    const publicKey = ec.keyFromPublic(this.fromAddress, 'hex');
    return publicKey.verify(this.calculateHash(), this.signature);
  }


}

class Block {
  timestamp: string;
  transactions: any;
  previousHash: string;
  hash: string;
  nonce: any;
  constructor(_timestamp: any, _transactions: any, _previousHash = '') {
    this.timestamp = _timestamp;
    this.transactions = _transactions;
    this.previousHash = _previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  /**
   * calculate hash as per passed data
   * @returns string
   */
  calculateHash() {
    return Md5.hashStr(`${this.previousHash}${this.timestamp}${JSON.stringify(this.transactions)}${this.nonce}`);
  }

  blockMining(difficulty: number) {
    while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
  }

  hasValidTransaction() {
    for (const trans of this.transactions) {
      if (!trans.isChainValid()) {
        return false;
      }
    }
    return true;
  }
}

export {
  BlockchainService,
  Transaction,
  Block
}


