//=============================================================================
/*:
 * @plugindesc Scan Data Setup
 * @author ZainWD
 */
//=============================================================================

var Game_Enemy_setup = Game_Enemy.prototype.setup;
Game_Enemy.prototype.setup = function(enemyId, x, y) {
    Game_Enemy_setup.call(this, enemyId, x, y);
    this.scan = $dataEnemies[enemyId].meta.Scan || null;
 };