import React, {Component} from 'react';
import Web3 from 'web3';
import './Home.css';

var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));


class Home extends Component {
    render() {

        // Log accounts from web3 on page load. 
        
        console.log(web3.eth.getBlock(web3.eth.blockNumber));

        return (
            <div className="Home">
                <h2>Home Page</h2>
            </div>
        );
    }
}

export default Home;