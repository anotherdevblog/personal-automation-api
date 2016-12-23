/*
 * "Constructor" for the IftttUtility
 */
function IftttUtility() {
  /*
   * Triggers the specified maker event with the values passed in
   */
  this.triggerMakerEvent = function(event, val1, val2, val3) {
    var fullURL = 'https://maker.ifttt.com/trigger/' + event + '/with/key/' + this.getMakerAccessToken();
    var result = new HttpUtility().issueTextRequest(HttpRequestMethod.POST, fullURL, {
      value1: val1,
      value2: val2,
      value3: val3
    });
    if (result !== 'Congratulations! You\'ve fired the ' + event + ' event') {
      var err = 'Error from IFTTT: ' + result; 
      Logger.log(err);
      throw err;
    }
  };
  
  /*
   * Sets the access token for the IFTTT maker service in the "database"
   */
  this.setMakerAccessToken = function(token) {
    return new DbUtility().setObject('IftttUtility.MakerAccessToken', { text: token });
  }
  
  /*
   * Gets the access token for the IFTTT maker service in the "database"
   */
  this.getMakerAccessToken = function() {
    return new DbUtility().getObject('IftttUtility.MakerAccessToken').text;
  }
}
