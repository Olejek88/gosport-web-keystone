/*
 *  $Id$
 */
const keystone = require('keystone');

const Types = keystone.Field.Types;
// const ObjectId = require('mongodb').ObjectID;

const Amplua = new keystone.List('Amplua', {
	autokey: { from: 'name', path: 'slug', unique: true },
});

Amplua.add({
	ampluaId: { type: Types.Number, noedit: true, initial: true, label: 'Идентификатор' },
	uuid: { type: String, initial: true, default: '', required: true, label: 'UUID' },
	title: { type: String, initial: true, default: '', required: true, label: 'Имя' },
	sport: { type: Types.Relationship, ref: 'Sport', many: false },
	createdAt: { type: Types.Datetime, default: Date.now },
	updatedAt: { type: Types.Datetime, default: Date.now },
});

Amplua.defaultSort = '-createdAt';
Amplua.defaultColumns = 'title,sport';

Amplua.register();
