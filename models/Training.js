/*
 *  $Id$
 */
const keystone = require('keystone');
const uuid = require('uuid');

const Types = keystone.Field.Types;
// const ObjectId = require('mongodb').ObjectID;

const Training = new keystone.List('Training', {
	autokey: { from: 'name', path: 'slug', unique: true },
});

Training.add({
	uuid: {
		type: String,
		index: { unique: true },
		default: uuid.v4,
		label: 'Идентификатор',
	},
	user: { type: Types.Relationship, ref: 'User', many: false, label: 'Игрок' },
	sport: { type: Types.Relationship, initial: true, ref: 'Sport', many: false, label: 'Спорт' },
	team: { type: Types.Relationship, initial: true, ref: 'Team', many: false, label: 'Команда' },
	name: { type: String, initial: true, default: '', required: true, label: 'Имя' },
	comment: { type: String, initial: true, default: '', required: true, label: 'Описание' },
	cost: { type: Number, initial: true, default: '0', required: true, label: 'Цена' },
	players: { type: Number, initial: true, default: '0', required: true, label: 'Игроков' },
	level: { type: Types.Relationship, initial: true, ref: 'Level', many: false, label: 'Уровень' },
	date: { type: Types.Datetime, default: Date.now, initial: true, label: 'Дата' },
	stadium: { type: Types.Relationship, ref: 'Stadium', initial: true, many: false, label: 'Стадион' },
	createdAt: { type: Types.Datetime, default: Date.now },
	updatedAt: { type: Types.Datetime, default: Date.now },
});

Training.defaultSort = '-createdAt';
Training.defaultColumns = 'name,sport,level';

Training.register();
