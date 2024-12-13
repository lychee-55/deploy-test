'use strict';

const Sequelize = require('sequelize');
// models까지의 경로를 읽고 있는데, json파일까지 일고 싶어서 추가하는 내용 //[]는 개발환경을 돌리고 있기 때문에 development를 작성한것,(개발환경은 아마 json에서 development만 살려둬서 그런것 같다.)
// const config = require(__dirname + '/../config/config.js')["development"]; //(객체)의 [키]를 가져오기 위해서임
// console.log("config: ",config)
let config = require(__dirname + '/../config/config.js'); //(객체)의 [키]를 가져오기 위해서임
console.log(config)
config = config["development"]
console.log("config: ",config)
/*config:  {
  username: '-',
  password: '-',
  database: '-',
  host: '-',
  dialect: '-'
}*/
const db = {};

// 연결과 관련된 정보를 시퀄라이즈에 연결해둔 상태
let sequelize = new Sequelize(
  config.database, 
  config.username, 
  config.password, 
  config);

// 키 = 설정값 -> 설정정보를 sequelize 라는 key 안에 넣어주는 중
db.sequelize = sequelize;
// {
//   sequelize:sequelize
// }

// sequelize 모듈을 sequelize라는 key안에 넣어주는 중
db.Sequelize = Sequelize;
// {
//   sequelize:sequelize,
//   Sequelize: Sequelize,
// }

// (sequelize는 위 let의 시퀄라이즈,Sequelize는 Visitors파일의 DataTypes = const Sequelize = require('sequelize');)
db.Visitor = require("./Visitor")(sequelize,Sequelize)
// {
//   sequelize: sequelize,
//   Sequelize: Sequelize,
//   Visitor: visitor의 모델
// }

// 다른파일에서 사용할 수 있도록 모듈을 exports해주는 중
module.exports = db; // app.js
