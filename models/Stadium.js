/*
 *  $Id$
 */
const keystone = require('keystone');

const Types = keystone.Field.Types;
// const ObjectId = require('mongodb').ObjectID;

const Stadium = new keystone.List('Stadium', {
	autokey: { from: 'name', path: 'slug', unique: true },
});

Stadium.add({
	stadiumId: { type: Types.Number, noedit: true, initial: true, label: 'Идентификатор' },
	uuid: { type: String, initial: true, default: '', required: true, label: 'UUID' },
	sport: { type: Types.Relationship, ref: 'Sport', many: false, label: 'Спорт' },
	title: { type: String, initial: true, default: '', required: true, label: 'Имя' },
	description: { type: String, initial: true, default: '', required: true, label: 'Описание' },
	latitude: { type: Number, initial: true, default: '0', required: true, label: 'Координата 1' },
	longitude: { type: Number, initial: true, default: '0', required: true, label: 'Координата 2' },
	photo: { type: String, initial: true, default: '', required: true, label: 'Фото' },
	address: { type: String, initial: true, default: '', required: true, label: 'Адрес' },
	createdAt: { type: Types.Datetime, default: Date.now },
	updatedAt: { type: Types.Datetime, default: Date.now },
});

Stadium.defaultSort = '-createdAt';
Stadium.defaultColumns = 'title,sport';

Stadium.register();
