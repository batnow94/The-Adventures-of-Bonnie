/*:
* 
* @plugindesc This plugin simplifies the process of allowing the player to display custom battle log messages that aren't tied to skills or the like.
*
* @author ZainWD
*
* @help To use this plugin, simply do the following plugin command(without square 
* parentheses):
* 
* battleLog [frames] [Text]
*
* so "battleLog 120 I am big." (without quotation marks) would print "I am big." 
* in the battle log for 120 frames. 
* 
* If you have YEP_BattleEngineCore you can also make text centered.
* If you want to center the previous example you'd do the following:
* battleLogCenter 120 I am big.
*
* Text codes like changing the color or showing icons work as well.
*
*/

(function() {

    var framesPassed = 0;
    
        var _zain_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
        Game_Interpreter.prototype.pluginCommand = function(command, args){
            _zain_Game_Interpreter_pluginCommand.call(this, command, args);
            
            var text = '';
            if(command == "battleLog") {
                for (i = 1; i < args.length; i++) {
                    text += String(args[i] + ' ');
                  } 
                var frames = Number(args[0]);
                frames = (frames / 60) * 1000;
                    SceneManager._scene._logWindow.addText(text);
                framesPassed = 0;
                setTimeout(function(){
                    SceneManager._scene._logWindow.clear();
                }, frames);
            };

            if(command == "battleLogCenter") {
                for (i = 1; i < args.length; i++) {
                    text += String(args[i] + ' ');
                  } 
                var frames = Number(args[0]);
                frames = (frames / 60) * 1000;
                    SceneManager._scene._logWindow.addText('<CENTER>' + text);
                framesPassed = 0;
                setTimeout(function(){
                    SceneManager._scene._logWindow.clear();
                }, frames);
            };
        }
    
        var _zain_Scene_Battle_update = Scene_Battle.prototype.update;
        Scene_Battle.prototype.update = function() {
            _zain_Scene_Battle_update.call(this);
            framesPassed++;
        };
    })();