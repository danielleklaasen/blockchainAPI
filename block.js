class Block {
  constructor() {
    this.index = 0 // position of the block inside the blockchain
    this.previousHash = "" // starting value empty
    this.hash = ""
    this.nonce = 0
    this.transactions = [] // can have a list of transactions
  }

  get key() {
    return JSON.stringify(this.transactions) + this.index + this.previousHash + this.nonce
  }

  addTransaction(transaction) {
    this.transactions.push(transaction)
  }

}

module.exports = Block