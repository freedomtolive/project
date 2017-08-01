var React = require("react");

module.exports = React.createClass({
	handleForm:function(ev){
		//点击确定和取消时表单提交会刷新页面，这个函数的作用是阻止页面刷新
		ev.preventDefault();

		var newQuestion = {
			title : this.refs.title.value,
			description : this.refs.description.value,
			voteCount : 0
		}
		this.refs.addQuestionForm.reset();

		this.props.onNewQuestion(newQuestion)
	},
	render : function(){
		var styleObj = {
			display:this.props.formDisplayed?"block":"none"
		};
		return (
			<form ref="addQuestionForm" style={styleObj} name="addQuestion" className="clearfix" onSubmit={this.handleForm}>
	          <div className="form-group">
	            <label htmlFor="qtitle">问题</label>
	            <input ref="title" type="text" className="form-control" id="qtitle" placeholder="您的问题的标题"/>
	          </div>
	          <textarea ref="description" className="form-control" rows="3" placeholder="问题的描述"></textarea>
	          <button className="btn btn-success pull-right" >确认</button>
	          <button className="btn btn-default pull-right" onClick = {this.props.onTriggerForm}>取消</button>
	        </form>
		)
	}
})