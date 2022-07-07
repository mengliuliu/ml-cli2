import React from 'react'
import Icon from './icon.png'
import styled from 'styled-components'

interface IProps {
    name: string
    age: number
}

function App(props: IProps) {
    const { name, age } = props
    return (
        <StyleBox>
            <div className="app">
                <span>{`Hello! I'm ${name}, ${age} years old.`}</span>
                <div className="img1"></div>
            </div>
        </StyleBox>
    )
}

const StyleBox = styled.div`
    .img1 {
        width: 300px;
        height: 300px;
        background-image: url(${Icon});
    }
`

export default App
