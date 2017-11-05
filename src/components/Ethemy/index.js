import React, {Component} from 'react';
import Web3 from 'web3';

import { Icon, Label, Menu, Table, Button, Input } from 'semantic-ui-react'
// import _ from 'lodash';
//import {Link} from 'react-router-dom';
import './Ethemy.css';

var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
var address = "0x0f740f18d49240564995d6325b20f3d65177b136";
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
      "type": "function",
      "inputs": [
        {
          "name": "_addr",
          "type": "address"
        }
      ],
      "constant": false,
      "name": "getShares",
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


  

class Ethemy extends Component {

    constructor(props) {
        // Just for initializing state and binding methods. 
        // web3.eth.defaultAccount = web3.eth.accounts[0]
        var Contract = web3.eth.contract(devAbi, address, {from:web3.eth.coinbase}).at(address);;
        
        // console.log(Contract.at(address))
        // console.log(Contract.at(address).addShareholder(web3.eth.coinbase, 10));
        // Contract.at(address).getShareholders.call();
        // //var result = Contract.addShareholder(web3.eth.coinbase);
        var balance = web3.fromWei(web3.eth.getBalance(address), "ether");
        var shareholders = Contract.getAddresses.call();
        
        var shareholderBalances = [];

        for (var i = 0; i < shareholders.length; i++) {
            var tBal = Contract.getShares.call(shareholders[i]);
            console.log(web3.fromWei(tBal.toNumber()), "ether");
            shareholderBalances.push(tBal.toNumber());
        } 
        
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            web3: web3,
            address: address,
            abi: devAbi,
            contract: Contract,
            balance: balance,
            length: 0,
            shareholders: shareholders,
            shareholderBalances: shareholderBalances
        }
    }

    componentWillMount() {
        // Get the block hash from URL args
        // var block_hash = this.props.match.params.blockHash;
        // this.getBlockState(block_hash);
    }
    /*
    Dev.deployed().then(function(instance){instance.getShares.call(web3.eth.accounts[1]).then(console.log)})
    web3.eth.sendTransaction({from:web3.eth.accounts[1], to: "0x0f740f18d49240564995d6325b20f3d65177b136", value:web3.toWei(13.37, "ether")})
    */
    getContract(e) {
        // console.log("Block_hash: " + block_hash);

        console.log(this.state.address);
        var Contract = this.state.web3.eth.contract(this.state.abi, this.state.address, {from:web3.eth.coinbase})
            .at(this.state.address);
        console.log(Contract)
        var balance = web3.fromWei(this.state.web3.eth.getBalance(this.state.address), "ether");
        var length = Contract.getLength.call();
        var shareholders = Contract.getAddresses.call();
        
        var shareholderBalances = [];

        for (var i = 0; i < shareholders.length; i++) {
            var tBal = Contract.getShares.call(shareholders[i]);
            console.log(web3.fromWei(tBal.toNumber()), "ether");
            shareholderBalances.push(tBal.toNumber());
        } 

        console.log(shareholders);
        console.log("test: " + length);
        console.log(balance.toNumber());
        this.setState({
            shareholders: shareholders,
            shareholderBalances: shareholderBalances,
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
                <Table celled striped>
                    <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Property</Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>

                    <Table.Body>
                    <Table.Row>
                        <Table.Cell collapsing>
                        <Icon name='address book' /> Address
                        </Table.Cell>
                        <Table.Cell >
                            <Input type="text" name="address" value={this.state.address} onChange={this.handleChange}></Input>
                        </Table.Cell>
                        
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell collapsing>
                        <Icon name='law' /> Balance
                        </Table.Cell>
                        <Table.Cell >
                            <Input type="text" name="balance" value={this.state.balance} onChange={this.handleChange}></Input>
                        </Table.Cell>
                        
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell collapsing>
                        <Icon name='user' /> Owner
                        </Table.Cell>
                        <Table.Cell >
                            <Input type="text" name="owner" value={this.state.owner} onChange={this.handleChange}></Input>
                        </Table.Cell>
                        
                    </Table.Row>
                    </Table.Body>
                </Table>

                <Button onClick={(e) => this.getContract(e)}>Refresh Contract</Button>

                <Table celled striped>
                    <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell collapsing>Address</Table.HeaderCell>
                        <Table.HeaderCell >Shares</Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>

                    <Table.Body>

                        {this.state.shareholders.map((row, i) =>
                            <Table.Row>
                                <Table.Cell collapsing>{row}</Table.Cell>
                                <Table.Cell >{this.state.web3.fromWei(this.state.shareholderBalances[i], "ether")}</Table.Cell>
                            </Table.Row>
                        )}

                        {/* <Table.Cell collapsing>
                        <Icon name='folder' /> node_modules
                        </Table.Cell>
                        <Table.Cell collapsing>Initial commit</Table.Cell>
                        <Table.Cell collapsing textAlign='right'>10 hours ago</Table.Cell> */}

                    </Table.Body>
                </Table>
            </div>
        );
    }
}
export default Ethemy;