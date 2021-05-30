var express = require('express');
var router = express.Router();
// var {User} = require('../model/user');
var student = require('./bean/register_info')
var bcrypt = require('bcrypt');
var connection = require('../model/connect_mysql')

router.get('/register', function(req, res, next) {
  res.render("register");
});
router.post('/register',(req,res)=>{
function createUsers(){
    let info = new student(req.body.name,req.body.pwd1,req.body.school,req.body.belong_class,req.body.phoneNumber);
    console.log(info.phone_number);
    if(info.name == ''){
      res.send('姓名不能为空')
      return
    }
    else if(info.pwd ==''){
      res.send('密码不能为空')
      return
    }
    else if(req.body.pwd2 == ''){
      res.send('请输入密码确认')
      return
    }
    else if(info.pwd != req.body.pwd2){
      res.send('请保持两次输入密码一致')
      return
    }
    else if(req.body.school = ''){
      res.send('请选择你的学校')
      return
    }
    else if(req.body.belong_class = ''){
      res.send('请选择你的班级')
      return
    }
    else if(info.phone_number = ''){
      res.send('请输入电话号码')
      return
    }
  connection.query("insert into tab_student(sname,password,school,class,phoneNumber) value('"+info.name+"','"+info.pwd+"','"+info.school+"','"+info.belong_class+"','"+info.phone_number+"')",(err,results,fields)=>{
    if(err){
      console.log(err);
    }
  })
  }
  createUsers();
  console.log("error");
// }
  // res.redirect('/login')

})

module.exports = router;
