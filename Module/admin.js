
const bcrypt =require('bcrypt');
const jwt =require('jsonwebtoken');
const { ACCESS_TOKEN } = require('../Token/authentication');

const { collection } = require('../schema/Admin');
const { booklist } = require('../schema/BookList');

const Admin ={

    // signin:async(req,res)=>{
    //         let adm_inf = req.body.username;
    //         let adm_psw = req.body.password;

    //           adm_psw = await bcrypt.hashSync(adm_psw,10); 
    //           console.log(adm_psw);

    //           const result =await collection.create({"username":adm_inf,"password":adm_psw});
                
    //           console.log(result);
    // },
    signup:async(req,res)=>{

        try {
            const id={
                username: req.body.username,
                password: req.body.password
            }
        // const id_psw = await bcrypt.hashSync(id.password,10);  
        // console.log(id_psw);
            
            const result =await collection.find();
            // console.log(result[0]['username'])
            // console.log(result[0]['password'])
            if(id.username==result[0]['username']&&id.password==result[0]['password']){

                res.status(200).send({'Status':'Success',"result":result})
            }
            else{
                    res.status(400).send({"Error":"Invalid Username & password........."})
            }

        } catch (error) {
            console.error('Error creating user:', error);
            if (error.code === 11000) {
                // Duplicate key violation error
                res.status(409).json({
                error: 'Duplicate key error'
             });
            } else {
                res.status(500).json({
                error: 'Internal Server Error'});
            }}
        },
        addBook:async(req,res)=>{

                try {
                    const book_inf ={
                        Book_num :req.body.Book_num,
                        Book_Name:req.body.Book_Name,
                        Book_title: req.body.Book_title,
                        Book_Author : req.body.Book_Author,
                        Book_Copy : req.body.Book_Copy
                    };
                    //Book Checking.....
                    const book =await booklist.findOne({Book_num:book_inf.Book_num});
                        
                    if(null==book){
                        //Add neww Book............
                        let result = await booklist.create(book_inf);

                        console.log(result);
   
                        res.status(200).send({'Status':'Success',"result":result})
                        
                    } else if(book_inf.Book_num==book['Book_num']) {

                        //Same book but copys change..............
                     var copys = parseInt(book_inf.Book_Copy)+ parseInt(book.Book_Copy);
                     console.log(copys);
                     let result = await booklist.updateOne({Book_num:book_inf.Book_num},{$set:{Book_Copy:copys}});

                     res.status(200).send({"result":result});
                        
                    }
                    else{
                        res.status(400).send({'Ststus':"Find Out Error......"});
                    }
                } catch (error) {
                    console.error('Error creating user:', error);
                    if (error.code === 11000) {
                        // Duplicate key violation error
                        res.status(409).json({
                        error: 'Duplicate key error'
                     });
                    } else {
                        res.status(500).json({
                        error: 'Internal Server Error'});
                    }}
        }

    };

    module.exports = Admin;