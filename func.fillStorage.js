var funcFillStorage = {

    /** @param {Creep} creep **/
    run: function(creep, range=1000) {
        var targets = creep.room.find(FIND_STRUCTURES, {filter: function(structure) {
        
            return (
            (
                structure.structureType == STRUCTURE_CONTAINER || 
                structure.structureType == STRUCTURE_EXTENSION || 
                structure.structureType == STRUCTURE_TOWER ||
                structure.structureType == STRUCTURE_SPAWN) 
                &&
                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
                &&
                creep.pos.getRangeTo(structure) < range);
        }});
        
        if(targets.length) {
            var target = creep.pos.findClosestByPath(targets);
            if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
            }
            return true;
        } else {
            return false;
        }
	    
	}
};

module.exports = funcFillStorage;