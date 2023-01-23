(function() {

    var _scene_battle_update = Scene_Battle.prototype.update
    Scene_Battle.prototype.update = function() {
        _scene_battle_update.call(this);
        this.updateWindowSlideEffect();
    };

    var _scene_battle_update_createAllWindows = Scene_Battle.prototype.createAllWindows;
    Scene_Battle.prototype.createAllWindows = function() {
        _scene_battle_update_createAllWindows.call(this);
        this._skillWindow.x = 0;
	    this._skillWindow.y = 444;
    	this._skillWindow.org = [0,444];
        this._skillWindow.org2 = [this._skillWindow.org[0] + 0,this._skillWindow.org[1] + 50];
        this._itemWindow.x = 0;
	    this._itemWindow.y = 444;
    	this._itemWindow.org = [0,444];
	    this._itemWindow.org2 = [this._itemWindow.org[0] + 0,this._itemWindow.org[1] + 50];
        this._actorWindow.x = 0;
	    this._actorWindow.y = 444;
    	this._actorWindow.org = [0,444];
	    this._actorWindow.org2 = [this._actorWindow.org[0] + 0,this._actorWindow.org[1] + 50];
        this._helpWindow.x = 0;
	    this._helpWindow.y = 0;
    	this._helpWindow.org = [0,0];
        this._helpWindow.org2 = [this._helpWindow.org[0] + 0,this._helpWindow.org[1] - 20];
    }
    Scene_Battle.prototype.updateWindowSlideEffect = function() {
        this.slideWindow(this._skillWindow,false);
        this.slideWindow(this._itemWindow,false);
        this.slideWindow(this._actorWindow,false);
        this.slideWindow(this._helpWindow,false);
    };	

    Scene_Battle.prototype.slideWindow = function(win,vmode) {
        var vm = vmode ? win.active : win.visible;
        if (vm) {
            var np = [win.org[0],win.org[1]];
            win.contentsOpacity += 15;	
        } else {
            var np = [win.org2[0],win.org2[1]];
            win.contentsOpacity = 0;	
        };
        win.x = this.sprite_move_to(win.x,np[0]);
        win.y = this.sprite_move_to(win.y,np[1]);		
    };

    Scene_Battle.prototype.sprite_move_to = function(value,real_value) {
        if (value === real_value) {return value};
        var dnspeed = 1 + (Math.abs(value - real_value) / 12);
        if (value > real_value) {value -= dnspeed;
            if (value < real_value) {value = real_value};}
        else if (value < real_value) {value  += dnspeed;
            if (value  > real_value) {value  = real_value};		
        };
        return Math.floor(value);
    };

})();