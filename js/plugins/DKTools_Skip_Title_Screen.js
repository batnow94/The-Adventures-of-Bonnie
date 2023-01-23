/*
Title: Skip Title Screen
Author: DK (Denis Kuznetsov)
Site: https://dk-plugins.ru
E-mail: kuznetsovdenis96@gmail.com
Version: 1.3
Release: 21.10.2017
First release: 23.11.2015
Supported languages: Russian, English
*/

/*ru
Название: Пропуск Титульного Экрана
Автор: DK (Денис Кузнецов)
Сайт: https://dk-plugins.ru
E-mail: kuznetsovdenis96@gmail.com
Версия: 1.3
Релиз: 21.10.2017
Первый релиз: 23.11.2015
Поддерживаемые языки: Русский, Английский
*/

/*:
* @plugindesc v.1.3 Skip the title screen
* @author DK (Denis Kuznetsov)
* @help

 ### Info about plugin ###
 Title: DKTools_Skip_Title_Screen
 Author: DK (Denis Kuznetsov)
 Site: https://dk-plugins.ru
 Version: 1.3
 Release: 21.10.2017
 First release: 23.11.2015
 Supported languages: Russian, English

 ### Requirements and dependencies ###
 The presence of lodash.js in the js/libs/
 Version of RPG Maker 1.5+

 ### License and terms of use ###

 Recent information about the terms of use: https://dk-plugins.ru/terms-of-use

 You can:
 -Free use the plugin for your commercial and non commercial projects.
 -Translate the plugin to other languages (please, inform, if you do this)

 You can't:
 -Delete or change any information about plugin (Title, authorship, contact information, version and release)
 -Change code of plugin out of border "Plugin settings" and "End of plugin settings" (if you found a bug contact me)

 * @param Scene Name
 * @desc Name of scene which will be launched instead the title screen. Standard: Scene_Map
 * @default Scene_Map

 * @param Skip Saves
 * @desc Does it need skip the title screen if save files has exist?
 * @type boolean
 * @default false

*/

/*:ru
* @plugindesc v.1.3 Пропуск титульного экрана
* @author DK (Денис Кузнецов)
* @help

 ### Информация о плагине ###
 Название: DKTools_Skip_Title_Screen
 Автор: DK (Денис Кузнецов)
 Сайт: https://dk-plugins.ru
 Версия: 1.3
 Релиз: 21.10.2017
 Первый релиз: 23.11.2015
 Поддерживаемые языки: Русский, Английский

 ### Требования и зависимости ###
 Наличие включенного плагина DKTools версии 0.99 или выше
 Версия мейкера 1.5+

 ### Лицензия и правила использования плагина ###

 Актуальная информация о правилах использования: https://dk-plugins.ru/terms-of-use

 Вы можете:
 -Бесплатно использовать данный плагин в некоммерческих и коммерческих проектах
 -Переводить плагин на другие языки (пожалуйста, сообщите, если Вы перевели плагин на другой язык)

 Вы не можете:
 -Убирать или изменять любую информацию о плагине (Название, авторство, контактная информация, версия и дата релиза)
 -Изменять код плагина вне поля "Настройки плагина" и "Конец настройки плагина" (если нашли ошибку, напишите мне о ней)

 * @param Scene Name
 * @text Название сцены
 * @desc Название сцены, которая запускается вместо титульного экрана. Стандартно: Scene_Map
 * @default Scene_Map

 * @param Skip Saves
 * @text Пропуск сохранений
 * @desc Пропускать титульный экран, если есть сохранения ?
 * @type boolean
 * @default false

*/

'use strict';

var Imported = Imported || {};
Imported.DKTools_Skip_Title_Screen = 1.3;

if (Imported.DKTools) {
    DKTools.PluginManager.requirePlugin('DKTools', 0.99);
} else {
    throw new Error('No plugin "DKTools"! Plugin "DKTools_Skip_Title_Screen" will not work!');
}

var SkipTitleScreenParam = new DKTools.ParameterManager('DKTools_Skip_Title_Screen');

const Skip_Scene_Title_Scene_Boot_start = Scene_Boot.prototype.start;
Scene_Boot.prototype.start = function() {
	Skip_Scene_Title_Scene_Boot_start.call(this);
    const saveExists = DataManager.isAnySavefileExists();
	if (!DataManager.isBattleTest() && !DataManager.isEventTest() && ((saveExists && SkipTitleScreenParam.get('Skip Saves')) || !saveExists)) {
        this.checkPlayerLocation();
        DataManager.setupNewGame();
        this.updateDocumentTitle();
        SceneManager.goto(window[SkipTitleScreenParam.get('Scene Name')]);
	}
};