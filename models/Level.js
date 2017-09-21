/*
 *  $Id$
 */
const keystone = require('keystone');

const Types = keystone.Field.Types;
// const ObjectId = require('mongodb').ObjectID;

const Level = new keystone.List('Level', {
	autokey: { from: 'name', path: 'slug', unique: true },
});

Level.add({
	levelId: { type: Types.Number, noedit: true, initial: true, label: 'Идентификатор' },
	uuid: { type: String, initial: true, default: '', required: true, label: 'UUID' },
	title: { type: String, initial: true, default: '', required: true, label: 'Имя' },
	sport: { type: Types.Relationship, ref: 'Sport', many: false, label: 'Спорт' },
	icon: { type: String, initial: true, default: '', required: true, label: 'Иконка' },
	createdAt: { type: Types.Datetime, default: Date.now },
	updatedAt: { type: Types.Datetime, default: Date.now },
});

Level.defaultSort = '-createdAt';
Level.defaultColumns = 'title,sport';

Evant.register();
