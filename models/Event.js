/*
 *  $Id$
 */
const keystone = require('keystone');

const Types = keystone.Field.Types;
// const ObjectId = require('mongodb').ObjectID;
const uuid = require('uuid');

const Event = new keystone.List('Event', {
	autokey: { from: 'name', path: 'slug', unique: true },
});

Event.add({
	eventId: { type: Types.Number, noedit: true, label: 'Идентификатор' },
	uuid: {
		type: String,
		index: { unique: true },
		default: uuid.v4,
		label: 'Идентификатор',
	},
	name: { type: String, initial: true, default: '', required: true, label: 'Имя' },
	description: { type: String, initial: true, default: '', required: true, label: 'Описание' },
	sport: { type: Types.Relationship, initial: true, ref: 'Sport', many: false, label: 'Спорт' },
	date: { type: Types.Datetime, initial: true, default: Date.now, label: 'Дата' },
	createdAt: { type: Types.Datetime, default: Date.now },
	updatedAt: { type: Types.Datetime, default: Date.now },
});

Event.defaultSort = '-createdAt';
Event.defaultColumns = 'name,sport';

Event.register();
