import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './common.less'

import App from './app'
type name = 'meng' | 'liu'
const name: name = 'meng'
const n: any = 123
console.log(n)
console.log(name)
console.log(name)

if (module && module.hot) {
    module.hot.accept('./app.tsx')
    module.hot.accept('./index.css')
}

const container: any = document.getElementById('root')
const root = createRoot(container) // createRoot(container!) if you use TypeScript

root.render(
    <div>
        <div className="img"> hello world!</div>
        <App name="meng" age={24}></App>
    </div>,
)
