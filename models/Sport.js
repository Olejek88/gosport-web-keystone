/*
 *  $Id$
 */
const keystone = require('keystone');

const Types= keystone.Field.Types;
// const ObjectId = require('mongodb').ObjectID;

const Sport = new keystone.List('Sport', {
	autokey: { from: 'name', path: 'slug', unique: true },
});

Sport.add({
	sportId: { type: Types.Number, noedit: true, initial: true, label: 'Идентификатор' },
	uuid: { type: String, initial: true, default: '', required: true, label: 'UUID' },
	title: { type: String, initial: true, default: '', required: true, label: 'Имя' },
	createdAt: { type: Types.Datetime, default: Date.now },
	updatedAt: { type: Types.Datetime, default: Date.now },
});

Sport.defaultSort = '-createdAt';
Sport.defaultColumns = 'uuid, title';

Sport.register();
