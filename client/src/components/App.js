import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpg';
import { CopyToClipboard } from 'react-copy-to-clipboard';

class App extends Component {
    state = { value: '', copied: false, walletInfo: {} };

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
                    <h1>Welcome to the Cryptocurrency project!</h1>
                </div>
                <br />
                <div className='ButtonInfo'>
                <div className='Button'><Link to='/blocks' class="btn btn-primary" role="button" >Blocks</Link>{/* It will generate <a> tag, which used in index.css   */}</div>
                <div className='Button'><Link to='/conduct-transaction' class="btn btn-primary" role="button">Send To</Link></div>
                <div className='Button'><Link to='/transaction-pool' class="btn btn-primary" role="button">Transaction Pool</Link></div>
                </div>
                <br />  
                <div className='WalletInfo'>
                    {/* <div>Address: {address}</div> */}
                        Public Key Address: <input value={address}
                        onChange={({ target: { address } }) => this.setState({ address, copied: false })} />
                    
                    <CopyToClipboard text={address}
                         onCopy={() => this.setState({ copied: true })}>
                        <button className='Button' class="btn btn-info">Copy</button>
                    </CopyToClipboard>
                    

                    <div>Balance: {balance}</div>
                </div>
            </div>
        );
        
    }
}

export default App; // share files

// Adapted from: https://github.com/15Dkatz/cryptochain