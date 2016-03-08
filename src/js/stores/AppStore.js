var AppDispatcher = require('../dispatcher/AppDispatcher')
var AppConstants = require('../constants/AppConstants')
var EventEmitter = require('events').EventEmitter
var assign = require('object-assign')
var AppApi = require('../utils/appApi')

var CHANGE_EVENT = 'change'

var _movies = []
var _selected = ''

var AppStore = assign({}, EventEmitter.prototype, {
	setMovieResults: function(movies) {
		_movies = movies
	},
	getMovieResults: function() {
		return _movies
	},
	emitChange: function() {
		this.emit(CHANGE_EVENT)
	},
	addChangeListener: function(done) {
		this.on(CHANGE_EVENT, done)
	},
	removeChangeListener: function(done) {
		this.removeListener(CHANGE_EVENT, done)
	}
})

AppDispatcher.register(function(payload) {
	var action = payload.action
	switch(action.actionType) {
		case AppConstants.SEARCH_MOVIES: 
			AppApi.searchMovies(action.movie)
			AppStore.emit(CHANGE_EVENT)
			break;
		case AppConstants.RECEIVE_MOVIE_RESULTS: 
			AppStore.setMovieResults(action.movies)
			AppStore.emit(CHANGE_EVENT)
			break;			
	}
	return true
})

module.exports = AppStore