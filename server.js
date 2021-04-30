const express = require('express')
const ejs = require('ejs');
const expressLayout= require('express-ejs-layouts')
const path = require('path')


const app = express();




const PORT = process.env.PORT || 3000

//Setting static file
app.use(express.static('public'));

//setting template engine
app.use(expressLayout);
app.set('views',path.join(__dirname,'/resources/views'))
app.set('view engine','ejs')


require('./routes/web')(app)






app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`)
})