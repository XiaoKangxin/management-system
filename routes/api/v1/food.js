var express = require('express')
var router = express.Router()

var FoodDal = require('../../../common/food').FoodDal
var foodDal = new FoodDal()


router.get('/',(req,res)=>{
    var page = 1
    if(req.query.page){
        page = Number(req.query.page)
    }
    var filter = {}
    if(req.query.type){
        filter.type = req.query.type
    }
    foodDal.getDataByPage(page,filter,data=>{
        res.json({status:'y',msg:'获取分页成功',data:data})
    })
})
router.get('/:id',(req,res)=>{
    
    foodDal.findByID(req.params.id,data=>{
        console.log(data)
        res.json({status:'y',msg:'获取数据成功',data:data})
    })
})
router.post('/create',(req,res)=>{
    foodDal.save(req.body,isOk=>{
        if(isOk){
            res.json({status:'y',msg:'新增记录成功'})
        }else{
            res.json({status:'n',msg:'新增记录失败'})
        }
    })
})
router.post('/update/:id',(req,res)=>{
    console.log(req.body)
    foodDal.updateByID(req.params.id,req.body,isOk=>{
        if(isOk){
            res.json({status:'y',msg:'修改记录成功'})
        }else{
            res.json({status:'n',msg:'修改记录失败'})
        }
    })
})
router.post('/delete/:id',(req,res)=>{
    foodDal.del(req.params.id,isOk=>{
        if(isOk){
            res.json({status:'y',msg:'删除记录成功'})
        }else{
            res.json({status:'n',msg:'修改记录失败'})
        }
    })
})
module.exports = router