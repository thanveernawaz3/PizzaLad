function orderController(){
    return {
        index(req,res){
            order.find({status : {$ne:'completed'}},null,
            {sort:{'createdAt': -1}}).populate('customerId','-password').exec((err,orders)=>{
                res.render('admin/orders')
            })
            
        
        }
        }
    }


module.exports = orderController