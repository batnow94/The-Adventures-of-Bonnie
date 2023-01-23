Game_Actor.prototype.isFormationChangeOk = function() {
  return !actor.actor().meta.lockFormation;
}