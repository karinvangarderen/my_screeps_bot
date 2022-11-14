var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRunner = require('role.runner');
var funcSpawn = require('func.spawn');

module.exports.loop = function () {
    
    for(const i in Game.spawns) {
        
        funcSpawn.run(Game.spawns[i])

    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (!creep.memory.room) {
            creep.memory['room'] = creep.room.name;
        }
        
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'runner') {
            roleRunner.run(creep);
        }

        if (creep.room.name != creep.memory['room']){
            creep.moveTo(Game.rooms[creep.memory.room].controller.pos);
        }
    }
}