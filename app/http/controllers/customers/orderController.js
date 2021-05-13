const Order = require('../../../models/order')
function orderController(){
    return{
        store(req,res){
            const {phone,address} = req.body

            if(!phone || !address){
                req.flash('error',"All fields are empty")
                return redirect('/cart')
            }

            const order = new Order({
                customerId: req.user._id,
                items:req.session.cart.items,
                phone:phone,
                address:address
            })
            order.save().then(result =>{
                req.flash('success','Order Saved Successfully')
                delete req.session.cart
                return res.redirect('/customers/orders')
            }).catch(err=>{
                req.flash('error','Something went wrong')
                return res.redirect('/cart')
            })
        },
        async index(req,res){
            const orders = await Order.find({customerId: req.user._id})
            res.render('customers/orders',{orders:orders})
        }
    }
}

module.exports =orderController