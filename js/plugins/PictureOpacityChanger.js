//=============================================================================
/*:
 * @plugindesc Picture Opacity Changer
 * @author Kemezryp
 * 
 * @help $gameScreen.changeOpacity(pictureId, opacity, duration)
 * $gameScreen.changePosition(pictureId, origin, x, y, duration)
 * For origin: 0 is upper left, 1 is center
 */
//=============================================================================

Game_Picture.prototype.changePicturePosition = function(origin, x, y, duration) {
this._origin = origin;
this._targetX = x;
this._targetY = y;
this._duration = duration;
};

Game_Picture.prototype.changePictureOpacity = function(opacity, duration) {
this._targetOpacity = opacity;
this._duration = duration;
};

Game_Screen.prototype.changePosition = function(pictureId, origin, x, y, duration) {
var picture = this.picture(pictureId);
if (picture) {
picture.changePicturePosition(origin, x, y, duration);
}
};

Game_Screen.prototype.changeOpacity = function(pictureId, opacity, duration) {
var picture = this.picture(pictureId);
if (picture) {
picture.changePictureOpacity(opacity, duration);
}
};

Game_Interpreter.prototype.commandChangePicturePosition = function() {
$gameScreen.changePosition(this._params[0], this._params[2], this._params[4], this._params[5], this._params[10]);
return true;
};

Game_Interpreter.prototype.commandChangePictureOpacity = function() {
$gameScreen.changeOpacity(this._params[0], this._params[8], (this._params[10]));
return true;
};