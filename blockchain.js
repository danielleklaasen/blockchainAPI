let Block = require('./block')
let sha256 = require('js-sha256')

class Blockchain {
  constructor(genesisBlock){ // genesisBlock = first block
    this.blocks = []
    this.addBlock(genesisBlock)
  }

  addBlock(block) {
    if(this.blocks.length == 0) {
      block.previousHash = "0000000000000000" // there is no previous hash
      block.hash = this.generateHash(block) // based on the block key it will generate a hash
    }

    this.blocks.push(block)
  }

  getNextBlock(transactions) { // mining
    let block = new Block()

    transactions.forEach(function(transaction){
      block.addTransaction(transaction)
    })

    let previousBlock = this.getPreviousBlock() // serious perfomance issue here if blocks are big. ONLY REQUEST HASH

    block.index = this.blocks.length
    block.previousHash = previousBlock.hash
    block.hash = this.generateHash(block)

    return block
  }

  getPreviousBlock() {
    return this.blocks[this.blocks.length -1]
  }

  generateHash(block) {
    let hash = sha256(block.key) // hashing the key

    // proof of work
    while(!hash.startsWith("0")){ // now you need computational power to find one. in an actual blockchain you would work with maybe 15 0's
      block.nonce += 1
      hash = sha256(block.key)
      console.log(hash)
    }

    return hash
  }
}

module.exports = Blockchain