//包含应用中所有接口请求函数的模块
// 每个函数的返回值都是promise
import ajax from "./axios";
import jsonp from "jsonp";
import { message } from "antd";
// const BASE = 'http://localhost:3000'
export const reqLogin = (username, password) =>
  ajax("/login", { username, password }, "POST");
export const reqAddUser = (user) => ajax("/manage/user/add", user, "POST");
// 获取一级/二级分类的列表
export const reqCategorys = (parentId) =>
  ajax("/manage/category/list", { parentId });
// 添加分类
export const reqAddCategorys = (parentId, categoryName) =>
  ajax("/manage/category/add", { parentId, categoryName }, "POST");
// 更新分类
export const reqUpdateCategorys = (categoryId, categoryName) =>
  ajax("/manage/category/update", { categoryId, categoryName }, "POST");
//获取商品分页列表
export const reqProducts = (pageNum, pageSize) =>
  ajax("/manage/product/list", { pageNum, pageSize });
  //获取一个分类
  export const reqCategory = (categoryId)=>ajax("/manage/category/info",{categoryId})
//更新商品的状态(上架/下架)
export const  reqUpdaeStatus = (productId, status)=>ajax("/manage/product/updateStatus",{productId,status}, "post")

// 搜索商品分页列表(商品名称/商品描述)
export const reqSearchProducts = (pageNum, pageSize, searchName,searchType) =>//给自己挖坑-_-,看请求头不一样不太对劲
  ajax("/manage/product/search", { pageNum, pageSize, [searchType]:searchName });

// 天气接口:jsp形式的
export const reqWeather = (city) => {
  return new Promise((resolve, reject) => {
    //函数体
    const url = `http://wthrcdn.etouch.cn/weather_mini?city=${city}`;
    //原先是百度的,没获取导数据
    jsonp(url, {}, (error, data) => {
      if (!error && data.status === 1000) {
        const type = data.data.forecast[0].type;

        resolve(type);
      } else {
        message.error("获取天气数据失败");
      }
    });
  });
};

//reqWeather('北京')
