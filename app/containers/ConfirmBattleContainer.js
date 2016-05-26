var React = require('react');
var ConfirmBattle = require('../components/ConfirmBattle');
var githubHelpers = require('../utils/githubHelpers');

var ConfirmBattleContainer = React.createClass({
    contextTypes: {
	router: React.PropTypes.object.isRequired
    },
    getInitialState: function () {
	console.log('getInitialState');
	return {
	    isLoading: true,
	    playerInfo: []
	}
    },
    componentWillMount: function () {
	console.log('componentWillMount');
    },
    
    componentDidMount: function (){
	var query = this.props.location.query;
	console.log('componentDidMount');
	githubHelpers.getPlayerInfo([query.playerOne, query.playerTwo])
	.then(function (players) {
	    console.log("made it to then");
	    console.log('players: ' + players);
	    this.setState({
		isLoading: false,
		playerInfo: [players[0], players[1]]
	    })
	}.bind(this))
    },
    componentWillReceiveProps: function () {
	console.log('componentWillReceiveProps');
    },
    componentWillUnmount: function () {
	console.log('componentWillUnmount');
    },
    handleInitiateBattle: function () {
	this.context.router.push({
	    pathname: '/results',
	    state: {
		playerInfo:this.state.playerInfo,
	    }
	})
    },
    render: function() {
	return (
	    <ConfirmBattle 
	        isLoading={this.state.isLoading}
	        onInitiateBattle={this.handleInitiateBattle}
		playerInfo={this.state.playerInfo} />
	);
    }
});

module.exports = ConfirmBattleContainer;
