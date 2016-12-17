/*
 * "Constructor" for the EchoAction
 */
function EchoController() {
  this.name = 'ECHO';
  
  /*
  * "REPEAT" action
  */
  this.repeat = function(data) {
    return data;
  };
  
  this.actions = [
    new ControllerAction('REPEAT', this.repeat)
  ];
}