const { where } = require("sequelize")
const {orderDetail}=require("../models")

//CRUD

const getorderDetail=async(req,res)=>{
    try {
        const getcustomer=await orderDetail.findAll()
        res.status(200).json({message:"fetched the customer sucessfully",data:getcustomer})
    } catch (error) {
        res.status(400).json({message:"error to delete the customer"})
    }   
}

const createorderDetailr=async(req,res)=>{
    try {
        const createcustomer=await orderDetail.create(req.body)
        res.status(200).json({message:"created the customer sucesffuly",data:createcustomer})
    } catch (error) {
        res.status(400).json({message:"error to create a customer"})
    }
}

const updateorderDetail=async(req,res)=>{
    try {
        const {id,...rowsUpdate}=req.body;
        const updatecustomer=await orderDetail.update(rowsUpdate,{where:{id}})
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

const deleteorderDetail=async(req,res)=>{
    try {
        const {id}=req.body
        const deletecustomer=await orderDetail.destroy({where:{id}})
        res.status(200).json({message:"delete the customer data sucessfully"})
    } catch (error) {
        res.status(400).json({message:"error to delete the data"})
    }
}

module.exports={deleteorderDetail,updateorderDetail,getorderDetail,createorderDetailr}