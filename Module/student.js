const bcrypt =require('bcrypt');
const uuid = require('uuid').v4;
const { studentBio } = require('../schema/student');
const { booklist } = require('../schema/BookList');
const { lendbook } = require('../schema/lendbook');
const { deletebook } = require('../schema/deleteBook')
const jwt =require('jsonwebtoken');

const { ACCESS_TOKEN } = require('../Token/authentication');

//const { authenticateToken } =require('../Token/authentication')
const sessions ={}; 
let add = 0;

const student ={

    signup:async(req,res)=>{
        try {
            const student_inf ={
                std_name : req.body.std_name,
                std_id : req.body.std_id,
                password : req.body.password
            }
            student_inf['password']= await bcrypt.hashSync(student_inf.password,10);  
            console.log(student_inf);

            const result =await studentBio.create(student_inf);

            res.status(200).send({'Status':'Success',"result":result})
            
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
    login:async(req,res)=>{

            try {
                
                const userid = req.body.loginid;
                const  userpassword = req.body.loginpsw;
                const sessionId =uuid();

                        //user data Get methods.............
                const result =await studentBio.findOne({"std_id" : userid});

                        //password comparesync methods.............

                const psw = bcrypt.compareSync(userpassword,result.password)

                if(!psw){
                    res.status(400).send(`password Don't Match............`);
                }
                else{
                    let token_id =  jwt.sign({ userid, userpassword},ACCESS_TOKEN,{expiresIn:'1d'});

                    console.log(token_id);

                        sessions[sessionId] = {userid,userpassword : 1};

                            res.set('Set-Cookie',`session=${sessionId}`);
                            res.status(200).json({
                            'Result' :'Success...',
                            'token' : token_id
                            });  
                    }
                
            }catch(err) {
                res.status(500).json({
                    err: 'User NOT Register.....'});
            }
    },
    auth:async (req,res)=>{

        console.log(req.user);
        res.send('Success....')
    },
            
    lendBook:async(req,res)=>{
        try {

            let id = req.user.userid;
            let query = req.query;
            console.log(id)

                    //find book list of lend Books...............
    
            console.log(req.query);

            const value = await booklist.findOne(query);
            console.log(value);
            const copy=--value['Book_Copy'];
            console.log(value);

                    //update book list copys value............
            await booklist.updateOne(query,{$set:{Book_Copy:copy}})
                    
                const book = {
                        std_id : id,
                        Book_num :value.Book_num,
                        Book_Name : value.Book_Name,
                        Book_title : value.Book_title,
                        Book_Author : value.Book_Author
                    };
                console.log(book);

                    //lend Book stored methods................
                const result =await lendbook.create(book);
                console.log(result);
                    
            res.send('Sucess.........');

            
        }catch(err) {

            res.status(500).send({'Internal Server Error....':err});
        }   
    },
    viwe_Book:async(req,res)=>{
        try {

            let id = req.user.userid;
            let query = req.query;
            console.log(id)
    
            const result = await booklist.find();
    
            console.log(result.length);
                if(result.length!==0){

                    res.send({'Result':result});
                }
                else{
                    res.send("No Book's _____ Pls Add Book....... ");
                }
    
        }catch(error) {
            res.status(500).send("User Error :"+error);
        }
    },
    Return_Book:async(req,res)=>{

        try {

                let id = req.user.userid;
                let R_Book = req.query;
                let date = req.body.date;
                let booknum = R_Book['Book_num'];

                console.log(R_Book);
                console.log(booknum);
                //find student lend Book's.........................
                const s_one = await lendbook.findOne( {$and:[{date:{$eq:date}},{Book_num:{$eq:booknum}},{std_id:{$eq:id}}]})
                console.log(s_one);
                if(s_one!==null){
                    const D_book = {

                        std_id : s_one.std_id,
                        Book_num : s_one.Book_num,
                        Book_Name : s_one.Book_Name,
                        Book_title : s_one.Book_title,
                        Book_Author : s_one.Book_Author
                    }
                        //student stored return Books...........
                    await deletebook.create(D_book);

                        //lend Book Delete methods.................. 
                    const d_one = await lendbook.deleteOne( {$and:[{date:{$eq:date}},{Book_num:{$eq:booknum}},{std_id:{$eq:id}}]})

                    console.log(d_one.deletedCount);
                        if(d_one.deletedCount===1){
                            //update lend book copys methods.........

                            const value = await booklist.findOne(R_Book);
                            console.log(value);
                            const copy1=++value['Book_Copy'];
                            console.log(value);

                                //update value insert methods....................
                            await booklist.updateOne(R_Book,{$set:{Book_Copy:copy1}});

                            res.send({'Success':value});
                        }else{
                            res.send({'Error':'You did not pick up this book......'})
                        }
                }else{
                    console.log("You did not pick up this book..........");
                
                    res.send("You did not pick up this book.................")
                }

        } catch (Error) {
            console.log('Error : '+Error);
                
            res.send({'user Error':Error});
        }

    }
};

module.exports = student;