var express = require('express');
var router = express.Router();
var student = require('./bean/student_info');
var connection = require('../model/connect_mysql');
const { json } = require('express');
router.get('/admin',(req,res)=>{
    let sql_check = 'select is_insert from tab_score';
    connection.query(sql_check,(err,results_check)=>{
        for(i in results_check){
            if(results_check[i].is_insert =='0'){
                let sql_show = 'select sname,school,class from tab_student st inner join tab_score sc on st.id = sc.student_id where sc.is_insert = 0';
                connection.query(sql_show,(err,results_show)=>{
                    res.render('admin',{messages:results_show})
                })
            }
            else{
                console.log(err);
            }
        }
    })
})
router.post('/admin',(req,res)=>{
    let sql_search = "select * from tab_score inner join tab_student on tab_score.student_id = tab_student.id where is_insert = 0";
    connection.query(sql_search,(err,sid_results)=>{
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
            
        
    })

        })
module.exports=router