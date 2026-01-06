const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
const AppError = require('./utils/appError');

const server = require('http').createServer(app);
// initSocket(server);

const apiVersion = "/api/v1"

/****************  Routes  **********************/
const authRouter = require('./Routes/authRoutes');
const unitRouter = require('./Routes/unitRoutes');
const investorRouter = require('./Routes/investorRoutes');
const expenseRouter = require('./Routes/expenseRoutes');
const paymentRouter = require('./Routes/paymentRoutes');
const reportRouter = require('./Routes/reportRoutes');

app.use(`${apiVersion}/auth`, authRouter);
app.use(`${apiVersion}/units`, unitRouter);
app.use(`${apiVersion}/investors`, investorRouter);
app.use(`${apiVersion}/expenses`, expenseRouter);
app.use(`${apiVersion}/payments`, paymentRouter);
app.use(`${apiVersion}/reports`, reportRouter);

app.get("/test", (req, res)=>{
    res.status(200).send("test is working!")
});

// Error handling
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  });

module.exports = {app, server};