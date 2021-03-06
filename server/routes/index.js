var express = require('express');
var router = express.Router();
var chalk = require('chalk');

var passportLinkedIn = require('../auth/linkedin');
var passportGithub = require('../auth/github');
var passportTwitter = require('../auth/twitter');
var passportGoogle = require('../auth/google');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.send('Go back and register!');
});



router.get('/auth/linkedin', passportLinkedIn.authenticate('linkedin'));

router.get('/auth/linkedin/callback',
  passportLinkedIn.authenticate('linkedin', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication
    res.json(req.user);
  });


router.get('/auth/github', passportGithub.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/auth/github/callback',
  passportGithub.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication
    res.json(req.user);
  });


router.get('/auth/twitter', passportTwitter.authenticate('twitter'));

router.get('/auth/twitter/callback',
  passportTwitter.authenticate('twitter', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication
    res.json(req.user);
  });


router.get('/auth/google', passportGoogle.authenticate('google', { scope: ['profile'] }));

/*
router.get('/auth/google/callback', (req, res) => {
  res.redirect('/');
});
*/

router.get('/auth/google/callback', 
  passportGoogle.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    console.log(chalk.green('Successful authentication'));
    console.log(chalk.red('User'));
    console.log(req.user);
    // Successful authentication, redirect home.
    res.redirect('/');
  });


module.exports = router;
