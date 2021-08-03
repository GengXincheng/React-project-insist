// 入口js
import React from 'react'
import ReactDom from 'react-dom'
import App from './App'
//读取local中的user,保存到内存中
import storageUtils from './utils/storageUtils';
import memoryUtils from './utils/memoryUtils';
const user = storageUtils.getUser()
memoryUtils.user = user
ReactDom.render(<App/>,document.getElementById('root'))