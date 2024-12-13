const mysql = require("mysql")
const conn = mysql.createConnection({
    host:"127.0.0.1", // 혹은 localhost
    user:"sesac", // 보통 사용 안 하는게 좋음
    password:"1234",
    database:"sesac"
})
/* 1. 전체 목록 "조회" */
// controller에 넘겨줄 데이터를 아래 괄호에 작성(여기선 데이터를 넘겨주는데 데이터는 시간이 걸리는 작업이라 비동기처리로 보내는 중)
exports.getVisitors = (cb) => {
    /* DB 연결전 */
    // return[
    //     {id: 1, name: "홍길동", comment:"내가왔다."},
    //     {id: 2, name: "이찬혁", comment:"으라차차"}
    // ]

    /* DB 연결 후 */
    // conn에는 메소드로 query문을 쓸 수 있고 query를 통해 SELECT등을 조작 할 수 있음.
    // query의 첫번재 매개변수의 결과를 배열 형태로 불러오는게 rows
    // controller의 result는 여기의 cb의 결과를 의미
    conn.query(`SELECT * FROM visitor`,(err,rows) => {
        if(err){
            throw err // 에러를 만들어 주는 문장
        }
        console.log('visitor 테이블의 전체조회:',rows)
        /*select문의 결과 rows:
        배열형태로 들어옴 ▼
        visitor 테이블의 전체조회: [
            RowDataPacket { id: 1, name: '홍길동', comment: '내가 왔다!' },
            RowDataPacket { id: 2, name: '이찬혁', comment: '야호!' }
        ]
        */
        cb(rows)
    })
}

/* 2. 특정 데이터 조회 */
// 가져올 데이터를 인자에 작성
exports.getVisitor=(id,cb)=>{
    conn.query(`SELECT * FROM visitor WHERE id=${id}`,(err,rows)=>{
        if(err){
            throw err
        }
        console.log('visitor 테이블의 하나의 데이터만 조회',rows)
        cb(rows[0])
    })
}

/* 3. 데이터 등록 */
// visitor 테이블에 데이터 삽입
exports.postVisitor=(data,cb)=>{
    // data = req.body, comment와 name정보가 있는 객체 형태
    conn.query(`INSERT INTO visitor VALUES(null,"${data.name}","${data.comment}")`,(err,rows)=>{
        if (err) throw err
            console.log("model post: ", rows)
            /*
            OkPacket {
                fieldCount: 0,
                affectedRows: 1,
                insertId: 4, // 현재 넣어진 id 
                serverStatus: 2,
                warningCount: 0,
                message: '',
                protocol41: true,
                changedRows: 0
              }*/
            cb(rows.insertId)
    })
}
/* 4. 데이터 삭제 */
// id만 받아주고 있음, 바로 접근 가능한 값
exports.deleteVisitor=(id,cb)=>{
    conn.query(`DELETE FROM visitor WHERE id=${id}`,(err,rows)=>{
        if (err) throw err
        console.log("모델 Visitor.js 특정 데이터 삭제",rows)
        /*OkPacket {
            fieldCount: 0,
            affectedRows: 1,
            insertId: 0,
            serverStatus: 2,
            warningCount: 0,
            message: '',
            protocol41: true,
            changedRows: 0
          }*/
        cb()
        // 삭제해서 쓸 정보가 없기에 따로 cb에 뭘 보내지 않음.
    })
}
/* /visitor PATCH 수정 */
exports.patchVisitor=(data,cb)=>{
    console.log("model data",data)
    // {id, name, comment}
    conn.query(`UPDATE visitor SET name="${data.name}", comment="${data.comment}" WHERE id=${data.id}`
        ,(err,rows)=>{
        if (err) throw err
        console.log("Visitor.js 수정",rows)
        /*
        Visitor.js 수정 OkPacket {
        fieldCount: 0,
        affectedRows: 1,
        insertId: 0,
        serverStatus: 2,
        warningCount: 0,
        message: '(Rows matched: 1  Changed: 1  Warnings: 0',
        protocol41: true,
        changedRows: 1
        }*/
        cb()
    })
}