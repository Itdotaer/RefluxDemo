var common = {
    findItemById: findItemById
};

function findItemById(items, id){
    var idx = -1;
    items.forEach(function(item, index){
        if(id == item.id){
            idx = index;
        }
    });

    return idx;
}

module.exports = common;
