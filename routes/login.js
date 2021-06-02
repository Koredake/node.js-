var express = require('express');
// var bcrypt = require('bcrypt');
// var crypto = require('crypto');
var connection = require('../model/connect_mysql');
var router = express.Router();

router.get('/login', function(req, res, next) {
  res.render('login');
});
router.post('/login', (req,res)=>{
  let sql_ad = 'select a_name,a_password from tab_admin';
  connection.query(sql_ad,(err,ad_result)=>{
    if(ad_result[0].a_name == 'admin' && ad_result[0].a_password == req.body.pwds){
      res.redirect('/admin')
    }
    else{
      let st_sql = 'select sname,password from tab_student where sname ='+req.body.usr+'';
      connection.query(st_sql,(err,st_results)=>{
       console.log(req.body.usr); 
        console.log(st_results);
        if(st_results == undefined){
          res.json({code_status:'err'})
        }
       else if(st_results != undefined && st_results[0].password == req.body.pwds){
          res.json({code_status:'ok'})
        }
        else{
          res.json({code_status:'err'})
        }
      })
    }
    // else{
    //   let sql_st = 'select sname ,password from tab_student where sname ='+req.body.usr+'';
    //   connection.query(sql_st,(err,st_results)=>{
    //     if(st_results[0].password == req.body.pwds){
    //     res.json({code_status:'ok'})
    //     }
    //   })
    // }
  })
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
