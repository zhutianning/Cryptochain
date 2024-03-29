const Block = require('./block');
const Transaction = require('../wallet/transaction');
const Wallet = require('../wallet');
const { cryptoHash } = require('../CryptoUtility');
const { REWARD_INPUT, Mining_return } = require('../config');

class Blockchain {
    constructor() {
        this.chain = [Block.genesis()];
    }

    addBlock({ data }) {
        const newBlock = Block.mineBlock({
            lastBlock: this.chain[this.chain.length - 1],
            data
        });

        this.chain.push(newBlock);
    }

    replaceChain(chain, validateTransactions, onSuccess) { // onSuccess and Callback is usually the last parameter to a method
        if (chain.length <= this.chain.length) {
            console.error('The incoming chain must be longer');
            return; // We want the incoming chain to be longer
        }

        if (!Blockchain.isValidChain(chain)) {
            console.error('The incoming chain must be valid');
            return; // we want the incoming chain to be valid
        }

        //If the validateTransaction flag is actually true, and if it FALSE,it won't bother any other part
        if (validateTransactions && !this.validTransactionData({ chain })) {
            console.error('The incoming chain has invalid data');
            return;
        }

        if (onSuccess) onSuccess();
        console.log('replacing chain with', chain);
        this.chain = chain;
    }

    validTransactionData({ chain }) {
        // skip the genesis block,
        for (let i = 1; i < chain.length; i++) {
            const block = chain[i];
            const transactionSet = new Set(); // This data structure allow us to make a collection of unique items
            let rewardTransactionCount = 0; // Unlike array which can have duplicates

            //look at every transaction in the block
            for (let transaction of block.data) {
                if (transaction.input.address === REWARD_INPUT.address) {
                    rewardTransactionCount += 1;

                    if (rewardTransactionCount > 1) {
                        console.error('Miner rewards exceed limit');
                        return false;
                    }

                    if (Object.values(transaction.outputMap)[0] !== Mining_return) {
                        console.error('Miner reward amount is invalid');
                        return false;
                    }
                } else {
                    if (!Transaction.validTransaction(transaction)) {
                        console.error('Invalid transaction');
                        return false;
                    }

                    const trueBalance = Wallet.calculateBalance({
                        chain: this.chain,
                        address: transaction.input.address
                    });

                    if (transaction.input.amount !== trueBalance) {
                        console.error('Invalid input amount');
                        return false;
                    }

                    if (transactionSet.has(transaction)) {
                        console.error('An identical transaction appears more than once in the block');
                        return false;
                    } else {
                        transactionSet.add(transaction);
                    }
                }
            }
        }

        return true;
    }

    static isValidChain(chain) {
        if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
            return false
        };

        for (let i = 1; i < chain.length; i++) {
            const { timestamp, previousHash, hash, nonce, difficulty, data } = chain[i];
            const actualpreviousHash = chain[i - 1].hash;
            const lastDifficulty = chain[i - 1].difficulty;

            if (previousHash !== actualpreviousHash) return false;

            const validatedHash = cryptoHash(timestamp, previousHash, data, nonce, difficulty);

            if (hash !== validatedHash) return false;

            if (Math.abs(lastDifficulty - difficulty) > 1) return false;
        }

        return true;
    }
}

module.exports = Blockchain;

// Adapted from: https://github.com/15Dkatz/cryptochain