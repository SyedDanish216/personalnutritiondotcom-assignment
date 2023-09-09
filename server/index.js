const express = require('express');
const app = express();
const dotenv=require('dotenv');
const cors = require('cors'); // Import the cors library
app.use(cors());
app.use(express.json());
dotenv.config({path:'./config.env'})
require('./conn')
const port = process.env.PORT;


// Define routes (API endpoints)
app.use('/api', require('./routes/api'));




app.listen(port,()=>{
  console.log(`Server is running at port ${port}`);   
 })