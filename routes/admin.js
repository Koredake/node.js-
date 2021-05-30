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
    // router.get('/admin',(req,res)=>{
    //     let sql = 'select sname,school,class,id from tab_student';
    //     connection.query(sql,(err,results)=>{
    //         res.render('admin1',{messages:results})
    //     })
    // })
    router.get('/admin',(req,res)=>{
        res.render('index1')
    })
    router.get('/tables',(req,res)=>{
        let sql_show = 'select id,sname,school,class,student_num from tab_student where school = "南昌二中" order by class,student_num'
        connection.query(sql_show,(err,results_show)=>{
            if(err){
                console.log(err);
            }
            else{
                let sql_sd = 'select * from tab_student where school = "师大附中" order by class,student_num'
                connection.query(sql_sd,(err,sd_results)=>{
                    console.log(sd_results);
                    res.render('tables',{st_info:results_show,sd_info:sd_results})
                })
            }
        })
    })
    router.get('/add',(req,res)=>{
        let sql_se_add = 'select school_name,class_name from tab_school as s inner join tab_class as c on c.school_id = s.id'
        connection.query(sql_se_add,(err,sc_results)=>{
            if(err){
                console.log(err);
            }
            else{
                console.log(sc_results);
                res.render('add',{sc_info:sc_results})}
        })
    })
    router.post('/add',(req,res)=>{
        let sql_add = 'insert into tab_student(sname,school,class,student_num) values("'+req.body.add_name+'","'+req.body.add_school+'","'+req.body.add_class+'",'+req.body.stu_num+')';
        connection.query(sql_add,(err,results)=>{
            if(err){
                console.log(err);
                res.send(err)
            }
            else{
                res.redirect('/tables')
            }
        })
    })
    router.get('/del',(req,res)=>{
let id = req.query.id;
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
                res.redirect('/tables')
            }
        })
    })
    router.get('/search',(req,res)=>{
        let in_name = req.query.name;
        let sql_find = 'select * from tab_student where sname = "'+in_name+'"';
        connection.query(sql_find,(err,results)=>{
            if(err){
                console.log(err);
                res.json({status:'err'})
            }
            else if(results.length == 0){
                console.log(results);
                res.json({status:'emp'})
            }
            else{
                res.json({search_res:results,status:'okay'})
                }
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