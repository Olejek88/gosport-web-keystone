/*
 *  $Id$
 */
const keystone = require('keystone');

const Types = keystone.Field.Types;
// const ObjectId = require('mongodb').ObjectID;

const Training = new keystone.List('Training', {
	autokey: { from: 'name', path: 'slug', unique: true },
});

Training.add({
	stadiumId: { type: Types.Number, noedit: true, initial: true, label: 'Идентификатор' },
	uuid: { type: String, initial: true, default: '', required: true, label: 'UUID' },
	user: { type: Types.Relationship, ref: 'User', many: false, label: 'Игрок' },
	sport: { type: Types.Relationship, ref: 'Sport', many: false, label: 'Спорт' },
	team: { type: Types.Relationship, ref: 'Team', many: false, label: 'Команда' },
	title: { type: String, initial: true, default: '', required: true, label: 'Имя' },
	comment: { type: String, initial: true, default: '', required: true, label: 'Описание' },
	cost: { type: Number, initial: true, default: '0', required: true, label: 'Цена' },
	players: { type: Number, initial: true, default: '0', required: true, label: 'Игроков' },
	level: { type: Types.Relationship, ref: 'Level', many: false, label: 'Уровень' },
	date: { type: Types.Datetime, default: Date.now, label: 'Дата' },
	stadium: { type: Types.Relationship, ref: 'Stadiom', many: false, label: 'Стадион' },
	createdAt: { type: Types.Datetime, default: Date.now },
	updatedAt: { type: Types.Datetime, default: Date.now },
});

Training.defaultSort = '-createdAt';
Training.defaultColumns = 'title,sport,level';

Training.register();
