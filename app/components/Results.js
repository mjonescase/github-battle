var React = require('react');
var PropTypes = React.PropTypes;
var styles = require('../styles');
var UserDetails = require('./UserDetails');
var UserDetailsWrapper = require('./UserDetailsWrapper');
var Link = require("react-router").Link;
var MainContainer = require("../containers/MainContainer");
var Loading = require('./Loading');

function StartOver(){
  return (
      <div className="col-sm-12" style={styles.space}>
	<Link to="/playerOne">
	  <button type="button" className="btn btn-lg btn-danger">Start Over</button>
	</Link>
      </div>
  )
}

function Results(props) {
    if (props.isLoading === true){
	return (
		<Loading text="One Moment" speed={100}/>
	);
    }

    if (props.scores[0] === props.scores[1]){
      return(
	  <MainContainer>
	      <h1>Its a tie!</h1>
	      <StartOver/>
	</MainContainer>
      )
    }
    var winningIndex = props.scores[0] > props.scores[1] ? 0 : 1;
    var losingIndex = winningIndex === 0 ? 1 : 0;
    return (
    <MainContainer>
      <h1>Results</h1>
      <div className="col-sm-8 col-sm-offset-2">
	<UserDetailsWrapper header="Winner">
	  <UserDetails score={props.scores[winningIndex]} info={props.playerInfo[winningIndex]} />
	</UserDetailsWrapper>
	<UserDetailsWrapper header="Loser">
	  <UserDetails score={props.scores[losingIndex]} info={props.playerInfo[losingIndex]} />
	</UserDetailsWrapper>
      </div>
      <StartOver/>
    </MainContainer>
  )
}

Results.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  playerInfo: PropTypes.array.isRequired,
  scores: PropTypes.array.isRequired
}

module.exports = Results;
