import React from 'react'
import Icon from './icon.png'
import Son from './son'
import styled from 'styled-components'
import { get } from '@utils/request/ajax'

interface IProps {
    name: string
    age: number
}

function App(props: IProps) {
    const { name, age } = props
    const [email, setEmail] = React.useState<string>('123456@qq.com')
    const [phone, setPhone] = React.useState<number>(15655267370)
    React.useEffect(() => {
        // setEmail('123')
        // setPhone(15655267370)
    }, [])

    const getUserList = async () => {
        const res = await get('/users')
        console.log('res', res)
    }

    console.log('app render')
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
                <button
                    onClick={() => {
                        // setPhone(13456)
                        setEmail('13456')
                    }}
                >
                    修改email
                </button>
                <button
                    onClick={() => {
                        import(/* webpackPreload: true */ 'lodash').then(({ default: _ }) => {
                            const element = document.createElement('div')
                            element.innerHTML = _.join(['Hello', 'webpack'], ' ')
                            document.body.appendChild(element)
                        })
                    }}
                >
                    动态加载
                </button>

                <Son phone={phone}></Son>
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
