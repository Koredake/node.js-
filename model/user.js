//用户集合
const  mongoose  = require('mongoose');
var bcrypt = require('bcrypt');
mongoose.connect('mongodb://localhost/login',{ useNewUrlParser: true ,useUnifiedTopology: true })
        .then(()=>console.log('database connected'))
        .catch(err =>{console.log(err,'connect failed');})
//创建用户集合规则
const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required: true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    school:{
        type:String,
        required:true
    },
    class:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true,
        unique:true
    },
    // mail:{
    //     type:String,
    //     required:true,
    //     unique:true
    // },
    // sex:{
        // type:String,
        // enum:['男','女']
    // },
    // belong_class:{
        // type:String,
        // required:true
    // },
    // hobby:{
        // type:String,
        // default:'无'
    // }
});
// async function createUsers(){
    // const salt = await bcrypt.genSalt(10);
    // const pass = await bcrypt.hash('123456',salt);
    // User.create({
        // userName:'超志昌',
        // password:pass,
        // nickName:'kkkore',
        // phoneNumber:'17777777777',
        // mail:'1781111111@qq.com',
        // sex:'男',
        // belong_class:'b200603'
    // }).then(()=>console.log(' '))
    // .catch(err =>{console.log(err,'err');})
// };
//创建集合
const User = mongoose.model('User',userSchema);
// createUsers();
module.exports={
    User
}