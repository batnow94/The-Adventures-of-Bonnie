//=============================================================================
/*:
 * @plugindesc FNaFB MV map tint fixer.
 * @author ZainWD
 */
//=============================================================================


Scene_Battle.prototype.terminate = function() {
    Scene_Base.prototype.terminate.call(this);
    $gameParty.onBattleEnd();
    $gameTroop.onBattleEnd();
    AudioManager.stopMe();
    ImageManager.clearRequest();
    if ($gameVariables.value(45) === 3)  && $gameSwitches.value(140) === false) {
        $gameScreen.startTint([-34,-17,-51,34], 1); 
        } else {
        $gameScreen.startTint([-85,-51,-35,170], 1); 
        }
};

Scene_Battle.prototype.start = function() {
    Scene_Base.prototype.start.call(this);
    this.startFadeIn(this.fadeSpeed(), false);
    BattleManager.playBattleBgm();
    BattleManager.startBattle();
    $gameActors.actor(20).addState(64);
    $gameScreen.startTint([0,0,0,0], 1);
};