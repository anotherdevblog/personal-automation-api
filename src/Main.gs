/*
 * First run
 */
function firstRun() {
  var newToken = App.GuidUtility.generate();
  App.SecurityUtility.addToken(newToken);
  Logger.log('Added new auth token ' + newToken);
}

/*
 * Test code
 */
function test() {
  Logger.log(new RequestHandler().handleRequest('{"auth_token": "d5c31c9e-5c3a-f29a-be65-86e08be0ff5b", "action": "ECHO.REPEAT", "data": "Hello world" }').serialize());
}

/*
 * Main entry point for the program
 */
function doPost(e) {
  // Get the request payload (or empty string if no payload)
  var requestPayloadString = e.postData ? e.postData.contents : '';
  
  // Process the request payload and generate a response payload
  var responsePayloadObject = new RequestHandler().handleRequest(requestPayloadString);
  
  // Serialize the payload object to JSON
  return responsePayloadObject.toHttpResponse();
}