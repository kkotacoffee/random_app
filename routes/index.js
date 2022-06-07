const express = require('express');
const router = express.Router();
const db = require('../models/index');
const { Op } = require("sequelize");

const pnum = 10;

// ログインのチェック
function check(req,res) {
  if (req.session == null) {
    res.redirect('/users/login');
    return true;
  } else {
    if(req.session.login == null){
      res.redirect('/users/login');
    }else{
      return false;
    }
  }
}

// トップページ
router.get('/',(req, res, next)=> {
  res.redirect('/0');
});

// トップページにページ番号をつけてアクセス
router.get('/:page',(req, res, next)=> {
  if (check(req,res)){ return };
  const pg = req.params.page * 1;
  db.Board.findAll({
    offset: pg * pnum,
    limit: pnum,
    order: [
      ['createdAt', 'DESC']
    ],
    include: [{
      model: db.User,
      required: true
    }]
  }).then(brds => {
    var data = {
      title: 'Categories',
      login:req.session.login,
      content: brds,
      page:pg
    }
    res.render('boards/index', data);
  });
});

// メッセージフォームの送信処理
router.post('/add',(req, res, next)=> {
  if (check(req,res)){ return };
  db.sequelize.sync()
    .then(() => db.Category.create({
      category: req.body.msg
    })
    .then(brd=>{
      res.redirect('/');
    })
    .catch((err)=>{
      res.redirect('/');
    })
    )
});

// カテゴリーのホーム
/*
router.get('/home/:user/:id/:page',(req, res, next)=> {
  if (check(req,res)){ return };
  const id = req.params.id * 1;
  const pg = req.params.page * 1;
  db.Board.findAll({
    where: {userId: id},
    offset: pg * pnum,
    limit: pnum,
    order: [
      ['createdAt', 'DESC']
    ],
    include: [{
      model: db.User,
      required: true
    }]
  }).then(brds => {
    var data = {
      title: 'Boards',
      login:req.session.login,
      userId:id,
      userName:req.params.user,
      content: brds,
      page:pg
    }
    res.render('boards/home', data);
  });
});*/

module.exports = router;