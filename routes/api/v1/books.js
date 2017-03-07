var express = require('express')
var router = express.Router()

var BookDal = require('../../../common/book').BookDal
var bookDal = new BookDal()


// router.get('/get_data',(req,res)=>{
// 	dalBook.getData({type:'ertong'},data=>{
// 		res.json({
// 			status:'y',
// 			msg:data
// 		})

// 	})

// })
router.get('/',(req,res)=>{
	console.log('test')
	var page = 1
    if (req.query.page) {
        page = req.query.page
    }
    bookDal.getDataByPage(page, { type: req.query.type }, data => {
		setTimeout(function() {
			res.json(data.res)
		}, 5000);
		// console.log(data)
        
    })
	// bookDal.getData({type:req.query.type},data=>{
	// 	res.json(data)
	// })
})

router.get('/get_page_count',(req,res)=>{
	var page = 1
    if (req.query.page) {
        page = req.query.page
    }
    bookDal.getDataByPage(page, { type: req.query.type }, data => {
		console.log(data)
        res.json(data)
    })
})

router.get('/:id',(req,res)=>{
	bookDal.findByID(req.params.id,data=>{
		// res.json({status:'y',msg:'获取数据成功',data:data})
		res.json(data)
	})
})

router.put('/:id',(req,res)=>{
	console.log(req.body)
	delete req.body._id
	delete req.body.__v
	bookDal.updateByID(req.params.id,req.body,isOk=>{
		// if(isOk){
		// 	res.json({status:'y',msg:'获取数据成功',data:req.body})
		// }
		res.json(data)
	})
	res.json({status:'y',msg:'获取数据成功',data:req.body})
})

router.post('/',(req,res)=>{
    bookDal.save(req.body,(isOk,data)=>{
		// if(isOk){
		// 	res.json({status:'y',msg:'新增数据成功',data:data})
		// }
		res.json(data)
	})
})

router.delete('/:id',(req,res)=>{
	bookDal.del(req.params.id,isOk=>{
		// res.json({status:'y',msg:'删除数据成功',data:{}})
		res.json({})
	})
})
router.get('/list.json/:type/:page?', (req, res) => {
    var page = 1
    if (req.params.page) {
        page = req.params.page
    }
    bookDal.getDataByPage(page, { type: req.params.type }, data => {
        res.json(data)
    })
})


module.exports = router