import React from 'react';
import { render } from 'react-dom';

import './assets/styles';
import Root from './components/Root';

const rootElement = document.getElementById('root');

render(React.createElement(Root), rootElement);
