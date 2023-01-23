//=============================================================================
// Extension for Yanfly Engine Plugins
// Equip Core, Status Menu Core, In Battle Status - Parameter Control
// ALOE_X_YEP_Equip_StatusMenu_InBattleStatus.js
//=============================================================================

var Imported = Imported || {};
Imported.ALOE_X_YEP_Equip_StatusMenu_InBattleStatus = true;

//=============================================================================
 /*:
 * @plugindesc v1.01 Extension to YEP EquipCore, StatusMenuCore, InBattleStatus to allow
 * the developer to choose which actor parameters are shown in these menus.
 * @author Aloe Guvner
 * 
 * @param MenuEquipScreen
 * @desc Menu Equip Screen
 * 
 * @param ChangeMenuEquip
 * @text Change Menu Equip Window?
 * @type boolean
 * @default true
 * @desc Indicator whether this plugin affects the Menu Equip window or not.
 * Set false to keep the default YEP_EquipCore.js functionality.
 * @parent MenuEquipScreen
 * 
 * @param EquipParameters
 * @text Equip Screen Comparison Parameters
 * @type number[]
 * @default ["0","1","2","3","4","5","6","7"]
 * @desc The parameters to show in the equip screen comparison window.
 * See the help section for the number codes to use.
 * @parent MenuEquipScreen
 * 
 * @param MenuStatusScreen
 * @desc Menu Status Screen
 * 
 * @param ChangeMenuStatus
 * @text Change Menu Status Window?
 * @type boolean
 * @default true
 * @desc Indicator whether this plugin affects the Menu Status window or not.
 * Set false to keep the default YEP_StatusMenuCore.js functionality.
 * @parent MenuStatusScreen
 * 
 * @param StatusGeneralParameters
 * @text Status Screen (General) Parameters
 * @type number[]
 * @default ["0","1","2","3","4","5","6","7"]
 * @desc The parameters to show in the status screen general section.
 * See the help section for the number codes to use.
 * @parent MenuStatusScreen
 * 
 * @param StatusParametersParameters
 * @text Status Screen (Parameters) Parameters
 * @type number[]
 * @default ["2","3","4","5","6","7"]
 * @desc The parameters (gauges) to show in the status screen parameters section.
 * See the help section for the number codes to use.
 * @parent MenuStatusScreen
 * 
 * @param InBattleStatus
 * @desc In Battle Status Window
 * 
 * @param ChangeInBattleStatus
 * @text Change In Battle Status Window?
 * @type boolean
 * @default true
 * @desc Indicator whether this plugin affects the In Battle Status window or not.
 * Set false to keep the default YEP_X_InBattleStatus.js functionality.
 * @parent InBattleStatus
 * 
 * @param InBattleStatusParameters
 * @text In Battle Status Parameters
 * @type number[]
 * @default ["2","3","4","5","6","7"]
 * @desc The parameters to show in the status screen within the battle.
 * See the help section for the number codes to use.
 * @parent InBattleStatus
 * 
 * 
 * @help
 * 
 * Installation: Install below the YEP Status Menu Core plugin.
 * The following values can be used for the Equip, Status(General) and
 * Status(Parameters) screens.
 * 
 * 0 --> Max HP (MHP)
 * 1 --> Max MP (MMP)
 * 2 --> Attack (ATK)
 * 3 --> Defense (DEF)
 * 4 --> Magic Attack Power (MAT)
 * 5 --> Magic Defense Power (MDF)
 * 6 --> Agility (AGI)
 * 7 --> Luck (LUK)
 * 
 * The order of these is taken into account, allowing the developer to 
 * change the order in which these are displayed.
 * The screens will automatically resize to the appropriate size based
 * on the parameters that are chosen by the developer.
 * 
 * Terms of Use:
 * Free to use in Commercial or Non-Commercial projects, with credit.
 * 
 * Credit: Aloe Guvner
 * **Credits must be still given to Yanfly Engine Plugins as dictated by YEP.
 * **Credit for this plugin must be given in the context that this plugin
 * **is an extension of the Yanfly plugins.
 * **Yanfly created the original content of these menus.
 * **This plugin merely reformats the menus to allow a customizable amount
 * **of parameters.
 *
 * ============================================================================
 * Change Log
 * ============================================================================
 *
 * Version 1.01:
 * - Added additional parameters to further control what this plugin affects.
 * - Added functionality for YEP_X_InBattleStatus.js
 * - Improved readability and organization.
 * - Added compatibility checks.
 * - Changed plugin name to ALOE_X_YEP_Equip_StatusMenu_InBattleStatus
 *
 * Version 1.00:
 * - Separated edits into an extension plugin to the YEP plugins
 * - Added parameters for configurability
 * - Functionality for YEP_Equip_Core.js
 * - Functionality for YEP_StatusMenu_Core.js
 * 
 * Version 0.99:
 * - Initial version began as direct edits to the YEP plugins.
 */
//=============================================================================

(function() {

//=============================================================================
// Parameter Variables
//=============================================================================

var params = PluginManager.parameters('ALOE_X_YEP_Equip_StatusMenu_InBattleStatus');

var changeEquip = params["ChangeMenuEquip"] === "true";
var equipParams = JSON.parse(params["EquipParameters"]).map(Number);

var changeMenuStatus = params["ChangeMenuStatus"] === "true";
var statusGeneralParams = JSON.parse(params["StatusGeneralParameters"]).map(Number);
var statusParamsParams = JSON.parse(params["StatusParametersParameters"]).map(Number);

var changeInBattleStatus = params["ChangeInBattleStatus"] === "true";
var inBattleStatusParams = JSON.parse(params["InBattleStatusParameters"]).map(Number);

//=============================================================================
// Equip Menu Changes
//=============================================================================

if (Imported.YEP_EquipCore) {
if (changeEquip) {

//=============================================================================
// Window_StatCompare
//=============================================================================

Window_StatCompare.prototype.createWidths = function() {
    this._paramNameWidth = 0;
    this._paramValueWidth = 0;
    this._arrowWidth = this.textWidth('\u2192' + ' ');
    var buffer = this.textWidth(' ');
    for (var i = 0; i < equipParams.length; i++) {
      var value1 = this.textWidth(TextManager.param(equipParams[i]));
      var value2 = this.textWidth(Yanfly.Util.toGroup(this._actor.paramMax(equipParams[i])));
      this._paramNameWidth = Math.max(value1, this._paramNameWidth);
      this._paramValueWidth = Math.max(value2, this._paramValueWidth);
    }
    this._bonusValueWidth = this._paramValueWidth;
    this._bonusValueWidth += this.textWidth('(+)') + buffer;
    this._paramNameWidth += buffer;
    this._paramValueWidth;
    if (this._paramNameWidth + this._paramValueWidth * 2 + this._arrowWidth +
      this._bonusValueWidth > this.contents.width) this._bonusValueWidth = 0;
};

Window_StatCompare.prototype.refresh = function() {
    this.contents.clear();
    if (!this._actor) return;
    for (var i = 0; i < equipParams.length; i++) {
        this.drawItem(0, (this.lineHeight() * i) + (24 * i), equipParams[i]);
    }
};

//=============================================================================
// End of Equip Menu Changes
//=============================================================================

}
}

//=============================================================================
// Status Menu Changes
//=============================================================================

if (Imported.YEP_StatusMenuCore) {
if (changeMenuStatus) {

//=============================================================================
// Window_StatusInfo
//=============================================================================

Window_StatusInfo.prototype.drawGeneralParam = function() {
    var rect = new Rectangle();
    rect.width = (this.contents.width - this.standardPadding()) / 2;
    rect.y = this.lineHeight() * 2;
    rect.height = this.lineHeight();
    var dx = rect.x + this.textPadding();
    var dw = rect.width - this.textPadding() * 2;
    this.drawDarkRect(rect.x, rect.y, rect.width, rect.height);
    this.changeTextColor(this.systemColor());
	this.drawText(TextManager.level, dx, rect.y, dw, 'left');
	this.changeTextColor(this.normalColor());
	text = Yanfly.Util.toGroup(this._actor.level);
    this.drawText(text, dx, rect.y, dw, 'right');
    var count = statusGeneralParams.length + 1;
    for (var i = 0; i < statusGeneralParams.length; ++i) {
      if (count < 7) {
          rect.y += this.lineHeight();
      } 
      else if (count === 7) {
        if (i < 4) {
          rect.y += this.lineHeight();
        } else if (i === 4) {
          rect.y += this.lineHeight();
          rect.width /= 2;
          dw = rect.width - this.textPadding() * 2;
        } else if (i === 5) {
          rect.x += rect.width;
          dx += rect.width;
        }
      } 
      else if (count === 8) {
        if (i < 3) {
          rect.y += this.lineHeight();
        } else if (i === 3) {
          rect.y += this.lineHeight();
          rect.width /= 2;
          dw = rect.width - this.textPadding() * 2;
        } else if (i % 2 === 1) {
          rect.x = 0;
          dx = rect.x + this.textPadding();
          rect.y += this.lineHeight();
        } else {
          rect.x += rect.width;
          dx += rect.width;
        }
      }
      else if (count === 9) {
        if (i < 2) {
          rect.y += this.lineHeight();
        } else if (i === 2) {
          rect.y += this.lineHeight();
          rect.width /= 2;
          dw = rect.width - this.textPadding() * 2;
        } else if (i % 2 === 0) {
          rect.x = 0;
          dx = rect.x + this.textPadding();
          rect.y += this.lineHeight();
        } else {
          rect.x += rect.width;
          dx += rect.width;
        }
      }
      this.drawDarkRect(rect.x, rect.y, rect.width, rect.height);
      this.changeTextColor(this.systemColor());
      this.drawText(TextManager.param(statusGeneralParams[i]), dx, rect.y, dw, 'left');
  	  this.changeTextColor(this.normalColor());
      text = Yanfly.Util.toGroup(this._actor.param(statusGeneralParams[i]));
      this.drawText(text, dx, rect.y, dw, 'right');
    }
};

Window_StatusInfo.prototype.drawParameters = function() {
    var dx = 0;
    var dy = this.lineHeight() / 2;
    var dw = this.contents.width;
    var dh = this.lineHeight();
    var dw2;
    var text;
    this.changeTextColor(this.systemColor());
    this.drawText(Yanfly.Param.StatusGraphText, dx, dy, dw, 'center');
    dy = this.lineHeight();
    dx = this.standardPadding();
    dw -= this.standardPadding() * 2;
    for (var i = 0; i < statusParamsParams.length; i++) {
        dy += Math.floor(6 * this.lineHeight() / statusParamsParams.length);
        var rate = this.drawParamGauge(dx, dy, dw, statusParamsParams[i]);
        this.changeTextColor(this.systemColor());
        this.drawText(TextManager.param(statusParamsParams[i]), dx + 4, dy, dw - 4);
        text = Yanfly.Util.toGroup(this._actor.param(statusParamsParams[i]));
        this.changeTextColor(this.normalColor());
        dw2 = dw * rate;
        this.drawText(text, dx, dy, dw2 - 4, 'right');
    }
};

//=============================================================================
// End of Status Menu Changes
//=============================================================================

}
}

//=============================================================================
// In Battle Status Changes
//=============================================================================

if (Imported.YEP_X_InBattleStatus) {
if (changeInBattleStatus) {

//=============================================================================
// Window_InBattleStatus
//=============================================================================

Window_InBattleStatus.prototype.refresh = function() {
  this.contents.clear();
  if (!this._battler) return;
  var x = this.standardPadding() + eval(Yanfly.Param.IBSStatusListWidth);
  this.drawActorFace(this._battler, x, 0, Window_Base._faceWidth);
  var x2 = x + Window_Base._faceWidth + this.standardPadding();
  var w = this.contents.width - x2;
  this.drawActorSimpleStatus(this._battler, x2, 0, w);
  w = this.contents.width - x;
  var y = Math.ceil(this.lineHeight() * 4.5);
  var h = this.contents.height - y;
  var count = inBattleStatusParams.length;
  var w2 = Math.floor(w / 2);
  x2 = x + w2;
  for (var i = 0; i < count; i++) {
    if (count < 4) {
      this.drawParam(inBattleStatusParams[i], x, y, w, this.lineHeight());
      y += this.lineHeight();
    } else if (count === 4) {
      if (i < 2) {
        this.drawParam(inBattleStatusParams[i], x, y, w, this.lineHeight());
        y += this.lineHeight();
      } else if (i === 2) {
        this.drawParam(inBattleStatusParams[i], x, y, w2, this.lineHeight());
      } else {
        this.drawParam(inBattleStatusParams[i], x2, y, w2, this.lineHeight());
      }
    } else if (count === 5) {
      if (i < 1) {
        this.drawParam(inBattleStatusParams[i], x, y, w, this.lineHeight());
        y += this.lineHeight();
      } else if (i % 2 === 1) {
        this.drawParam(inBattleStatusParams[i], x, y, w2, this.lineHeight());
      } else {
        this.drawParam(inBattleStatusParams[i], x2, y, w2, this.lineHeight());
        y += this.lineHeight();
      }
    } else if (count > 5) {
      if (i % 2 === 0) {
        this.drawParam(inBattleStatusParams[i], x, y, w2, this.lineHeight());
      } else {
        this.drawParam(inBattleStatusParams[i], x2, y, w2, this.lineHeight());
        y += this.lineHeight();
      }
    }
  }
}

//=============================================================================
// End of In Battle Status Changes
//=============================================================================

}
}

//=============================================================================
// End of Plugin
//=============================================================================

})();