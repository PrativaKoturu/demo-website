const express = require("express");
const app = express();
const path = require("path");
const MongoClient = require("mongodb").MongoClient;

const PORT = 5050;
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 
app.use(express.static("public"));

// Serve the main HTML page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

const MONGO_URL = "mongodb://localhost:27017";
const client = new MongoClient(MONGO_URL);

//GET all users
app.get("/getUsers", async (req, res) => {
    try {
        await client.connect(); 
        console.log('Connected successfully to server');
        
        const db = client.db("testdb"); 
        const data = await db.collection('users').find({}).toArray();
        
        await client.close();
        res.json(data); 
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

//POST new user
app.post("/addUser", async (req, res) => {
    try {
        const userObj = req.body;
        console.log(req.body);
        
        await client.connect();
        console.log('Connected successfully to server');
        
        const db = client.db("testdb"); 
        const data = await db.collection('users').insertOne(userObj);
        
        console.log(data);
        console.log("data inserted in DB");
        
        await client.close();
        
        res.redirect('/?success=true');
    } catch (error) {
        console.error('Error adding user:', error);
        res.redirect('/?error=true');
    }
});

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});