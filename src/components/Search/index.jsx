import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import axios from 'axios'
export default class Search extends Component {
  search = () => {
    // 获取用户的输入的值并进行连续的解构赋值并且重命名
    const { keyWordElement: { value: keyword } } = this
    // 发送请求前通知App更新状态
    PubSub.publish('AppMessage',{isFirst:false,isLoading:true})
    // this.props.updateAppState({ isFirst: false, isLoading: true })
    // 发送网络请求
    axios.get(`/api/search/users?q=${keyword}`).then((response => {
      //请求成功之后通知App更新状态
      PubSub.publish('AppMessage',{isLoading:false,users:response.data.items})
      // this.props.updateAppState({ isLoading: false, users: response.data.items })
    }), (error => {
      // 请求失败之后通知App更新状态
      PubSub.publish('AppMessage',{isLoading:false,err:error.message})
      // this.props.updateAppState({ isLoading: false, err: error.message })
    }))
    /*
      发送网络请求---使用fetch发送----未优化
      fetch(`/api/search/users?q=${keyword}`).then(
        response=>{
          console.log('联系服务器成功！');
          return response.json()
        },
      ).then(
        response=>{console.log('获取数据成功了！',response)}
      ).catch(
        error=>{
          console.log('请求出错了',error)
        }
      )
      -------------------------------------------------
      使用fetch发送网络请求--优化后的方案
      try{
        const response = await fetch(`/api/search/user?q=${keyword}`)
        const data= await response.json()
        console.log(data);
        PubSub.publish('AppMessage',{isLoading:false,users:data.items}) 
      }.catch(error){
        console.log('请求出错',error)
        PubSub.publish('AppMessage',{isLoading:false,err:error.message})
      }


    */

  }
  render() {
    return (
      <section className="jumbotron">
        <h3 className="jumbotron-heading">Search Github Users</h3>
        <div>
          <input ref={currentNode => { this.keyWordElement = currentNode }} type="text" placeholder="输入关键词点击搜索" />&nbsp;
          <button onClick={this.search}>搜索</button>
        </div>
      </section>
    )
  }
}
