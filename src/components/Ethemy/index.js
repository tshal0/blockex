import React, {Component} from 'react';
import Web3 from 'web3';
// import _ from 'lodash';
//import {Link} from 'react-router-dom';
import './Ethemy.css';

var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
var address = "0x5aa46c0ea39cbea436465d201a5fe6f4da0d8418";
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
      "constant": false,
      "inputs": [
        {
          "name": "shareholder",
          "type": "address"
        }
      ],
      "name": "addShareholder",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "payable": true,
      "stateMutability": "payable",
      "type": "fallback"
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
        web3.eth.defaultAccount = web3.eth.accounts[0]
        var Contract = web3.eth.contract(abi, address, {from:web3.eth.coinbase});
        console.log(Contract.at("0x5aa46c0ea39cbea436465d201a5fe6f4da0d8418").addShareholder(web3.eth.coinbase));
        //var result = Contract.addShareholder(web3.eth.coinbase);

        
        super(props);
        this.state = {

        }
    }

    componentWillMount() {
        // Get the block hash from URL args
        // var block_hash = this.props.match.params.blockHash;
        // this.getBlockState(block_hash);
    }

    componentWillReceiveProps(nextProps) {
        // var block_hash_old = this.props.match.params.blockHash;
        // var block_hash_new = nextProps.match.params.blockHash;
        // if (block_hash_old !== block_hash_new){
        //     this.getBlockState(block_hash_new);
        // }
    }

    getBlockState(block_hash) {
        // console.log("Block_hash: " + block_hash);

        // var currBlock = web3.eth.getBlock(block_hash);
        // console.log(JSON.stringify(currBlock));

        // // set the component state

        // this.setState({
        //     block_id: currBlock.number,
        //     block_has: currBlock.hash,
        //     block_ts: Date(parseInt(this.state.block.timestamp, 10)).toString(),
        //     block_txs: parseInt(currBlock.transactions.slice().length, 10),
        //     block:currBlock
        // })
    }

    render() {

        // const block = this.state.block;
        // const difficulty = parseInt(block.difficulty, 10);
        // const difficultyTotal = parseInt(block.totalDifficulty, 10);


        return (
            <div>Test</div>
        );
    }
}
export default Ethemy;