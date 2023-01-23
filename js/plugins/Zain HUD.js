(function() {
  
  /*  var _game_action_execute_damage = Game_Action.prototype.executeDamage;
        Game_Action.prototype.executeDamage = function(target, value) {
            _game_action_execute_damage.call(this,target,value);
            if (target.isActor()) {
                if (value > 0) {
                $gameSwitches.setValue(217 + target.index(), true);
                setTimeout( function () {
                    $gameSwitches.setValue(217 + target.index(), false);
                }, 166);
        };
    };
};

    var _scene_battle_start = Scene_Battle.prototype.start;
        Scene_Battle.prototype.start = function() {
                _scene_battle_start.call(this);
//                this._stateWindow = new State_Window(-4, -4, 824, 632, 0);
//                this.addChild(this._stateWindow)
        }; */

    Window_Base.prototype.drawActorSimpleStatus = function(actor, x, y, width) {
        var lineHeight = this.lineHeight();
        var xpad = Window_Base._faceWidth + (2 * Yanfly.Param.TextPadding);
        var x2 = x + xpad;
        var width2 = Math.max(180, width - xpad - this.textPadding());
        this.drawActorName(actor, x, y);
        this.drawActorLevel(actor, x2 + 100, y);
        this.drawActorIcons(actor, x, y + lineHeight * 2);
        this.drawActorClass(actor, x2, y, width2);
        this.drawActorHp(actor, x, y + lineHeight * 1, 380);
        this.drawActorMp(actor, x, y + lineHeight * 2, 380);
        this.drawActorAbility(actor, x, y + lineHeight * 3, 380);
    }; 

    Window_Base.prototype.drawActorAbility = function(actor, x, y, width) {
        width = width || 186;
        var actorId = actor.actorId()
        var ability = $dataActors[actorId].meta.Ability || null;
        this.changeTextColor(this.textColor(3));
        this.drawText(ability, x, y, 210);
        };
    
/*    var _statewindow_prototype_update = State_Window.prototype.update;
        State_Window.prototype.update = function() {
            _statewindow_prototype_update.call(this);
            var icons = $gameParty.battleMembers()[0].allIcons().slice(0, Math.floor(144 / 32));
            for (var i = 0; i < icons.length; i++) {
                this.drawIcon(icons[i], 272 + (32 * i), 496);
            };    
        };

    var _window_base_drawicon = Window_Base.prototype.drawIcon;
        Window_Base.prototype.drawIcon = function(iconIndex, x, y) {
            _window_base_drawicon.call(this,iconIndex, x, y);
        }; 

    function State_Window() {
        this.initialize.apply(this, arguments);
    }

    State_Window.prototype = Object.create(Window_Base.prototype);
    State_Window.prototype.constructor = State_Window;

    State_Window.prototype.initialize = function(x, y, width, height, opacity) {
        Window_Base.prototype.initialize.call(this, x, y, width, height);
        this.backOpacity = opacity;
    } */


})();