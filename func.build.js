var funcBuild = {

    /** @param {Creep} creep **/
    run: function(creep, structuretype=null, range=1000) {
        var targets = creep.room.find(FIND_CONSTRUCTION_SITES, {filter: function(site) {
            if(!structuretype) {
                return creep.pos.getRangeTo(site) < range;
            }
            return (site.structureType == structuretype &&
                creep.pos.getRangeTo(site) < range);
        }})
			
        if(targets.length) {
            var target = creep.pos.findClosestByRange(targets);
            if(creep.build(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
            }
            return true
        } else {
            return false
        }
	    
	}
};

module.exports = funcBuild;