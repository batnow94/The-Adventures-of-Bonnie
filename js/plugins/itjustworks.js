

/*:
*@plugindesc uses notetags to control enemy flashing.
 *@help
 *If you want an enemy to only flash for forced actions put <boss> in their notes
 *If you want an enemy to never flash put <noflash> in their notes
 *Forced actions will flash the enemy being forced to act.
 */

(function() {
  Game_Enemy.prototype.performActionStart = function(action) {
    Game_Battler.prototype.performActionStart.call(this, action);
    if(this.isEnemy() == true) {
      var eid = this._enemyId
      var boss = $dataEnemies[eid].meta.boss
      var noflash = $dataEnemies[eid].meta.noflash
    }
    if(boss != true && noflash != true) {
      console.log(this)
      this.requestEffect('whiten');
    }
    if(action._forcing == true && noflash != true){
      console.log(this)
      this.requestEffect('whiten');
    }
  };
})();
