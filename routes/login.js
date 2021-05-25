var express = require('express');
// var bcrypt = require('bcrypt');
// var crypto = require('crypto');
var connection = require('../model/connect_mysql');
var router = express.Router();
// var {User} = require('../model/user')

router.get('/login', function(req, res, next) {
  res.render('login');
});
router.post('/login', (req,res)=>{
  //接收请求参数  
  const {usr,pwds} = req.body;
  if(usr.length==0 && pwds.length==0){
    res.status(400).render('error')
  }
  else{
    let ad_name = 'admin'
    connection.query("select * from tab_admin",(err,results,fields)=>{
      let a__name = results[0].a_name;
      let a__pas = results[0].a_password;
            if(a__name == ad_name && a__pas == pwds){
        res.redirect('admin')
      }

      else{connection.query("select * from tab_student where sname ='"+usr+"'",(err,results,fields)=>{
        // console.log(err);
        let in_name = results[0].sname;
        let pas = results[0].password;
        req.session.now_name = in_name;
        if(usr == in_name && pwds == pas){
          res.redirect('student')
        }
        else{
          res.render('error')
        }
    })}
        // 将用户输入密码与数据库密码进行解密匹配
        // let istrue = bcrypt.compare(pwds,pas)
    })
  }
  //在数据库中查询用户输入数据对象
// let user = await User.findOne({userName:usr})

//对用户输入数据与数据库数据进行匹配
// if(user){
//   let istrue = await bcrypt.compare(pwds,user.password)
//   if(istrue){res.render('student',{info:usr});}

//   else if(req.session.user == usr && req.session.password == pwds){
//     res.render('student',{info:usr})
//   }
//   else(
//     res.status(400).render('error')
//   )
// }
// else(
//   res.status(400).render('error')
// )
});
module.exports = router
