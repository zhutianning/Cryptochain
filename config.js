const MINE_RATE = 1000;
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

module.exports = { GENESIS_DATA, MINE_RATE };