// 应用的根组件
// import { div } from 'prelude-ls'
import React from 'react'
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import { Button ,message} from 'antd'
import Login from './pages/login/login.jsx'
//import Admin from './pages/login/admin'
import Admin from './pages/admin/admin'
export default class App extends React.Component{
  handleClick = ()=>{
   
      message.success('This is a success message');
    
  }
  render (){
    return  (
      // <Button onClick={this.handleClick}>Default Button</Button>
      <BrowserRouter>  
       <Switch>     
         <Route path='/login' component={Login} ></Route>
        <Route path='/' component={Admin} ></Route>
       </Switch>
      </BrowserRouter>
    )
  }
}