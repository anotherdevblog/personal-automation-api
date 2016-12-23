/*
 * "Constructor" for the EchoController
 */
function EchoController() {
  this.name = 'ECHO';
  this.actions = [
    // Returns the data passed in
    new ControllerAction('REPEAT', function(data) {
      return data;
    })
  ];
}