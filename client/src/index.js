import React from 'react';
import { render } from 'react-dom'; // this function is the key to insert react into frontend
//allow us to dynamically insert react components into the HTML document
import App from './components/App';
import './index.css';

render( 
    <App />,
    document.getElementById('root')
);