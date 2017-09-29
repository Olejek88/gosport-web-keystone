/*
 *  $Id$
 */
const keystone = require('keystone');

const Types = keystone.Field.Types;
// const ObjectId = require('mongodb').ObjectID;
const uuid = require('uuid');

const Level = new keystone.List('Level', {
	autokey: { from: 'name', path: 'slug', unique: true },
});

Level.add({
	uuid: {
		type: String,
		index: { unique: true },
		default: uuid.v4,
		label: 'Идентификатор',
	},
	name: { type: String, initial: true, default: '', required: true, label: 'Имя', unique: false },
	sport: { type: Types.Relationship, initial: true, ref: 'Sport', many: true, label: 'Спорт' },
	icon: { type: String, default: '', required: false, label: 'Иконка' },
	createdAt: { type: Types.Datetime, default: Date.now },
	updatedAt: { type: Types.Datetime, default: Date.now },
});

Level.defaultSort = '-createdAt';
Level.defaultColumns = 'name,sport';

Level.register();
