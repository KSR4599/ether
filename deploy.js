const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface , bytecode } = require('./compile');
//when connecting to the rinkeby via Infura, the provider takes in two fields
//1. Our secret phrase got via metamask
//2. Rinkeby network key provided by the infutura.
const provider = new HDWalletProvider(
  'mushroom chuckle virtual bomb broken explain camera hammer spider away sphere measure',
  'https://rinkeby.infura.io/v3/aa02f41993434b5b81b22700202af5ad'
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log('Attempting to deploy from the account', accounts[0]); //Our first rinkeby account
const result =  await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data:'0x'+bytecode, arguments: ['ksr']})    //deploy and send very much similar to that of the ganache case.
    .send({ from : accounts[0], gas: '1000000'})

    console.log('Contract Deployed to', result.options.address);    //console logging the address where our contract has been deployed.
}

deploy();
