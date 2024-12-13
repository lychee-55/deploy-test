// const Visitor = require("../model/Visitor")
// const { where } = require("sequelize");
const models = require("../models/index"); //index.js
const { errorlogs } = require("../utils/common");
// console.log(Visitor.getVisitors())

// GET / => localhost:PORT/
exports.main = (req,res)=>{
    res.render("index")
}

exports.getVisitors = (req,res)=>{
    // [DB 연결 전]
    // console.log(Visitor.getVisitors())
    // res.render('visitor',{data : Visitor.getVisitors()})  // 정보를 사용할 수 있도록 데이터로 넘김
    
    // [DB 연결 후, sequelize연결전]
    // (result)=>{}가 Visitor.js의 cb(rows)임.
    // Visitor.getVisitors((result)=>{
    //     console.log("전체목록 Cvisitor.js",result)
    //     res.render("visitors",{data : result})
    // })
    // res.send("response")

    /* [ sequelize 이후 ] */
    // `SELECT * FROM visitor`
    models.Visitor.findAll()
      .then((result)=>{
        console.log("findAll>>",result) 
        // result(findAll의 결과)는 배열형태로 들어옴.
        // res.send(result)
        res.render("visitors",{data:result})
      })
      .catch((err)=>{
          console.log("getVisitors Controller Err",err)
          res.status(500).send("server error!!")
      })

}

/* /visitor/:id GET */
exports.getVisitor = async (req,res)=>{
    console.log(req.params) // {id:"1"}
    console.log(req.params.id) // {"1"}
    // [sequelize 연결 전]
    // Visitor.getVisitor(req.params.id, (result)=>{
    //     console.log("한 개의 데이터 Cvisitor.js:",result)
    //     res.send(result)
    // })

    // [sequelize 연결 후]
    // `SELECT * FROM visitor WHERE id=${req.params.id}`
    try{
    const result = await models.Visitor.findOne({
        where: {
          id: req.params.id,
        },
      });
    console.log("findOne>>",result)
    res.send(result)
    }catch(err){
        errorlogs(res,err)
}}

/* /visitor POST 등록 */
// INSERT INTO >> CREATE
exports.postVisitor = (req,res)=>{
    console.log(req.body)
    /* [sequelize 이전] */
    // Visitor.postVisitor(req.body,(result)=>{
    //     console.log("Cvisitor.js",result)
    //     res.send({id: result, comment: req.body.comment, name: req.body.name})
    // })

     /* [sequelize 이후] */
    //  `INSERT INTO visitor VALUES(null,"${data.name}","${data.comment}")`
    models.Visitor.create({
        name: req.body.name,
        comment: req.body.comment
    }).then((result)=>{
        console.log(result)
        res.send(result)
    }).catch((err)=>{
        console.log("err",err)
        res.status(500).send("Server Error!!")
    })
}

/* /visitor DELETE 삭제 */
// DELETE FORM ~~ >> destroy()
exports.deleteVisitor= async (req,res)=>{
    console.log(req.body) // { id: '3' }
    console.log(req.body.id) // "3"
    /* [sequelize 이전] */
    // Visitor.deleteVisitor(req.body.id,()=>{
    //     res.send(req.body.id + "+번 id삭제완료!")
    // })
    // res.send("response!")

    /* [sequelize 이후] */
    // `DELETE FROM visitor WHERE id=${req.body.id}`
    try{
    const result = await models.Visitor.destroy({
        where: { id: req.body.id }
    })
    console.log(result)  
    // 1(삭제성공), 0(삭제실패- 없는 데이터를 삭제하려고 할 때)
    // true, false
    if(Boolean(result)){
        res.send(req.body.id + "+번 id 삭제완료!")
    }else{
        res.send("잘못된 접근입니다!")
    }
    }catch(err){
        errorlogs(res,err)
    }
}

/* /visitor PATCH 수정 */
// updats SET~~ >> UPDATE
exports.patchVisitor = async (req,res)=>{
    console.log(req.body)
    /* [sequelize 이전] */
    // res.send("response patch!")
//     Visitor.patchVisitor(req.body,()=>{
//         res.send("수정완료")
//     })

    /* [sequelize 이후] */
    // `UPDATE visitor 
    // SET name="${data.name}", comment="${data.comment}" 
    // WHERE id=${data.id}`
    try{
    const [result] = await models.Visitor.update({
        name:req.body.name,
        comment:req.body.comment,
    },{
        where:{
            id: req.body.id
        }
    })
    console.log(result)  // [1], [0]
    // const [number] = result
    // console.log(number)

    if(Boolean(result)){
        res.send("수정완료")
    }else{
        res.send("잘못된 접근입니다!")
    }
    }catch(err){
        errorlogs(err,"patch controller 내부","수정 에러가 났어요",500)
    }
}