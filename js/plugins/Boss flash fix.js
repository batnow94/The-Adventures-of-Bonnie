var flash = 1;

(function() {
  Game_Enemy.prototype.performActionStart = function(action) {
    Game_Battler.prototype.performActionStart.call(this, action);
    if(flash == 2 || this._enemyId != 117 || this._enemyId != 118 || this._enemyId != 119 || this._enemyId != 30) {
      this.requestEffect('whiten');
      flash = 1;
    }
  };

  Game_Battler.prototype.forceAction = function(skillId, targetIndex) {
    flash = 2;
    this.clearActions();
    var action = new Game_Action(this, true);
    action.setSkill(skillId);
    if (targetIndex === -2) {
        action.setTarget(this._lastTargetIndex);
    } else if (targetIndex === -1) {
        action.decideRandomTarget();
    } else {
        action.setTarget(targetIndex);
    }
    this._actions.push(action);
  };
})();
