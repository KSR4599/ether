const assert = require('assert'); //for making assertions about tests
const ganache = require('ganache-cli');
const Web3 = require('web3'); //captilzation of first letter is required as is a constructor
const web3 = new Web3(ganache.provider());  //This is the instance of ganache network for w3 ro communicate (This is variable and usually changes when we tend to use different network like rinkeby etc)

beforeEach(() => {
  //Get list of all accounts
web3.eth.getAccounts()
 .then(fetchedAccounts =>{
   console.log(fetchedAccounts);
 });

  //Use one of those accounts to deploy the contract
  //Use contract


  describe('Inbox',() => {
    it('deploys a contract', () => {
      
    })
  })
})
