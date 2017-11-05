import React, {Component} from 'react';
import Web3 from 'web3';

import { Icon, Label, Menu, Table, Button, Input, Dropdown } from 'semantic-ui-react'
// import _ from 'lodash';
//import {Link} from 'react-router-dom';
import './Ethemy.css';

var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
var address = "0x1b5ae8f48bdc13bf7ed78b062fd86626d56282d3";
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
      "name": "dispense",
      "outputs": []
    },
    {
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "constant": false,
      "inputs": [
        {
          "name": "_addr",
          "type": "address"
        }
      ],
      "name": "addAddress",
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
      "stateMutability": "nonpayable",
      "type": "function",
      "constant": false,
      "name": "withdraw",
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
      "name": "kill",
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
      "inputs": [],
      "constant": false,
      "name": "withdrawAll",
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
      "constant": true,
      "inputs": [],
      "name": "getLength",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_addr",
          "type": "address"
        }
      ],
      "name": "getShares",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
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
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "",
          "type": "bytes32"
        }
      ],
      "name": "FailedAddShareholder",
      "type": "event"
    }
  ];


  

class Ethemy extends Component {

    constructor(props) {
        // Just for initializing state and binding methods. 
        // web3.eth.defaultAccount = web3.eth.accounts[0]
        var Contract = web3.eth.contract(devAbi, address, {from:web3.eth.coinbase}).at(address);
        
        // console.log(Contract.at(address))
        // console.log(Contract.at(address).addShareholder(web3.eth.coinbase, 10));
        // Contract.at(address).getShareholders.call();
        // //var result = Contract.addShareholder(web3.eth.coinbase);
        var balance = web3.fromWei(web3.eth.getBalance(address), "ether");
        var shareholders = Contract.getAddresses.call();
        
        var shareholderBalances = [];
        var accountBalances = [];
        
        for (var i = 0; i < shareholders.length; i++) {
            var tBal = Contract.getShares.call(shareholders[i]);
            var tempBal = web3.eth.getBalance(shareholders[i]);
            console.log(web3.fromWei(tBal.toNumber()), "ether");
            shareholderBalances.push(tBal.toNumber());
            accountBalances.push(tempBal.toNumber());
        } 
        

        var accounts = web3.eth.accounts;
        var options = [];
        for (var i = 0; i < accounts.length; i++) {
            var tBal = web3.eth.getBalance(accounts[i]).toNumber();
            options.push({key:accounts[i], text:accounts[i], balance:web3.fromWei(tBal, "ether"), value:i});
            console.log(options[i]);
        }
        
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSelection = this.handleSelection.bind(this);
        this.addShareholder = this.addShareholder.bind(this);
        this.state = {
            web3: web3,
            address: address,
            abi: devAbi,
            contract: Contract,
            balance: balance,
            length: 0,
            shareholders: shareholders,
            shareholderBalances: shareholderBalances,
            accountBalances: accountBalances,
            accounts: accounts,
            selectedAccount: "",
            options: options
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
        var accountBalances = [];

        for (var i = 0; i < shareholders.length; i++) {
            var tBal = Contract.getShares.call(shareholders[i]);
            var tempBal = web3.eth.getBalance(shareholders[i]);
            console.log(web3.fromWei(tBal.toNumber()), "ether");
            shareholderBalances.push(tBal.toNumber());
            accountBalances.push(tempBal.toNumber());
        } 

        console.log(shareholders);
        console.log("test: " + length);
        console.log(balance.toNumber());
        this.setState({
            shareholders: shareholders,
            shareholderBalances: shareholderBalances,
            accountBalances: accountBalances,
            contract: Contract,
            balance: balance.toNumber()
        })

    }
    handleChange(event) {
        console.log(event.target);
        var key = event.target.name;
        var obj = {};
        obj[key] = event.target.value;
        this.setState(obj);
    }
    handleSelection(e, props) {
        var obj = {selectedAccount: props.value};
        console.log(props.value);
        this.setState(obj);
    }

    addRow(event){
        var nextShareholders = this.state.shareholders;
        var nextShareholdersBal = this.state.Contract.getShares.call(event.target.value);
        var nextShareholdersBals = this.state.shareholderBalances;
        nextShareholders.push(event.target.value);
        nextShareholdersBals.push(nextShareholdersBal);

        this.setState({
            shareholders: nextShareholders,
            shareholderBalances: nextShareholdersBals
        })
    }

    addShareholder(event) {
        console.log(this.state.contract);
        console.log(this.state.accounts[6]);
        this.state.web3.eth.defaultAccount = this.state.web3.eth.coinbase;
        this.state.contract.addAddress(this.state.accounts[6]);
        this.getContract();
        
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
                        <Table.HeaderCell >Balance</Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>

                    <Table.Body>

                        {this.state.shareholders.map((row, i) =>
                            <Table.Row>
                                <Table.Cell collapsing>{row}</Table.Cell>
                                <Table.Cell >{this.state.web3.fromWei(this.state.shareholderBalances[i], "ether")}</Table.Cell>
                                <Table.Cell>{this.state.web3.fromWei(this.state.accountBalances[i], "ether")}</Table.Cell>
                            </Table.Row>
                        )}

                        {/* <Table.Cell collapsing>
                        <Icon name='folder' /> node_modules
                        </Table.Cell>
                        <Table.Cell collapsing>Initial commit</Table.Cell>
                        <Table.Cell collapsing textAlign='right'>10 hours ago</Table.Cell> */}
                        
                    </Table.Body>
                </Table>
                <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Select Account</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>
                                <Dropdown selection options={this.state.options} onChange={this.handleSelection}>
                                    
                                </Dropdown>
                            </Table.Cell>
                            <Table.Cell>
                                <Button onClick={this.addShareholder}>Add Shareholder</Button>
                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
                
            </div>
        );
    }
}
export default Ethemy;