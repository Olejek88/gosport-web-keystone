/*
 *  $Id$
 */
const keystone = require('keystone');

const Types = keystone.Field.Types;
// const ObjectId = require('mongodb').ObjectID;

const Team = new keystone.List('Team', {
	autokey: { from: 'name', path: 'slug', unique: true },
});

Team.add({
	stadiumId: { type: Types.Number, noedit: true, initial: true, label: 'Идентификатор' },
	uuid: { type: String, initial: true, default: '', required: true, label: 'UUID' },
	sport: { type: Types.Relationship, ref: 'Sport', many: false, label: 'Спорт' },
	title: { type: String, initial: true, default: '', required: true, label: 'Имя' },
	description: { type: String, initial: true, default: '', required: true, label: 'Описание' },
	level: { type: Types.Relationship, ref: 'Level', many: false, label: 'Уровень' },
	photo: { type: String, initial: true, default: '', required: true, label: 'Фото' },
	createdAt: { type: Types.Datetime, default: Date.now },
	updatedAt: { type: Types.Datetime, default: Date.now },
});

Team.defaultSort = '-createdAt';
Team.defaultColumns = 'title,sport,level';

Team.register();
