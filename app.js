let Block = require('./block')
let Blockchain = require('./blockchain')
let Transaction = require('./transaction')

const express = require('express')
const app = express()
const bodyParser = require('body-parser')

let transactions = []

// initialize blockchain
let genesisBlock = new Block()
let blockchain = new Blockchain(genesisBlock)

app.use(bodyParser.json()) // now knows how to handle json send to server

app.get('/', function(req,res){ // the route. Request, response
  res.send("hello world")
})

app.post('/transactions', function (req,res) {
  let from = req.body.from
  let to = req.body.to
  let amount = req.body.amount

  let transaction = new Transaction(from, to, amount)

  transactions.push(transaction)

  res.json(transactions)
})

app.get('/mine', function(req,res){
  // if there are no new transactions it makes no sense to start mining. Take this into account in the future.

  let block = blockchain.getNextBlock(transactions) // we now have a mined block
  blockchain.addBlock(block)
  // clean the array of transactions as well
  res.json(block) // show (confirm) newly mined block

})

app.get('/blockchain', function(req,res){ // the route. Request, response
  res.json(blockchain) // try to format as json (is string now)
})

app.listen(3000, function () {
  console.log("server has started")
})
