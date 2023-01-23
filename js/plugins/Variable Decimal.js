Game_Variables.prototype.setValue = function(variableId, value) {
    if (variableId > 0 && variableId < $dataSystem.variables.length) {
        if (typeof value === 'number') {
            value = Number(value.toFixed(6));
        }
        this._data[variableId] = value;
        this.onChange();
    }
};
