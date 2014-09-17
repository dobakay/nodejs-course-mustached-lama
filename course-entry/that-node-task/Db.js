'use strict';
var fs = require('fs');
var uuid = require('node-uuid');
var Db = function(key) {
    this.filename = __dirname + '/data/' + key;
}

Db.prototype.initialize = function(done){
    var self = this;
    fs.exists(this.filename, function(exists){
        if(exists){
            done();
        } else {
            fs.writeFile(self.filename, JSON.stringify({
                data: []
            }), done);
        }
    })
};

Db.prototype.addItem = function(item, done){
    var self = this;

    if(typeof item !== 'object') {
        return done('Invalid item');
    }
    if(typeof done !== 'function') {
        return done('Callback not supplied');
    }
    /*
        Get the data, push the new item and writeItems it back.
     */
    this.readItems(function(err, data) {
        if(err){
            return done(err);
        }
        item.id = item.id || uuid.v1(); //use the id supplied by the user or generate a new one.
        if(findById(item.id, data)) {
            return done('Invalid item id. If you supply an id for the item it must be unique.');
        }
        data.push(item);
        self.writeItems(data, function(err) {
            if(err){
                return done(err);
            }
            done(null, item);
        })
    });
};

/**
 * Gets all items in the database. Callbacks with the items.
 * @param done
 */
Db.prototype.getAll = function(done){
    this.readItems(function(err, items){
        done(err, items);
    })
};

/**
 * Gets an item by id. Callbacks with the item or an error if the item wasn't found.
 * @param id
 * @param done
 */
Db.prototype.getById = function(id, done) {
    this.readItems(function(err, data) {
        if(err){
            return done(err);
        }
        var item = findById(id, data);
        if(!item) {
            done('Item not found');
        }
        done(null, item);
    });
};

/**
 * Updates an item by id. Callbacks with the new state of the item or an error if the item wasn't found.
 * @param id
 * @param item - item that will update the existing item. Id is preserved.
 * @param done
 */
Db.prototype.updateById = function(id, item, done){
    //See Db.prototype.getById
    var self = this;
    this.readItems(function(err, data) {
        if(err){
            return done(err);
        }
        if(!item.id || item.id !== id) {
            item.id = id;
        }

        var updatedItemIndex = updateById(id, item, data);

        if(updatedItemIndex === -1) {
            done('Item not found');
        } else {
            self.writeItems(data, function (err) {
                if(err) {
                    return done(err);
                }
                done(null, item);
            });
        }
    });
};

/**
 * Deletes an item by id. Callbacks with the item that was deleted or an error if it wasn't found.
 * @param id
 * @param done
 */
Db.prototype.deleteById = function(id, done){
    var self = this;
    this.readItems(function (err, data) {
        if(err) {
            return done(err);
        }
        var deletedItem = removeItem(id, data);
        if(deletedItem === null) {
            done('Item not found');
        } else {
            self.writeItems(data, function (err) {
                if(err) {
                    return done(err);
                }
                done(null, deletedItem);
            });
        }
    });
};

/**
 * Deletes all items in the database. Callbacks with the count of the items that were deleted.
 * @param done - done(err, count)
 */
Db.prototype.deleteAll = function(done){
    var self = this;
    this.readItems(function (err, data) {
        if(err) {
            return done(err);
        }
        var itemsCount = data.length;
        self.clear();
        return done(null, itemsCount);
    });
};

/**
 * Writes the items array to the database.
 * @param items
 * @param done
 */
Db.prototype.writeItems = function(items, done) {
    fs.writeFile(this.filename, JSON.stringify({
        data: items
    }), {
        flag: 'w+'
    }, done);
}

/**
 * Reads the data array from the database.
 * @param done
 */
Db.prototype.readItems = function(done) {
    var self = this;
    var options = {
        encoding: 'utf-8'
    };
    fs.readFile(this.filename, options, function(err, data){
        if(err){
            return done(err);
        }
        try {
            var json = JSON.parse(data);
        } catch(e) {
            return done('Invalid json data in file '+ self.filename + '. Error:' + e);
        }

        done(null, json.data);
    });
}

Db.prototype.clear = function(done){
    fs.writeFile(this.filename, JSON.stringify({
        data: []
    }), {
        flag: 'w+'
    }, done);
}

/**
 * Returns the item from the data array (if found) that has the specified id. Returns null if the item is not found.
 * @param id - id of the item to find
 * @param data - array that contains items with ids to go through.
 * @returns {*}
 */
var findById = function(id, data) {
    for(var i = 0;i < data.length;i++){
        if(data[i].id === id){
            return data[i];
        }
    }
    return null;
};

/**
 * Updates an item with id in the Data Array.
 * Returns the index of the updatedItem in the array, or -1
 * (if no item was updated).
 * @param  id
 * @param  item
 * @param  data
 * @return
 */
var updateById = function(id, item, data) {
    for (var i = 0; i < data.length; i++) {
        if(data[i].id === id) {
            data[i] = item;
            return i;
        }
    };

    return -1;
}

/**
 * Removes item by given id from data Array
 * and returns the item
 * @param  {[type]} id   [description]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
var removeItem = function (id, data) {
    var index = -1,
        itemToDelete = null;
    for (var i = 0; i < data.length; i++) {
        if(data[i].id === id) {
            index = i;
            break;
        }
    };

    if(index !== -1) {
        itemToDelete = data.splice(index, 1)[0];
    }

    return itemToDelete;
}

module.exports = Db;
