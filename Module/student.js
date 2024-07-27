const bcrypt =require('bcrypt');
const { collection } = require('../schema/student');


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
                const login_id ={
                        userid : req.body.loginid,
                        userpassword : req.body.loginpsw
                }
                const result =await collection.findOne(login_id.userid);

                console.log(result);
                
            } catch (error) {
                res.status(500).json({
                    error: 'Internal Server Error.....'});
            }
    }    
            
};

module.exports = student;