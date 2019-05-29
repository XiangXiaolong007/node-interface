# node-interface
通过node+mongodb搭建的一套集登录、注册、个人信息、评论、点赞等接口

# 下载依赖包
npm install(我的出现过node-pre-gyp install --fallback-to-bulid 的错误)  或者
cnpm install

# 启动项目
npm run server

# 测试接口
使用postman进行测试

# 项目目录结构说明
├── config                           部分公共配置
│   ├── keys.js                         链接mongodb数据库的url以及passport加密方式
│   └── passport.js                     使用passport的配置
├── models                           数据库表模型
│   ├── Post.js                         评论、点赞等
│   ├── Profile.js                      个人信息
│   └── User.js                         账号信息
├── routes                           路由配置
│   └── api
|       ├──post.js                      评论、点赞等接口
|       ├──profile.js                   个人信息接口
│       └──user.js                      登录、注册等接口
├── package.json                     npm包配置文件，里面定义了项目的npm脚本，依赖包等信息
└── validation                       验证,对于一些必填项以及一些类似于邮箱等特殊字符的验证
    ├── education.js                    教育经历
    ├── experience.js                   工作经验
    ├── is-empty.js                     验证是否为空
    ├── login.js                        登录
    ├── post.js                         评论
    ├── profile.js                      个人信息
    └── register.js                     注册

# 举例 登录
项目启动 => 打开postman => 输入localhost:5000/api/users/login => 采用post请求方式 =>
输入email:"1191267220@qq.com",password:123456
