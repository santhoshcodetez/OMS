const { where } = require("sequelize")
const {customer,order,product,orderDetail}=require("../models")
const bcrypt = require("bcrypt");
//CRUD

const getCustomer=async(req,res)=>{
    try {
        const getcustomer=await customer.findAll()
        res.status(200).json({message:"fetched the customer sucessfully",data:getcustomer})
    } catch (error) {
        res.status(400).json({message:"error to delete the customer"})
    }   
}

const createCustomer=async(req,res)=>{
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const createcustomer=await customer.create({
            userName:req.body.userName,
            email:req.body.email,
            password:hashedPassword,
        })
        res.status(200).json({message:"created the customer sucesffuly",data:createcustomer})
    } catch (error) {
        res.status(400).json({message:"error to create a customer"})
    }
}

const updateCustomer=async(req,res)=>{
    try {
        const {id,...rowsUpdate}=req.body;
        const updatecustomer=await customer.update(rowsUpdate,{where:{id}})
        if (updatecustomer[0]>0) {
            res.status(200).json({message:"updated the customer sucessfully"})
        }
        else{
            res.status(404).json({message:"404 error found"})
        }
    } catch (error) {
        res.status(400).json({message:"error to update the customer data"})
    }
}

const deleteCustomer=async(req,res)=>{
    try {
        const {id}=req.body
        const deletecustomer=await customer.destroy({where:{id}})
        res.status(200).json({message:"delete the customer data sucessfully"})
    } catch (error) {
        res.status(400).json({message:"error to delete the data"})
    }
}


const oneCustomer=async(req,res)=>{
    try {
        const onecustomer=await customer.findOne(req.body)
        res.status(200).json({message:"fetechd",data:onecustomer})
    } catch (error) {
        res.status(400).json({message:"Fetched one customer sucesfully"})
    }
}
const joincustomerandproduct = async (req, res) => {
    try {
      const onecustomer = req.body.id;
  
      const customerproduct = await customer.findOne({
        where: { id: onecustomer },
        include: [{
          model: order,
          as: "orderhere",
          include: [{
            model: orderDetail,
            as: "orderDetails",
            include: [{
              model: product,
              as: "producthere"
            }]
          }]
        }]
      });
  
      if (customerproduct) {
        res.status(200).json({ message: "Fetched customer with products successfully", data: customerproduct });
      } else {
        res.status(404).json({ message: "Customer not found" });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Error finding the customer and product" });
    }
  };
  


module.exports={deleteCustomer,updateCustomer,createCustomer,getCustomer,oneCustomer,joincustomerandproduct}