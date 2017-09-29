/*
 *  $Id$
 */
const keystone = require('keystone');
const uuid = require('uuid');

const Types = keystone.Field.Types;
// const ObjectId = require('mongodb').ObjectID;

const UserSport = new keystone.List('UserSport', {
	autokey: { from: 'uuid', path: 'slug', unique: true },
});

UserSport.add({
	uuid: {
		type: String,
		index: { unique: true },
		default: uuid.v4,
		label: 'Идентификатор',
	},
	user: { type: Types.Relationship, ref: 'User', many: false, label: 'Игрок' },
	sport: { type: Types.Relationship, ref: 'Sport', many: false, label: 'Спорт' },
	amplua: { type: Types.Relationship, ref: 'Amplua', many: false, label: 'Amplua' },
	team: { type: Types.Relationship, ref: 'Team', many: false, label: 'Team' },
	level: { type: Types.Relationship, ref: 'Level', many: false, label: 'Level' },
	createdAt: { type: Types.Datetime, default: Date.now },
	updatedAt: { type: Types.Datetime, default: Date.now },
});

UserSport.defaultSort = '-createdAt';
UserSport.defaultColumns = 'title,sport,level';

UserSport.register();
