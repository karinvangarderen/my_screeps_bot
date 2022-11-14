



var runSpawning = {

    getCreepDict: function(sources_list) {
        return {
            'stage1': {
                'creeps_required':[
                    {
                        body: [WORK, CARRY, MOVE, CARRY],
                        name: 'Harvester1',
                        memory: {role: 'harvester'}
                    },
                    {
                        body: [WORK, CARRY, MOVE, CARRY],
                        name: 'Harvester2',
                        memory: {role: 'harvester'},
                    },
                    {
                        body: [WORK, CARRY, MOVE, CARRY],
                        name: 'Builder1',
                        memory: {role: 'builder'}
                    },
                    {
                        body: [WORK, CARRY, MOVE, CARRY],
                        name: 'Upgrader1',
                        memory: {role: 'upgrader'}
                    },
                ],
                'creeps_extra':[]
            },
            'stage2': {
                'creeps_required':[
                    {
                        body: [CARRY, MOVE, CARRY, MOVE, CARRY, CARRY],
                        name: 'Runner1',
                        memory: {role: 'runner'}
                    },
                    {
                        body: [CARRY, MOVE, WORK, WORK, WORK, WORK],
                        name: 'Harvester1',
                        memory: {role: 'harvester',
                                source: sources_list[0].id}
                    },
                    {
                        body: [CARRY, MOVE, WORK, WORK, WORK, WORK],
                        name: 'Harvester2',
                        memory: {role: 'harvester',
                                source: sources_list[1].id},
                    },
                ],
                'creeps_extra':[
                    {
                        body: [WORK, CARRY, MOVE, WORK, CARRY, MOVE],
                        name: 'Builder1',
                        memory: {role: 'builder'}
                    },
                    {
                        body: [WORK, CARRY, MOVE, WORK, CARRY, MOVE],
                        name: 'Builder2',
                        memory: {role: 'builder'}
                    },
                    {
                        body: [WORK, CARRY, MOVE, WORK, CARRY, MOVE],
                        name: 'Upgrader1',
                        memory: {role: 'upgrader'}
                    }
                    ]
            }
        }
    },

    getUnits: function(room, spawn) {

        if (!room.memory.stage) {
            room.memory.stage = 'stage1'
        }
        var storages_in_room = room.find(FIND_STRUCTURES, {filter: function(structure){
            return structure.structureType == STRUCTURE_CONTAINER;
        }});
        if (room.controller.level > 1 && storages_in_room.length > 1) {
            room.memory.stage = 'stage2'
        }

        var sources = room.find(FIND_SOURCES);
        var sortedSources = _.sortBy(sources, s => spawn.pos.getRangeTo(s))
        var spare_work = Math.floor((room.energyCapacityAvailable - 300) / 100)

        var harvester_body = [WORK, WORK, CARRY, MOVE];
        harvester_body = harvester_body.concat(Array(spare_work).fill(WORK));

        
        var stored_energy = 0;
        for (const [i, structure] of Object.entries(storages_in_room)) {
            stored_energy += structure.store[RESOURCE_ENERGY];
        }
        var creepDict = this.getCreepDict(sortedSources)[room.memory.stage]
        var requiredUnits = creepDict.creeps_required
        if (stored_energy > 1000) {
            requiredUnits = requiredUnits.concat(creepDict.creeps_extra)
        }
        return requiredUnits
    },

    /** @param {StructureSpawn} spawn **/
    run: function(sp) {

        var requiredUnits = this.getUnits(sp.room, sp)

        if(!Game.creeps[requiredUnits[0].name] && !sp.spawning){
            sp.room.memory.alert_state = true
        } else {
            sp.room.memory.alert_state = false
        }
        for(const i in requiredUnits) {
            var cr = requiredUnits[i]
            if(!(Game.creeps[cr.name])) {
                console.log("Trying to spawn " + cr.name)
                cr.memory['room'] = sp.room.name;
                sp.spawnCreep(cr.body, cr.name, {
                    memory: cr.memory
                })
                break;
            }
        }
	}
};

module.exports = runSpawning;