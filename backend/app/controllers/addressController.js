const addressController = {}

const address = require('../models/Address')

addressController.create = (req,res)=>{
    const body=req.body 
    console.log(body)
    const addAddress= new address(body)
    addAddress.save()
    .then((data)=>{
        res.json(data)
    })
    .catch((err)=>{
        res.json(err)
    })
}
addressController.show = (req,res)=>{
    address.find()
    .then((data)=>{
        res.json(data)
    })
    .catch((err)=>{
        res.json(err)
    })
}
addressController.destroy = (req,res)=>{
    const id=req.params.id 
    address.findByIdAndDelete(id)
    .then((data)=>{
        res.json(data)
    })
    .catch((err)=>{
        res.json(err)
    })

}
addressController.register = (req,res)=>{
    const body=req.body 
    const Register = new address(body)
    Register.save()
    .then((data)=>{
        res.json(data)
    })
    .catch((err)=>{
        res.json(err)
    })
}

module.exports = addressController