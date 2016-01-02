var React = require('react');

var BlogPost = React.createClass({
	
	render: function(){
		var imgSrc = '/images/' + this.props.image;
		return(
			<div className="react-blog-post">
				<div className="blog-title">
					<div className="post-image-container">
						<img className="post-image" src={ imgSrc } />
					</div>
					<div className="title-text"> { this.props.title } </div>
					<div className="subtitle-text"> { this.props.subtitle } </div>
				</div>
				<div className="blog-content">
					<div className="blog-post"> { this.props.content } </div>
					<div className="date"> { this.props.date } </div>
				</div>
			</div>
		);
	}
});

module.exports = BlogPost;