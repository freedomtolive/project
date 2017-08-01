var React = require('react');
var ReactDom = require('react-dom')
var QuestionApp = require('./components/QuestionApp.js');

var mainCom = ReactDom.render(
	<QuestionApp />,
	document.getElementById('app')
)
