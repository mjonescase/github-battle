var AWS = require('aws-sdk');

var helpers = {
    logMeIn : function () {
	// The parameters required to intialize the Cognito Credentials object.
	// If you are authenticating your users through one of the supported
	// identity providers you should set the Logins object with the provider
	// tokens. For example:
	// Logins: {
	//   graph.facebook.com : facebookResponse.authResponse.accessToken
	// }
	var params = {
	    IdentityPoolId: "us-west-2_gwrjFr9Vn"//"us-west-2:f2502beb-83b5-4f9b-ad6b-7f683690cf7b"//"YOUR_COGNITO_IDENTITY_POOL_ID"
	};

	// set the Amazon Cognito region
	AWS.config.region = 'us-east-1';
	// initialize the Credentials object with our parameters
	AWS.config.credentials = new AWS.CognitoIdentityCredentials(params);

	// We can set the get method of the Credentials object to retrieve
	// the unique identifier for the end user (identityId) once the provider
	// has refreshed itself
	AWS.config.credentials.get(function(err) {
	    if (err) {
		console.log("Error: "+err);
		return;
	    }
	    console.log("Cognito Identity Id: " + AWS.config.credentials.identityId);

	    // Other service clients will automatically use the Cognito Credentials provider
	    // configured in the JavaScript SDK.
	    var cognitoSyncClient = new AWS.CognitoSync();
	    cognitoSyncClient.listDatasets({
		IdentityId: AWS.config.credentials.identityId,
		IdentityPoolId: params.IdentityPoolId
	    }, function(err, data) {
		if ( !err ) {
			console.log(JSON.stringify(data));
		}
	    });
	});
    }
};

module.exports = helpers;

