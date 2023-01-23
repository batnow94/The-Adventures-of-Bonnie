//=============================================================================
/*:
 * @plugindesc FNaFb MV battle tint fixer.
 * @author ZainWD
 * 
 * @param FNaFb3 Tint Switch
 * @desc Change this to the ID of the switch that's on when you want to use the FNaFb3 tint
 * @default 1
 * 
 * @param No Tint Switch
 * @desc No tint will start after a battle if this switch is on
 * @default 1
 * 
 * @param Black Tint Switch
 * @desc A black tint will start after a battle if this switch is on
 * @default 1
 * 
 * @param Vapor Tint Switch
 * @desc Vaporland tint
 * @default 1
 */
//=============================================================================

(function() {

var _Scene_Battle_start = Scene_Battle.prototype.start
Scene_Battle.prototype.start = function() {
    _Scene_Battle_start.call(this)
    $gameScreen.startTint([0,0,0,0], 1);
};

var zain = zain || {};
var parameters = PluginManager.parameters('StopTintinBattle');
zain.plugin = zain.plugin || {};
zain.plugin.tintParam = {
    noTint: Number(parameters['No Tint Switch']),
    fb3Tint: Number(parameters['FNaFb3 Tint Switch']),
    blackTint: Number(parameters['Black Tint Switch']),
    vaporTint: Number(parameters['Vapor Tint Switch'])
};

var _zain_Scene_Battle_terminate = Scene_Battle.prototype.terminate
Scene_Battle.prototype.terminate = function() {
    _zain_Scene_Battle_terminate.call(this);
    $gameTemp.reserveCommonEvent(162);
    if ($gameSwitches.value(zain.plugin.tintParam.blackTint) === true) {
        $gameScreen.startTint([-255,-255,-255,0], 1);
    } else {
        if ($gameSwitches.value(zain.plugin.tintParam.noTint) === false) {
            if ($gameSwitches.value(zain.plugin.tintParam.vaporTint) === false) {
                if ($gameSwitches.value(zain.plugin.tintParam.fb3Tint) === true) {
                    $gameScreen.startTint([-34,-17,-51,34], 1); 
                } else {
                    $gameScreen.startTint([-85,-51,-35,170], 1); 
                }
            } else {
                $gameScreen.startTint([-17,-34,51,34], 1); 
            }
        }
    }
};

    
})();
