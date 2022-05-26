const express = require("express");
const Boards = require("../schemas/boards");
const router = express.Router();
const moment = require("moment");
//전체 게시글 목록 조회
router.get("/boards", async(req, res) => {
    const boards = await Boards.find({}, {boardsId:1,title:1, date:1, name:1}).sort({"date":-1});
    res.json({
        boards,
    });
});  
// 게시글 조회(상세)
router.get("/boards/:boardsId", async(req, res) => {
    const { boardsId } = req.params;

    const [detail] = await Boards.find({}, {boardsId:1,title:1, date:1, name:1, comment:1})
    res.json({
      detail,
    })
    
});
//게시글 작성
router.post("/boards", async(req, res) => {
    const date = moment().add('9','h').format('YYYY-MM-DD HH:mm:ss')
    const { boardsId, name, title, comment, password,} = req.body;

    const boards = await Boards.find({ boardsId });
    if (boards.length) {
      return res.status(400).json({ success: false, errorMessage: "이미 있는 데이터입니다."})
    }

    const createdBoards = await Boards.create({ boardsId, name, title, comment, password, date });

    res.json({ boards : createdBoards});
});
//게시글 수정
  router.put("/boards/:boardsId", async(req, res) => {
    const { boardsId } = req.params;
    const { name,password,comment,title,date } = req.body;
    
    const existsboards = await Boards.find({ boardsId: Number(boardsId) }); 
    // console.log(Number(existsboards.map(row=>row.password)))
    // console.log(password)
    if (Number(existsboards.map(row=>row.password)) !== password) {
      return res.json({ success: false, errorMessage: "비밀번호가 일치하지 않습니다."})
    } else
    
    await Boards.updateOne({ boardsId:Number(boardsId)}, { $set: { name,comment,title,date} } );
    res.json({
     success: true,
});
});

//게시글 삭제

router.delete("/boards/:boardsId", async(req, res) => {
  const { boardsId } = req.params;
  const { name,password,comment,title} = req.body;
  
  const existsboards = await Boards.find({ boardsId: Number(boardsId) }); 
  // console.log(Number(existsboards.map(row=>row.password)))
  // console.log(password)
  if (Number(existsboards.map(row=>row.password)) !== password) {
    return res.json({ success: false, errorMessage: "비밀번호가 일치하지 않습니다."})
  } else
  
  await Boards.deleteOne({ boardsId:Number(boardsId)}, { $set: { name,comment,title} } );
  res.json({
   success: true,
});
});

module.exports = router; 