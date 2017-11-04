import React, {Component} from 'react';
import Web3 from 'web3';
// import _ from 'lodash';
//import {Link} from 'react-router-dom';
import './Ethemy.css';

var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
var address = "0x6544513d278f7f8a8848ee16f912907a31f42edb";
var devAbi = [
    {
      "inputs": [
        {
          "name": "_addr",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "constant": false,
      "name": "addAddress",
      "outputs": []
    },
    {
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "constant": false,
      "inputs": [],
      "name": "getAddresses",
      "outputs": [
        {
          "name": "",
          "type": "address[]"
        }
      ]
    },
    {
      "inputs": [],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "constant": true,
      "name": "getLength",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ]
    },
    {
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor",
      "inputs": []
    },
    {
      "payable": true,
      "stateMutability": "payable",
      "type": "fallback"
    }
  ];

var abi = [
    {
      "constant": false,
      "inputs": [],
      "name": "dispense",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "withdraw",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "getShareholders",
      "outputs": [
        {
          "name": "",
          "type": "address[]"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "constant": true,
      "name": "shareholders",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ]
    },
    {
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "name": "shares",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ]
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "shareholder",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "addShareholder",
      "type": "function",
      "payable": false,
      "stateMutability": "nonpayable",
      "constant": false,
      "outputs": []
    },
    {
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor",
      "inputs": []
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "FailedSend",
      "type": "fallback",
      "payable": true,
      "stateMutability": "payable"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "FailedSend",
      "type": "event"
    }
  ];


  

class Ethemy extends Component {

    constructor(props) {
        // Just for initializing state and binding methods. 
        // web3.eth.defaultAccount = web3.eth.accounts[0]
        var Contract = web3.eth.contract(abi, address, {from:web3.eth.coinbase});
        // console.log(Contract.at(address))
        // console.log(Contract.at(address).addShareholder(web3.eth.coinbase, 10));
        // Contract.at(address).getShareholders.call();
        // //var result = Contract.addShareholder(web3.eth.coinbase);


        
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            web3: web3,
            address: address,
            abi: devAbi,
            contract: Contract.at(address),
            balance: 0,
            length: 0
        }
    }

    componentWillMount() {
        // Get the block hash from URL args
        // var block_hash = this.props.match.params.blockHash;
        // this.getBlockState(block_hash);
    }

    getContract(e) {
        // console.log("Block_hash: " + block_hash);

        console.log(this.state.address);
        var Contract = this.state.web3.eth.contract(this.state.abi, this.state.address, {from:web3.eth.coinbase})
            .at(this.state.address);
        console.log(Contract)
        var balance = web3.fromWei(this.state.web3.eth.getBalance(this.state.address), "ether");
        var length = Contract.getLength.call();
        var shareholders = Contract.getAddresses.call();
        console.log(shareholders);
        console.log("test: " + length);
        console.log(balance.toNumber());
        this.setState({
            contract: Contract,
            balance: balance.toNumber()
        })

    }
    handleChange(event) {
        console.log(event.target.name);
        var key = event.target.name;
        var obj = {};
        obj[key] = event.target.value;
        this.setState(obj);
    }

    render() {

        // const block = this.state.block;
        // const difficulty = parseInt(block.difficulty, 10);
        // const difficultyTotal = parseInt(block.totalDifficulty, 10);


        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Property</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Address</td>
                            <td>
                            <input type="text" name="address" value={this.state.address} onChange={this.handleChange}/><br/>
                            </td>
                        </tr>
                        <tr>
                            <td>Balance</td>
                            <td>
                            <input type="text" name="balance" value={this.state.balance} onChange={this.handleChange}/><br/>
                            </td>
                        </tr>
                        <tr>
                            <td>Shareholders</td>
                            <td>
                            <select name="shareholders" >
                                <option>Shareholders</option>
                            </select>
                            </td>
                        </tr>
                        <tr>
                            <td>Length</td>
                            <td>
                            <input type="text" name="length" value={this.state.length} onChange={this.handleChange}/><br/><br/>
                            </td>
                        </tr>
                    </tbody>
                </table>
                
                
                
                <br/>
                
                <button onClick={(e) => this.getContract(e)}>Test</button>
            </div>
        );
    }
}
export default Ethemy;