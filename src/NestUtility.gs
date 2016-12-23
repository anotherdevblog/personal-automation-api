/*
 * "Constructor" for the NestUtility
 */
function NestUtility() {
  /*
   * Sets the range of the Nest. Note: per https://ifttt.com/nest_thermostat,
   * this works only when Nest is set to Home.
   */
  this.setTemperatureRange = function(low, hi) {
    new IftttUtility().triggerMakerEvent('nest.temp.set-range', low, hi);
  };
}