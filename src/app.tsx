import React from 'react'
import Icon from './icon.png'
import styled from 'styled-components'
import { get } from '@utils/request/ajax'

interface IProps {
    name: string
    age: number
}

function App(props: IProps) {
    const { name, age } = props

    console.log(name)
    console.log(name)

    const getUserList = async () => {
        const res = await get('/users')
        console.log('res', res)
    }

    return (
        <StyleBox>
            <div className="app">
                <span>{`Hello! I'm ${name}, ${age} years old.`}</span>
                <div className="img1"></div>
                <button
                    onClick={() => {
                        getUserList()
                    }}
                >
                    发送请求
                </button>
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
