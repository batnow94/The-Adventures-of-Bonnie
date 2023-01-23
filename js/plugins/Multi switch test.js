if ($gameSwitches.value(287) == true) {
    var switchCheck = XUtil.resolve(1-5,8,9);
}

XUtil.resolve = function(regex) {
    var allsemiexp = regex.split(',');
    var semiexp = null;
    var semisemiexp = null;
    var indexes = new Array();
    var curentindex = 0;
    for(semiexp of allsemiexp){
    semisemiexp = semiexp.split('-');
    if(semisemiexp.length > 1){
    y = Number(semisemiexp[1]);
    for(var x = Number(semisemiexp[0]); x <= y; x++){
    indexes[curentindex] = x;
    curentindex++;
    }
    }else{
    indexes[curentindex] = Number(semisemiexp[0]);
    curentindex++;
    }
    }
    return indexes;
    }