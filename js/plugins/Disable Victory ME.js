//=============================================================================
/*:
 * @plugindesc Toggle Victory ME
 * @author ZainWD
 * 
 * 
 * @param Victory ME Toggle Switch
 * @desc When the switch with this ID is on, the victory music will not play a
 * @default 1
 * 
 * 
 * @help What separates this from just setting your victory ME to (none) through an event is so that the BGM will not get 
 * interrupted and can still continue onto the map, whereas with (none) it will stop even if no victory ME plays selected.
 */
//=============================================================================

(function() {

var zain = zain || {};
var parameters = PluginManager.parameters('Toggle Victory ME');
zain.plugin = zain.plugin || {};
zain.plugin.vmeParam = {
    toggleSwitch: Number(parameters['Victory ME Toggle Switch'])
};

BattleManager.playVictoryMe = function() {
    if ($gameSwitches,value(zain.plugin.vmeParam.toggleSwitch) === false) {
        AudioManager.playMe($gameSystem.victoryMe());
    }
};


})();