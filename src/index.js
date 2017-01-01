import 'babel-polyfill';
import express from 'express';
import db from 'sqlite';
import Promise from 'bluebird';
const app = express();
const port = process.env.port || 3000;

/* use static files */
app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/img', express.static(__dirname + '/img'));
app.use('/bootstrap', express.static(__dirname + '/bootstrap'));
app.use('/jquery', express.static(__dirname + '/jquery'));

/* set up view engines */
app.set('view engine', 'ejs');

/* get menus */
var menus = undefined;
var foods_menu = undefined;
var foods = undefined;

app.get('/', async (req, res, next) => {
    if(menus === undefined){
	menus = await db.all('SELECT name FROM sqlite_master WHERE type=\'table\';');
	res.setHeader('Content-Type', 'application/json');
	res.send(JSON.stringify({a : 1}));
	
    }

    try{
	if(foods_menu === undefined){
	    var foods_menu = []
	    for(var i = 0; i < menus.length; i++){
		foods_menu.push(await db.all('SELECT * FROM ' + menus[i].name))
	    }
	    res.render('pages/index', {
		menus: menus,
		foods: foods_menu
	    });
	}
    } catch(err) {
	next(err)
    }
});
  


app.get('/menus', async (req, res, next) => {
    try {
	if(menus === undefined){
	    menus = await db.all('SELECT name FROM sqlite_master WHERE type=\'table\';');
	}

	var category = req.query.category
	foods = await db.all('SELECT * FROM ' + category)
	res.render('pages/menus', {
	    menus: menus,
	    category: category,
	    foods: foods
	});
	
    } catch (err) {
	next(err)
    }
});

Promise.resolve()
    .then(() => db.open('menu.db', {Promise}))
    .then(() => db.migrate({force: 'last'}))
    .catch((err) => console.error(err.stack))
	.finally(() => app.listen(port));
