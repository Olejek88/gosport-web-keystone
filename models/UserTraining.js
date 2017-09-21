/*
 *  $Id$
 */
const keystone = require('keystone');

const Types = keystone.Field.Types;
// const ObjectId = require('mongodb').ObjectID;

const UserTraining = new keystone.List('UserTraining', {
	autokey: { from: 'name', path: 'slug', unique: true },
});

UserTraining.add({
	usId: { type: Types.Number, noedit: true, initial: true, label: 'Идентификатор' },
	uuid: { type: String, initial: true, default: '', required: true, label: 'UUID' },
	user: { type: Types.Relationship, ref: 'User', many: false, label: 'Игрок' },
	training: { type: Types.Relationship, ref: 'Training', many: false, label: 'Training' },
	createdAt: { type: Types.Datetime, default: Date.now },
	updatedAt: { type: Types.Datetime, default: Date.now },
});

UserTraining.defaultSort = '-createdAt';
UserTraining.defaultColumns = 'user,training';

UserTraining.register();
