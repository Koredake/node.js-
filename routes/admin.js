var express = require('express');
var router = express.Router();
var student = require('./bean/student_info');
var connection = require('../model/connect_mysql');
const { json } = require('express');
// router.get('/admin',(req,res)=>{
//                 let sql_show = 'select sname,school,class from tab_student  inner join tab_score  on tab_student.id = tab_score.student_id where tab_score.is_insert = "0"';
//                 connection.query(sql_show,(err,results_show)=>{
//                     res.render('admin',{messages:results_show})
//                 })
//     })
    router.get('/admin',(req,res)=>{
        let sql = 'select sname,school,class,id from tab_student';
        connection.query(sql,(err,results)=>{
            res.render('admin1',{messages:results})
        })
    })
    router.get('/add',(req,res)=>{
        res.render('add')
    })
    router.post('/add',(req,res)=>{
        let sql_add = 'insert into tab_student(sname,school,class) values("'+req.body.add_name+'","'+req.body.add_school+'","'+req.body.add_class+'")';
        connection.query(sql_add,(err,results)=>{
            if(err){
                console.log(err);
            }
            else{
                res.json('add_ok')
            }
        })
    })
    router.get('/del',(req,res)=>{
let id = req.query.id
let sql_del = 'delete from tab_student where id ='+id+''
connection.query(sql_del,(err,results)=>{
    if(err){
        console.log(err);
    }
    else{
        res.json('del_ok')
    }
})
    })
    router.get('/change',(req,res)=>{
        var id_change = req.query.id;
        let sql_se = 'select sname,school,class from tab_student where id ='+id_change+'';
        connection.query(sql_se,(err,results_se)=>{
            if(err){
                console.log(err);
                console.log(results_se);
            }
            else{
                res.json('ok')
        }
        })
        router.get('/change1',(req,res)=>{
            res.render('change')
        })
        router.post('/change',(req,res)=>{
            let sql_change = 'update tab_student set sname ="'+req.body.change_name+'",school ="'+req.body.change_school+'",class="'+req.body.change_class+'" where id ='+id_change+'';
            connection.query(sql_change,(err,results)=>{
                if(err){
                    console.log(err);
                }
                else{
                    res.send('success')
                }
            })
        })
        // res.render('change')
        // let id = req.query.id
        // let sql_change = 'update tab_student set '
    })
    // router.post('/change',(req,res)=>{
    //     let sql_up = 'update yab_student set sname='+req.body.change_name+''
    // })
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