const express = require('express');
//const multer = require('multer');
const mysql = require('mysql');
//const connection = mysql.createCo
const app = express();

const bodyParser = require('body-parser')
// Request Body parsing Middleware
app.use(bodyParser.json());  
//})
app.use(bodyParser.urlencoded({ extended: false }))

const dbConnection = require('./src/util/mysql.connector')
// insering new code 
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

//creating post in new code
app.post('/Students', (req,res) => {
    const  { id , name , subject , grade} = req.body;
       // name : req.body.name,
       // subject: req.body.subject,
       // grade: req.body.grade
   // }; 
   const sql=  `INSERT INTO Students (id, name , subject, grade)  VALUES ('${id}', '${name}','${subject}', '${grade}')`;
   // connection.query(`INSERT INTO Students SET?`, student, function(error,results,fields){ 
    return dbConnection.query(sql, (error,results) => {
        if (error) {
          console.log('Error inserting data into students table:',error)
           // console.error('Error inserting students:' + error.stack);
            //res.sendStatus(500);
            res.status(500).send('Error inserting data into students table');
           // return;
        } else {
          console.log('Data inserted successfully into students table:', results);
        //console.log(`INSERTED Students with id`+ results.insertId);
        //res.sendStatus(200);
        res.send('Data inserted successfully into students table');
        
           }
             });
               });   // });
//});
// start server in new code
//app.listen(3000,function(){
    //console.log('perp listening on port 3000')
    //dbConnection.connect(function(err){
      //      if (err) throw err
    //        console.log('connected to MySQL')
  //    })
//})

//const post = require('./src/posts/post.model')
// app.get('/api/v1', function (req, res) {
//     return res.json(req.headers)
// })
//update existing posts
//app.patch('/api/v1/posts/:id',function(request,response){
  //  console.log(request.params)
  // get id from request , use id to select a post from db then update
  // const sql = `SELECT * FROM posts WHERE id=${request.params.id} LIMIT 1`
   //return dbConnection.query(sql, function(err,rows) {
     //  if (err) throw err
      //  return response.json(rows)
   //  })

 // const storage = multer.diskStorage({
   // destination: function(req,file,cb) {
     //   cb(null, 'uploads/');
    //},

 //filename:function(req,file,cb) {
   // cb(null,  file.fieldname + '-' + Date.now());
 //}
//});
//const upload = multer({
  //  dest: 'uploads/'
//});



// Create new post/article in the database
//app.post('/upload', upload.single('file'), function (req, res){
  //  const result = handleFileUp(req.file);
    

    //const { id, name, subject,grade} = req.file; 
    //const sql = `INSERT INTO Students (id, name, subject,grade) VALUES ('${id}','${name}','${subject}','${grade}')`;
     //connection.query(sql,[id,name,subject,grade], function (err, result) {
        //if (err) throw err;
      //  res.status(200) .json({message:'file uploaded successfuly'});
    //    res.send(result);

  //  });
//});

//app.get('/Students', function(req,res) {
    
  //  const sql = `SElECT * FROM Students`;
    //return dbConnection.query(sql, function (err, result) {
      //  if (err) throw err;
        //res.status(200).json(results);

    //});
//});
//app.get('Students/:id', function(req, res){
  // const {id}  = req.params;
    //const sql = `SELECT * FROM Students WHERE id = ?`;
    //connection.query(sql, [id], function(err, results){
     //  if (err) throw err;
       // const {filename} = results[0];
       // res.download('Students/' + filename);
  //  });
//});
//function handleFileUpload(file){
//const data = {
    //name: file.originalname,
  //  size: file.size
//};

//return JSON.stringify(data);
//}


app.listen(3000,function(){
    console.log('perp listening on port 3000')
    dbConnection.connect(function(err){
            if (err) throw err
            console.log('connected to MySQL')
      })
})