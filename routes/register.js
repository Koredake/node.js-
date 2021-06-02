var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var connection = require('../model/connect_mysql')

router.get('/register', function(req, res, next) {
  res.render("register");
});
router.post('/register',(req,res)=>{
  let sql_select = "select sname,school,class from tab_student where sname ='"+req.body.name+"' AND school = '"+req.body.school+"' AND class ='"+req.body.belong_class+"'";
  connection.query(sql_select,(err,sel_results)=>{
    if(err){
      console.log(err);
    }
    else{
      if(sel_results.length == 0){
        console.log(sel_results);
        res.json({code_status:'emp'})
      }
      else{
        let sql_update = "update tab_student set sname ='"+req.body.name+"',password = '"+req.body.pwd1+"',email = '"+req.body.email+"' where id = "+sel_results.id+""
        connection.query(sql_update,(err,results_update)=>{
          if(err){
            console.log(err);
          }
          else{
            res.json({code_status:'ok'})
          }
        })
      }
    }
  })
})

module.exports = router;
