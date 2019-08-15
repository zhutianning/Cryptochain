const MINE_RATE = 1000; //Global Mine Rate Value, 1000 millisecond = 1 second; MINE_SPEED
const INITIAL_DIFFICULTY = 3;

// The Genesis Block
const GENESIS_DATA = {
    timestamp: 1,
    lastHash: '------',
    hash: 'hash-one',
    difficulty: INITIAL_DIFFICULTY,
    nonce: 0,
    data: []
};

// Give everybody some balance to start this ecosystem
const STARTING_BALANCE = 1000;

const REWARD_INPUT = { address: '*authorized-reward*' };

const MINING_REWARD = 50;

module.exports = {
    GENESIS_DATA,
    MINE_RATE,
    STARTING_BALANCE,
    REWARD_INPUT,
    MINING_REWARD
};    // share these value with other files