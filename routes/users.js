var express = require('express');
var router = express.Router();
const db = require('../models/index');

/* GET users listing. */
router.get('/login', (req, res, next) => {
  var data = {
     title:'Users/Login',
     content:'名前とパスワードを入力下さい。'
  }
  res.render('users/login', data);
});

router.post('/login', (req, res, next) => {
  db.User.findOne({
    where:{
      nickname:req.body.name,
      password:req.body.pass,
    }
  }).then(usr=>{
    if (usr != null) {
      req.session.login = usr;
      let back = req.session.back;
      if (back == null){
        back = '/';
      }
      res.redirect(back);
    } else {
      var data = {
        title:'Users/Login',
        content:'名前かパスワードに問題があります。再度入力下さい。'
      }
      res.render('users/login', data);
    }
  })
});

router.get('/add',(req, res, next)=> {
  var data = {
    title: 'Users/Add'
  }
  res.render('users/add', data);
});

router.post('/add',(req, res, next)=> {
  let db_size;
  db.User.count().then(result => {db_size = result + 1})
  db.sequelize.sync()
    .then(() => db.User.create({
      userID: db_size,
      nickname: req.body.nickname,
      password: req.body.password,
    }))
    .then(usr => {
      res.redirect('/users');
    });
});

module.exports = router;
