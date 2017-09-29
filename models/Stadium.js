/*
 *  $Id$
 */
const keystone = require('keystone');

const Types = keystone.Field.Types;
// const ObjectId = require('mongodb').ObjectID;
const uuid = require('uuid');

const Stadium = new keystone.List('Stadium', {
	autokey: { from: 'name', path: 'slug', unique: true },
});

var myStorage = new keystone.Storage({
    adapter: keystone.Storage.Adapters.FS,
    fs: {
      path: keystone.expandPath('public/images/upload/'),
      publicPath: '/images/'
    }
  }); 

Stadium.add({
	uuid: {
		type: String,
		index: { unique: true },
		default: uuid.v4,
		label: 'Идентификатор',
	},
	sport: { type: Types.Relationship, ref: 'Sport', many: false, label: 'Спорт' },
	name: { type: String, initial: true, default: '', required: true, label: 'Имя' },
	description: { type: String, initial: true, default: '', required: true, label: 'Описание' },
	latitude: { type: Number, initial: true, default: '0', required: true, label: 'Координата 1' },
	longitude: { type: Number, initial: true, default: '0', required: true, label: 'Координата 2' },
	photo: { 
		type: Types.File, 
    		storage: myStorage,
		initial: true, 
		default: '',
		required: true, 
		label: 'Фото' },
	address: { type: Types.Location, initial: true, required: true, label: 'Адрес' },
	createdAt: { type: Types.Datetime, default: Date.now },
	updatedAt: { type: Types.Datetime, default: Date.now },
});

Stadium.defaultSort = '-createdAt';
Stadium.defaultColumns = 'name,sport,address';

Stadium.register();
