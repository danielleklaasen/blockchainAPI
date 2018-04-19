# Blockchain

Blockchain core engine for a web API in Node.js and Express.js

## Getting Started

### Prerequisites

[Node](https://nodejs.org/en/download/)

### Installing

After installing Node run this command to install all dependencies

```
npm install
```

Run app

```
node app.js
```

## Server requests

Express.js is implemented to handle server requests. The server is able to receive JSON objects.

### Post

#### /nodes/register

Register nodes to the network, for example:

```
{
	"urls": [{
			"url":"http://localhost:3000"
		},
		{
			"url":"http://localhost:3001"
		}]
}
```

#### /transactions

Make a transaction, for example:

```
{
	"from":"Name A",
	"to":"Name B",
	"amount":5
}
```

### Get

#### /

Root hello world.

#### /nodes

Return connected nodes (servers)

#### /mine

Create (mine) a new block with transactions and add to the blockchain.

#### /blockchain

Return the entire blockchain.

## Built With

* [Node](https://nodejs.org/en/download/) - JavaScript runtime environment
* [Express](https://expressjs.com/) - Web application framework for Node.js

## Authors

* **Danielle Klaasen** - *Initial work* - [GitHub](https://github.com/danielleklaasen)

## Acknowledgments

* Thanks Mohammad Azam for the great [course](https://www.udemy.com/blockchain-programming-using-javascript/)

## Weaknesses

* Use sockets to communicate with all the different nodes
* Transactions should take unique id (public key)