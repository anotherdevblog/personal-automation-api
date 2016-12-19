/*
 * "Constructor" for the DbUtility
 */
function DbUtility() {
  this.storage = PropertiesService.getScriptProperties();
  
  /*
  * Retrieves the value of the specified key (null if not found)
  */
  this.get = function (key) {
    var valString = this.storage.getProperty(key);
    return valString ? JSON.parse(valString) : null;
  };
  
  /*
  * Sets the value of the specified key
  */
  this.set = function (key, valueObj) {
    this.storage.setProperty(key, JSON.stringify(valueObj));
  };
  
  /*
  * Gets the value of the specified key, creating it in the storage if not found
  */
  this.getOrCreate = function (key, defaultValueObj) {
    var valObj = this.get(key);
    if (!valObj) {
      this.set(key, defaultValueObj);
      valObj = defaultValueObj;
    }
    return valObj;
  };
}