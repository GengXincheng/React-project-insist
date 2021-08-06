import React, { Component } from 'react'
import { Switch,Route ,Redirect} from 'react-router-dom'
import Home from './home'
import ProductDetail from './detail'
import ProductAddupdate from './add-update'
// 商品路由
export default class Product extends Component {

    render() {
        return (
            <Switch>
                <Route path="/product/detail" component={ProductDetail}></Route>
                <Route path="/product/add-update" component={ProductAddupdate}></Route>
                <Route exact  path="/product" component={Home}></Route>
                <Redirect to="/product"></Redirect>
            </Switch>
        )
    }
}
