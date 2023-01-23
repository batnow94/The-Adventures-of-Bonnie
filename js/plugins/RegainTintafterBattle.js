//=============================================================================
/*:
 * @plugindesc FNaFB MV map tint fixer.
 * @author ZainWD
 * 
 * @param FNaFb3
 * @desc Change this to the ID of the switch that's on when you want to use the FNaFb3 tint
 * @default 1
 * 
 * @param No Tint Switch
 * @desc No tint will start after a battle if this switch is on
 * @default 1
 */

//=============================================================================

var zain = zain || {};
var parameters = PluginManager.parameters('RegainTintafterBattle');
zain.plugin = zain.plugin || {};
zain.plugin.tintParam = {
    noTint: Number(parameters['No Tint Switch']),
    fb3Tint: Number(parameters['FNaFb3 Tint Switch'])
};

Scene_Battle.prototype.terminate = function() {
    Scene_Base.prototype.terminate.call(this);
    $gameParty.onBattleEnd();
    $gameTroop.onBattleEnd();
    AudioManager.stopMe();
    ImageManager.clearRequest();
    if ($gameSwitches.value(zain.plugin.tintParam.noTint) === false) {
        if ($gameSwitches.value(zain.plugin.tintParam.fb3Tint) === true) {
        $gameScreen.startTint([-34,-17,-51,34], 1); 
        } else {
        $gameScreen.startTint([-85,-51,-35,170], 1); 
        }
    }


};
