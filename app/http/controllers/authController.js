const { eventNames } = require('../../models/user');
const User = require('../../models/user')
const bcrypt = require('bcrypt');
const flash = require('express-flash');
const passport = require('passport')

function authController(){

    return {
        login(req,res){
            res.render('auth/login')
        },

         postLogin(req,res,next) {

            passport.authenticate('local',(err,user,info)=>{
                if(err){
                    req.flash('error',info.message )
                    return next(err)
                }
                if(!user){
                    req.flash('error',info.message)
                    return res.redirect('/login')
                }

                req.login(user,(err)=>{
                    if(err){
                        req.flash('err',info.message)
                        return next(err)
                    }

                    return res.redirect('/')
                })
            })(req,res,next)

        },
        register(req,res){
            res.render('auth/register')
        },
        
        
       async postRegister(req,res){
            //The logic for register here

            const { name,email,password} = req.body;
            //Validating rqst

            if(!name || !email || !password){
                req.flash('error','All fields are empty')
                req.flash('name',name)
                req.flash('email',email)

                return res.redirect('/register')
            }

            //Check if email exists
            User.exists({email:email},(err,result)=>{
                if(result){
                    req.flash("Email Already exists")
                    req.flash('name',name)
                    req.flash('email',email)
                    return res.redirect('/register')
                }
            })
            

            //Password hashing
            hash_password = await bcrypt.hash(password,10)


            //Creating new user

            const user = new User({
                name : name,
                email: email,
                password: hash_password
            })

            user.save().then((user)=>{
                //login

                return res.redirect('/')

            }).catch(err =>{
                req.flash('error','Something went wrong')
                
                return res.redirect('/register')


            })
        },

        logout(req,res){
            req.logout()
            return res.redirect('/login')
        }
    }
}

module.exports = authController