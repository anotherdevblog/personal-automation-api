/*
 * "Constructor" for the SecurityUtility
 */
function SecurityUtility() {
  /*
  * Adds the specified token to the authorized list
  */
  this.addToken = function (token) {
    var authorizedTokens = this.getAuthorizedTokens();
    authorizedTokens.push(token);
    this.setAuthorizedTokens(authorizedTokens);
  };
  
  /*
  * Returns whether or not the token is on the authorized list
  */
  this.isAuthorized = function (token) {
    var allTokens = this.getAuthorizedTokens();
    for (var i in allTokens) {
      if (allTokens[i] === token) {
        return true;
      }
    }
    return false;
  };
  
  /*
  * Returns all authorized tokens for the application
  */
  this.getAuthorizedTokens = function () {
    return App.DbUtility.getOrCreate('SecurityUtility.Tokens', []);
  };
  
  /*
  * Sets the list of all authorized tokens for the application
  */
  this.setAuthorizedTokens = function (tokens) {
    return App.DbUtility.set('SecurityUtility.Tokens', tokens || []);
  };
}