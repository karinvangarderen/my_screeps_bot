var funcRepair = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var targets = creep.room.find(FIND_STRUCTURES, {filter: function(structure){
            (structure.hitsMax - structure.hits) / structure.hitsMax > 0.5
        }});
			
        if(targets.length) {
            var target = creep.pos.findClosestByRange(targets);
            if(creep.repair(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
            }
            return true
        } else {
            return false
        }
	    
	}
};

module.exports = funcRepair;