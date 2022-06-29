import React from 'react';
import { createRoot } from 'react-dom/client';
// import 'common.less';
import './index.css';

import App from './app';
type name = 'meng' | 'liu';
const name: name = 'meng';
const n: any = 123;
console.log(n);
console.log(name);

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
    <div>
        hello world
        <App name="meng" age={24}></App>
    </div>,
);
