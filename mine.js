const Block = require('./models/Block');
const db = require('./database');
const {BLOCK_TIME} = require('./config');
const {DIFFICULTY_ADJUST} = require('./config');

let isMining = true;
let difficulty = 5;
mine();

function toggleMining() {
    isMining = !isMining;

    mine();
}

function mine() {
    if(!isMining) return;

    if(db.blockchain.getBlockHeight() % DIFFICULTY_ADJUST == 0) 
        adjustDifficulty();

    const block = new Block();
    while(!checkDifficulty(block.hash(), difficulty)) {
      block.nonce++;
    }
  
    db.blockchain.addBlock(block);
  
    console.log(`Mined block #${db.blockchain.getBlockHeight()} with a hash of ${block.hash()} at nonce ${block.nonce}`);
  
    setTimeout(mine, 0);
  }

  function checkDifficulty(hash, difficulty) {
    for (var i = 0, b = difficulty; i <= b; i ++) {
        if (hash[i] !== '0') {
            break;
        }
    }
    return (i === difficulty);
}

function adjustDifficulty() {
    console.log('Checking difficulty...');

    let avgBlockTime = 0;
    
    for(i = 0; i < DIFFICULTY_ADJUST; i++) {
        avgBlockTime += db.blockchain.getBlockTime(db.blockchain.getBlockHeight() - i);
    }

    avgBlockTime = avgBlockTime / DIFFICULTY_ADJUST;

    console.log('Average block time: ' + avgBlockTime);
    console.log('Target block  time: ' + BLOCK_TIME);

    if (avgBlockTime < BLOCK_TIME)
        difficulty++;
    else if (avgBlockTime > BLOCK_TIME)
        difficulty--;
    
    console.log('Difficulty adjusted to ' + difficulty);
}

  module.exports = {
    toggleMining,
    mine
  };