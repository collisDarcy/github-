import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import './index.css'
export default class List extends Component {
  state = {
    users: [],//初始化状态，users初始值为数组
    isFrist: true,//是否为第一次打开页面
    isLoading: false,//标识是否处于加载中
    err: '',//存储请求相关的错误信息
  }
  componentDidMount(){
    //发布消息，第二个是消息，消息中有两个参数
  this.token= PubSub.subscribe('AppMessage',(_,stateObj)=>{
      this.setState(stateObj)
    })
  }
  componentWillUnmount(){
    PubSub.unsubscribe(this.token)
  }
  render() {
    const { users, isFirst, isLoading, err } = this.state
    return (
      <div className="row">
        {
          isFirst ? <h2>输入关键字</h2> :
            isLoading ? <h2>加载中,请稍后.....</h2> :
              err ? <h2 style={{ color: 'red' }}>{err}</h2> :
                users.map((usersObj) => {
                  return (
                    <div className="card" key={usersObj.id}>
                      <a href={usersObj.html_url} target="_blank" rel="noreferrer">
                        <img src={usersObj.avatar_url} style={{ width: '100px' }} alt="" />
                      </a>
                      <p className="card-text">{usersObj.login}</p>
                    </div>
                  )
                })
        }
      </div>
    )
  }
}
