import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpg';

class App extends Component {
    state = { walletInfo: {} };

    componentDidMount() {
        fetch(`${document.location.origin}/api/wallet-info`)
            .then(response => response.json())
            .then(json => this.setState({ walletInfo:json }));
    }

    render() {
        const{ address, balance } = this.state.walletInfo;

        return (
            <div className='App'>
                <img className='logo' src={logo}></img>
                <br />
                <div className='title'>
                    <h1>Welcome to the Cryptochain ...</h1>
                </div>
                <br />
                <div className='ButtonInfo'>
                <Link to='/blocks' class="btn btn-primary" role="button" >Blocks</Link>{/* It will generate <a> tag, which used in index.css   */}
                <Link to='/conduct-transaction' class="btn btn-primary" role="button">Conduct a Transaction</Link>
                <Link to='/transaction-pool' class="btn btn-primary" role="button">Transaction Pool</Link>
                </div>
                <br />  
                <div className='WalletInfo'>
                    <div>Address: {address}</div>
                    <div>Balance: {balance}</div>
                </div>
            </div>
        );
        
    }
}

export default App; // share files