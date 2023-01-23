(function() {
    
    Window_Base.prototype.drawActorSimpleStatus = function(actor, x, y, width) {
        var lineHeight = this.lineHeight();
        var xpad = Window_Base._faceWidth + (2 * Yanfly.Param.TextPadding);
        var x2 = x + xpad;
        var width2 = Math.max(180, width - xpad - this.textPadding());
        this.drawActorName(actor, x, y);
        this.drawActorLevel(actor, x2 + 85, y);
        this.drawActorIcons(actor, x, y + lineHeight * 2);
        this.drawActorClass(actor, x2, y, width2);
        this.drawActorHp(actor, x, y + lineHeight * 1, 368);
        this.drawActorMp(actor, x, y + lineHeight * 2, 368);
        this.drawActorAbility(actor, x, y + lineHeight * 3, 380);
    }; 

    Window_Base.prototype.drawActorAbility = function(actor, x, y, width) {
        width = width || 186;
        var actorId = actor.actorId()
        var ability = $dataActors[actorId].meta.Ability || null;
        this.changeTextColor(this.textColor(3));
        this.drawText(ability, x, y, width);
        };
})();