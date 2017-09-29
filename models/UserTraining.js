/*
 *  $Id$
 */
const keystone = require('keystone');
const uuid = require('uuid');

const Types = keystone.Field.Types;
// const ObjectId = require('mongodb').ObjectID;

const UserTraining = new keystone.List('UserTraining', {
	autokey: { from: 'uuid', path: 'slug', unique: true },
});

UserTraining.add({
	uuid: {
		type: String,
		index: { unique: true },
		default: uuid.v4,
		label: 'Идентификатор',
	},
	user: { type: Types.Relationship, ref: 'User', many: false, label: 'Игрок' },
	training: { type: Types.Relationship, ref: 'Training', many: false, label: 'Training' },
	createdAt: { type: Types.Datetime, default: Date.now },
	updatedAt: { type: Types.Datetime, default: Date.now },
});

UserTraining.defaultSort = '-createdAt';
UserTraining.defaultColumns = 'user,training';

UserTraining.register();
