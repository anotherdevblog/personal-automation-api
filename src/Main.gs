/*
 * Token generation
 */
function generateNewToken() {
  var newToken = new GuidUtility().generate();
  new SecurityUtility().addToken(newToken);
  Logger.log('Added new auth token ' + newToken);
}

/*
 * Main entry point for the program
 */
function doPost(e) {
  Logger.clear();
  Logger.log('In doPost');
  
  // Get the request payload (or empty string if no payload)
  var requestPayloadString = e.postData ? e.postData.contents : '';
  Logger.log('Here');
  
  // Process the request payload and generate a response payload
  var responsePayloadObject = new RequestHandler().handleRequest(requestPayloadString);
  Logger.log('There');
  
  // Serialize the payload object to JSON
  return responsePayloadObject.toHttpResponse();
}