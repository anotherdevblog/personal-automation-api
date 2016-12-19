/*
 * "Constructor" for the RequestHandler
 */
function RequestHandler() {
  /*
   * The controllers for the request handler to call
   */
  this.controllers = [
    new EchoController()
  ];
  
  /*
   * A function to handle all requests
   */
  this.handleRequest = function(payloadBodyString) {
    // Create an empty response object
    var responseObj = new ResponseObject();
    try {
      // Parse the request
      var requestObject = this.parseRequest(payloadBodyString);
      
      // Authorize the user
      this.authorize(requestObject.auth_token);
      
      // Determine which controller action the user wants to take
      var selectedAction = this.findControllerAction(requestObject.action);
      
      // Call execute on the action and succeed it
      return responseObj.succeed(selectedAction.execute(requestObject.data));
    } catch (e) {
      // Log the full error details
      Logger.log(e.toString());
      
      // Fail the response with the appropriate error
      return responseObj.fail(e instanceof WebApiException ? e : new WebApiException(ErrorCode.UNKNOWN, 'An unknon error has occurred'));
    }
  };
  
  /*
   * Parses the request payload string and validates that all common required properties are supplied
   */
  this.parseRequest = function(payloadBodyString) {
    if (!payloadBodyString) {
      throw new WebApiException(ErrorCode.NO_CONTENT, 'No payload specified');
    }
    
    // Parse
    var requestObject = null;
    try { requestObject = JSON.parse(payloadBodyString); } catch (e) { }
    if (!requestObject) {
      throw new WebApiException(ErrorCode.MALFORMED_CONTENT, 'Payload not valid JSON');
    }
    
    // Check for required properties
    if (!requestObject.auth_token) {
      throw new WebApiException(ErrorCode.MALFORMED_CONTENT, 'No auth_token specified');
    }
    if (!requestObject.action) {
      throw new WebApiException(ErrorCode.MALFORMED_CONTENT, 'No action specified');
    }
    
    return requestObject;
  };
  
  /*
   * Checks the user's auth token against the allowed tokens. Throws an authorization exception if not allowed
   */
  this.authorize = function(authToken) {
    if (!(new SecurityUtility().isAuthorized(authToken))) {
      throw new WebApiException(ErrorCode.UNAUTHORIZED, 'That auth_token is not authorized'); 
    }
  };
  
  /*
   * Locates the controller action from the action string provided by the user
   */
  this.findControllerAction = function(controllerActionString) {
    // Split the action string on the dot
    var split = controllerActionString.split('.', 2);
    if (!split || split.length < 2 || !split[0] || !split[1]) {
      throw new WebApiException(ErrorCode.INVALID_REQUEST, 'Invalid format for actions');
    }
    
    var controller = null;
    var action = null;
    
    // Find the controller
    for (var i in this.controllers) {
      if (this.controllers[i].name === split[0]) {
        controller = this.controllers[i];
        break;
      }
    }
    
    // Find the action within the controller
    if (controller) {
      for (var i in controller.actions) {
        if (controller.actions[i].name === split[1]) {
          action = controller.actions[i];
        }
      }
    }
    
    if (!controller || !action) {
      throw new WebApiException(ErrorCode.INVALID_REQUEST, 'Invalid action');
    }
    
    return action;
  };
}