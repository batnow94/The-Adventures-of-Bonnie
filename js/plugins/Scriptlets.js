// --  Fix Name Input Font Display -- //
Window_NameEdit.prototype.drawChar = function(index) {
    var rect = this.itemRect(index);
    this.resetTextColor();
    this.drawText(this._name[index] || '', rect.x, rect.y, rect.width, 'center');
};

// Remove White Square when clicking mouse destination
Spriteset_Map.prototype.createLowerLayer = function() {
    Spriteset_Base.prototype.createLowerLayer.call(this);
    this.createParallax();
    this.createTilemap();
    this.createCharacters();
    this.createShadow();
    this.createWeather();
};

// Add Shadows to Fonts in RPG Maker MV
/*
Bitmap.prototype._drawTextBody = function(text, tx, ty, maxWidth) {
    var context = this._context;
    context.fillStyle = this.textColor;
    context.shadowColor = 'rgba(76, 56, 70, 255)';
    context.shadowBlur = 0;
    context.shadowOffsetX = 2;
    context.shadowOffsetY = 2;
    context.fillText(text, tx, ty, maxWidth);
}; */

// Change max file slots //
DataManager.maxSavefiles = function() {
    return 100;
};

// Remove Font Outline//
/* var _Window_Base_ResetFontSettings = Window_Base.prototype.resetFontSettings;
Window_Base.prototype.resetFontSettings = function() {
_Window_Base_ResetFontSettings.call( this );
this.contents.outlineWidth = 0;
}; */

// Remove Anti Aliasing //
Graphics._centerElement = function(element) {
    var width = element.width * this._realScale;
    var height = element.height * this._realScale;
    element.style.position = 'absolute';
    element.style.margin = 'auto';
    element.style.top = 0;
    element.style.left = 0;
    element.style.right = 0;
    element.style.bottom = 0;
    element.style.width = width + 'px';
    element.style.height = height + 'px';
    element.style["image-rendering"] = "pixelated";
    element.style["font-smooth"] = "none";
};

Sprite_Balloon.prototype.updateFrame = function() {
    var w = 32;
    var h = 24;
    var sx = this.frameIndex() * w;
    var sy = (this._balloonId - 1) * h;
    this.setFrame(sx, sy, w, h);
};
