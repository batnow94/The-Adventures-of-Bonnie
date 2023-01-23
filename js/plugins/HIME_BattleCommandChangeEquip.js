/*:
-------------------------------------------------------------------------
@title Battle Command: Change Equip
@author Hime --> HimeWorks (http://himeworks.com)
@version 1.0
@date Aug 15, 2016
@filename HIME_BattleCommandChangeEquip.js
@url 

If you enjoy my work, consider supporting me on Patreon!

* https://www.patreon.com/himeworks

If you have any questions or concerns, you can contact me at any of
the following sites:

* Main Website: http://himeworks.com
* Facebook: https://www.facebook.com/himeworkscom/
* Twitter: https://twitter.com/HimeWorks
* Youtube: https://www.youtube.com/c/HimeWorks
* Tumblr: http://himeworks.tumblr.com/

-------------------------------------------------------------------------------
@plugindesc Allows you to have an actor change equips during battle.
@help 
-------------------------------------------------------------------------------
== Description ==

This plugin allows you to use all of the functions provided by the plugin
Actor Battle Commands to control the equip command provided by Yanfly's
Change Battle Equip plugin.

== Required ==

* Yanfly - Battle Equip Change
Place that plugin above this 

== Terms of Use ==

- Free for use in non-commercial projects with credits
- Free for use in commercial projects, but it would be nice to let me know
- Please provide credits to HimeWorks

== Change Log ==

1.0 - Aug 15, 2016
 - initial release

== Usage ==

To add the "Equip" actor command, use the note-tag

  <battle command: change_equip />
  
Or the extended note-tag

  <battle command>
    name: "Equip now!",
    symbol: "change_equip"
  </battle command>    

You can change the name of the command to anything you like.

-- Disable Command --

To enable or disable the equip command, use the script call

  enable_actor_command( ACTOR_ID, "change_equip")
  disable_actor_command( ACTOR_ID, "change_equip")
  
Where the ACTOR_ID is the ID of the actor to apply this script call to.
 
-- Hide Command --

To hide or show the equip command, use the script call

  hide_actor_command( ACTOR_ID, "change_equip")
  show_actor_command( ACTOR_ID, "change_equip")
  
-------------------------------------------------------------------------------
 */ 
var Imported = Imported || {} ;
var TH = TH || {};
Imported.BattleCommandChangeEquip = 1;
TH.BattleCommandChangeEquip = TH.BattleCommandChangeEquip || {};

(function ($) {

  
  
  /* Create command */
  TH.ActorBattleCommands.makeCommand_change_equip = function(symbol, ext) {
    return new Data_BattlerCommand("Equip", symbol, ext);
  };
  
  /* Add the command to the list */
  Window_ActorCommand.prototype.addBattleCommand_change_equip = function(cmd) {
    var enabled = cmd.isEnabled() && this._actor.canBattleEquipChange();
    this.addCommand(cmd.name(), cmd.symbol(), enabled, cmd.ext());
  };
  
  /* Add bindings for command window */
  var TH_SceneBattle_createActorCommandWindow = Scene_Battle.prototype.createActorCommandWindow;
  Scene_Battle.prototype.createActorCommandWindow = function() {
    TH_SceneBattle_createActorCommandWindow.call(this);
    this._actorCommandWindow.setHandler('change_equip',  this.commandChangeBattleEquip.bind(this));
  };
})(TH.BattleCommandChangeEquip);