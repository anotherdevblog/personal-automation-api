function RequestHandler() {
  this.controllers = [
    new EchoController()
  ];
  
  this.handleRequest = function(payloadBodyString) {
    var responseObj = new ResponseObject();
    try {
      var requestObject = this.parseRequest(payloadBodyString);
      this.authorize(requestObject.auth_token);
      var selectedAction = this.findControllerAction(requestObject.action);
      return responseObj.succeed(selectedAction.execute(requestObject.data));
    } catch (e) {
      Logger.log(e.toString());
      return responseObj.fail(e instanceof WebApiException ? e : new WebApiException(ErrorCode.UNKNOWN, 'An unknon error has occurred'));
    }
  };
  
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
  
  this.authorize = function(authToken) {
    if (!App.SecurityUtility.isAuthorized(authToken)) {
      throw new WebApiException(ErrorCode.UNAUTHORIZED, 'That auth_token is not authorized'); 
    }
  };
  
  this.findControllerAction = function(controllerActionString) {
    var split = controllerActionString.split('.', 2);
    if (!split || split.length < 2 || !split[0] || !split[1]) {
      throw new WebApiException(ErrorCode.INVALID_REQUEST, 'Invalid format for actions');
    }
    
    var controller = null;
    var action = null;
    
    for (var i in this.controllers) {
      if (this.controllers[i].name === split[0]) {
        controller = this.controllers[i];
        break;
      }
    }
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