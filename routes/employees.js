const mysql = require('mysql');
const express = require('express');
const appForEmp = express.Router();

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'manager',
    database: 'classwork'
});


appForEmp.get("/",(request, response) => {
    connection.query("SELECT * FROM emp", (error,result) => {
        if(error == null){
            response.setHeader("Content-Type","application/json");
            response.write(JSON.stringify(result)); 
        }
        else{
            response.setHeader("Content-Type","application/json");
            response.write(error);
        }
        response.end();
    })
})

appForEmp.delete("/:id" , (request , response) => {

    connection.query(`delete from emp where id = ${request.params.id}`,(error,result)=>{
            if(error == null){
                response.setHeader("Content-Type","application/json");
                response.send(JSON.stringify(result));
            }
            else{
                response.setHeader("Content-Type","application/json");
                response.send(error);
            }
    })
})

appForEmp.put("/:id",(request,response) =>{
    connection.query(`UPDATE emp set name = '${request.body.name}' , dept = '${request.body.dept}'
                      WHERE id = ${request.params.id}`, (error,result) =>{
                            if(error == null){
                                response.setHeader("Content-Type","application/json");
                                response.write(JSON.stringify(result));
                            }else{
                                response.setHeader("Content-Type","application/json");
                                response.write(error);
                            }
                            response.end();
                      });
})

appForEmp.post("/",(request,response) =>{
    connection.query(`INSERT INTO emp values (${request.body.id} ,'${request.body.name}','${request.body.dept}')`,
                     (error,result) =>{
                            if(error == null){
                                response.setHeader("Content-Type","application/json");
                                response.write(JSON.stringify(result));
                            }else{
                                response.setHeader("Content-Type","application/json");
                                response.write(JSON.stringify(error));
                            }
                            response.end();
                      });
})
module.exports = appForEmp;