const SHA256 = require('crypto-js/sha256');
const UTXO = require('./UTXO');
const Transaction = require('./Transaction');
const {PUBLICKEY} = require('../config');
const {TRANSACTION_LIMIT} = require('../config');

class Block {
    constructor(prevHash) {
        this.prevHash = prevHash
        this.nonce = 0;
        this.timestamp = Date.now();
        this.transactions = [];

        //TO ADD BACK IN AT SOME POINT
        //this.transactions.push(new Transaction(new UTXO(6.5, PUBLICKEY), new UTXO(6.5, PUBLICKEY)));
    }

    hash() {
        return SHA256(this.timestamp + "" + 
                                  this.nonce + 
                                  this.prevHash + 
                                  JSON.stringify(this.transactions)).toString();
      }

    addTransaction(txo) {
        if(this.transactions.length >= TRANSACTION_LIMIT)
            throw 'Block at transaction limit!'
        this.transactions.push(txo);
    }

    validate() {
        
        this.transactions.forEach(txo => txo.validate())
    }

}

module.exports = Block;