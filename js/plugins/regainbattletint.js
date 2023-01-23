Scene_Battle.prototype.terminate = function() {
    Scene_Base.prototype.terminate.call(this);
    $gameParty.onBattleEnd();
    $gameTroop.onBattleEnd();
    AudioManager.stopMe();
    ImageManager.clearRequest();
    $gameScreen._tone = $gameScreen.oldTint.tone;
    $gameScreen._toneTarget = $gameScreen.oldTint.target;
    $gameScreen._toneDuration = $gameScreen.oldTint.duration;
};