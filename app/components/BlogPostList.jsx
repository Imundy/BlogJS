var React = require('react');
var BlogPost = require('./BlogPost');

var BlogPostList = React.createClass({
	render: function(){
		var blogPosts = this.props.data.map(function(post){
			return(
				<BlogPost image={post.image} title={post.title} subtitle={post.subtitle} content={post.content} date={post.date} key={post._id}>
				</BlogPost>
			);
		});
		return(<div>{blogPosts}</div>);
	}
});

module.exports = BlogPostList;