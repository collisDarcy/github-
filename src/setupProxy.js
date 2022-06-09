const {createProxyMiddleware}=require('http-proxy-middleware');
module.exports=function(app){
  app.use(
    '/api',//遇见api的前缀请求的时候，会触发该代理机制
    createProxyMiddleware({
      target:'http://localhost:5000',//请求转发给谁，让谁做代理
      changeOrigin:true,//控制服务器收到的请求头中的Host的值
      pathRewrite:{'^/api':''}//重写请求的路径
    })
  )
}