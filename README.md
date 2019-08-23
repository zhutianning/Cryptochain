# Project Title
 Design and creation of a cryptocurrency

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Acknowledgments
The code in the Cryptocurrency package was based on David Katz's blockchain-based cryptocurrency lecture and part of his source code.(https://github.com/15Dkatz/cryptochain)

### Our folder structure

    .
    ├── app                     # Load Pub/Sub pattern and Mining
    ├── blockchain              # Core of the blockchain system
    │   ├── block.test.js       # Test for each block
    │   ├── index.test.js       # Test for entire blockchain and part of transacrions          
    ├── client                  # Core of the front-end
    │   ├── src
    │   │   ├── assets          # image and logo places
    │   │   ├── components      # Some self modified module and components
    │   │   ├── index.css       # our global style
    │   │   ├── index.html      # main page
    │   │   ├── index.js        # Entry file also includes routing configuration
    ├── CryptoUtility           # Cryptography core documents
    │   ├── crypto-hash.test.js # Test for the Hash function
    ├── node_modules            # Related dependencies 
    ├── scripts                 # calculate average mining time
    ├── wallet                  # core documents for wallet 
    │   ├── index.test.js       # Test for all the wallet functionality
    │   ├── transaction.test.js # Test for all the transactions functionality
    │   ├── transaction-pool.test.js # Test for the transaction pool functionality
    └── config.js               # Setting for the blockchain system and the genesis block
    └── index.js                # Project entry and program startup file. It contains all the API setting , port number and Sync function.
    └── package.json            # Dependency package
    └── README.md               # Document description

### Prerequisites
To get started with the example, you'll need recent version of node.js and npm.

```
node - v
```
Update to the latest version using
```
npm i -g npm
```
If you do not have Node.js installed, Go to nodejs.org. You'll see download links for your laptop.

### Installing
A step by step series of examples that tell you how to get a development env running

```
Clone repository:url
cd /ProjectFolder
npm install
```
### Use the cryptocurrency application
Start the root node and peer node

```
npm start dev
npm start dev-peer
```

## Running the tests
```
npm run test
```

## Deployment

Add additional notes about how to deploy this on a live system. First, login to heroku website and create the application on the server.
```
heroku login
heroku create
```

Add Redis service on our app
```
heroku addons:create heroku-redis:hobby-dev -a YourAppName
```

To check creation progress
```
heroku addons:info redisAppName
```

To view documentation
```
heroku addons:docs heroku-redis
```

Find the Redis services address on the server
```
heroku config | grep REDIS
```

Push all the file to the server
```
git add -A
git commit -m "Information you want to record"
git push heroku master
```

Check logs whether the deployment is successful
```
heroku logs --tail
```

## 3rd party libraries and its version this project used

* babel-core 6.26.3
* babel-plugin-transform-class-properties 6.24.1
* babel-plugin-transform-object-rest-spread 6.26.0
* babel-preset-env 1.7.0
* babel-preset-react 6.24.1
* body-parser 1.18.3
* elliptic 6.4.1
* express 4.16.3
* hex-to-binary 1.0.1
* history 4.7.2
* parcel-bundler 1.10.3
* pubnub 4.21.6
* react 16.9.0
* react-bootstrap 0.32.4
* react-copy-to-clipboard ^5.0.1
* react-dom 16.6.0
* react-router-dom 4.3.1
* redis 2.8.0
* request 2.88.0
* uuid 3.3.2




















