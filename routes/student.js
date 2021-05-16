var express = require('express');
var router = express.Router();
// var student = require('./bean/student_info');
var connection = require('../model/connect_mysql');
router.get('/student',(req,res)=>{
    let sql = 'select * from tab_student where sname ="'+req.session.now_name+'"'
    connection.query(sql,(err,results,fields)=>{
        for(i in results){
            var uname = results[i].sname;
            var school = results[i].school;
            var b_class = results[i].class;
        }
        req.session.school=school;
        req.session.b_class=b_class;
        // console.log(results);
        // console.log(uname,school,b_class);
        res.render("student",{user:uname,b_school:school,be_class:b_class})
    })


    // console.log(uname,school,b_class);
})
router.post('/student',(req,res)=>{
})
module.exports=router