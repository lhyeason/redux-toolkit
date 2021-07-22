var express = require('express')
var app = express()
var fs = require('fs')
var path = require('path')

// 获取本地数据
var postsData = require('./posts.json')

// 解决跨域问题
var  cors = require('cors')
app.use(cors())

// 转码，获取前端请求参数
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// 读取，修改本地文件
var newList = [];
function updateJson(params) {
    fs.readFile(path.join(__dirname, './posts.json'), 'utf8', function (err, data) {
        if (err) throw err;
        let list = JSON.parse(data);
        console.log(list);
        for (let i = 0; i < list.length; i++) {
            if(params.id === list[i].id) {
                continue;
            }
            newList.push(list[i]);
        }
        console.log(newList);
     
        let newContent = JSON.stringify(newList, null, 4);
        console.log(newContent);
        fs.writeFile('./result.json', newContent, 'utf8', (err) => {
            if (err) throw err;
            console.log('success done');
        });
    })
}

updateJson({id:1});

// 处理前端请求
app.get('/posts', (req, res) => {
    res.jsonp(postsData)
})

app.post('/post', (req, res) => {
    console.log(req.body)
})

//绑定端口号启动服务器
app.listen(5050, function () {
    console.log('服务器启动成功，可以通过"http://127.0.0.1:5050/"来进行访问')
})