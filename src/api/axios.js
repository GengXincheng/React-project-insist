// 发送异步axios请求的模块
// 封装axios库
//函数的返回值是promise对象

// 优化:统一处理请求异常
// 在外层包一个自己创建的promise对象
//请求出错提示
import axios from 'axios'
export default function ajax ( url , data={}, type='GET'){
    return new Promise((resolve,reject)=>{
        let promise
        if(type === 'GET'){//发送get请求
            promise =  axios.get(url,{//配置对象
                params:data//params不能随便改,是用来指定我当前请求的参数的一个配置 
            })
        }else{ //发送post强请求
            promise = axios.post(url,data)
        }
        promise.then(response=>{
            resolve(response.data)
           // alert('成功')
        }).catch(error=>{
            alert(error.message)
        })
    })
   
}