var express = require('express');
var router = express.Router();
var student = require('./bean/student_info');
var connection = require('../model/connect_mysql');
const { json } = require('express');
router.get('/admin',(req,res)=>{
                let sql_show = 'select sname,school,class from tab_student  inner join tab_score  on tab_student.id = tab_score.student_id where tab_score.is_insert = "0"';
                connection.query(sql_show,(err,results_show)=>{
                    res.render('admin',{messages:results_show})
                })
            
    })
router.post('/admin',(req,res)=>{
    let sql_search = "select tab_student.id from tab_score inner join tab_student on tab_score.student_id = tab_student.id where is_insert = 0";
    connection.query(sql_search,(err,sid_results)=>{
            if(sid_results.length==1){
                let sql_update = "update tab_score set Chinese = '"+req.body.chinese+"',math = '"+req.body.math+"',English = '"+req.body.english+"',composite = '"+req.body.composite+"',university = '"+req.body.university+"',is_insert = '1'where student_id ="+sid_results[0].id+"";
                connection.query(sql_update,(err,update_results)=>{
                    if(err){
                        console.log(err);
                    }
                    else{
                        res.send('保存成功')
                    }
                })
            }
            else{
                for(i in sid_results){
                let sql_update = "update tab_score set Chinese = '"+req.body.chinese[i]+"',math = '"+req.body.math[i]+"',English = '"+req.body.english[i]+"',composite = '"+req.body.composite[i]+"',university = '"+req.body.university[i]+"',is_insert = '1' where student_id ="+sid_results[i].id+"";
                connection.query(sql_update,(err,update_results)=>{
                    if(err){
                        console.log(err);
                    }
                    else{
                        res.send('保存成功')
                    }
                })
            }
        }
        
    })

        })
module.exports=router