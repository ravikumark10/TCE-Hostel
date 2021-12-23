var express = require("express");
var app     = express();
const nodemailer=require('nodemailer');
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

hbs.registerHelper('ifcheck', (x,op,y,options)=> {
  switch(op){
      case '>':
          return (x>y) ? options.fn(this) : options.inverse(this);
      case '<':
          return (x<y) ? options.fn(this) : options.inverse(this);
      case '==':
          return (x==y) ? options.fn(this) : options.inverse(this);
      case '!=':
          return (x!=y) ? options.fn(this) : options.inverse(this);
      default:
          return options.inverse(this);
  }
})
hbs.registerHelper('ifIn',function(elem,list,options){
  if(list.indexOf(elem)>-1){
      return options.fn(this);
  }
 else{
  return options.inverse(this);
 }
});

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
global.user_email="";
global.user_id=""
router.post('/loginsubmit',function(req,res){
  var email=req.body.email;
  var password=req.body.password;
  con.query("SELECT * FROM signup where email=?",[email], function (err, result) {
    if (err) throw err;
    result1=result;
    if (result1.length>0){
       user_name = result[0].name;
       user_dept = result[0].dept;
       user_email =result[0].email;
       user_id=result[0].id;
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


 

  

router.get('/mess',function(req,res){
    res.send(menu);
});
router.get('/breakfast',function(req,res){
  var sql1= "select sno,day,breakfast from mess";
  con.query(sql1, function (err, result) {
    if (err) throw err;
    breakfast=result;
    res.send(breakfast);
  });
    

});
router.get('/lunch',function(req,res){
  var sql2= "select sno,day,lunch from mess";
  con.query(sql2, function (err, result) {
    if (err) throw err;
    lunch=result;
    res.send(lunch);
  });
    
});
router.get('/dinner',function(req,res){
  var sql3= "select sno,day,dinner from mess";
  con.query(sql3, function (err, result) {
    if (err) throw err;
    dinner=result;
    res.send(dinner);
  });
    
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
global.filled=[];
global.filledbeds=[];
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
global.c=0;
router.post('/room_select',(req,res)=>{
  var rooms=[1,2,3,4];
  var room= req.body.room;
  console.log(room[0][0]);
  room_num=rooms;
  room_name=room;
  con.query("select count(*) as c from room_reg where block=? and room_num=?",[room[0][0],room_name],(err,result)=>{
    if (err) throw err;
    console.log(result[0].c);
  c=result[0].c;
  filledbeds=[]
  for (let i=0;i<parseInt(c);i++){
    filledbeds.push(i+1);
  }
    })
  res.redirect('/roomallotments');
})
router.post('/room_register',(req,res)=>{

      console.log("Hello World");
      var sql = "INSERT INTO room_reg(name,dept,block,floor,room_num) VALUES ('"+user_name+"', '"+user_dept+"','"+block_name+"','"+floor_name+"','"+room_name+"')";
      con.query(sql, function (err, result) {
        if (err) throw err;  
        if(result){
          filledbeds=[]
          room_num=[]
          console.log('1 record inserted');
          res.send(`<script>window.alert('Room registered successfully');window.location.href='/roomallotments';</script>`);
        }
        else{
          res.send(`<script>window.alert('Room register failed');window.location.href='/roomallotments';</script>`);
        }
      });
})

router.get('/roomallotments',function(req,res){
console.log(filledbeds)
  res.render('Roomallotments',{filledbeds,c,rooms1,room_num,room_name});
})

router.post('/complaintsubmit',function(req,res){
  var {name,reg_no,complaint}=req.body;
  console.log(user_email)
con.query("INSERT into complaints(name,reg_no,complaint,userid) values(?,?,?,?)",[name,reg_no,complaint,user_id],(err,result)=>{
  if (err) throw err;
  console.log(result)
  if(result){
    console.log("Complaint Raised");
    var returncontent=`<p>Hello ${user_name}, We have received your Complaint.We will resolve it very soon.<br>Thank you<br> TCE Hostel.</p>`
 let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: "tcehostel123@gmail.com", // generated ethereal user
    pass: "tce12345", // generated ethereal password
  },
  tls:{
      rejectUnauthorized:false
  }
});
let mailoptions = {
  from: '"TCE Hostel" <tcehostel123@gmail.com>',
  to: user_email,
  subject: "Complaint Raised",
  html: returncontent,
};

transporter.sendMail(mailoptions,(err, info)=>{
    if (err){
        console.log(err)
    }
    else{
    console.log('Message Sent');
    res.write("<script> window.alert('Complaint raised sucessfully...');window.location.href='/Mainpage'</script>")
    }
})
  }
})
})
router.post('/solve',(req,res)=>{
  var id= req.body.id;
  con.query("update complaints set status='noted' where id=?",[id],(err,result1)=>{
    if (err) throw err;
   con.query("select userid from complaints where id=?",[id],(err,result2)=>{
     if (err) throw err;
     con.query("select email from signup where id=?",[result2[0].userid],(err,result3)=>{
       if (err) throw err;
       var returncontent=`<p>Hello ${user_name}, your complaint has been sent to the management.your issue will be solved soon<br>Thank you<br> TCE Hostel.</p>`
       let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: "tcehostel123@gmail.com", // generated ethereal user
          pass: "tce12345", // generated ethereal password
        },
        tls:{
            rejectUnauthorized:false
        }
      });
      let mailoptions = {
        from: '"TCE Hostel" <tcehostel123@gmail.com>',
        to: result3[0].email,
        subject: "Complaint under process",
        html: returncontent,
      };
      
      transporter.sendMail(mailoptions,(err, info)=>{
          if (err){
              console.log(err)
          }
          else{
          console.log('Message Sent');
          res.write("<script> window.alert('Mail sent to user...');window.location.href='/adminhome'</script>")
          }
      })
        

     })
   })
  })
})
router.get('/viewcomplaint',(req,res)=>{
  res.sendFile(path.join(__dirname+'/viewcomplaint.html'))
})
router.get('/comp',(req,res)=>{
con.query("select * from complaints where status='unsolved'",(err,result)=>{
  res.send(result);
})
})
app.use('/',router);
app.listen(port,()=>{
  console.log(`Running at Port ${port}`);
});
