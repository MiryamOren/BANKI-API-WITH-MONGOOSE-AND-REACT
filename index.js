const express = require('express')
const mongoose = require('mongoose')
// mongoose.connect('mongodb://127.0.0.1:27017/products-api', {
mongoose.connect('mongodb+srv://MiryamOren:FSciqc9dyj9-LJA@cluster0.r07fn.mongodb.net/BANK_API_DB?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
});
const postRouter = require('./routers/post')
const getRouter = require('./routers/get')
const patchRouter = require('./routers/update')
const deleteRouter = require('./routers/delete')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(postRouter);
app.use(getRouter);
app.use(patchRouter);
app.use(deleteRouter);


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})