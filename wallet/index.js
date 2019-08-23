const Transaction = require('./transaction');
const { STARTING_BALANCE } = require('../config');
const { ec, cryptoHash } = require('../CryptoUtility');

class Wallet {
    constructor() {
        this.balance = STARTING_BALANCE;

        this.keyPair = ec.genKeyPair();

        this.publicKey = this.keyPair.getPublic().encode('hex');
    }

    sign(data) {
        return this.keyPair.sign(cryptoHash(data))
    }

    createTransaction({ recipient, amount, chain }) {
        if (chain) {
            this.balance = Wallet.calculateBalance({
                chain,
                address: this.publicKey
            });
        }

        if (amount > this.balance) {
            throw new Error('Amount exceeds balance');
        }

        return new Transaction({ senderWallet: this, recipient, amount });
    }

    static calculateBalance({ chain, address }) {
        let hasConductedTransaction = false;
        let outputsTotal = 0; //Overall outputs total

        for (let i = chain.length - 1; i > 0; i--) { //Iterate through the blockchain in reverse
            const block = chain[i];

            for (let transaction of block.data) {
                if (transaction.input.address === address) {
                    hasConductedTransaction = true;
                }

                const addressOutput = transaction.outputMap[address];

                if (addressOutput) {
                    outputsTotal = outputsTotal + addressOutput;
                }
            }

            if (hasConductedTransaction) {
                break;
            }
        }

        return hasConductedTransaction ? outputsTotal : STARTING_BALANCE + outputsTotal;
        // the STARTING_BALANCE will remain the actual value(if there are no outpus for the wallet)
        // Otherwise we will adding all those outputs to the starting bounds
    }
};

module.exports = Wallet;

// Adapted from: https://github.com/15Dkatz/cryptochain