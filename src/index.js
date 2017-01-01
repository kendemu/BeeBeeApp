import 'babel-polyfill';
import express from 'express';
import db from 'sqlite';
import Promise from 'bluebird';
const app = express();

/* use static files */
app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/img', express.static(__dirname + '/img'));
app.use('/bootstrap', express.static(__dirname + '/bootstrap'));
app.use('/jquery', express.static(__dirname + '/jquery'));

/* set up view engines */
app.set('port', (process.env.PORT || 5000));
app.set('view engine', 'ejs');

/* get menus */
var menus = undefined;
var foods_menu = undefined;
var foods = undefined;

app.get('/', async (req, res, next) => {
    if(menus === undefined){
	menus = await db.all('SELECT name FROM sqlite_master WHERE type=\'table\';');
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
    .catch((err) => console.error(err.stack))
	.finally(
	    () => app.listen(app.get('port'),
		() => console.log('App is running on port',app.get('port'))
	    ));
