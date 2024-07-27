
const { collection } = require('../schema/Admin');
const Admin ={

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
        }

    };

    module.exports = Admin;