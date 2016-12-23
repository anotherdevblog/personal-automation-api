/*
 * "Constructor" for the DbUtility
 */
function DbUtility() {
  this.storage = PropertiesService.getScriptProperties();
  
  /*
  * Retrieves the value of the specified key (null if not found)
  */
  this.getObject = function (key) {
    var valueJSON = this.storage.getProperty(key);
    return valueJSON ? JSON.parse(valueJSON) : null;
  };
  
  /*
   * Sets the value of the specified key
   */
  this.setObject = function (key, value) {
    var valueJSON = JSON.stringify(value);
    this.storage.setProperty(key, valueJSON);
  };
  
  /*
   * Gets the value of the specified key, creating it in the storage if not found
   */
  this.getOrCreate = function (key, defaultValueObj) {
    var valObj = this.getObject(key);
    if (!valObj) {
      this.setObject(key, defaultValueObj);
      valObj = defaultValueObj;
    }
    return valObj;
  };
}