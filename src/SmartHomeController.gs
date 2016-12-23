/*
 * "Constructor" for the SmartHomeController
 */
function SmartHomeController() {
  this.name = 'SMART_HOME';
  this.actions = [
    // Sets the home temperature range
    new ControllerAction('SET_TEMP_RANGE', function(data) {
      new NestUtility().setTemperatureRange(data.low, data.hi); 
    })
  ];
}