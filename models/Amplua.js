/*
 *  $Id$
 */
const keystone = require('keystone');

const Types = keystone.Field.Types;
// const ObjectId = require('mongodb').ObjectID;
const uuid = require('uuid');

const Amplua = new keystone.List('Amplua', {
	autokey: { from: 'name', path: 'slug', unique: true },
});

Amplua.add({
	uuid: {
		type: String,
		index: { unique: true },
		default: uuid.v4,
		label: 'Идентификатор',
	},
	name: { type: String, initial: true, default: '', required: true, label: 'Имя', unique: false },
	sport: { type: Types.Relationship, initial: true, ref: 'Sport', many: true },
	createdAt: { type: Types.Datetime, default: Date.now },
	updatedAt: { type: Types.Datetime, default: Date.now },
});

Amplua.defaultSort = '-createdAt';
Amplua.defaultColumns = 'name,sport';

Amplua.register();
