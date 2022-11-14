var funcFillSpawn = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var targets = creep.room.find(FIND_MY_STRUCTURES, {filter: function(structure) {
            return ((
                structure.structureType == STRUCTURE_EXTENSION ||
                structure.structureType == STRUCTURE_SPAWN) &&
                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0)
        }})
     
        
        if(targets.length) {
            var target = creep.pos.findClosestByPath(targets);
            if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
	    
	}
};

module.exports = funcFillSpawn;