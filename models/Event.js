/*
 *  $Id$
 */
const keystone = require('keystone');

const Types = keystone.Field.Types;
// const ObjectId = require('mongodb').ObjectID;

const Event = new keystone.List('Event', {
	autokey: { from: 'name', path: 'slug', unique: true },
});

Event.add({
	eventId: { type: Types.Number, noedit: true, initial: true, label: 'Идентификатор' },
	uuid: { type: String, initial: true, default: '', required: true, label: 'UUID' },
	title: { type: String, initial: true, default: '', required: true, label: 'Имя' },
	description: { type: String, initial: true, default: '', required: true, label: 'Описание' },
	sport: { type: Types.Relationship, ref: 'Sport', many: false, label: 'Спорт' },
	date: { type: Types.Datetime, default: Date.now, label: 'Дата' },
	createdAt: { type: Types.Datetime, default: Date.now },
	updatedAt: { type: Types.Datetime, default: Date.now },
});

Event.defaultSort = '-createdAt';
Event.defaultColumns = 'title,sport';

Evant.register();
