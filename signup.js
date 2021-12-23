var express = require("express");
var app     = express();
var path    = require("path");
var mysql = require('mysql');
var bodyParser = require('body-parser');
const {engine}=require('express-handlebars');
var hbs=require('handlebars');
const router=express.Router();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('images'));
app.use(express.static('image'));
app.use(express.static('Style'));
app.use(express.static('javascript'));

const port=5050;
const session=require('express-session');
const { Script } = require("vm");

//hbs
app.engine('hbs', engine({extname:'.hbs'}));
app.set('view engine','hbs');
app.set('views','./views');
app.use(express.static('views'));

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  //cookie: { secure: true }
}))


var result1=[];
var result2=[];
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "tce_hostel"
});
con.connect(function (err) {
  if (err) throw err;
});
router.get('/signup',function(req,res){
  res.sendFile(path.join(__dirname+'/signup.html'));
});

//view index page
router.get('/index',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
});


router.post('/submit',function(req,res){
  var name=req.body.name;
  var email=req.body.email;
  var dept=req.body.dept;
  var password=req.body.password;
  var c_password=req.body.c_password;
  var sql = "INSERT INTO signup (name,email,dept,password,c_password) VALUES ('"+name+"', '"+email+"','"+dept+"','"+password+"','"+c_password+"')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    
    if(result){
      console.log('1 record inserted');
      res.redirect('/login');
    }
  });
})
router.get('/login',function(req,res){
  res.sendFile(path.join(__dirname+'/login.html'));
});

global.user_name="";
global.user_dept="";
router.post('/loginsubmit',function(req,res){
  var email=req.body.email;
  var password=req.body.password;
  con.query("SELECT * FROM signup where email=?",[email], function (err, result) {
    if (err) throw err;
    result1=result;
    if (result1.length>0){
       user_name = result[0].name;
       user_dept = result[0].dept;
      if (result1[0].password==password){
        res.redirect('/mainpage');
      }
      else{
        res.redirect('/login');
      }
    }
  });

  con.query("SELECT * FROM admin where email=?",[email],function(err,result){
    if (err) throw err;
    result2=result;
    
    if (result2.length>0){
      if (result2[0].password==password){
        res.redirect('/adminhome');
      }
      else{
        console.log("second else");
        res.redirect('/login');
      }
    }
  });
});

var menu=[];
  var sql = "select * from mess";
  con.query(sql, function (err, result) {
    if (err) throw err;
    menu=result;

});


  var sql1= "select sno,day,breakfast from mess";
  con.query(sql1, function (err, result) {
    if (err) throw err;
    breakfast=result;
  });
  var sql2= "select sno,day,lunch from mess";
  con.query(sql2, function (err, result) {
    if (err) throw err;
    lunch=result;
  });
  var sql3= "select sno,day,dinner from mess";
  con.query(sql3, function (err, result) {
    if (err) throw err;
    dinner=result;
  });

router.get('/mess',function(req,res){
    res.send(menu);
});
router.get('/breakfast',function(req,res){
    res.send(breakfast);

});
router.get('/lunch',function(req,res){
    res.send(lunch);
});
router.get('/dinner',function(req,res){
    res.send(dinner);
});
router.get('/attendance',function(req,res){
  res.sendFile(path.join(__dirname+'/attendance.html'));
})

router.get('/messmenu',function(req,res){
    res.sendFile(path.join(__dirname+'/messmenu.html'));
})


router.get('/Discussionforum',function(req,res){
  res.sendFile(path.join(__dirname+'/Discussionforum.html'));
})
router.get('/complaint',function(req,res){
  res.sendFile(path.join(__dirname+'/complaint.html'));
})

router.get('/adminmess',function(req,res){
  res.sendFile(path.join(__dirname+'/adminmess.html'));
})
router.get('/adminhome',function(req,res){
  res.sendFile(path.join(__dirname+'/adminhome.html'));
});
router.get('/mainpage',function(req,res){
  res.sendFile(path.join(__dirname+'/Mainpage.html'));
})
router.post('/adminmesssubmit',function(req,res){
  var day=req.body.day;
  var food=req.body.food;
  var fname=req.body.foodname;
  var sql4="";
  if (food=="Breakfast"){
    sql4 = "UPDATE mess SET breakfast=? where day=?";
  }
  else if (food=="Lunch"){
    sql4 = "UPDATE mess SET lunch=? where day=?";
  }
  else{
    sql4 = "UPDATE mess SET dinner=? where day=?";
  }
  
  con.query(sql4, [fname,day], function (err, result) {
    if (err) throw err;
    if (result){
      res.redirect('/adminmess');
    }
  });
  });

router.get('/home',(req,res)=>{
    res.render('main');
})

//Room allotments
global.block_name="";
global.floor_name="";
global.rooms1=[];
router.post('/room_check',(req,res)=>{
  var rooms=[];
  var block=req.body.block;
  block_name=block;
  var floor=req.body.floor;
  floor_name=floor;
  if(floor=='Ground'){
    for(var i=1;i<=10;i++){
      rooms.push(block+'-'+i);
    }
  }
  else if(floor=='First'){
    for(var i=11;i<=20;i++){
      rooms.push(block+'-'+i);
    }
  }else{
    for(var i=21;i<=30;i++){
      rooms.push(block+'-'+i);
    }
  }
  rooms1=rooms;
  res.redirect('/roomallotments');
  console.log(rooms1);
})

global.room_num=[];
global.room_name="";
router.post('/room_select',(req,res)=>{
  var rooms=[1,2,3,4];
  var room=req.body.room;
  room_num=rooms;
  room_name=room;
  res.redirect('/roomallotments');
})
router.post('/room_register',(req,res)=>{
      console.log("Hello World");
      var sql = "INSERT INTO room_reg(name,dept,block,floor,room_num) VALUES ('"+user_name+"', '"+user_dept+"','"+block_name+"','"+floor_name+"','"+room_name+"')";
      con.query(sql, function (err, result) {
        if (err) throw err;  
        if(result){
          console.log('1 record inserted');
          res.send(`<script>window.alert('Room registered successfully');window.location.href='/roomallotments';</script>`);
        }
        else{
          res.send(`<script>window.alert('Room register failed');window.location.href='/roomallotments';</script>`);
        }
      });
})

router.get('/roomallotments',function(req,res){
  res.render('Roomallotments',{rooms1,room_num,room_name});
})


app.use('/',router);
app.listen(port,()=>{
  console.log(`Running at Port ${port}`);
});
