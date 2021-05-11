require('dotenv').config()
const express = require('express')
const ejs = require('ejs');
const expressLayout= require('express-ejs-layouts')
const path = require('path')
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('express-flash');
const passport = require('passport')
const locals = require('passport-local') 
const MongoDbStore= require('connect-mongo')



//Database Connection
const url = "mongodb+srv://thanveer:p4ssw0rd@cluster0.vdyqu.mongodb.net/pizza?retryWrites=true&w=majority";
mongoose.connect(url,{ useNewUrlParser: true,useCreateIndex: true,useUnifiedTopology: true,useFindAndModify:true});
const connection = mongoose.connection
connection.once('open',()=>{
    console.log('Database Connected')
}).catch(err=>{
    console.log('Connection Failed')
})



const app = express();

// //Session Store
// let mongoStore = new MongoDbStore({
//     //connection
//     mongooseConnection: connection,
//     //collection
//    collection :'sessions'
//     })



app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave : false,
    store : MongoDbStore.create({
        mongoUrl : "mongodb+srv://thanveer:p4ssw0rd@cluster0.vdyqu.mongodb.net/pizza?retryWrites=true&w=majority",
        collection : 'sessions'
    }),
    saveUninitialized: false,
    cookie: {maxAge: 1000*60*60*24}  //Valid of Cookie
}))



app.use(flash())

app.use(express.urlencoded({extended: false}))

const passportInit= require('./app/config/passport')
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())


app.use((req,res,next)=>{
    res.locals.session = req.session
    res.locals.user = req.user
    next()
})

const PORT = process.env.PORT || 3000

//Setting static file
app.use(express.static('public'));
app.use(express.json())

//setting template engine
app.use(expressLayout);
app.set('views',path.join(__dirname,'/resources/views'))
app.set('view engine','ejs')


require('./routes/web')(app)






app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`)
})