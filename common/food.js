var db = require('./db_base')
var DBBase = db.DBBase
var mongoose = db.mongoose
var Schema = mongoose.Schema
//创建food集合的数据结构
var foodSchema = new Schema({
    name:String,//标题
    description:String,//描述
    img:String,//封面图
    price:{
        type:Number,
        default:0
    },//价格
    type:String
    //*************************** */
    // type:{
    //     type:Schema.ObjectId,
    //     ref:'food_type'
    // }//分类
    //*************************** */
})
// 通过virtual创建虚拟链接
foodSchema.virtual('food_type',{
    ref:"food_type",
    localField:"type",
    foreignField:"code"
})
var Food = mongoose.model('food',foodSchema) //创建food模型

/**
 * 书籍模型
 */
class FoodDal extends DBBase{
    constructor(){
        super(Food)
    }
    /**
     * 分页取数据
     * @param  {[type]}   page     当前页码
     * @param  {[type]}   filter   查询条件
     * @param  {Function} callback 回调函数
     * @return {[type]}            [description]
     */
    getDataByPage(page,filter,callback){
        var pageSize = global.pageSize //每页显示的数量
        this.model.count(filter) //统计记录数量
            .then(count=>{
                // console.log(count)
                var pageCount = Math.ceil(count/pageSize)
                if(page>pageCount){ //防止页码超出范围
                    page=pageCount
                }
                // 防止查询不到结果的时候page值变为0导致skip跳过的参数为负数
                if(page<=0){
                    page = 1
                }
                this.model.find(filter) //根据条件进行查询
                    .limit(pageSize)
                    .skip(pageSize*(page-1))
                    .populate('food_type')
                    .sort({_id:-1})
                    .then(res=>{
                        //返回两个数据 总页数和查询结果
                        callback({pageCount:pageCount,res:res})
                    })
                    .catch(err=>{
                        console.log(err)
                    })
            })
    }
}

module.exports = {
    Food:Food,
    FoodDal:FoodDal
}
