const { where } = require("sequelize")
const {product}=require("../models")

//CRUD

const getproduct=async(req,res)=>{
    try {
        const getcustomer=await product.findAll()
        res.status(200).json({message:"fetched the customer sucessfully",data:getcustomer})
    } catch (error) {
        res.status(400).json({message:"error to delete the customer"})
    }   
}

const createproduct=async(req,res)=>{
    try {
        const createcustomer=await product.create(req.body)
        res.status(200).json({message:"created the customer sucesffuly",data:createcustomer})
    } catch (error) {
        res.status(400).json({message:"error to create a customer"})
    }
}

const updateproduct=async(req,res)=>{
    try {
        const {id,...rowsUpdate}=req.body;
        const updatecustomer=await product.update(rowsUpdate,{where:{id}})
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

const deleteproduct=async(req,res)=>{
    try {
        const {id}=req.body
        const deletecustomer=await product.destroy({where:{id}})
        res.status(200).json({message:"delete the customer data sucessfully"})
    } catch (error) {
        res.status(400).json({message:"error to delete the data"})
    }
}

module.exports={getproduct,createproduct,deleteproduct,updateproduct}