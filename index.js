const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const DB = process.env.DB;
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
});
const userRouter = require('./routers/user');
const accountRouter = require('./routers/account');

const app = express()
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(accountRouter);


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})