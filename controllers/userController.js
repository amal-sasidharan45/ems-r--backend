//import model
const users=require('../model/userSchema')

//to define logic to resolve client  requests


//register 

exports.register=async(req,res)=>{
    //get image file details
    console.log(req.file);
    const file=req.file.filename
    //get other user input fields from request body
    const {fname,lname,email,mobile,gender,status,location}=req.body;
    if (!fname||!lname||!email||!mobile||!gender||!status||!location) {
        res.status(404).json("All fields are required")
    }
    else{
     try{
        //check if the user is already registered 
       const preuser=await users.findOne({email})
       if(preuser){
       return res.status(401).json("user already registered")
       }
       else{
        //register user data 
        const newuser=new users({fname,lname,email,mobile,gender,profile:file,status,location})
        //save to database
        await newuser.save()
        //response send back to the client
       return res.status(200).json(newuser)
       }
     }
     catch(error){
       return res.status(404).json(error)
     }
       
    }
   return res.send("Register request received")
}

//get all employee information

exports.getEmployees=async (req,res)=>{
   //get search query from request
   const search = req.query.search
   const query ={
          fname:{$regex:search, $options:"i"}//avoid case sensitive
   }

  try {
     const allEmployees = await users.find(query)//get all employees
     res.status(200).json(allEmployees)
  } catch (error) {
     res.status(404).json(error)
  }
}
//view profile 
exports.viewProfile = async (req,res)=>{
     //let params=req.params
     //console.log(params);
     const {id}= req.params;
     //get details of user having the given id
     try {
       const preuser= await users.findOne({_id:id})
       res.status(200).json(preuser);
     } catch (err) {
       res.status(404).json("Employee does not exist")
     }
}
//delete employee
exports.deleteEmployee=async(req,res)=>{
  const {id} =req.params;
  //remove details for the given user id
  try {
     const removeItem = await users.findByIdAndDelete({_id:id})
     res.status(200).json(removeItem)
     if (res.status===200) {
        getEmployees()
        alert("Employees deleted successfully")
     } 
  } catch (error) {
      res.status(404).json(error)
  }
}
exports.updateEmployee=async(req,res)=>{
   const {id}=req.params
   const {fname,lname,email,mobile,status,location,user_profile}=req.body;
   const file=req.files?req.file.filename:user_profile

   try {
      const updateItem = await users.findByIdAndUpdate({_id:id},
   {fname,lname,email,mobile,status,profile:file,location},{
      new:true
   })
    //
    await updateItem.save()
    res.status(200).json(updateItem)
   } catch (error) {
       res.status(404).json(error)
   }
}