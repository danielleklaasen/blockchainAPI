let Block = require('./block')
let Blockchain = require('./blockchain')
let Transaction = require('./transaction')

const express = require('express')
const app = express()
const bodyParser = require('body-parser')

let transactions = []

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

app.get('/blockchain', function(req,res){ // the route. Request, response

  let genesisBlock = new Block()
  let blockchain = new Blockchain(genesisBlock)

  let transaction = new Transaction('Mary', 'Jerry', 100)
// from to amount. normally you would pass in their unique id (public key)
  let block = blockchain.getNextBlock([transaction])
  blockchain.addBlock(block)

  let anotherTransaction = new Transaction("Azam", "Jerry", 10)
  let block1 = blockchain.getNextBlock([anotherTransaction])
  blockchain.addBlock(block1)


  res.json(blockchain) // try to format as json (is string now)
})

app.listen(3000, function () {
  console.log("server has started")
})

