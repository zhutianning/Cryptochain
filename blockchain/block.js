const hexToBinary = require('hex-to-binary');
const { GENESIS_DATA, MINE_RATE } = require('../config');
const { cryptoHash } = require('../CryptoUtility');

class Block {
    constructor({ timestamp, previousHash, hash, data, nonce, difficulty }) {
        this.timestamp = timestamp;
        this.previousHash = previousHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty;
    }

    static genesis() {
        return new this(GENESIS_DATA);
    }

    static mineBlock({ lastBlock, data }) {
        const previousHash = lastBlock.hash;
        let hash, timestamp;
        let { difficulty } = lastBlock;
        let nonce = 0;

        do {
            nonce++;
            timestamp = Date.now();
            difficulty = Block.adjustDifficulty({ originalBlock: lastBlock, timestamp });
            hash = cryptoHash(timestamp, previousHash, data, nonce, difficulty);
        } while (hexToBinary(hash).substring(0, difficulty) !== '0'.repeat(difficulty));

        return new this({
            timestamp,
            previousHash,
            data,
            difficulty,
            nonce,
            hash
        });
    }

    static adjustDifficulty({ originalBlock, timestamp }) {
        const { difficulty } = originalBlock;

        if (difficulty < 1) return 1;

        if (timestamp - originalBlock.timestamp > MINE_RATE) return difficulty - 1;

        return difficulty + 1;
    }
}

module.exports = Block;
// Adapted from: https://github.com/15Dkatz/cryptochain