const { customer, order, product, orderDetail } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();


const getCustomer = async (req, res) => {
    try {
        const getCustomers = await customer.findAll();
        res.status(200).json({ message: "Fetched customers successfully", data: getCustomers });
    } catch (error) {
        res.status(500).json({ message: "Error fetching customers", error: error.message });
    }
};

const register = async (req, res) => {
    const { userName, password, email } = req.body
    try {
        const existingcustomer = await customer.findOne({ where: { email } })
        if (existingcustomer) {
            return res.status(400).json({ message: "Email is already in use" })
        }
        const hashedpassword = await bcrypt.hash(password, 10)

        const newCustomer = await customer.create({ userName, password: hashedpassword, email })
        const token = jwt.sign({ id: newCustomer.id, userName: newCustomer.userName,email:newCustomer.email }, process.env.JWT_SECRET, { expiresIn: "1h" })
        res.status(201).json({ message: "User Registed Sucessfully", token })
    } catch (error) {
         console.log(error);
        res.status(500).json({ message: "Error registering User", error: error.message })
    }
}

const Login = async (req, res) => {
    const { userName, password, email } = req.body;
    try {
     
        const existCustomer = await customer.findOne({ where: { email } });
        if (!existCustomer) {
            return res.status(404).json({ message: "User not found. Please register first." });
        }


        if (existCustomer.userName !== userName) {
            return res.status(400).json({ message: "Invalid username. Please check your credentials." });
        }

        const isPasswordValid = await bcrypt.compare(password, existCustomer.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password. Please try again." });
        }

 
        const token = jwt.sign(
            { id: existCustomer.id, userName: existCustomer.userName,email:existCustomer.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            user: {id: existCustomer.id,userName: existCustomer.userName,email: existCustomer.email}
        });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
};

const updateCustomer = async (req, res) => {
    try {
        const { id, ...updateData } = req.body;
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


const deleteCustomer = async (req, res) => {
    try {
        const { id } = req.body;


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
    Login,
    register,
    updateCustomer,
    deleteCustomer,
    oneCustomer,
    joincustomerandproduct
};
