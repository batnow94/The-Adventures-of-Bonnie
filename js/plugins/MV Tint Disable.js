//=============================================================================
/*:
 * @plugindesc FNaFb MV battle tint fixer.
 * @author ZainWD
 * 
 */
//=============================================================================

(function() {

var TintRGB = [];
var TintDuration = [];


var _Game_Interpreter_command223 = Game_Interpreter.prototype.command223
Game_Interpreter.prototype.command223 = function() {
    _Game_Interpreter_command223.call(this);
    TintRGB = this._params[0];
    TintDuration = this._params[1];

};

var _Scene_Battle_start = Scene_Battle.prototype.start
Scene_Battle.prototype.start = function() {
    _Scene_Battle_start.call(this);    
    $gameActors.actor(20).addState(64);
    $gameScreen.startTint([0,0,0,0], 1);
};

var _Scene_Battle_terminate = Scene_Battle.prototype.terminate
Scene_Battle.prototype.terminate = function() {
    _Scene_Battle_terminate.call(this);
    $gameScreen.startTint(TintRGB, TintDuration); 

};

    
})();
