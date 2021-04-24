const express = require('express')
const mongoose = require('mongoose')
const DB = process.env.DB;
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
});
const userRouter = require('./routers/user')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter);


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})