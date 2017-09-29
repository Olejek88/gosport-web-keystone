/*
 *  $Id$
 */
const keystone = require('keystone');

const Types = keystone.Field.Types;
// const ObjectId = require('mongodb').ObjectID;
const uuid = require('uuid');

const Team = new keystone.List('Team', {
	autokey: { from: 'name', path: 'slug', unique: true },
});

var myStorage = new keystone.Storage({
    adapter: keystone.Storage.Adapters.FS,
    fs: {
      path: keystone.expandPath('public/images/upload/'),
      publicPath: '/images/'
    }
  }); 
  
Team.add({
	uuid: {
		type: String,
		index: { unique: true },
		default: uuid.v4,
		label: 'Идентификатор',
	},
	sport: { type: Types.Relationship, initial: true, ref: 'Sport', many: false, label: 'Спорт' },
	name: { type: String, initial: true, default: '', required: true, label: 'Имя' },
	description: { type: String, initial: true, default: '', required: true, label: 'Описание' },
	level: { type: Types.Relationship, initial: true, ref: 'Level', many: false, label: 'Уровень' },
	photo: { 
		type: Types.File, 
    		storage: myStorage,
		initial: true, 
		default: '', 
		required: true, 
		label: 'Фото' },
	createdAt: { type: Types.Datetime, default: Date.now },
	updatedAt: { type: Types.Datetime, default: Date.now },
});

Team.defaultSort = '-createdAt';
Team.defaultColumns = 'name,sport,level';

Team.register();
