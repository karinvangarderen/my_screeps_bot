var funcHarvest = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.memory.source){
            var source = Game.getObjectById(creep.memory.source)
        } else{
            var sources = creep.room.find(FIND_SOURCES);
            var source = creep.pos.findClosestByPath(sources);
        }
        if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
        }
	}
};

module.exports = funcHarvest;