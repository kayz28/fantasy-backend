const { v4: uuidv4 } = require('uuid');
const {Schema, Entity}= require('redis-om');

class Players extends Entity {};

const playersSchema = new Schema(Players, {
    id: {type: 'number'},
	api_squad_id: {type: 'number'},
	api_player_id: {type: 'number'},
	name: {type: 'string'},
	role: {type: 'string'},
	in_playing_11: {type: 'boolean'},
	in_dream_team: {type: 'boolean'},
	contest_points: {type: 'number'},
	match_id: {type: 'number', indexed: true},
    category: {type: 'string', indexed: true},
    player_rating_in_current_league : {type: 'number'},
    createdAt: {type: 'date'},
    updatedAt: {type: 'date'},
    is_fit: {type: 'boolean'},
    previous_player_id: {type: 'number'},
    api_series_id: {type: 'number'},
}, {
    dataStructure: 'JSON'
});

module.exports = playersSchema;
