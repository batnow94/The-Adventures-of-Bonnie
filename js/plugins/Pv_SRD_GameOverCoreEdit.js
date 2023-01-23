/*:
 * @author SumRndmDde & Pivoo
 * @plugindesc a plugin to edit SRD's script to add conditions to whether the retry option is available;
 * 
 * @param Use Command Window
 * @desc If 'true', then the Game Over Command Window will be displayed at the end of the Game Over scene.
 * @default true
 * 
 * @param Allow Retry Command
 * @desc If 'true', then players will be able to select the "Retry" command and restart the battle from the beginning.
 * @default true
 * 
 * @help
 * to lazy to write this. pay me if you actually want one.
 * all my hate to SRD ;)
*/
var piv = piv || {};
piv.SRDGameOver = {
	useCommand: new Function('return '+PluginManager.parameters('Pv_SRD_GameOverCoreEdit')['Use Command Window']),
	allowRetry: new Function('return '+PluginManager.parameters('Pv_SRD_GameOverCoreEdit')['Allow Retry Command'])
};

(function(_){
	Scene_Gameover.prototype.gotoTitle = function() {
		if(piv.SRDGameOver.useCommand()) {
			this.openCommandWindow();
		} else {
			this.titleCommand();
		}
	};
    

	Window_GameOverCommand.prototype.makeCommandList = function() {
		if(piv.SRDGameOver.allowRetry()) this.addCommand(_.retryText, 'retry', !!$gameTemp._setUpRetry);
		this.addCommand(_.loadText, 'load');
		this.addCommand(_.titleText, 'title');
	};
})(SRD.GameOverCore);