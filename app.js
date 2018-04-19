let Block = require('./block')
let Blockchain = require('./blockchain')
let Transaction = require('./transaction')
let BlockchainNode = require('./blockchainNode')

let fetch = require('node-fetch') // promise based library

const express = require('express')
const app = express()
const bodyParser = require('body-parser')


let port;

if(process.argv.length < 3) { // no args except for node & app.js
  port = 3000; // default port
}else {
  port = [];
  process.argv.forEach(function(val,index,array){ // access the arguments
    if (index > 1) { // only take from arg 2, because 0 = node, 1 = app.js. Change into regex later to recognize url
      port.push(array[index])// add multiple servers (decentralization)
    }
  })
}

let transactions = []
let nodes = []

// initialize blockchain
let genesisBlock = new Block()
let blockchain = new Blockchain(genesisBlock)

app.use(bodyParser.json()) // now knows how to handle json send to server

// register multiple nodes
// when the user connects to the blockchain network on their specific node
// receive array of nodes connected to the network

app.post('/nodes/register', function(req,res){
  let nodesLists = req.body.urls
  nodesLists.forEach(function (nodeDictionary) { // nodeDictionary = item in array
    let node = new BlockchainNode(nodeDictionary["url"])
    nodes.push(node)
  })

  res.json(nodes)
})

app.get('/nodes', function (req,res) {
  res.json(nodes)
})

app.get('/', function(req,res){ // the route. Request, response
  res.send("hello world")
})

app.post('/transactions', function (req,res) {
  let from = req.body.from
  let to = req.body.to
  let amount = req.body.amount

  let transaction = new Transaction(from, to, amount) // not the way to go. Use unique id (public key)

  transactions.push(transaction)

  res.json(transactions)
})

app.get('/mine', function(req,res){

  if (transactions[0] == undefined){ // if there are no new transactions it makes no sense to start mining.
    let errorMessage = {"error":[{
        "1":"There are no transactions to put in the block. Mining failed."
      }]}
    res.json(errorMessage)
  } else {
    let block = blockchain.getNextBlock(transactions) // we now have a mined block
    blockchain.addBlock(block)
    transactions = [] // clear the array of transactions

    res.json(block) // show (confirm) newly mined block
  }


})


app.get('/blockchain', function(req,res){ // the route. Request, response
  res.json(blockchain)

})

app.get('/resolve', function (req,res) { // not really necessary with sockets, because the node that mined a block will broadcast this
  // way to simple for a real world situation
  // look up how to reach consensus

  // compare to blockchain on different nodes, take longest one

  nodes.forEach(function (node) {
    fetch(node.url + '/blockchain') // returns us full blockchain of node (json)
      .then(function (response) {
        return response.json()
      }).then(function (singleNodeBlockchain) {

        if (singleNodeBlockchain.blocks.length > blockchain.blocks.length) {
          blockchain = singleNodeBlockchain; // always take longest

          // this stinks.
          // What if hacked node mines a block with invalid transactions?
          // They can have the same length, but different content.
        }

      //res.json(blockchain)
    })
  })

})

// start server(s) (decentralization)
if (port.constructor === Array){
  port.forEach(function(val, index){
    app.listen(port[index], function () {
      console.log("server "+ val + " has started")
    })
  })
}else{
  app.listen(3000, function () {
    console.log("default server 3000 has started")
    console.log("You can specify servers in the args, like: node app.js 3001 3002 etc.")
  })
}
