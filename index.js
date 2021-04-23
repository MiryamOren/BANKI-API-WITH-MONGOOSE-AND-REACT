const express = require('express')
const mongoose = require('mongoose')
const DB = process.env.DB;
mongoose.connect(DB, {
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