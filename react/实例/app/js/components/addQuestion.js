var React = require ('react');
var QuestionItem = require ('./questionItem.js');

module.exports = React.createClass({
	render : function(){
		var questions = this.props.questions;
		//判断是否是数组
		if(!Array.isArray(questions)) throw new Error("问题必须是数组");

		var questionComps = questions.map(function(qst){
			return < QuestionItem  key={qst.key} title={qst.title} description={qst.description} voteCount={qst.voteCount}/>
		})
		return (
			<div id="questions">
				{questionComps}
	        </div>
		)
	}
})