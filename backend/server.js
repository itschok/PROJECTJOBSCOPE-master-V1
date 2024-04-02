const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const {MongoClient , GridFSBucket , ObjectId} =require("mongodb");
const dotenv = require("dotenv");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const fs = require('fs');

dotenv.config();
const uri =process.env.MONGO_URI ;
const saltRounds = process.env.SALT_ROUNDS;

const app = express();
app.use(cors({ credentials: true , origin: ['http://localhost:5173'] , }));
app.use(bodyParser.json());
app.use(cookieParser());

async function savePictureToMongoDB(filePath , fileName){
    try {
        const client = new MongoClient(uri, { useNewUrlParser: true });
        await client.connect();
        const database = client.db('users');
        const bucket = new GridFSBucket(database);
        const stream = fs.createReadStream(filePath);

        const uploadStream = bucket.openUploadStream(fileName);
        stream.pipe(uploadStream);
        await new Promise((resolve, reject) => {
            uploadStream.on('finish', resolve);
            uploadStream.on('error', reject);
        });
    } catch (error) {
        console.error('Error saving picture file to MongoDB:', error);
    } finally {
        await client.close();
    }
}

//Picture Upload
app.post("/upload" , async (req , res ) => {
    const {fileName , fileData} = req.body;

    try {
        await savePictureToMongoDB(fileData , fileName);
        res.json({ success: true, message: "File uploaded successfully" });
    } catch (error) {
        console.error("Error uploading file:", error);
        res.status(500).json({ success: false, message: "File upload failed" });
    }
})

//JobSeeker Register
app.post("/jobseekerregister" , async (req , res) => {
    const { jobseekerUsername , jobseekerEmail , jobseekerPassword } = req.body;
    const client = new MongoClient(uri, { useNewUrlParser: true });

    if (!jobseekerUsername || !jobseekerEmail || !jobseekerPassword) {
        return res.status(400).json({
            success: false,
            message: "Missing required fields",
        });
    }

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

        const jobseekerHashPassword = await bcrypt.hash(jobseekerPassword , parseInt(saltRounds));
        const user = await collection.insertOne({ 
            jobseekerUsername , 
            jobseekerEmail , 
            jobseekerHashPassword});
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

//Company Register
app.post("/companyregister" , async (req , res) => {
    const { companyUsername , companyEmail , companyPassword } = req.body;
    const client = new MongoClient(uri, { useNewUrlParser: true });

    if (!companyUsername || !companyEmail || !companyPassword) {
        return res.status(400).json({
            success: false,
            message: "Missing required fields",
        });
    }

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
        const companyHashPassword = await bcrypt.hash(companyPassword , parseInt(saltRounds));
        const user = await collection.insertOne({ 
            companyUsername , 
            companyEmail , 
            companyHashPassword});
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
            const match = await bcrypt.compare(jobseekerPassword , user.jobseekerHashPassword);
            if(match) {
                const token = jwt.sign({ jobseekerUsername : user.jobseekerUsername }, process.env.SECRET, { 
                    expiresIn: '1h' 
                });
                res.cookie('token' , token , {
                    maxAge : 300000,
                    secure : true,
                    httpOnly : true,
                    sameSite : "none",
                });
                res.json({
                    success : true,
                    message : "Login Successful",
                    jobseekerusername: user.jobseekerUsername
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
            const match = await bcrypt.compare(companyPassword , user.companyHashPassword);
            if(match) {
                const token = jwt.sign({ companyUsername : user.companyUsername }, process.env.SECRET, { 
                    expiresIn: '1h' 
                });
                res.cookie('token' , token , {
                    maxAge : 300000,
                    secure : true,
                    httpOnly : true,
                    sameSite : "none",
                });
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

//CompanyPostJob
app.post('/api/postjob/:companyusername' , async (req , res) => {
    const { companyusername  } = req.params;
    const { JobName , ActionCommand , JobID , Location , Position , Salary , Description } = req.body;
    let client;
    try {
        client = new MongoClient(uri , { useNewUrlParser : true});
        await client.connect();
        const database = client.db("postedjob");
        const collection = database.collection("postedjob");
        if(ActionCommand === "create" ){
            const result = await collection.insertOne({
                companyUsername : companyusername ,
                JobName : JobName ,
                Location : Location ,
                Position : Position ,
                Salary : Salary ,
                Description : Description ,
            });
            res.json({
                success: true,
                message: "Post Success" ,
                JobID : result.insertedId,
            });
        }
        else if(ActionCommand === "update") {
            const filter = { _id : new ObjectId(JobID) };
            const update = { $set : { JobName , Location , Position , Salary , Description }};
            const result = await collection.updateOne(filter , update);
            res.json({
                success : true ,
                message : "Update Success" ,
                ObjectId : JobID,
            })
        } else if(ActionCommand === "delete") {
            const result = await collection.deleteOne({ _id : new ObjectId(JobID) });
            if (result.deletedCount === 1) {
                res.json({
                    success: true,
                    message: "Delete Success"
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: "Job posting not found or not deleted"
                });
            }
        } else {
            res.status(400).json({
                success : false ,
                message : "Invalid Action" ,
            })
        }
    } catch (error) {
        res.status(500).json({
            success : false ,
            message : "Post Failed" ,
            error : error.message ,
        })
    } finally {
        client.close();
    }
});

//JobSeekerUsername Profile
app.get('/api/profile/jobseeker/:jobseekerusername', async (req, res) => {
    const { jobseekerusername } = req.params;
    let user , client;
    try {
        client = new MongoClient(uri, { useNewUrlParser: true });
        await client.connect();
        const database = client.db("users");
        const collection = database.collection("jobseeker");

        user = await collection.findOne({ jobseekerUsername: jobseekerusername});

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

//JobseekerProfileEdit
app.post('/api/profile/jobseeker/:jobseekerusername/update' , verifyToken , async (req , res) => {
    const { jobseekerusername } = req.params;
    const { Name, Email, EducationLevel, Job } = req.body;
    let client

    try {
        client = new MongoClient(uri, { useNewUrlParser: true });
        await client.connect();
        const database = client.db("users");
        const collection = database.collection("jobseeker");

        const filter = { jobseekerUsername : jobseekerusername };
        const update = { $set: { Name, Email, EducationLevel, Job } };

        const result = await collection.updateOne(filter, update);

        if (result.modifiedCount === 1) {
            res.json({ success: true, message: "Profile updated successfully" });
        } else {
            res.status(404).json({ success: false, message: "User not found or profile not updated" });
        }
    } catch (error) {
        console.error("Error updating user profile:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
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

function verifyToken(req , res , next) {
    const authToken = req.cookies.token
    if (typeof authToken != "undefined") {
        jwt.verify(authToken , process.env.SECRET , (err , authData) => {
            if(err) {
                res.sendStatus(403);
            } else {
                req.authData = authData;
                next();
            }
        });
    } else {
        res.sendStatus(403);
    }
}

app.get("/jobseekerusers" , verifyToken , async (req , res) => {
    const client = new MongoClient(uri , { useUnifiedTopology : true});
    try {
        await client.connect();
        const database = client.db("users");
        const collection = database.collection("jobseeker");

        const users = await collection.find({}).toArray();
        res.json({
            success : true,
            message : "Get users successful",
            data : users,
        });
    } catch (error) {
        res.json({
            success : false,
            message : "Get users failed",
        });
    } finally {
        await client.close();
    }
});

app.listen(3000 , () => {
    console.log('Server is running on port http://localhost:3000');
});