var funcFetchEnergy = require('func.fetchEnergy');
const funcBuild = require('func.build');
const funcFillSpawn = require('func.fillSpawn');
const funcRepair = require('func.repair');
const funcHarvest = require('func.harvest');
const funcUpgrade = require('func.upgrade');

var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.building && creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
	        creep.memory.building = true;
	        creep.say('🚧 build');
	    }

	    if(creep.memory.building) {
			if(creep.room.memory.alert_state) {
                funcFillSpawn.run(creep);
            } else {
				if (!funcRepair.run(creep)) {
					if (!funcBuild.run(creep)) {
						funcUpgrade.run(creep);
					}
				}
			}
			
	    }
	    else {
			if(funcFetchEnergy.run(creep)){
				return true;
			} else {
				funcHarvest.run(creep);
			}
	        
	    }
	}
};

module.exports = roleBuilder;