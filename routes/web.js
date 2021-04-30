function initRoutes(app){
    app.get('/',(req,res)=>{
        res.render('home')
    })

    app.get('/login',(req,res)=>{
        res.render('auth/login')
    })
    
    app.get('/register',(req,res)=>{
        res.render('auth/register')
    })
    
    
    app.get('/cart',(req,res)=>{
     res.render('customers/cart')
    })
}

module.exports = initRoutes