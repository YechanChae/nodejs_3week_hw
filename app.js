const express = require('express');
const connect = require("./schemas/index")
const app = express();
const port = 5000;

connect();

const boardsRouter = require("./routes/boards");

const requestMiddleware = (req, res, next) => { //어디로 요청했는지 언제 요청했는지 알려주는 미들웨어이다.
    console.log("Request URL", req.originalUrl, " - ", new Date());
    next();
}
app.use(express.json()); //body로 들어오는 json형식의 데이서를 파싱을 해준다
app.use(requestMiddleware);

app.use("/api", boardsRouter);

app.get('/', (req, res) => {
    res.send("3주차 개인과제 항해99 7기 채예찬!!!")
})

app.listen(port, () => {
    console.log(port, '포트로 서버가 열렸어요!');
  });