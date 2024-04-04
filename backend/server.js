const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const {MongoClient , ObjectId } =require("mongodb");
const dotenv = require("dotenv");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

dotenv.config();
const uri =process.env.MONGO_URI ;
const saltRounds = process.env.SALT_ROUNDS;

const app = express();
app.use(cors({ credentials: true , origin: ['http://localhost:5173'] , }));
app.use(bodyParser.json());
app.use(cookieParser());

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
        if (loginIdentifier === 'admin' && jobseekerPassword === 'admin'){
            const token = jwt.sign({ isAdmin: true }, process.env.SECRET, {
                expiresIn: '1h'
            });
            res.cookie('token' , token , {
                maxAge : 300000,
                secure : true,
                httpOnly : true,
                sameSite : "none",
                secure: true
            });
            res.json({
                success: true,
                message: "Admin login successful",
                data : {
                    LogAd : true,
                },
            });
        } else { 
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
    }} catch (error) {
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
                    companyusername: user.companyUsername
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
    const { companyusername } = req.params;
    const { JobName , ActionCommand , Location , Position , Salary , Description } = req.body;
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
                Salary : parseFloat(Salary) ,
                Description : Description ,
            });
            res.json({
                success: true,
                message: "Post Success" ,
                JobID : result.insertedId,
            });
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

//Delete Postjob
app.get(`/api/postjob/companies/:companyusername/:jobid` , async (req , res) => {
    const { jobid } = req.params;
    let client
    try {
        client = new MongoClient(uri , { useNewUrlParser : true });
        await client.connect();
        const database = client.db("postedjob");
        const collection = database.collection("postedjob");

        result = await collection.deleteOne({ _id : new ObjectId(jobid) })
        res.json({
            success : true,
            message : "Delete Complete"
        });
    } catch (error) {
        res.status(500).json({
            success : false ,
            message : "Delete Failed" ,
            error : error.message ,
        })
    } finally {
        client.close();
    }
})

//Edit CompanyProfile
app.post(`/api/profile/companies/:companyusername/update` , async (req , res) => {
    const { companyusername } = req.params;
    const { CompanyName , CompanyEmail , Location , Industry } = req.body;
    let client

    try {
        client = new MongoClient(uri, { useNewUrlParser: true });
        await client.connect();
        const database = client.db("users");
        const collection = database.collection("companies");

        const filter = { companyUsername : companyusername };
        const update = { $set: { CompanyName , CompanyEmail, Location , Industry } };

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

//Edit postjob
app.post('/api/editpostjob/:jobid' , async (req , res) => {
    const { jobid } = req.params;
    const { JobName , Location , Position , Salary , Description } = req.body;
    let client;
    try {
        client = new MongoClient(uri , { useNewUrlParser : true});
        await client.connect();
        const database = client.db("postedjob");
        const collection = database.collection("postedjob");

        const updatedJob = {
            $set: {
                JobName: JobName,
                Location: Location,
                Position: Position,
                Salary: Salary,
                Description: Description
            }
        };

        const result = await collection.updateOne({ _id: new ObjectId(jobid) }, updatedJob);

        if (result.matchedCount === 1) {
            res.status(200).json({ message: 'Job updated successfully.' });
        } else {
            res.status(404).json({ message: 'Job not found.' });
        }
    } catch (error) {
        console.error("Error editing job:", error);
        res.status(500).json({ message: 'Internal server error.' });
    } finally {
        if (client) {
            client.close();
        }
    }
});

//Get JobSeekerUsername
app.get('/api/profile/jobseeker/:jobseekerusername', async (req, res) => {
    const { jobseekerusername } = req.params;
    let user , client;
    try {
        client = new MongoClient(uri, { useNewUrlParser: true });
        await client.connect();
        const database = client.db("users");
        const collection = database.collection("jobseeker");

        user = await collection.findOne({ 
            jobseekerUsername: jobseekerusername
        });

        if (!user) {
            return res.status(404).json({ 
                message: "User not found" 
            });
        }
        res.json(user);
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ 
            message: "Internal server error" 
        });
    } finally {
        client.close();
    }
});

//Get CompanyUsername
app.get('/api/profile/companies/:companyusername', async (req, res) => {
    const { companyusername } = req.params;
    let user , client;
    try {
        client = new MongoClient(uri, { useNewUrlParser: true });
        await client.connect();
        const database = client.db("users");
        const collection = database.collection("companies");

        user = await collection.findOne({ companyUsername : companyusername });

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

//Get AllJobseeker
app.get('/api/profile/jobseeker' , async (req, res) => {
    let client;
    try {
        client = new MongoClient(uri, { useNewUrlParser: true });
        await client.connect();
        const database = client.db("users");
        const collection = database.collection("jobseeker");
        const companies = await collection.find().toArray();
        res.json(companies);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    } finally {
        client.close();
    }
});

//Get AllCompanydata
app.get('/api/profile/companies' , async (req, res) => {
    let client;
    try {
        client = new MongoClient(uri, { useNewUrlParser: true });
        await client.connect();
        const database = client.db("users");
        const collection = database.collection("companies");
        const jobseekers = await collection.find().toArray();
        res.json(jobseekers);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    } finally {
        client.close();
    }
});

//JobseekerProfileEdit
app.post('/api/profile/jobseeker/:jobseekerusername/update' , verifyToken , async (req , res) => {
    const { jobseekerusername } = req.params;
    const { Name, Email, EducationLevel, Age } = req.body;
    let client

    try {
        client = new MongoClient(uri, { useNewUrlParser: true });
        await client.connect();
        const database = client.db("users");
        const collection = database.collection("jobseeker");

        const filter = { jobseekerUsername : jobseekerusername };
        const update = { $set: { Name, Email, EducationLevel, Age } };

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

function verifyToken(req , res , next) {
    const authToken = req.cookies.token;
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

//Api GetPostedJob
app.get("/api/getPostedJob/:companyusername" , async (req , res) => {
    const { companyusername } = req.params;
    const client = new MongoClient(uri , { useNewUrlParser : true});
    try{
        await client.connect();
        const database = client.db("postedjob");
        const collection = database.collection("postedjob");

        const user = await collection.find({ companyUsername : companyusername }).toArray();
        res.json({
            success : true,
            message : "Get PostedJob Success",
            data : user ,
        });
    } catch (error) {
        res.json({
            success : false,
            message : "Get PostedJob Failed",
        });
    } finally {
        await client.close();
    }
});

//getAllPost
app.get("/api/getAllPostedJob" , async (req , res) => {
    const client = new MongoClient(uri , { useNewUrlParser : true });
    try {
        await client.connect();
        const database = client.db("postedjob");
        const collection = database.collection("postedjob");

        const allPostedJobs = await collection.find({}).toArray();
        res.json({
            success: true,
            message: "Retrieved all posted jobs",
            data: allPostedJobs,
        });
    } catch (error) {
        res.json({
            success : false,
            message : "Nope"
        })
    } finally {
        await client.close();
    }
});

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

//Api to Add Jobseeker to Applicant
app.post('/api/AddToApplicant/:jobseekerusername/:jobid', async (req, res) => {
    const { jobseekerusername, jobid } = req.params;

    let client;

    try {
        client = new MongoClient(uri, { useUnifiedTopology: true });
        await client.connect();

        const takedb = client.db("users");
        const takecollection = takedb.collection("jobseeker");
        const database = client.db("postedjob");
        const collection = database.collection("postedjob");
        const storedatabase = client.db("Job");
        const storecollection = storedatabase.collection("Job");

        const jobseeker = await takecollection.findOne({ jobseekerUsername: jobseekerusername });
        if (!jobseeker) {
            return res.status(404).json({ message: 'Job seeker not found' });
        }

        const postedJob = await collection.findOne({ _id: new ObjectId(jobid) });
        if (!postedJob) {
            return res.status(404).json({ message: 'Job not found' });
        }

        // Check if the job seeker has already applied for this job
        const existingApplication = await storecollection.findOne({ Jobid: new ObjectId(jobid), JobseekerUsername: jobseeker.jobseekerUsername });
        if (existingApplication) {
            return res.status(400).json({ message: 'Job seeker has already applied for this job' });
        }

        const postedJobId = postedJob._id;
        const companyUsername = postedJob.companyUsername;
        const Location = postedJob.Location;
        const Position = postedJob.Position;
        const JobName = postedJob.JobName;
        const Salary = postedJob.Salary;
        const Description = postedJob.Description;

        await storecollection.insertOne({
            Jobid : new ObjectId(postedJobId),
            companyUsername: companyUsername,
            JobseekerUsername : jobseeker.jobseekerUsername,
            JobseekerName : jobseeker.Name,
            JobseekerEducationLevel : jobseeker.EducationLevel,
            JobseekerEmail : jobseeker.Email,
            JobName : JobName,
            Location: Location,
            Position: Position,
            Salary : Salary,
            Description : Description,
            Status : "None",
        });

        res.status(201).json({ success: true, message: 'Job seeker added successfully' });
    } catch (error) {
        console.error('Error adding job seeker:', error);
        res.status(500).json({ error: 'Internal server error' });
    } finally {
        if (client) {
            client.close();
        }
    }
});

//Get Applicant
app.get("/api/getApplicant/:companyusername", async (req, res) => {
    const { companyusername } = req.params;
    const client = new MongoClient(uri, { useUnifiedTopology: true });

    try {
        await client.connect();
        const database = client.db("Job");
        const collection = database.collection("Job");
        const jobs = await collection.find({ companyUsername: companyusername }).toArray();
        res.json({
            success : true ,
            message : "Got",
            data : jobs,
        })
    } catch (error) {
        console.error("Error retrieving user's jobs:", error);
        res.json({
            success: false,
            message: "Get user's jobs failed",
        });
    } finally {
        await client.close();
    }
});

//Get Myjob
app.get('/api/myjob/:jobseekerusername', async (req, res) => {
    const { jobseekerusername } = req.params;
    let client;

    try {
        client = new MongoClient(uri, { useUnifiedTopology: true });
        await client.connect();

        const database = client.db("Job");
        const collection = database.collection("Job");
        const jobs = await collection.find({ JobseekerUsername: jobseekerusername }).toArray();

        if (!jobs || jobs.length === 0) {
            return res.status(404).json({ message: "No jobs found for the provided jobseeker username" });
        }

        res.json(jobs);
    } catch (error) {
        console.error('Error finding jobs:', error);
        res.status(500).json({ error: 'Internal server error' });
    } finally {
        if (client) {
            client.close();
        }
    }
});

//Accept and Denied
app.post("/api/applicant/:jobseekerusername/:jobid", async (req, res) => {
    const { jobseekerusername, jobid } = req.params;
    const { ActionCommand } = req.body;
    let client
    try {
        client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        const database = client.db("Job");
        const collection = database.collection("Job");

        let filter = {
            Jobid: new ObjectId(jobid),
            JobseekerUsername: jobseekerusername
        };

        if (ActionCommand === "Accept") {
            await collection.updateOne(
                filter,
                { $set: { "Status": "Accepted" } }
            );
            res.status(200).json({ message: "Status updated successfully" });
        } else if (ActionCommand === "Deny") {
            await collection.updateOne(
                filter,
                { $set: { "Status": "Denied" } }
            );
            res.status(200).json({ message: "Status updated successfully" });
        } else {
            res.status(400).json({ message: "Invalid action command" });
        }
    } catch (error) {
        console.error("Error updating status:", error);
        res.status(500).json({ error: "Internal server error" });
    } finally {
        client.close();
    }
});

//Get Applicant Status
app.get("/api/applicant/status/:jobseekerusername", async (req, res) => {
    const jobseekerusername = req.params.jobseekerusername;

    try {
        const client = new MongoClient(uri, { useNewUrlParser: true });
        await client.connect();
        const database = client.db("postedjob");
        const collection = database.collection("postedjob");

        const postedJobs = await collection.find({ "JobseekerUsername": jobseekerusername }).toArray();

        if (postedJobs.length === 0) {
            return res.status(404).json({ message: "No jobs found for the specified job seeker" });
        }

        const statuses = postedJobs.map(job => {
            const index = job.JobseekerUsername.findIndex(username => username === jobseekerusername);
            return {
                JobId: job._id,
                Status: job.Status[index] || "None" 
            };
        });

        res.json(statuses);
    } catch (error) {
        console.error("Error retrieving status:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

//Applicant Status
app.post('/api/application', async (req, res) => {
    const { jobId, jobseekerUsername, status } = req.body;

    try {
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        const database = client.db(dbName);
        const collection = database.collection(collectionName);

        const result = await collection.insertOne({
            jobId: new ObjectId(jobId),
            jobseekerUsername,
            status
        });

        client.close();

        res.status(201).json({ success: true, message: 'Application stored successfully' });
    } catch (error) {
        console.error('Error storing application:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

app.listen(3000 , () => {
    console.log('Server is running on port http://localhost:3000');
});