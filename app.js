const express = require("express");
const db = require("./models")
const app = express();
require("dotenv").config() // config 읽은 이후에 process.에 접근
const PORT = process.env.PORT;

// 미들웨어처리
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/static", express.static(__dirname + "/static"));

// 라우터
const indexRouter = require("./routes");
app.use("/", indexRouter); // "/"에 들어가면 여기로 들어가 찾아주세요.


// 404 에러처리
app.get("*", (req, res) => {
  res.send("404");
});

db.sequelize.sync({force: false}).then((result)=>{
  // console.log(result) ---> 엄청나게 긴 시퀄라이즈 객체가 들어옴.
  console.log("DB연결 성공!") 
  console.log("-----------") 
  // 포트열기
  // sync()는 비동기적으로 동작하기 때문에 포트 위치를 바꾸고 싶으면 이렇게 then안에 넣어라 
  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });
})