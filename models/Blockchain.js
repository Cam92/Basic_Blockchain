const Block = require('./Block');
const SHA256 = require("crypto-js/sha256");
const {BLOCK_TIME} = require('../config');

class Blockchain {
    constructor() {
        this.blocks = [ new Block(SHA256("Why hello {chainshot instructor}, you handsome devil who will definitely look favourably on this possibly incomplete project!"))];
    }

    getBlockHeight() {
        return this.blocks.length - 1;
    }

    addBlock(block) {
        this.blocks.push(block);
    }

    getBlockTime(i) {
        if(i <= 0)
            return BLOCK_TIME;

        return this.blocks[this.getBlockHeight()].timestamp - 
               this.blocks[this.getBlockHeight() - 1].timestamp;
    }
}

module.exports = Blockchain;