// 실제 데이터 베이스에 접근하는 파일
const Visitor = function(Sequelize, DataTypes){
    const model = Sequelize.define(
        "visitor",
        {
        id: {
            // id INT NOT NULL PRIMARY KEY auto_increment
            type: DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull:false,
        },
        name:{
            // name VARCHAR(10) NOT NULL
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        comment:{
            // comment MEDIUMTEXT
            type: DataTypes.TEXT("medium"),
        }
    },{ //컬럼정의
        timestamps: false,
        // 테이블 추가/수정 컬럼을 자동으로 만들어서 기록 --> 변경된 시간이 자동으로 저장됨.
        // 기본값 true
        freezeTableName: true, 
        // 기본값 --> false
        // 첫번째 인자로 전달을 해준 모델 이름 그대로
        // 테이블 이름을 고정하겠다!
    })

    return model
}

module.exports = Visitor; // modules/index.js에서 사용할 예정