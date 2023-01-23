 /*:
 * @plugindesc v1.00 Press Turn Battle (Requires YEP_BattleEngineCore.js)
 * @author Yorae Rasante (based on work by Archeia and Yanfly)
 * 
 * 
 * @param ---Settings---
 * @default
 * 
 * @param weakPT
 * @text Weakness Threshold
 * @parent ---Settings---
 * @type number
 * @decimals 4
 * @desc Over how much percentage is an element considered a
 * weakness.
 * @default 100
 * 
 * @param strongPT
 * @text Resistance Threshold
 * @parent ---Settings---
 * @type number
 * @decimals 4
 * @desc Under how much percentage is an element considered a
 * resistance.
 * @default 100
 * 
 * @param defaultPT
 * @text Default Turns
 * @parent ---Settings---
 * @type number
 * @desc How many turns a battler gets by default
 * @default 1
 * 
 * @param defaultHPT
 * @text Default Half-Turns
 * @parent ---Settings---
 * @type number
 * @desc How many half-turns a battler gets by default
 * @default 0
 * 
 * @param capPT
 * @text Cap on number of turns
 * @parent ---Settings---
 * @type number
 * @desc Max number of turns a side can get
 * @default 8
 * 
 * @param defaultCostPT
 * @text Default Skill Cost
 * @parent ---Settings---
 * @type number
 * @desc How many turns a skill costs by default
 * @default 1
 * 
 * @param evadeCostPT
 * @text Evasion Skill Cost
 * @parent ---Settings---
 * @type number
 * @desc How many extra turns an evasion costs
 * @default 1
 * 
 * @param missCostPT
 * @text Miss Skill Cost
 * @parent ---Settings---
 * @type number
 * @desc How many extra turns a miss costs
 * @default 1
 * 
 * @param strongCostPT
 * @text Resist Skill Cost
 * @parent ---Settings---
 * @type number
 * @desc How many extra turns a resistance costs
 * @default 0
 * 
 * @param immuneCostPT
 * @text Immunity Skill Cost
 * @parent ---Settings---
 * @type number
 * @desc How many extra turns a immunity costs
 * @default 1
 * 
 * @param absorbCostPT
 * @text Absorb Skill Cost
 * @parent ---Settings---
 * @type number
 * @desc How many extra turns an absorption costs
 * @default 99
 * 
 * @param reflectCostPT
 * @text Reflect Skill Cost
 * @parent ---Settings---
 * @type number
 * @desc How many extra turns a reflection costs
 * @default 99
 * 
 * 
 * @param ---Escape---
 * @default
 *
 * @param escapeRatioPT
 * @text Escape Ratio
 * @parent ---Escape---
 * @desc How to calculates escape ratios.
 * Default: 0.5 * $gameParty.agility() / $gameTroop.agility()
 * @default 0.125 * $gameParty.agility() / $gameTroop.agility()
 *
 * @param escapeBoostPT
 * @text Fail Escape Boost
 * @parent ---Escape---
 * @desc Each time the player fails escape, increase the success
 * rate by this much. Default: 0.1
 * @default 0.025
 * 
 * @param ---Turn Icons---
 * @default
 * 
 * @param partyPTIcon
 * @text Party Icon
 * @parent ---Turn Icons---
 * @type file
 * @dir img/system
 * @require 1
 * @desc The Press Turn icon for the player party
 * @default
 * 
 * @param troopPTIcon
 * @text Troop Icon
 * @parent ---Turn Icons---
 * @type file
 * @dir img/system
 * @require 1
 * @desc The Press Turn icon for the enemy troop
 * @default
 * 
 * @param xPTIcon
 * @text X position
 * @parent ---Turn Icons---
 * @desc The icons' x position.
 * You can use a formula.
 * @default Graphics.boxWidth - (width * (index + 1))
 * 
 * @param yPTIcon
 * @text Y position
 * @parent ---Turn Icons---
 * @desc The icons' y position.
 * You can use a formula.
 * @default 54 + (height /2 * (index%2))
 * 
 * @param disposeSpeedPTIcon
 * @text Dispose Speed
 * @parent ---Turn Icons---
 * @type number
 * @desc How many frames for the icon to disappear
 * @default 10
 * 
 * @param flashSpeedPTIcon
 * @text Flash Speed
 * @parent ---Turn Icons---
 * @type number
 * @desc How many frames the icon flashes
 * @default 30
 * 
 * 
 * 
 * @help
 * Press Turn System adapted by Yorae Rasante
 * Using as base VX Ace version by Archeia and STB by Yanfly
 * This plugin requires YEP_BattleEngineCore. Make sure this plugin is located
 * under YEP_BattleEngineCore in the plugin list.
 * 
 * Requires you to set Battle System on BEC to 'ptb', be it through the
 * Default System parameter or through a Plugin Command.
 * 
 * It can be changed back and forth through your game through the
 * Plugin Command if needed.
 * 
 *   setBattleSys PTB      Sets battle system to Press Turn Battle.
 *   setBattleSys DTB      Sets battle system to Default Turn Battle.
 * 
 * The Press Turn Battle is a battle system based on the Megami Tensei games.
 * Each side gets a number of turns based, most of the time, on their
 * number of members (bosses may have more turns per turn).
 * A turn can be, under the right circunstances, "half-used". Those "halves"
 * can then be used again as if whole turns.
 * At the same time, circunstances may cause the use of double, or all turns.
 * 
 * If an attack is repelled or absorbed, or party failed to retreat,
 *  All remaining turns are lost.
 * 
 * If a normal attack is nullified or dodged/misses
 *  An extra turn is used
 * 
 * If a skill is set as "missable" and misses/is dodged
 *  One turn is used
 * 
 * If a skill crits/hits a weakness
 *  If the cost was paid with any full turn, they are turned into half-turns.
 *  Any half-turns are used completely.
 * 
 * Passing turn to next ally, or using a skill set as "low cost"
 *  Uses a half-turn. If no half-turns remain, a whole turn is turned into half.
 * 
 * Using a skill that adds turns
 *  Uses one turn or half-turn, gains the number of half-turns set for the skill.
 * 
 * Using a skill set as "Instant" (though Yanfly's YEP_InstantCast)
 *  Uses no turn.
 * 
 * You may notice a lack of use for the Agility parameter in this battle system.
 * That is because by default in the games it affects Hit and Crit Chance and
 * Evasion. Something reproduceable with Yanfly's Extra Parameters Formula.
 * In a battle system where those two things can give or takes turns...
 * 
 * Notetags:
 *  Actors and Enemies:
 *    <PT Turns: x>
 *    <PT Half Turns: x>
 *      Changes the default number of turns/half-turns given by the battler.
 * 
 *    <PT Cost: +x>
 *    <PT Cost: -x>
 *      Raises or lowers the cost of turns a skill takes for the battler.
 *      Does not affect "low cost" skills.
 * 
 *  Classes, Equipment, and States:
 *    <PT Turns: x>
 *    <PT Turns: +x>
 *    <PT Turns: -x>
 *    <PT Half Turns: x>
 *    <PT Half Turns: +x>
 *    <PT Half Turns: -x>
 *      Changes the number of turns/half-turns given by the battler.
 *      x or +x raises and -x lowers the number.
 * 
 *    <PT Cost: +x>
 *    <PT Cost: -x>
 *      Raises or lowers the cost of turns skills takes for the battler.
 * 
 *  Skills and Items:
 *    <PT Cost: x>
 *      Sets cost of turns for the skill.
 * 
 *    <PT Cost Eval>
 *      value = x;
 *    </PT Cost Eval>
 *      Sets cost of turns for the skill through code.
 *      Number of turns is the value of "value".
 * 
 *    <PT Low Cost>
 *      Sets skill to only cost half a turn.
 * 
 *    <PT Low Cost Eval>
 *      condition = true;
 *    </PT Low Cost Eval>
 *      Skill will only cost half a turn, if "condition" is true.
 * 
 *    <PT Missable>
 *      Sets skill to be "missable" - being dodged or missing causing
 *       no extra cost in turns.
 * 
 *    <PT Missable Eval>
 *      condition = true;
 *    </PT Missable Eval>
 *      Sets skill to be "missable" if "condition" is true.
 * 
 *    <PT Gain: x>
 *      Target gains x half-turns.
 * 
 *    <PT Gain Eval>
 *      value = x;
 *    </PT Cost Eval>
 *      Target gains a number of half-turns.
 *      Number of half-turns is the value of "value".
 * 
 *    <PTB Help>
 *      text
 *      text
 *    </PTB Help>
 *      Text for the help box, in case you want a different text
 *      when using different battle systems.
 */

var Imported = Imported || {};
Imported.YR_BattleSysPTB = true;

if (Imported.YEP_BattleEngineCore) {
if (Yanfly.BEC.version && Yanfly.BEC.version >= 1.42) {

var YR = YR || {};
YR.BattleSysPTB = YR.BattleSysPTB || {};

YR.parameters = PluginManager.parameters('YR_BattleSysPTB');
YR.BattleSysPTB.weakPT = Number(YR.parameters['weakPT']);
YR.BattleSysPTB.strongPT = Number(YR.parameters['strongPT']);
YR.BattleSysPTB.defaultPT = Number(YR.parameters['defaultPT']);
YR.BattleSysPTB.defaultHPT = Number(YR.parameters['defaultHPT']);
YR.BattleSysPTB.capPT = Number(YR.parameters['capPT']);
YR.BattleSysPTB.defaultCostPT = Number(YR.parameters['defaultCostPT']);
YR.BattleSysPTB.evadeCostPT = Number(YR.parameters['evadeCostPT']);
YR.BattleSysPTB.missCostPT = Number(YR.parameters['missCostPT']);
YR.BattleSysPTB.strongCostPT = Number(YR.parameters['strongCostPT']);
YR.BattleSysPTB.immuneCostPT = Number(YR.parameters['immuneCostPT']);
YR.BattleSysPTB.absorbCostPT = Number(YR.parameters['absorbCostPT']);
YR.BattleSysPTB.reflectCostPT = Number(YR.parameters['reflectCostPT']);
YR.BattleSysPTB.escapeRatioPT = new Function('return ' + String(YR.parameters['escapeRatioPT']));
YR.BattleSysPTB.escapeBoostPT = new Function('return ' + String(YR.parameters['escapeBoostPT']));
YR.BattleSysPTB.partyPTIcon = String(YR.parameters['partyPTIcon']);
YR.BattleSysPTB.troopPTIcon = String(YR.parameters['troopPTIcon']);
YR.BattleSysPTB.xPTIcon = new Function('width', 'height', 'index', 'return ' + String(YR.parameters['xPTIcon']));
YR.BattleSysPTB.yPTIcon = new Function('width', 'height', 'index', 'return ' + String(YR.parameters['yPTIcon']));
YR.BattleSysPTB.disposeSpeedPTIcon = Number(YR.parameters['disposeSpeedPTIcon']);
YR.BattleSysPTB.flashSpeedPTIcon = Number(YR.parameters['flashSpeedPTIcon']);

ImageManager.reserveSystem(YR.BattleSysPTB.partyPTIcon);
ImageManager.reserveSystem(YR.BattleSysPTB.troopPTIcon);

YR.BattleSysPTB.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!YR.BattleSysPTB.DataManager_isDatabaseLoaded.call(this)) return false;
  if (!YR._loaded_YR_BattleSysPTB) {
    this.processPTBBattlersNotetags($dataActors);
    this.processPTBBattlersNotetags($dataEnemies);
    this.processPTBBattlerDataNotetags($dataClasses);
    this.processPTBBattlerDataNotetags($dataWeapons);
    this.processPTBBattlerDataNotetags($dataArmors);
    this.processPTBBattlerDataNotetags($dataStates);
    this.processPTBSkillsNotetags($dataSkills);
    this.processPTBSkillsNotetags($dataItems);
    YR._loaded_YR_BattleSysPTB = true;
  }
  return true;
};

DataManager.processPTBBattlersNotetags = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.PT = YR.BattleSysPTB.defaultPT;
    obj.HPT = YR.BattleSysPTB.defaultHPT;
    obj.extraPTCost = 0;

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];

      if (line.match(/<PT Turns:[ ]*(\d+)>/i)) {
        obj.PT = parseInt(RegExp.$1);
      }
      else if (line.match(/<PT (?:Half Turns|Half-Turns):[ ]*(\d+)>/i)) {
        obj.HPT = parseInt(RegExp.$1);
      }
      else if (line.match(/<PT Cost:[ ]*([\+\-]\d+)>/i)) {
        obj.extraPTCost += parseInt(RegExp.$1);
      }
    }
  }
}

DataManager.processPTBBattlerDataNotetags = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.PTPlus = 0;
    obj.HPTPlus = 0;
    obj.extraPTCost = 0;

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];

      if (line.match(/<PT Turns:[ ]*(\d+)>/i)) {
        obj.PTPlus += parseInt(RegExp.$1);
      }
      else if (line.match(/<PT Turns:[ ]*([\+\-]\d+)>/i)) {
        obj.PTPlus += parseInt(RegExp.$1);
      }
      else if (line.match(/<PT (?:Half Turns|Half-Turns):[ ]*(\d+)>/i)) {
        obj.HPTPlus += parseInt(RegExp.$1);
      }
      else if (line.match(/<PT (?:Half Turns|Half-Turns):[ ]*([\+\-]\d+)>/i)) {
        obj.HPTPlus += parseInt(RegExp.$1);
      }
      else if (line.match(/<PT Cost:[ ]*([\+\-]\d+)>/i)) {
        obj.extraPTCost += parseInt(RegExp.$1);
      }
    }
  }
}

DataManager.processPTBSkillsNotetags = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    var evalMode = 'none';
    obj.PTCost = YR.BattleSysPTB.defaultCostPT;
    obj.PTCostEval = undefined;
    obj.PTLowCost = false;
    obj.PTLowCostEval = undefined;
    obj.PTMissable = false;
    obj.PTMissableEval = undefined;
    obj.PTGain = 0;
    obj.PTGainEval = undefined;
    obj.PTHelp = undefined;
    
    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      
      if (line.match(/<PT Cost:[ ]*(\d+)>/i)) {
        obj.PTCost = parseInt(RegExp.$1);
      } else if (line.match(/<PT (?:Low Cost|Low-Cost)>/i)) {
        obj.PTLowCost = true;
      } else if (line.match(/<PT Missable>/i)) {
        obj.PTMissable = true;
      } else if (line.match(/<PT Gain:[ ]*(\d+)>/i)) {
        obj.PTGain += parseInt(RegExp.$1);
      } else if (line.match(/<(?:PTB HELP)>/i)) {
        evalMode = 'ptb help';
        obj.PTHelp = '';
      } else if (line.match(/<\/(?:PTB HELP)>/i)) {
        evalMode = 'none';
      } else if (evalMode === 'ptb help') {
        obj.PTHelp += line + '\n';
      } else if (line.match(/<PT Cost Eval>/i)) {
        evalMode = 'pt cost eval';
        obj.PTCostEval = '';
      } else if (line.match(/<\/PT Cost Eval>/i)) {
        evalMode = 'none';
      } else if (evalMode === 'pt cost eval') {
        obj.PTCostEval += line + '\n';
      } else if (line.match(/<PT (?:Low Cost|Low-Cost) Eval>/i)) {
        evalMode = 'pt low cost eval';
        obj.PTLowCostEval = '';
      } else if (line.match(/<\/PT (?:Low Cost|Low-Cost) Eval>/i)) {
        evalMode = 'none';
      } else if (evalMode === 'pt low cost eval') {
        obj.PTLowCostEval += line + '\n';
      } else if (line.match(/<PT Missable Eval>/i)) {
        evalMode = 'pt missable eval';
        obj.PTMissableEval = '';
      } else if (line.match(/<\/PT Missable Eval>/i)) {
        evalMode = 'none';
      } else if (evalMode === 'pt missable eval') {
        obj.PTMissableEval += line + '\n';
      } else if (line.match(/<PT Gain Eval>/i)) {
        evalMode = 'pt gain eval';
        obj.PTGainEval = '';
      } else if (line.match(/<\/PT Gain Eval>/i)) {
        evalMode = 'none';
      } else if (evalMode === 'pt gain eval') {
        obj.PTGainEval += line + '\n';
      }
    }
  }
}

BattleManager.isPTB = function() {
  return this.isBattleSystem('ptb');
};

YR.BattleSysPTB.BattleManager_isTurnBased = BattleManager.isTurnBased;
BattleManager.isTurnBased = function() {
  if (this.isPTB()) return true;
  return YR.BattleSysPTB.BattleManager_isTurnBased.call(this);
};

YR.BattleSysPTB.BattleManager_makeEscapeRatio = BattleManager.makeEscapeRatio;
BattleManager.makeEscapeRatio = function() {
  if (this.isPTB()) {
    try {
      this._escapeRatio = YR.BattleSysPTB['escapeRatioPT'].call(this);
    } catch (e) {
      this._escapeRatio = 0;
      Yanfly.Util.displayError(e, YR.BattleSysPTB['escapeRatioPT'], 'PTB ESCAPE RATIO ERROR');
    }
    try {
      this._escapeFailBoost = YR.BattleSysPTB['escapeBoostPT'].call(this);
    } catch (e) {
      this._escapeFailBoost = 0;
      Yanfly.Util.displayError(e, YR.BattleSysPTB['escapeBoostPT'], 'PTB ESCAPE BOOST ERROR');
    }
  } else {
    this._escapeFailBoost = 0.1;
    YR.BattleSysPTB.BattleManager_makeEscapeRatio.call(this);
  }
};

YR.BattleSysPTB.BattleManager_displayEscapeFailureMessage =
  BattleManager.displayEscapeFailureMessage;
BattleManager.displayEscapeFailureMessage = function() {
  YR.BattleSysPTB.BattleManager_displayEscapeFailureMessage.call(this);
  if (this.isPTB()) {
    $gameParty._PTPool = 0;
    $gameParty._HPTPool = 0;
    this.endTurn();
  }
};

BattleManager.isTroopTurn = function () {
  return this._troopTurn;
}

YR.BattleSysPTB.BattleManager_startBattle = BattleManager.startBattle;
BattleManager.startBattle = function() {
  if (this.isPTB()) {
    if($gameTroop.agility() > $gameParty.agility()) this._troopTurn = true;
    else this._troopTurn = false;
  }
  YR.BattleSysPTB.BattleManager_startBattle.call(this);
};

YR.BattleSysPTB.GameTroop_increaseturn = Game_Troop.prototype.increaseTurn;
Game_Troop.prototype.increaseTurn = function() {
  if (!BattleManager.isPTB() || BattleManager.isTroopTurn()) {
    YR.BattleSysPTB.GameTroop_increaseturn.call(this);
  }
};

YR.BattleSysPTB.BattleManager_endTurn = BattleManager.endTurn;
BattleManager.endTurn = function() {
  if (!BattleManager.isPTB()) {YR.BattleSysPTB.BattleManager_endTurn.call(this)}
  else {
    this._phase = 'turnEnd';
    if (!this.isTroopTurn() && $gameTroop.turnCount() > 0) this._preemptive = false;
    if (this.isTroopTurn() && $gameTroop.turnCount() > 0) this._surprise = false;
    this.allBattleMembers().forEach(function(battler) {
      if ((battler.isEnemy() && this.isTroopTurn()) || (battler.isActor() && !this.isTroopTurn())) {
        battler.onTurnEnd();
        this.refreshStatus();
        this._logWindow.displayRegeneration(battler);
      }
    }, this);
    this._troopTurn = !this._troopTurn;
    this._orderMade = false;
  }
};

YR.BattleSysPTB.Game_Unit_onTurnStart = Game_Unit.prototype.onTurnStart;
Game_Unit.prototype.onTurnStart = function() {
  if (!BattleManager.isPTB()) YR.BattleSysPTB.Game_Unit_onTurnStart.call(this);
  else {
    var max = this.members().length;
    for (var i = 0; i < max; ++i) {
      var member = this.members()[i];
      if (member) {
        if ((member.isEnemy() && BattleManager.isTroopTurn()) || (member.isActor() && !BattleManager.isTroopTurn())) member.onTurnStart();
        member.refresh();
      }
    }
  }
};

YR.BattleSysPTB.BattleManager_makeActionOrders = BattleManager.makeActionOrders;
BattleManager.makeActionOrders = function() {
  if (!BattleManager.isPTB()) YR.BattleSysPTB.BattleManager_makeActionOrders.call(this);
  else if (!this._orderMade) {
    var battlers = [];
    var otherTeam = [];
    if (!this._surprise && !this.isTroopTurn()) {
        battlers = battlers.concat($gameParty.members());
        $gameParty.makePTPool();
    } else otherTeam = otherTeam.concat($gameParty.members());
    if (!this._preemptive && this.isTroopTurn()) {
        battlers = battlers.concat($gameTroop.members());
        $gameTroop.makePTPool();
    } else otherTeam = otherTeam.concat($gameTroop.members());
    battlers.sort(function(a, b) {
        return b.agi - a.agi;
    });
    this._actionBattlers = battlers;
    this._performedBattlers = otherTeam;
    this._orderMade = true;
  }
};

YR.BattleSysPTB.BattleManager_getNextSubject = BattleManager.getNextSubject;
BattleManager.getNextSubject = function() {
  if (this.isPTB()) {
    if ((this.isTroopTurn() && $gameTroop.totalPTPool() <= 0) || (!this.isTroopTurn() && $gameParty.totalPTPool() <= 0)) {
      return null;
    }
    for (;;) {
      var battler = this._actionBattlers.shift();
      this._actionBattlers.push(battler);
      if (!battler) return null;
      if (battler.isBattleMember() && battler.isAlive()) {
        return battler;
      }
    }
  } else {
    return YR.BattleSysPTB.BattleManager_getNextSubject.call(this);
  }
};

YR.BattleSysPTB.BattleManager_startInput = BattleManager.startInput;
BattleManager.startInput = function() {
  YR.BattleSysPTB.BattleManager_startInput.call(this);
  if (this.isPTB() && this._phase !== 'turn') this.startTurn();
};

YR.BattleSysPTB.BattleManager_processTurn = BattleManager.processTurn;
BattleManager.processTurn = function() {
  var subject = this._subject;
  if (this.isPTB() && subject.isActor()) {
    this._phase = 'input';
    BattleManager.changeActor(subject.index(), 'undecided');
    if (!subject.canInput()) {
      subject.makeActions();
      this.startAction();
    }
  } else if (this.isPTB() && subject.isEnemy()) {
    subject.clearActions();
    subject.makeActions();
    for (;;) {
      if (subject._actions[0] && subject._actions[0]._item._itemId === 0) {
        subject._actions.shift();
      } 
      else break;
    }
    this.startAction();
  } else {
    YR.BattleSysPTB.BattleManager_processTurn.call(this);
  }
};

YR.BattleSysPTB.BattleManager_selectPreviousCommand =
  BattleManager.selectPreviousCommand;
BattleManager.selectPreviousCommand = function() {
  if (this.isPTB()) {
    this._activePTBActor = this._subject;
    this._subject = null;
    this.changeActor(-1, 'undecided');
  } else {
    YR.BattleSysPTB.BattleManager_selectPreviousCommand.call(this);
  }
};

BattleManager.ptbSetSubject = function() {
  BattleManager.changeActor($gameParty.members().indexOf(this._activePTBActor), 'undecided');
  this._subject = this.actor();
};

YR.BattleSysPTB.BattleManager_selectNextCommand = BattleManager.selectNextCommand;
BattleManager.selectNextCommand = function() {
  if (this.isPTB()) {
    if (this._subject) {
      this.startAction();
    } else {
      this.ptbSetSubject();
      this._phase = 'input';
      var battler = this._subject;
      BattleManager.changeActor(battler.index(), 'undecided');
      if (!battler.canInput()) {
        battler.makeActions();
        this.startAction();
      }
    }
  } else {
    YR.BattleSysPTB.BattleManager_selectNextCommand.call(this);
  }
};

BattleManager.detectPtbInstantCast = function() {
  this._ptbInstantCast = false;
  if (!this.isPTB()) return;
  if (!this._subject) return;
  if (!this._subject.currentAction()) return;
  if (!this._subject.currentAction().item()) return;
  var item = this._subject.currentAction().item();
  this._ptbInstantCast = this._subject.isInstantCast(item);
};

YR.BattleSysPTB.BattleManager_startAction = BattleManager.startAction;
BattleManager.startAction = function() {
  if (Imported.YEP_InstantCast && this.isPTB()) this.detectPtbInstantCast();
  YR.BattleSysPTB.BattleManager_startAction.call(this);
};

YR.BattleSysPTB.BattleManager_endAction = BattleManager.endAction;
BattleManager.endAction = function() {
  if (this.isPTB() && this._action) {
    this._action._phase = 'turn';
    if (!this._ptbInstantCast) {
      if (this._action.subject().PTLowCost(this._action.item())) this._action.subject().friendsUnit().useLowCostPT();
      else if(!this._action._critted && !this._action._hitWeakness) this._action.subject().friendsUnit().usePT(this._action.subject().PTCost(this._action.item()));
    }
    if (this._action._absorbed) this._action.subject().friendsUnit().usePT(YR.BattleSysPTB.absorbCostPT);
    else if(this._action._reflected) this._action.subject().friendsUnit().usePT(YR.BattleSysPTB.reflectCostPT);
    else if(this._action._immune) this._action.subject().friendsUnit().usePT(YR.BattleSysPTB.immuneCostPT);
    else if(this._action._missed && !this._action.subject().PTMissable(this._action.item())) this._action.subject().friendsUnit().usePT(YR.BattleSysPTB.missCostPT);
    else if(this._action._evaded && !this._action.subject().PTMissable(this._action.item())) this._action.subject().friendsUnit().usePT(YR.BattleSysPTB.evadeCostPT);
    else if(this._action._critted || this._action._hitWeakness) {
      var value = this._action.subject().PTCost(this._action.item());
      if (this._action.subject().friendsUnit()._PTPool < value) {
        var value2 = value;
        value = this._action.subject().friendsUnit()._PTPool;
        value2 -= value;
        this._action.subject().friendsUnit().gainHPT(value);
        this._action.subject().friendsUnit()._PTPool = 0;
        this._action.subject().friendsUnit().usePT(value2);
      } else {
        this._action.subject().friendsUnit()._PTPool -= value;
        this._action.subject().friendsUnit().gainHPT(value);
      }
    }
    else if(this._action._hitResistance) this._action.subject().friendsUnit().usePT(YR.BattleSysPTB.strongCostPT);
    this._action.subject().friendsUnit().gainHPT(this._action.subject().PTGain(this._action.item()))
    if (this._ptbInstantCast) {
      this._ptbInstantCast = false;
      return YR.BattleSysPTB.BattleManager_endAction.call(this);
    }
    if (this._subject) {
      this._subject.spriteStepBack();
      this._subject.onAllActionsEnd();
      this._subject.removeCurrentAction();
    }
    if (this._processingForcedAction) {
      this._phase = this._preForcePhase;
      this._processingForcedAction = false;
    }
    if (this.loadPreForceActionSettings()) return;
    YR.BattleSysPTB.BattleManager_endAction.call(this);
    this._subject = null;
  } else if (this.isPTB()) {
    if (this._subject) {
      this._subject.friendsUnit().usePT(this._subject.extraPTCost()+1);
      this._subject.onAllActionsEnd();
      this._subject.removeCurrentAction();
    }
    YR.BattleSysPTB.BattleManager_endAction.call(this);
    this._subject = null;
  } else {
    YR.BattleSysPTB.BattleManager_endAction.call(this);
  }
};

YR.BattleSysPTB.BattleManager_processVictory = BattleManager.processVictory;
BattleManager.processVictory = function() {
  if (this.isPTB()) SceneManager._scene.removePT();
  YR.BattleSysPTB.BattleManager_processVictory.call(this);
};

YR.BattleSysPTB.Scene_Battle_commandFight = Scene_Battle.prototype.commandFight;
Scene_Battle.prototype.commandFight = function() {
  if (BattleManager.isPTB()) {
    BattleManager.ptbSetSubject();
    BattleManager._phase = 'input';
    var battler = BattleManager._subject;
    BattleManager.changeActor(battler.index(), 'undecided');
    if (!battler.canInput()) {
      battler.makeActions();
      BattleManager.startAction();
    }
  } else {
    YR.BattleSysPTB.Scene_Battle_commandFight.call(this);
  }
};

YR.BattleSysPTB.Scene_Battle_commandEscape = Scene_Battle.prototype.commandEscape;
Scene_Battle.prototype.commandEscape = function() {
  if (BattleManager.isPTB()) {
    BattleManager.processEscape();
  } else {
    YR.BattleSysPTB.Scene_Battle_commandEscape.call(this);
  }
};

YR.BattleSysPTB.Window_Help_setItem = Window_Help.prototype.setItem;
Window_Help.prototype.setItem = function(item) {
    if (this.meetPTBConditions(item)) return this.setText(item.PTHelp);
    YR.BattleSysPTB.Window_Help_setItem.call(this, item);
};

Window_Help.prototype.meetPTBConditions = function(item) {
    if (!item) return false;
    if (!BattleManager.isPTB()) return false;
    return item.PTHelp !== undefined;
};

Game_Unit.prototype.totalPTPool = function() {
  var value = this._PTPool + this._HPTPool;
  return value;
};

YR.BattleSysPTB.Game_Unit_initialize = Game_Unit.prototype.initialize;
Game_Unit.prototype.initialize = function () {
  YR.BattleSysPTB.Game_Unit_initialize.apply(this, arguments);
  this._PTPool = 0;
  this._HPTPool = 0;
}

Game_Unit.prototype.makePTPool = function() {
  this._PTPool = 0;
  this._HPTPool = 0;
  for (var i = 0; i < this.members().length; i++) {
    if (this.members()[i].isAlive()) {
      this._PTPool += this.members()[i].PT();
      this._HPTPool += this.members()[i].HPT();
    }
  }
  if (this._PTPool + this._HPTPool > YR.BattleSysPTB.capPT) {
    var difference = this._PTPool + this._HPTPool - YR.BattleSysPTB.capPT;
    if (this._HPTPool >= difference) this._HPTPool -= difference;
    else {
      difference -= this._HPTPool;
      this._HPTPool = 0;
      this._PTPool -= difference;
    }
  }
}

Game_Unit.prototype.gainHPT = function (value) {
  if (this.totalPTPool() + value > YR.BattleSysPTB.capPT) {
    var difference = this.totalPTPool() + value - YR.BattleSysPTB.capPT;
    this._HPTPool += value - difference;
  } else this._HPTPool += value;
}

Game_Unit.prototype.usePT = function (value) {
  if (this._HPTPool >= value) this._HPTPool -= value;
  else {
    var val = value;
    val -= this._HPTPool;
    this._HPTPool = 0;
    this._PTPool -= val;
    this._PTPool = Math.max(0, this._PTPool);
  }
}

Game_Unit.prototype.useLowCostPT = function () {
  if (this._HPTPool >= 1) this._HPTPool--;
  else {
    this._HPTPool++;
    this._PTPool--;
  }
}

Game_BattlerBase.prototype.PT = function() {
  return YR.BattleSysPTB.defaultPT;
}

Game_BattlerBase.prototype.HPT = function() {
  return YR.BattleSysPTB.defaultHPT;
}

Game_Battler.prototype.PT = function() {
  var value = 0;
  var length = this.states().length;
  for (var i = 0; i < length; ++i) {
    var obj = this.states()[i];
    if (obj && obj.PTPlus) value += obj.PTPlus;
  }
  return value;
};

Game_Battler.prototype.HPT = function() {
  var value = 0;
  var length = this.states().length;
  for (var i = 0; i < length; ++i) {
    var obj = this.states()[i];
    if (obj && obj.HPTPlus) value += obj.HPTPlus;
  }
  return value;
};

Game_Actor.prototype.PT = function() {
  var value = this.actor().PT;
  value += this.currentClass().PTPlus;
  var length = this.equips().length;
  for (var i = 0; i < length; ++i) {
    var obj = this.equips()[i];
    if (!obj) continue;
    if (obj.PTPlus) value += obj.PTPlus;
  }
  value += Game_Battler.prototype.PT.call(this);
  return value;
};

Game_Actor.prototype.HPT = function() {
  var value = this.actor().HPT;
  value += this.currentClass().HPTPlus;
  var length = this.equips().length;
  for (var i = 0; i < length; ++i) {
    var obj = this.equips()[i];
    if (!obj) continue;
    if (obj.HPTPlus) value += obj.HPTPlus;
  }
  value += Game_Battler.prototype.HPT.call(this);
  return value;
};

Game_Enemy.prototype.PT = function() {
  var value = this.enemy().PT;
  value += Game_Battler.prototype.PT.call(this);
  return value;
};

Game_Enemy.prototype.HPT = function() {
  var value = this.enemy().HPT;
  value += Game_Battler.prototype.HPT.call(this);
  return value;
};

Game_Battler.prototype.PTCost = function(item) {
  if (!item) return 0;
  var value = Game_BattlerBase.prototype.PTCost.call(this, item);
  value += this.extraPTCost();
  return value;
};

Game_Battler.prototype.extraPTCost = function() {
  var value = 0
  var length = this.states().length;
  for (var i = 0; i < length; ++i) {
    var obj = this.states()[i];
    if (obj && obj.extraPTCost) value += obj.extraPTCost;
  }
  return value;
};

Game_Actor.prototype.extraPTCost = function() {
  var value = this.actor().extraPTCost;
  value += this.currentClass().extraPTCost;
  var length = this.equips().length;
  for (var i = 0; i < length; ++i) {
    var obj = this.equips()[i];
    if (!obj) continue;
    if (obj.extraPTCost) value += obj.extraPTCost;
  }
  value += Game_Battler.prototype.extraPTCost.call(this);
  return value;
};

Game_Enemy.prototype.extraPTCost = function() {
  var value = this.enemy().extraPTCost;
  value += Game_Battler.prototype.extraPTCost.call(this);
  return value;
};

Game_BattlerBase.prototype.PTCost = function(item) {
  if (!item) return 0;
  var value = item.PTCost;
  var code = new Function('return ' + item.PTCostEval);
  if (code.call(this) !== undefined) {
    try {
      value = code.call(this);
    } catch (e) {
      value = item.PTCost;
      Yanfly.Util.displayError(e, code, 'PRESS TURN TURNS COST ERROR');
    }
  }
  return value;
};

Game_BattlerBase.prototype.PTLowCost = function(item) {
  if (!item) return 0;
  var condition = item.PTLowCost;
  var code = new Function('return ' + item.PTLowCostEval);
  if (code.call(this) !== undefined) {
    try {
      condition = code.call(this);
    } catch (e) {
      condition = item.PTLowCost;
      Yanfly.Util.displayError(e, code, 'PRSS TURN LOW COST EVALUATION ERROR');
    }
  }
  return condition;
};

Game_BattlerBase.prototype.PTMissable = function(item) {
  if (!item) return 0;
  var condition = item.PTMissable;
  var code = new Function('return ' + item.PTMissableEval);
  if (code.call(this) !== undefined) {
    try {
      condition = code.call(this);
    } catch (e) {
      condition = item.PTMissable;
      Yanfly.Util.displayError(e, code, 'PRSS TURN MISSABLE EVALUATION ERROR');
    }
  }
  return condition;
};

Game_BattlerBase.prototype.PTGain = function(item) {
  if (!item) return 0;
  var value = item.PTGain;
  var code = new Function('return ' + item.PTGainEval);
  if (code.call(this) !== undefined) {
    try {
      value = code.call(this);
    } catch (e) {
      value = item.PTGain;
      Yanfly.Util.displayError(e, code, 'PRESS TURN TURNS GAIN ERROR');
    }
  }
  return value;
};

YR.BattleSysPTB.Game_BattlerBase_meetsUsableItemConditions = Game_BattlerBase.prototype.meetsUsableItemConditions;
Game_BattlerBase.prototype.meetsUsableItemConditions = function(item) {
  if (BattleManager.isPTB() && item) {
    var cost = this.PTCost(item);
    if (this.friendsUnit().totalPTPool() < cost) return false;
  }
  return YR.BattleSysPTB.Game_BattlerBase_meetsUsableItemConditions.call(this, item);
};

YR.BattleSysPTB.Game_Action_initialize = Game_Action.prototype.initialize;
Game_Action.prototype.initialize = function(subject, forcing) {
  if (BattleManager.isPTB()) {
    this._absorbed = false;
    this._reflected = false;
    this._immune = false;
    this._missed = false;
    this._evaded = false;
    this._hitResistance = false;
    this._critted = false;
    this._hitWeakness = false;
  }
  YR.BattleSysPTB.Game_Action_initialize.call(this, subject, forcing);
};

YR.BattleSysPTB.Game_Action_apply = Game_Action.prototype.apply;
Game_Action.prototype.apply = function(target) {
  YR.BattleSysPTB.Game_Action_apply.call(this, target);
  if (BattleManager.isPTB()) {
    var result = target.result();
    if (result.missed) this._missed = true;
    if (result.evaded) this._evaded = true;
    if (result.critical) this._critted = true;
    if (this.calcElementRate(target) === 0) this._immune = true;
    else if (this.calcElementRate(target) < 0) this._absorbed = true;
    else if (this.calcElementRate(target) < YR.BattleSysPTB.strongPT / 100) this._hitResistance = true;
    else if (this.calcElementRate(target) > YR.BattleSysPTB.weakPT / 100) this._hitWeakness = true;
  }
};

YR.BattleSysPTB.BattleManager_invokeAction = BattleManager.invokeAction;
BattleManager.invokeAction = function(subject, target) {
  if (this.isPTB()) {
    if (!Yanfly.Param.BECOptSpeed)  this._logWindow.push('pushBaseLine');
    var normal = true;
    if (Math.random() < this._action.itemMrf(target)) {
      this.invokeMagicReflection(subject, target);
      this._action._reflected = true;
    } else if (Math.random() < this._action.itemCnt(target)) {
      this.invokeCounterAttack(subject, target);
    } else {
      this.invokeNormalAction(subject, target);
    }
    if (subject) subject.setLastTarget(target);
    if (!Yanfly.Param.BECOptSpeed) this._logWindow.push('popBaseLine');
  } else YR.BattleSysPTB.BattleManager_invokeAction.call(this, subject, target);
};

function Sprite_PT() {
  this.initialize.apply(this, arguments);
}

Sprite_PT.prototype = Object.create(Sprite.prototype);
Sprite_PT.prototype.constructor = Sprite_PT;

Sprite_PT.prototype.initialize = function() {
  Sprite.prototype.initialize.call(this);
  this.opacity = 0;
  this._half = false;
  this._dispose = true;
  this._flashOpacity = 0;
};

Sprite_PT.prototype.setBitmap = function(bitmap) {
  this.bitmap = new Bitmap(bitmap.width, bitmap.height);
  this.bitmap = bitmap;
}

Sprite_PT.prototype.update = function() {
  Sprite.prototype.update.call(this);
  if (this.opacity < 0) this.opacity = 0;
  if (this._dispose && this.opacity > 0) this.opacity -= (255 / YR.BattleSysPTB.disposeSpeedPTIcon);
  if (!this._dispose && this._half) {
    var alpha = this._flashOpacity;
    this.setBlendColor([255, 255, 255, alpha]);
  } else if (!this._dispose && !this._half) {
    this.setBlendColor([255, 255, 255, 0]);
  }
};

Scene_Battle.prototype.updatePTIcons = function() {
  if ((BattleManager.isTroopTurn() && this.unit === 'party') ||
      (!BattleManager.isTroopTurn() && this.unit === 'troop')) {
    this.setIconSprites();
  }

  if (this.unit === 'party') {
    var unit = $gameParty;
  } else {
    var unit = $gameTroop;
  }
  
  for (var i = 0; i < this.iconSprites.length; i++) {
    if (i >= unit.totalPTPool() && this.iconSprites[i].opacity > 0) {
      this.iconSprites[i]._dispose = true;
    } else if (i < unit.totalPTPool()) {
      this.iconSprites[i]._dispose = false;
      this.iconSprites[i].opacity = 255;
      if (i >= unit._PTPool) this.iconSprites[i]._half = true;
      else this.iconSprites[i]._half = false;

      this.iconSprites[i]._flashOpacity += (128 / YR.BattleSysPTB.flashSpeedPTIcon);
      if (this.iconSprites[i]._flashOpacity > 128) this.iconSprites[i]._flashOpacity = 0;
    }
  }
};

Scene_Battle.prototype.setIconSprites = function() {
  if (BattleManager.isTroopTurn()) this.unit = 'troop';
  else this.unit = 'party';

  if (this.unit === 'party') {
    var iconPT = ImageManager.loadSystem(YR.BattleSysPTB.partyPTIcon);
    var unit = $gameParty;
  } else {
    var iconPT = ImageManager.loadSystem(YR.BattleSysPTB.troopPTIcon);
    var unit = $gameTroop;
  }
  
  for (var i = 0; i < this.iconSprites.length; i++) {
    this.iconSprites[i].setBitmap(iconPT);
    this.iconSprites[i].opacity = 0;
    var width = this.iconSprites[i].width;
    var height = this.iconSprites[i].height;
    var index = i;
    try {
      this.iconSprites[i].x = YR.BattleSysPTB.xPTIcon.call(this, width, height, index);
    } catch (e) {
      this.iconSprites[i].x = 0;
      Yanfly.Util.displayError(e, YR.BattleSysPTB.xPTIcon, 'PTB ICON X ERROR');
    }
    try {
      this.iconSprites[i].y = YR.BattleSysPTB.yPTIcon.call(this, width, height, index);
    } catch (e) {
      this.iconSprites[i].y = 0;
      Yanfly.Util.displayError(e, YR.BattleSysPTB.yPTIcon, 'PTB ICON Y ERROR');
    }

    if (i >= unit.totalPTPool()) {
      this.iconSprites[i]._dispose = true;
    } else {
      this.iconSprites[i]._dispose = false;
      this.iconSprites[i].opacity = 255;
      if (i >= unit._PTPool) this.iconSprites[i]._half = true;
      else this.iconSprites[i]._half = false;

    this.iconSprites[i]._flashOpacity = 0;
    }
  }
}

YR.BattleSysPTB.Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function() {
  if (BattleManager.isPTB()) this.createPTIcons();
  YR.BattleSysPTB.Scene_Battle_createAllWindows.call(this);
};

Scene_Battle.prototype.createPTIcons = function() {
  this.flashOpacity = 0;
  this.unit = undefined;
  this.iconSprites = [];
  for (var i = 0; i < YR.BattleSysPTB.capPT; i++) {
    var iconPT = new Sprite_PT();
    this.iconSprites.push(iconPT);
    this.addChild(iconPT);
  }
  this.setIconSprites();
}

Scene_Battle.prototype.removePT = function() {
  for (var i = 0; i < this.iconSprites.length; i++) {
    this.iconSprites[i]._dispose = true;
    this.iconSprites[i].opacity = 0;
  }
}

YR.BattleSysPTB.Scene_Battle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
  if (BattleManager.isPTB()) this.updatePTIcons();
  YR.BattleSysPTB.Scene_Battle_update.call(this);
};






} // Yanfly.BEC.version
}; // YEP_BattleEngineCore