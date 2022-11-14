var funcFetchEnergy = {

    /** @param {Creep} creep **/
    run: function(creep, closest=true) {

        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: function(structure) {
                return (
                    (structure.structureType == STRUCTURE_CONTAINER) &&
                    structure.store[RESOURCE_ENERGY] > 0)
            }});
        
        if(targets.length) {
            if (closest) {
                var target = creep.pos.findClosestByPath(targets);
            } else{
                targets.sort(function(a,b) {
                    if (a.store.getFreeCapacity(RESOURCE_ENERGY) == b.store.getFreeCapacity(RESOURCE_ENERGY)) {
                        return a.pos.getRangeTo(creep.pos) > b.pos.getRangeTo(creep.pos);
                    }
                    return a.store.getFreeCapacity(RESOURCE_ENERGY) > b.store.getFreeCapacity(RESOURCE_ENERGY); });
                var target = targets[0]
            }
            
            if(creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
            }
            return true;
        }
        return false;
	    
	}
};

module.exports = funcFetchEnergy;