const MINE_RATE = 2000; //Global Mine Rate Value, 1000 millisecond = 1 second; MINE_SPEED
const INITIAL_DIFFICULTY = 4;
// Give everybody some balance to start this ecosystem
const STARTING_BALANCE = 250;

const REWARD_INPUT = { address: '*authorized-reward*' };

//Reward for the miners
const Mining_return = 38;

// The Genesis Block
const GENESIS_DATA = {
    timestamp: 1,
    previousHash: '------',
    hash: 'initial-hash',
    difficulty: INITIAL_DIFFICULTY,
    nonce: 0,
    data: []
};

module.exports = {
    GENESIS_DATA,
    MINE_RATE,
    STARTING_BALANCE,
    REWARD_INPUT,
    Mining_return
};    // share these value with other files

// Adapted from: https://github.com/15Dkatz/cryptochain