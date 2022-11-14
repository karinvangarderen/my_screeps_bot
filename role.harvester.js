
var funcFillStorage = require('func.fillStorage');
const funcFillSpawn = require('./func.fillSpawn');
const funcHarvest = require('func.harvest')
const funcBuild = require('func.build')

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.store[RESOURCE_ENERGY] < creep.store.getCapacity()) {
            funcHarvest.run(creep);
        }
        else {
            if(creep.room.memory.alert_state) {
                funcFillSpawn.run(creep);
            } else {
                if (!funcFillStorage.run(creep, range=3)) {
                    if (!funcBuild.run(creep, structuretype=STRUCTURE_CONTAINER, range=3)) {
                        funcFillSpawn.run(creep);
                    }
                }
                ;
            }
            
        }
	}
};

module.exports = roleHarvester;