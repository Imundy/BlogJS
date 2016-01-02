var React = require('react');

var ReactHome = React.createClass({displayName: "ReactHome",

    getInitialState: function(){
        return { 
        	data: null,
        	url: '/posts',
        	offset: 2,
        	limit: 2
        };
    },

    componentDidMount: function(){
    	window.addEventListener('scroll', this.scrollListener);
    },

    ComponentWillUnmount: function(){
    	detachScrollListener();
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
	      dataType: 'html',
	      type: 'GET',
	      data: queryData,
	      success: function(data) {
	        this.setState({data: data, offset: this.state.offset + this.state.limit });
	        if(data == null)
	        	detachScrollListener();
	      }.bind(this)
	    });
    },

    render: function() {
        return(this.data)
    }
});

module.exports = ReactHome;