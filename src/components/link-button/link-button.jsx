import { Button } from 'antd'
import React, { Component } from 'react'
import './link-button.less'
//外形像连接的button按钮
export default function LinkButton(props) {
    return <button {...props} className="linkButton">{props.children}</button>
}
