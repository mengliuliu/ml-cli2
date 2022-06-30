import React from 'react'
import './common.less'
interface IProps {
    name: string
    age: number
}

function App(props: IProps) {
    const { name, age } = props
    return (
        <div className="app">
            <span>{`Hello! I'm ${name}, ${age} years old.`}</span>
        </div>
    )
}

export default App
