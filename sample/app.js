var express = require('express')
var app = express()
var bodyParser=require('body-parser')

//mysql 모듈 불러오기
var mysql = require('mysql')

//mysql 커넥션 생성
var connection = mysql.createConnection({
    host : "127.0.0.1", //서버 로컬 IP
    port : 3306,
    user : "root", //계정 아이디
    password : "1234", //계정 비밀번호
    database : "test" //접속할 DB
})

//mysql 접속
connection.connect()

//body parser 사용
app.use(bodyParser.urlencoded({extended:true}))

app.get('/', function (req, res) {
    res.send("Hello, World!")
})

//select all
app.get('/user', function (req, res) {
    var query = connection.query('select * from user',function(err,rows){
        console.log(rows);
        res.json(rows);
    });
    console.log(query);
})

//insert user
app.post('/add', function (req, res) {

    var userID = req.body.id
    var userPW = req.body.pw

    if(userID && userPW) { // userID와 userPW가 유효하다면

        //SQL문 실행
        connection.query("INSERT INTO user (userID, userPW) VALUES ('"+ userID +"', '"+userPW+"')" , 
            function (error, result, fields) {

            if (error) { //에러 발생시
                res.send('err : ' + error)
            }
            else { //실행 성공
                console.log( userID + ',' + userPW )
                res.send('success create user name: '+ userID +' pw: ' + userPW)
            }
        })
    }

})

//서버 시작
app.listen(8080, function () {
    console.log("server starting with 8080")
})