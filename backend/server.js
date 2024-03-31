const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const {MongoClient} =require("mongodb")
const dotenv = require("dotenv");

dotenv.config();
const uri =process.env.MONGO_URI ;

const app = express();
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(bodyParser.json());


//JobSeeker Register
app.post("/jobseekerregister" , async (req , res) => {
    const { jobseekerUsername , jobseekerEmail , jobseekerPassword } = req.body;
    const client = new MongoClient(uri, { useNewUrlParser: true });
    try {
        await client.connect();
        const database = client.db("users");
        const collection = database.collection("jobseeker");

        const existingJobseeker = await collection.findOne({ $or: [{ jobseekerUsername }, { jobseekerEmail }] });
        if (existingJobseeker) {
            return res.status(400).json({
                success: false,
                message: "JobSeeker username or email already exists",
            });
        }

        const user = await collection.insertOne({ jobseekerUsername , jobseekerEmail , jobseekerPassword});
        res.json({
            success : true,
            message : "Registration Successful",
        });
    } catch (error) {
        res.status(500).json({
            success : false,
            message : "Registration Failed",
            error : error.message,
        });
    } finally {
        await client.close();
    }
});

//Jobseekereditprofile
app.post("/Editprofile" , async (req , res) => {
    const { JobseekerName, JobseekerContact, JobseekerTalent} = req.body;
    const client = new MongoClient(uri, { useNewUrlParser: true });
    try {
        await client.connect();
        const database = client.db("users");
        const collection = database.collection("jobseekerprofile");

        const user = await collection.insertOne({ JobseekerName , JobseekerContact , JobseekerTalent});
        res.json({
            success : true,
            message : "Edit Successful",
        });
    } catch (error) {
        res.status(500).json({
            success : false,
            message : "Edit Failed",
            error : error.message,
        });
    } finally {
        await client.close();
    }
});

//Company Register
app.post("/companyregister" , async (req , res) => {
    const { companyUsername , companyEmail , companyPassword } = req.body;
    const client = new MongoClient(uri, { useNewUrlParser: true });
    try {
        await client.connect();
        const database = client.db("users");
        const collection = database.collection("companies");

        const existingCompany = await collection.findOne({ $or: [{ companyUsername }, { companyEmail }] });
        if (existingCompany) {
            return res.status(400).json({
                success: false,
                message: "Company Username or Email already exists",
            });
        }

        const user = await collection.insertOne({ companyUsername , companyEmail , companyPassword});
        res.json({
            success : true,
            message : "Registration Successful",
        });
    } catch (error) {
        res.status(500).json({
            success : false,
            message : "Registration Failed",
            error : error.message,
        });
    } finally {
        await client.close();
    }
});

//Jobseeker Login
app.post("/jobseekerlogin" , async (req , res) => {
    const { loginIdentifier , jobseekerPassword } = req.body;
    const client = new MongoClient(uri, { useNewUrlParser: true });
    try {
        await client.connect();
        const database = client.db("users");
        const collection = database.collection("jobseeker");
        const isEmail = loginIdentifier.includes('@');
        const user = isEmail ? await collection.findOne({jobseekerEmail : loginIdentifier}) : await collection.findOne({ jobseekerUsername : loginIdentifier });
        if(user) {
            const match = await collection.findOne({ jobseekerPassword });
            if(match) {
                res.json({
                    success : true,
                    message : "Login Successful",
                });
            } else {
                res.status(401).json({
                    success : false,
                    message : "Login Failed",
                });
            }
        }
        else {
            res.status(401).json({
                success : false,
                message : "Login Failed",
            });
        }
    } catch (error) {
        res.status(500).json({
            success : false,
            message : "Login Failed",
            error : error.message,
        });
    } finally {
        await client.close();
    }
});

//Company Login
app.post("/companylogin" , async (req , res) => {
    const { loginIdentifier , companyPassword } = req.body;
    const client = new MongoClient(uri, { useNewUrlParser: true });
    try {
        await client.connect();
        const database = client.db("users");
        const collection = database.collection("companies");

        const isEmail = loginIdentifier.includes('@');

        const user = isEmail ? await collection.findOne({companyEmail : loginIdentifier}) : await collection.findOne({ companyUsername : loginIdentifier });
        if(user) {
            const match = await collection.findOne({ companyPassword : companyPassword });
            if(match) {
                res.json({
                    success : true,
                    message : "Login Successful",
                });
            } else {
                res.status(401).json({
                    success : false,
                    message : "Login Failed",
                });
            }
        }
        else {
            res.status(401).json({
                success : false,
                message : "Login Failed",
            });
        }
    } catch (error) {
        res.status(500).json({
            success : false,
            message : "Login Failed",
            error : error.message,
        });
    } finally {
        await client.close();
    }
});

app.get('/api/profile/jobseeker/:username', async (req, res) => {
    const { username } = req.params;
    let user;
    try {
        const client = new MongoClient(uri, { useNewUrlParser: true });
        await client.connect();
        const database = client.db("users");
        const collection = database.collection("jobseeker");

        user = await collection.findOne({ jobseekerUsername: username });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ message: "Internal server error" });
    } finally {
        client.close();
    }
});

app.get('/api/profile/companies/:username', async (req, res) => {
    const { username } = req.params;
    let user;
    try {
        const client = new MongoClient(uri, { useNewUrlParser: true });
        await client.connect();
        const database = client.db("users");
        const collection = database.collection("companies");

        user = await collection.findOne({ companyUsername : username });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ message: "Internal server error" });
    } finally {
        client.close();
    }
});

app.listen(3000 , () => {
    console.log('Server is running on port http://localhost:3000');
});