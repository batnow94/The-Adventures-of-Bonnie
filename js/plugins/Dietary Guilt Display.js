(function() {
/*
   Window_SkillList.prototype.refresh = function() {
        var actorId = this._actor.actorId()
        this.makeItemList();
        this.createContents();
        this.drawAllItems();
        var lineHeight = this.lineHeight();
        if ($gameParty.inBattle()) {
            if ($gameSwitches.value(46) == true || $gameSwitches.value(47) == true || $gameSwitches.value(215) == true) {
            this.drawDietaryGuilt(5, lineHeight * 3, 380, actorId);
            this.drawDOYA(419, lineHeight * 3, 380, actorId);
            };
        };
    };

    Window_SkillList.prototype.drawDietaryGuilt = function(x, y, horizontal, actorId) {
        horizontal = horizontal || 90;
        dGAmount = actorId + 500;
        var text = "Dietary Guilt: " + $gameVariables.value(dGAmount) + "/100";
        this.changeTextColor(this.textColor(7));
        this.drawText(text, x, y, horizontal);
    };

    Window_SkillList.prototype.drawDOYA = function(x, y, horizontal, actorId) {
        horizontal = horizontal || 90;
        DOYAamount = actorId + 700;
        var text = "Drunk Points: " + $gameVariables.value(DOYAamount) + "/100";
        this.changeTextColor(this.textColor(7));
        this.drawText(text, x, y, horizontal);
    };
*/
  
    var dietaryGuiltHP = [1, 2, 3, 4, 5, 60, 61, 62, 63, 64];
    var drunkPointsSP = [6, 7, 8, 9, 65, 66, 67, 68];
    var dietaryGuiltTP = [23, 70];
    var other = [10, 11, 69];
    var currentWindow = 1;

    _zain_Window_BattleItem_show = Window_BattleItem.prototype.show;
    Window_BattleItem.prototype.show = function() {
        _zain_Window_BattleItem_show.call(this);
        if (SceneManager._scene._itemWindow.visible == true) {
            currentWindow = 2;
        }
    };

    _zain_Window_BattleSkill_show = Window_BattleSkill.prototype.show;
    Window_BattleSkill.prototype.show = function() {
        _zain_Window_BattleSkill_show.call(this);
        if (SceneManager._scene._skillWindow.visible == true) {
            currentWindow = 1;
        }
    };

    Window_BattleStatus.prototype.drawGaugeAreaWithTp = function(rect, actor) {
        var totalArea = this.gaugeAreaWidth() - 30;
        var hpW = parseInt(totalArea * 108 / 300);
        var otW = parseInt(totalArea * 96 / 300);
        if ($gameSwitches.value(46) == true || $gameSwitches.value(47) == true || $gameSwitches.value(215) == true || $gameSwitches.value(298) == true) {
            if ((SceneManager._scene._itemWindow && SceneManager._scene._itemWindow.item()) || (SceneManager._scene._skillWindow && SceneManager._scene._skillWindow.item())) {
                if (currentWindow == 2) {
                    if (SceneManager._scene._itemWindow.item() !== null) {
                        if (dietaryGuiltHP.includes(SceneManager._scene._itemWindow.item().id)) {
                            this.drawActorHp(actor, rect.x + 0, rect.y, hpW);
                            this.drawActorDg(actor, rect.x + hpW + 15, rect.y, otW);
                            this.drawActorTp(actor, rect.x + hpW + otW + 30, rect.y, otW);
                        };
                        if (drunkPointsSP.includes(SceneManager._scene._itemWindow.item().id)) {
                            this.drawActorMp(actor, rect.x + 0, rect.y, hpW);
                            this.drawActorDOYA(actor, rect.x + hpW + 15, rect.y, otW);
                            this.drawActorTp(actor, rect.x + hpW + otW + 30, rect.y, otW);
                        };
                        if (dietaryGuiltTP.includes(SceneManager._scene._itemWindow.item().id)) {
                            this.drawActorTp(actor, rect.x + 0, rect.y, hpW);
                            this.drawActorDg(actor, rect.x + hpW + 15, rect.y, otW);
                            this.drawActorHp(actor, rect.x + hpW + otW + 30, rect.y, otW);
                        };            
                        if (other.includes(SceneManager._scene._itemWindow.item().id)) {
                            this.drawActorHp(actor, rect.x + 0, rect.y, hpW);
                            this.drawActorMp(actor, rect.x + hpW + 15, rect.y, otW);
                            this.drawActorTp(actor, rect.x + hpW + otW + 30, rect.y, otW);
                        };
                    };
                } else {
                    this.drawActorHp(actor, rect.x + 0, rect.y, hpW);
                    this.drawActorMp(actor, rect.x + hpW + 15, rect.y, otW);
                    this.drawActorTp(actor, rect.x + hpW + otW + 30, rect.y, otW);
                }

            };
        } else {
            this.drawActorHp(actor, rect.x + 0, rect.y, hpW);
            this.drawActorMp(actor, rect.x + hpW + 15, rect.y, otW);
            this.drawActorTp(actor, rect.x + hpW + otW + 30, rect.y, otW);
        };
    };

    Window_Base.prototype.drawActorDg = function(actor, x, y, width) {
        width = width || 186;
        var color1 = this.dgGaugeColor1();
        var color2 = this.dgGaugeColor2();
        var actorDG = actor._actorId + 500;
        actorDG = $gameVariables.value(actorDG);
        var dgRate = actorDG / 100;
        this.drawGauge(x, y, width, dgRate, color1, color2);
        this.changeTextColor(this.systemColor());
        this.drawText('DG', x, y, 44);
        this.drawCurrentAndMax(actorDG, 100, x, y, width,
                               this.mpColor(actor), this.normalColor());
    };

    Window_Base.prototype.drawActorDOYA = function(actor, x, y, width) {
        width = width || 186;
        var color1 = this.dgGaugeColor1();
        var color2 = this.dgGaugeColor2();
        var actorDOYA = actor._actorId + 700;
        actorDOYA = $gameVariables.value(actorDOYA);
        var dgRate = actorDOYA / 100;
        this.drawGauge(x, y, width, dgRate, color1, color2);
        this.changeTextColor(this.systemColor());
        this.drawText('AP', x, y, 88);
        this.drawCurrentAndMax(actorDOYA, 100, x, y, width,
                               this.mpColor(actor), this.normalColor());
    };

    Window_Base.prototype.dgGaugeColor1 = function() {
        return this.textColor(6);
    };
    
    Window_Base.prototype.dgGaugeColor2 = function() {
        return this.textColor(7);
    };

})();