var React = require("react");
var styles = require("../styles");
var awsContigoHelpers = require("../utils/awsContigoHelpers");

function MainContainer (props) {
    awsContigoHelpers.logMeIn();
    return (
      <div className="jumbotron col-sm-12 text-center" style={styles.transparentBg}>
	{props.children}
      </div>
      )
};

module.exports = MainContainer;
