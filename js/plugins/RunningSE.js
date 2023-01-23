/*:
 * @plugindesc v1.1 Disable or change battle start sound
 * @author DreamX
 *  
 * @help
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 * RunUseSE
 * Sets battle start to use a SE, like the default.
 * 
 * RunUseME
 * Sets battle start to use a ME. You must define the ME with SetRunME 
 * (see below) before using. 
 * 
 * RunUseBattleBGM
 * Sets battle start to use the battle BGM.
 * 
 * RunUseNone
 * Don't play any sound on battle start.
 * 
 * SetRunSE w x y z
 * w - The name of the battle start SE to use.
 * x - (Optional) The pan of the SE
 * y - (Optional) The pitch of the SE
 * z - (Optional) The volume of the SE
 * 
 * SetRunME w x y z
 * w - The name of the battle start ME to use.
 * x - (Optional) The pan of the ME
 * y - (Optional) The pitch of the ME
 * z - (Optional) The volume of the ME
 * 
 * ResetRunSE
 * Resets the battle start SE to default.
 * ============================================================================
 * Terms Of Use
 * ============================================================================
 * Free to use and modify for commercial and noncommercial games, with credit.
 * ============================================================================
 * Credits
 * ============================================================================
 * DreamX
 */

var Imported = Imported || {};
Imported.DreamX_RunSE = true;

var DreamX = DreamX || {};
DreamX.RunSE = DreamX.RunSE || {};
DreamX.Param = DreamX.Params || {};

(function () {
    DreamX.RunSE.Game_Interpreter_pluginCommand =
            Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        DreamX.RunSE.Game_Interpreter_pluginCommand.call(this, command, args);
        switch (command) {
            case 'RunUseSE':
                $gameSystem.RunSoundType = 'SE';
                break;
            case 'RunUseME':
                $gameSystem.RunSoundType = 'ME';
                break;
            case 'RunUseBattleBGM':
                $gameSystem.RunSoundType = 'BATTLEBGM';
                break;
            case 'RunUseNone':
                $gameSystem.RunSoundType = 'NONE';
                break;
            case 'SetRunSE':
                if (args[0]) {
                    $gameSystem.customRunSE = args[0];
                }
                if (args[1]) {
                    parseInt($gameSystem.customRunSEPan = args[1]);
                }
                if (args[2]) {
                    parseInt($gameSystem.customRunSEPitch = args[2]);
                }
                if (args[3]) {
                    parseInt($gameSystem.customRunSEVolume = args[3]);
                }
                break;
            case 'SetRunME':
                if (args[0]) {
                    $gameSystem.customRunME = args[0];
                }
                if (args[1]) {
                    parseInt($gameSystem.customRunMEPan = args[1]);
                }
                if (args[2]) {
                    parseInt($gameSystem.customRunMEPitch = args[2]);
                }
                if (args[3]) {
                    parseInt($gameSystem.customRunMEVolume = args[3]);
                }
                break;
            case 'ResetRunSE':
                $gameSystem.customRunSE = "";
                $gameSystem.customRunSEPan = "";
                $gameSystem.customRunSEPitch = "";
                $gameSystem.customRunSEVolume = "";
                break;
        }
    };

    DreamX.RunSE.SoundManager_playEscape = SoundManager.playEscape;
    SoundManager.playEscape = function () {
        if ((!$gameSystem.RunSoundType
                || $gameSystem.RunSoundType === 'SE')
                && $gameSystem.customRunSE) {
            var se = {};
            se.name = $gameSystem.customRunSE;
            se.pan = $gameSystem.customRunSEPan || se.pan;
            se.pitch = $gameSystem.customRunSEPitch || se.pitch;
            se.volume = $gameSystem.customRunSEVolume || se.volume;
            AudioManager.playStaticSe(se);
            return;
        } else if ($gameSystem.RunSoundType === 'ME'
                && $gameSystem.customRunME) {
            var me = {};
            me.name = $gameSystem.customRunME;
            me.pan = $gameSystem.customRunMEPan || 0;
            me.pitch = $gameSystem.customRunSEPitch || 100;
            me.volume = $gameSystem.customRunSEVolume || 100;
            AudioManager.playMe(me);
            return;
        } else if ($gameSystem.RunSoundType === 'BATTLEBGM') {
            BattleManager.playBattleBgm();
            return;
        } else if ($gameSystem.RunSoundType === 'NONE') {
            return;
        }
        DreamX.RunSE.SoundManager_playEscape.call(this);
    };

})();
