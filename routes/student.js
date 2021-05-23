var express = require('express');
var router = express.Router();
// var student = require('./bean/student_info');
var connection = require('../model/connect_mysql');
router.get('/student',(req,res)=>{
    let sql_search = 'select * from tab_score inner join tab_student on tab_score.student_id = tab_student.id where tab_student.sname = "'+req.session.now_name+'"'
    connection.query(sql_search,(err,search_results)=>{
            if(search_results[0].is_insert == '1'&&req.session.now_name == search_results[0].sname){
                console.log(search_results[0].is_insert);
                let sql = 'select * from tab_student where sname ="'+req.session.now_name+'"'
                connection.query(sql,(err,results,fields)=>{
                        var uname = results[0].sname;
                        var school = results[0].school;
                        var b_class = results[0].class;
                    
        req.session.school=school;
        req.session.b_class=b_class;
                    var chinese = search_results[0].Chinese;
                    var math = search_results[0].math;
                    var english = search_results[0].English;
                    var composite = search_results[0].composite;
                    var university = search_results[0].university;
                    var all = chinese+math+english+composite;
                    // console.log(results);
                    // console.log(uname,school,b_class);
                    res.render("grmp",{user:uname,b_school:school,be_class:b_class,Chinese:chinese,Math:math,English:english,Composite:composite,All:all,University:university})
                })
            }
            else if(search_results[0].is_insert == '0'&&req.session.now_name == search_results[0].sname){
                let sql = 'select * from tab_student where sname ="'+req.session.now_name+'"'
                connection.query(sql,(err,results,fields)=>{
                    for(i in results){
                        var uname = results[0].sname;
                        var school = results[0].school;
                        var b_class = results[0].class;
                    }
        req.session.school=school;
        req.session.b_class=b_class;
                    var chinese = '-';
                    var math = '-';
                    var english = '-';
                    var composite = '-';
                    var university = '-';
                    var all = '-';
                    // console.log(results);
                    // console.log(uname,school,b_class);
                    res.render("grmp",{user:uname,b_school:school,be_class:b_class,Chinese:chinese,Math:math,English:english,Composite:composite,All:all,University:university})
                })
            }
            else{
                console.log(err);
            }
        
    })
    // let sql = 'select * from tab_student where sname ="'+req.session.now_name+'"'
    // connection.query(sql,(err,results,fields)=>{
    //     for(i in results){
    //         var uname = results[i].sname;
    //         var school = results[i].school;
    //         var b_class = results[i].class;
    //     }
    //     req.session.school=school;
    //     req.session.b_class=b_class;
    //     res.render("student",{user:uname,b_school:school,be_class:b_class})
    // })


    // console.log(uname,school,b_class);
})
router.post('/student',(req,res)=>{
})
module.exports=router