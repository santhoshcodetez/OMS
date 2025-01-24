const express=require("express")
const router=express.Router()
const customerController=require("../controller/customerController")
const productController=require("../controller/productController")
const orderController=require("../controller/orderController")
const orderDetailsController=require("../controller/orderDetails")

router.get('/getCustomer',customerController.getCustomer)
router.post('/postCustomer',customerController.createCustomer)
router.delete('/deleteCustomer',customerController.deleteCustomer)
router.put('/updateCustomer',customerController.updateCustomer)
router.get('/onecustomer',customerController.oneCustomer)
router.get('/onecustomerdetail',customerController.joincustomerandproduct)

router.get('/getProduct',productController.getproduct)
router.post('/postProduct',productController.createproduct)
router.delete('/deleteproduct',productController.deleteproduct)
router.put('/updateProduct',productController.updateproduct)

router.get('/getOrder',orderController.getorder)
router.post('/postorder',orderController.createorder)
router.delete('/deleteorder',orderController.deleteorder)
router.put('/updateOrder',orderController.updateorder)

router.get('/getOrderDetails',orderDetailsController.getorderDetail)
router.post('/postorderDetails',orderDetailsController.createorderDetailr)
router.delete('/deleteorderDetails',orderDetailsController.deleteorderDetail)
router.put('/updateOrderDetails',orderDetailsController.updateorderDetail)


module.exports=router