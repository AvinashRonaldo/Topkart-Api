const express = require('express')
const morgan = require('morgan')
const http = require('http')
const sequelize = require('./init_db');
//const productRoutes = require('./routes/productRoutes');
const ldealRoutes = require('./routes/lightDealsRoutes');
const orderRoutes = require('./routes/orderRoutes');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config()

const app = express()
const PORT = process.env.APP_PORT;
app.use(morgan('dev'));
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const server = http.createServer(app);

sequelize.sync({alter:true,backup:false}).then(
    ()=>console.log("Tables are created")
).catch((err)=>console.log(err))

/*sequelize.query('DROP TABLE IF EXISTS "products";')
  .then(() => {
    console.log('Backup table dropped successfully');
  })
  .catch((err) => {
    console.error('Unable to drop backup table:', err);
  });*/

server.listen(PORT,() => {
    console.log("Server is up and running");
})

app.get("/",async(req,res) => {
    res.send("Welcome to Home page!");
})

//app.use(productRoutes);
app.use(ldealRoutes);
app.use(orderRoutes);
app.use(userRoutes);
