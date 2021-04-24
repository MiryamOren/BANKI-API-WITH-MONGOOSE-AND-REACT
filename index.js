const express = require('express')
const mongoose = require('mongoose')
const DB = process.env.DB || 'mongodb+srv://MiryamOren:FSciqc9dyj9-LJA@cluster0.r07fn.mongodb.net/BANK_API_DB?retryWrites=true&w=majority';
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
});
const userRouter = require('./routers/user');
const accountRouter = require('./routers/account');

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter);
app.use(accountRouter);


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})