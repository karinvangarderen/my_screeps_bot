
var funcFillSpawn = require('func.fillSpawn');
var funcFetchEnergy = require('func.fetchEnergy');

var roleRunner = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.memory.energizing && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.energizing = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.energizing && creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
	        creep.memory.energizing = true;
	        creep.say('⚡ energize');
	    }


	    if(!creep.memory.energizing) {
            funcFetchEnergy.run(creep, closest=false);
        }
        else {
            if(!funcFillSpawn.run(creep)){
                
            }
        }
	}
};

module.exports = roleRunner;