const Transaction = require('./transaction');
const { STARTING_BALANCE } = require('../config');
const { ec, cryptoHash } = require('../util');

class Wallet {
    constructor() {
        this.balance = STARTING_BALANCE;

        this.keyPair = ec.genKeyPair();

        this.publicKey = this.keyPair.getPublic().encode('hex');
    }

    sign(data) {
        return this.keyPair.sign(cryptoHash(data))
    }

    createTransaction({ recipient, amount }) {
        if (amount > this.balance) {
            throw new Error('Amount exceeds balance');
        }

        return new Transaction({ senderWallet: this, recipient, amount });
    }

    static calculateBalance({ chain, address }) {
        let outputsTotal = 0; //Overall outputs total

        for (let i = 1; i < chain.length; i++) { //Skip the genesis block, i=1, no data in genesis block
            const block = chain[i];

            for (let transaction of block.data) {
                const addressOutput = transaction.outputMap[address];

                if (addressOutput) {
                    outputsTotal = outputsTotal + addressOutput;
                }
            }
        }

        return STARTING_BALANCE + outputsTotal;
        // the STARTING_BALANCE will remain the actual value(if there are no outpus for the wallet)
        // Otherwise we will adding all those outputs to the starting bounds
    }
};

module.exports = Wallet;