var express = require('express')
var router = express.Router()

var FoodTypeDal = require('../../../common/food_type').FoodTypeDal
var foodTypeDal = new FoodTypeDal()


router.get('/',(req,res)=>{
    var page = 1
    if(req.query.page){
        page = Number(req.query.page)
    }
    foodTypeDal.getDataByPage(page,{},data=>{
        res.json({status:'y',msg:'获取分页成功',data:data})
    })
})
router.get('/:id',(req,res)=>{
    
    foodTypeDal.findByID(req.params.id,data=>{
        console.log(data)
        res.json({status:'y',msg:'获取分页成功',data:data})
    })
})
router.post('/create',(req,res)=>{
    foodTypeDal.save(req.body,isOk=>{
        if(isOk){
            res.json({status:'y',msg:'新增记录成功'})
        }else{
            res.json({status:'n',msg:'新增记录失败'})
        }
    })
})
router.post('/update/:id',(req,res)=>{
    foodTypeDal.updateByID(req.params.id,req.body,isOk=>{
        if(isOk){
            res.json({status:'y',msg:'修改记录成功'})
        }else{
            res.json({status:'n',msg:'修改记录失败'})
        }
    })
})
router.post('/delete/:id',(req,res)=>{
    foodTypeDal.del(req.params.id,isOk=>{
        if(isOk){
            res.json({status:'y',msg:'删除记录成功'})
        }else{
            res.json({status:'n',msg:'修改记录失败'})
        }
    })
})
module.exports = router