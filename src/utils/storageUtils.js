//import { getSuggestedQuery } from "@testing-library/react"
import store from 'store'
const USER_KEY = 'user_key'
//进行local数据存储
export default{
    //保存user
    saveUser(user){
      //  localStorage.setItem(USER_KEY,JSON.stringify(user))
      store.set(USER_KEY,user)
    },
    // 删除user
    removeUesr(user){
       // localStorage.removeItem(USER_KEY)
       store.remove(USER_KEY)
    },
    // 读取user
  
    getUser(){
     
      // return JSON.parse(localStorage.getItem(USER_KEY) || '{}')   //避免返回null,造成null.
      return store.get(USER_KEY) || {}
    }
}