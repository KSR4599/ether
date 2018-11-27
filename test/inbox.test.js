const assert = require('assert'); //for making assertions about tests
const ganache = require('ganache-cli');
const Web3 = require('web3'); //captilzation of first letter is required as is a constructor
const web3 = new Web3(ganache.provider());  //This is the instance of ganache network for w3 ro communicate (This is variable and usually changes when we tend to use different network like rinkeby etc)
const { interface, bytecode} =require('../compile');  //destruction syntax to get the values of bytecode and interface from the compiled contract from the compile.js file.


let accounts;
let inbox;

beforeEach(async () => {
  //Get list of all accounts
accounts = await web3.eth.getAccounts()
  //Use one of those accounts to deploy the contract (notice await keyword which used to specify that wait until the contract is deployed).
 //Here this inbox keyword is like the javascript representaion of our contract. We can call fucntions in it. This object here, actually represents what actually resides in the blockchain. By making use of this we can directly interact with the contract.ing ui
  inbox = await new web3.eth.Contract(JSON.parse(interface))
   .deploy({ data: bytecode,arguments : ['ksr'] })    //Since the constrcuctor of out Inbox expects the string to be setted to the message variable (just likeremix)
   .send({ from : accounts[0], gas: '1000000'})

 });
//1st test
 describe('Inbox', () => {
  it('deploys a contract',()=>{
    assert.ok(inbox.options.address);  //To verifiy whether the project is deployed successfully. If deployed it will get a address property for itself. assert.ok() returns true if it holds any defined value.
  })

//2nd Test
  it('has a default message', async ()=>{
    const message = await inbox.methods.message().call(); //calling the message() present in the methods property of the contract called inbox.
   assert.equal(message, 'ksr');
  })

//3rd test
it('can change the message',async () =>{
  //In here first we need to set the message ad call the send()  call to the network specifying the from field which specifies whose going to pay for this to happen since this change requires some cost of gas.
 await inbox.methods.setMessage('reddy').send({ from: accounts[0] });  //if anything goes wrong, this line throws the error without moving forward.
 const message = await inbox.methods.message().call();
 assert.equal(message, 'reddy');
})

  })
