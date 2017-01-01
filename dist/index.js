'use strict';

require('babel-polyfill');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _sqlite = require('sqlite');

var _sqlite2 = _interopRequireDefault(_sqlite);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new _bluebird2.default(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return _bluebird2.default.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var app = (0, _express2.default)();
var port = process.env.port || 3000;

/* use static files */
app.use('/css', _express2.default.static(__dirname + '/css'));
app.use('/js', _express2.default.static(__dirname + '/js'));
app.use('/img', _express2.default.static(__dirname + '/img'));
app.use('/bootstrap', _express2.default.static(__dirname + '/bootstrap'));
app.use('/jquery', _express2.default.static(__dirname + '/jquery'));

/* set up view engines */
app.set('view engine', 'ejs');

/* get menus */
var menus = undefined;
var foods_menu = undefined;
var foods = undefined;

app.get('/', function () {
			var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res, next) {
						var foods_menu, i;
						return regeneratorRuntime.wrap(function _callee$(_context) {
									while (1) {
												switch (_context.prev = _context.next) {
															case 0:
																		if (!(menus === undefined)) {
																					_context.next = 6;
																					break;
																		}

																		_context.next = 3;
																		return _sqlite2.default.all('SELECT name FROM sqlite_master WHERE type=\'table\';');

															case 3:
																		menus = _context.sent;

																		res.setHeader('Content-Type', 'application/json');
																		res.send(JSON.stringify({ a: 1 }));

															case 6:
																		_context.prev = 6;

																		if (!(foods_menu === undefined)) {
																					_context.next = 20;
																					break;
																		}

																		foods_menu = [];
																		i = 0;

															case 10:
																		if (!(i < menus.length)) {
																					_context.next = 19;
																					break;
																		}

																		_context.t0 = foods_menu;
																		_context.next = 14;
																		return _sqlite2.default.all('SELECT * FROM ' + menus[i].name);

															case 14:
																		_context.t1 = _context.sent;

																		_context.t0.push.call(_context.t0, _context.t1);

															case 16:
																		i++;
																		_context.next = 10;
																		break;

															case 19:
																		res.render('pages/index', {
																					menus: menus,
																					foods: foods_menu
																		});

															case 20:
																		_context.next = 25;
																		break;

															case 22:
																		_context.prev = 22;
																		_context.t2 = _context['catch'](6);

																		next(_context.t2);

															case 25:
															case 'end':
																		return _context.stop();
												}
									}
						}, _callee, undefined, [[6, 22]]);
			}));

			return function (_x, _x2, _x3) {
						return _ref.apply(this, arguments);
			};
}());

app.get('/menus', function () {
			var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(req, res, next) {
						var category;
						return regeneratorRuntime.wrap(function _callee2$(_context2) {
									while (1) {
												switch (_context2.prev = _context2.next) {
															case 0:
																		_context2.prev = 0;

																		if (!(menus === undefined)) {
																					_context2.next = 5;
																					break;
																		}

																		_context2.next = 4;
																		return _sqlite2.default.all('SELECT name FROM sqlite_master WHERE type=\'table\';');

															case 4:
																		menus = _context2.sent;

															case 5:
																		category = req.query.category;
																		_context2.next = 8;
																		return _sqlite2.default.all('SELECT * FROM ' + category);

															case 8:
																		foods = _context2.sent;

																		res.render('pages/menus', {
																					menus: menus,
																					category: category,
																					foods: foods
																		});

																		_context2.next = 15;
																		break;

															case 12:
																		_context2.prev = 12;
																		_context2.t0 = _context2['catch'](0);

																		next(_context2.t0);

															case 15:
															case 'end':
																		return _context2.stop();
												}
									}
						}, _callee2, undefined, [[0, 12]]);
			}));

			return function (_x4, _x5, _x6) {
						return _ref2.apply(this, arguments);
			};
}());

_bluebird2.default.resolve().then(function () {
			return _sqlite2.default.open('menu.db', { Promise: _bluebird2.default });
}).catch(function (err) {
			return console.error(err.stack);
}).finally(function () {
			return app.listen(port);
});