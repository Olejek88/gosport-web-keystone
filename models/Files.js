var keystone = require('keystone');
var Types = keystone.Field.Types;

var File = new keystone.List('File');

File.add({
	levelId: { type: Types.Number, noedit: true, initial: true, label: 'Идентификатор' },
	uuid: { type: String, initial: true, default: '', required: true, label: 'UUID' },
	filename: { type: Types.Name, required: true, index: true },
	user: { type: Types.Relationship, ref: 'User', many: false, label: 'Игрок' },
	object: { type: String, initial: true, default: '', required: true, label: 'Объект' },
	createdAt: { type: Types.Datetime, default: Date.now },
	updatedAt: { type: Types.Datetime, default: Date.now },

});

File.defaultColumns = 'name, email, isAdmin';
File.register();
