import React, { Component } from 'react';
import { FormGroup, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import history from '../history';
import { CopyToClipboard } from 'react-copy-to-clipboard';

class Trading extends Component {
    state = { value: '', copied: false, recipient: '', amount: 0, knownAddresses: [] };

    componentDidMount() {
        fetch(`${document.location.origin}/api/known-addresses`)
            .then(response => response.json())
            .then(json => this.setState({ knownAddresses: json }));
    }

    updateRecipient = event => {
        this.setState({ recipient: event.target.value });
    }

    updateAmount = event => {
        this.setState({ amount: Number(event.target.value) });
    }

    Trading = () => {
        const { recipient, amount } = this.state;

        fetch(`${document.location.origin}/api/transact`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ recipient, amount })
        }).then(response => response.json())
          .then(json => {
              alert(json.message || json.type); 
            //   alert error or|| success.
              history.push('/transaction-pool');
          }); 
    }

    render() {
        return (
            <div className='Trading'>
                <Link to='/' class="btn btn-primary" role="button">Home</Link>
                <h3>Trade With</h3>
                <br />
                <h3>Known Addresses:</h3>
                {
                    this.state.knownAddresses.map(knownAddress => {
                        return (
                            <div key={knownAddress}>
                                {/* <div className='font'>{knownAddress}</div> */}

                                Other Addresses: <input value={knownAddress} className='font'
                                    onChange={({ target: { address } }) => this.setState({ address, copied: false })} />

                                <CopyToClipboard text={knownAddress}
                                    onCopy={() => this.setState({ copied: true })}>
                                    <button className='Button' class="btn btn-info">Copy</button>
                                </CopyToClipboard>
                                

                                <br />
                            </div>
                        );
                    })
                }
                <br />                
                <FormGroup>
                    <FormControl
                        input='text'
                        placeholder='Add Recipient'
                        value={this.state.recipient}
                        onChange={this.updateRecipient}
                    />
                </FormGroup>
                <FormGroup>
                    <FormControl
                        input='number'
                        placeholder='Amount'
                        value={this.state.amount}
                        onChange={this.updateAmount}
                    />
                </FormGroup>
                <div>
                    <Button 
                      bsStyle="danger" 
                      onClick={this.Trading}
                    >
                      Submit
                    </Button>
                </div>
            </div>
        )
    }
}

export default Trading;

// Adapted from: https://github.com/15Dkatz/cryptochain