import React from 'react'

function Son(props: any) {
    const { phone } = props

    console.log('son render')
    return <div className="app">{phone}</div>
}

export default Son
