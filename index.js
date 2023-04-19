const express = require('express');
//const multer = require('multer');
const mysql = require('mysql');
//const connection = mysql.createCo
const app = express();

const bodyParser = require('body-parser')
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


app.listen(3000,function(){
    console.log('perp listening on port 3000')
    dbConnection.connect(function(err){
            if (err) throw err
            console.log('connected to MySQL')
      })
})