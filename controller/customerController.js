const { customer, order, product, orderDetail } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Get all customers
const getCustomer = async (req, res) => {
    try {
        const getCustomers = await customer.findAll();
        res.status(200).json({ message: "Fetched customers successfully", data: getCustomers });
    } catch (error) {
        res.status(500).json({ message: "Error fetching customers", error: error.message });
    }
};

// Create a new customer
const createCustomer = async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        const existingCustomer = await customer.findOne({ where: { email } });
        if (existingCustomer) {
            return res.status(400).json({ message: "Email already in use" });
        }        
        const hashedPassword = await bcrypt.hash(password, 10);

        
        const newCustomer = await customer.create({
            userName,
            email,
            password: hashedPassword,
        });
        const token = jwt.sign(
            { userId: newCustomer.id, userName: newCustomer.userName,password:newCustomer.password },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(201).json({ message: "Customer created successfully", data: newCustomer, token });
    } catch (error) {
      console.log(error);
      
        res.status(500).json({ message: "Error creating customer", error: error.message });
    }
};

const updateCustomer = async (req, res) => {
    try {
        const { id, ...updateData } = req.body;

        // Check if customer exists
        const existingCustomer = await customer.findByPk(id);
        if (!existingCustomer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        await customer.update(updateData, { where: { id } });

        res.status(200).json({ message: "Customer updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error updating customer", error: error.message });
    }
};

// Delete customer
const deleteCustomer = async (req, res) => {
    try {
        const { id } = req.body;

        // Check if customer exists
        const existingCustomer = await customer.findByPk(id);
        if (!existingCustomer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        await customer.destroy({ where: { id } });

        res.status(200).json({ message: "Customer deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting customer", error: error.message });
    }
};

// Get a single customer by ID
const oneCustomer = async (req, res) => {
    try {
        const { id } = req.body;

        const foundCustomer = await customer.findOne({ where: { id } });

        if (!foundCustomer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        res.status(200).json({ message: "Customer fetched successfully", data: foundCustomer });
    } catch (error) {
        res.status(500).json({ message: "Error fetching customer", error: error.message });
    }
};

// Get customer with their products (via orders and order details)
const joincustomerandproduct = async (req, res) => {
    try {
        const { id } = req.body;

        const customerProduct = await customer.findOne({
            where: { id },
            include: [
                {
                    model: order,
                    as: "orders",
                    include: [
                        {
                            model: orderDetail,
                            as: "orderDetails",
                            include: [
                                {
                                    model: product,
                                    as: "product"
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        if (!customerProduct) {
            return res.status(404).json({ message: "Customer not found" });
        }

        res.status(200).json({ message: "Customer with products fetched successfully", data: customerProduct });
    } catch (error) {
        res.status(500).json({ message: "Error fetching customer and products", error: error.message });
    }
};

// Export controllers
module.exports = {
    getCustomer,
    createCustomer,
    updateCustomer,
    deleteCustomer,
    oneCustomer,
    joincustomerandproduct
};
