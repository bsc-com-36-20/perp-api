const express = require('express');
//const multer = require('multer');
const mysql = require('mysql');
//const connection = mysql.createCo
const app = express();

const bodyParser = require('body-parser');
// Request Body parsing Middleware
app.use(bodyParser.json());  

app.use(bodyParser.urlencoded({ extended: false }))

const dbConnection = require('./src/util/mysql.connector')
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.post('/Students', (req,res) => {
    const  { id , name , subject , grade} = req.body;
   const sql=  `INSERT INTO Students (id, name , subject, grade)  VALUES ('${id}', '${name}','${subject}', '${grade}')`;
    return dbConnection.query(sql, (error,results) => {
        if (error) {
          console.log('Error inserting data into students table:',error)
            res.status(500).send('Error inserting data into students table');
          
        } else {
          console.log('Data inserted successfully into students table:', results);
        res.send('Data inserted successfully into students table');
        
           }
             });
               }); 
               // for  deleting records
               app.delete('/Students/:id',(req,res) => {
                const id = req.params.id;
                // delete records from database  using id
                const sql = `DELETE FROM Students WHERE id = ?`;
                const values = [id];
                dbConnection.query(sql,values,(error,results)  =>{
                  if(error){
                    console.log(error);
                  }else{
                    res.send('student with ID ${id}  deleted successfully');
                  }
                });
              });
             

// getting student by id
app.get('/Students/:id', (req,res)  => {
    const id = req.params.id;
    // Retrieve message from database
    const sql = `SELECT * FROM Students WHERE id = ?`;
    const values = [id];
    dbConnection.query(sql,values,(error,results)  =>{
      if(error){
        console.log(error);
        res.status(500).send('error retrieving message');
      }else{
        res.send(results);
      }
      });
    });
    

// Route handler for PATCH /students/:id

app.patch('/api/vi/posts/:id', function (request, response)  {
  const sql =`SELECT * FROM Students WHERE id = ${request.params.id} LIMIT 1`
  return dbConnection.query(sql, function(err,rows){
    if (err) throw err
    const post= request.body 
   // console.log(post)
if (rows.length >= 1){
  let props = []
  props = Object.keys(post).map((key, index) => {
    return `${key}='${post[key]}'`
  })
  const updateSql = `UPDATE Students SET ${props.join(',')} WHERE id=${rows[0].id}`
  return dbConnection.query(updateSql, function(err,result){
    if (err) throw err
    if (result.affectedRows === 0) {
      return response.status(404).json({
        status:false,
        statusCode:404,
        message:  `Post with id ${request.params.id} does not exist`
      })
    }
    return response.status(200).json({
      status:true,
      statusCode:200,
      message:  'Post updated successfully'
    })
  })
}
  
})
})
 

app.listen(3000,function(){
    console.log('perp listening on port 3000')
    dbConnection.connect(function(err){
            if (err) throw err
            console.log('connected to MySQL')
      })
})