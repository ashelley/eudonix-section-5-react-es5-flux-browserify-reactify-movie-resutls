var React = require('react')
var AppActions = require('../actions/AppActions')
var AppStore = require('../stores/AppStore')
var SearchForm = require('./SearchForm')
var MovieResults = require('./MovieResults')

function getAppState() {
	return {
		movies: AppStore.getMovieResults()
	}
}

var App = React.createClass({
	getInitialState: function() {
		return getAppState()
	},
	componentDidMount: function() {
		AppStore.addChangeListener(this._onChange)
	},
	componentWillUnmount: function() {
		AppStore.removeChangeListener(this._onchange)
	},
	_onChange: function() {
		this.setState(getAppState())
	},
	render: function() {
		if(this.state.movies.length == 0) {
			var movieResults = ''
		} else {
			var movieResults = <MovieResults movies={this.state.movies}/>
		}
		return (
			<div>
				<SearchForm />
				{movieResults}
			</div>
		)
	}
}) 

module.exports = App