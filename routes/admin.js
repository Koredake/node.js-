var express = require('express');
var router = express.Router();
var student = require('./bean/student_info');
var connection = require('../model/connect_mysql');
router.get('/admin',(req,res)=>{
    let sql = 'select * from tab_student';
    connection.query(sql,(err,results)=>{
        res.render('admin',{messages:results})
    })
})
router.post('/admin',(req,res)=>{
    let sql_check = 'select Chinese from tab_score'
    connection.query(sql_check,(err,results_check)=>{
        if(results_check != undefined){
            
        }
    })
    let sql_search = "select id from tab_student";
    connection.query(sql_search,(err,sid_results)=>{
        if(err){
            console.log(err);
        }
        else{
            for(i in sid_results){
                // console.log(req.body.chinese[i],req.body.math[i],req.body.english[i],req.body.composite[i],sid_results[i].id);
                let sql_insert = "insert into tab_score(Chinese,math,English,composite,university,student_id) values('"+req.body.chinese[i]+"','"+req.body.math[i]+"','"+req.body.english[i]+"','"+req.body.composite[i]+"','"+req.body.university[i]+"','"+sid_results[i].id+"')";
                connection.query(sql_insert,(err,insert_results)=>{
                    if(err){
                        console.log(err);
                        res.redirect('admin',{code:200})
                        return
                    }
                    else{
                        res.redirect('admin',{code:201})
                    }
                })
            }
        }
    })

        })
module.exports=router