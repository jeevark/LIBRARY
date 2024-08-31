const bcrypt =require('bcrypt');
const uuid = require('uuid').v4;
const { collection } = require('../schema/student');
const { booklist } = require('../schema/BookList');
const jwt =require('jsonwebtoken');

const { ACCESS_TOKEN } = require('../Token/authentication');

//const { authenticateToken } =require('../Token/authentication')
const sessions ={}; 

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

            const result =await collection.create(student_inf);

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
                //console.log(login_id.userid);
                const result =await collection.findOne({"std_id" : userid});

                //console.log(sessionId);

                const psw = bcrypt.compareSync(userpassword,result.password)

                //console.log(psw);
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
                
            } catch (error) {
                res.status(500).json({
                    error: 'User NOT Register.....'});
            }
    },
    auth:async (req,res)=>{

        console.log(req.user);
        res.send('Success....')
    },
            
    lendBook:async(req,res)=>{
        try {
            //console.log(req.user.userid);

            let id = req.user.userid;
            let query = req.query;
            console.log(id)
    
                const result = await collection.find({"std_id":{$eq:id}}).countDocuments();
    
                console.log(result);

                if(id===1){
                    console.log(req.query);

                    const value = await booklist.find({query});
                    console.log(value);
                    
                res.send('Sucess.........');

                }else{
                    res.send(' User NOT found.........');
                }
            
        } catch (error) {

            res.status(500).send("Internal Server Error....")
        }   
    }
};

module.exports = student;