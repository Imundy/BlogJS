var React = require('react');
var BlogPostList = require('./BlogPostList');

var ReactHome = React.createClass({

    getInitialState: function(){
        return { 
        	data: [],
        	url: '/posts',
        	offset: 2,
        	limit: 2
        };
    },

    componentDidMount: function(){
    	window.addEventListener('scroll', this.scrollListener);
    },

    ComponentWillUnmount: function(){
    	this.detachScrollListener();
    },

    scrollListener: function(){
    	if(window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 10){
    		this.loadMorePosts();
    	}
    },

    detachScrollListener: function(){
		window.removeEventListener('scroll', this.scrollListener);
    },

    loadMorePosts : function(){
		var queryData = {offset: this.state.offset, limit: this.state.limit};
		$.ajax({
	      url: this.state.url,
	      dataType: 'json',
	      type: 'GET',
	      data: queryData,
	      success: function(data) {
	        this.setState({data: this.state.data.concat(data), offset: this.state.offset + this.state.limit });
	        if(data[0] == null)
	        	this.detachScrollListener();
	      }.bind(this)
	    });
    },

    render: function() {
        return(<BlogPostList data={this.state.data} />);
    }
});

module.exports = ReactHome;