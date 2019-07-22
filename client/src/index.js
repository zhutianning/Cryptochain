import React from 'react';
import { render } from 'react-dom'; // this function is the key to insert react into frontend
//allow us to dynamically insert react components into the HTML document
import { Router, Switch, Route } from 'react-router-dom';
import history from './history';
import App from './components/App';
import Blocks from './components/Blocks';
import ConductTransaction from './components/ConductTransaction';
import TransactionPool from './components/TransactionPool';
import './index.css';

render( 
    <Router history={history}>
        <Switch>
            <Route exact={true} path='/' component={App} />
            <Route path='/blocks' component={Blocks} />
            <Route path='/conduct-transaction' component={ConductTransaction} />
            <Route path='/transaction-pool' component={TransactionPool} />
        </Switch>
    </Router>,
    document.getElementById('root')
);