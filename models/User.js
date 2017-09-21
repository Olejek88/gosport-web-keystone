var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */
var User = new keystone.List('User');

User.add({
	userId: { type: Types.Number, noedit: true, initial: true, label: 'Идентификатор' },
	uuid: { type: String, initial: true, default: '', required: true, label: 'UUID' },
	name: { type: Types.Name, required: true, index: true },
	email: { type: Types.Email, initial: true, required: true, unique: true, index: true },
	pass: { type: Types.Password, initial: true, required: true },
	type: { type: Number, initial: true, default: '0', required: true, label: 'Type' },
	age: { type: Number, initial: true, default: '0', required: true, label: 'Age' },	
	image: { type: String, initial: true, default: '', required: true, label: 'Image' },
	phone: { type: String, initial: true, default: '', required: true, label: 'Phone' },
	vk: { type: String, initial: true, default: '', required: true, label: 'Описание' },
	createdAt: { type: Types.Datetime, default: Date.now },
	updatedAt: { type: Types.Datetime, default: Date.now },
}, 'Permissions', {
	isAdmin: { type: Boolean, label: 'Can access Keystone', index: true },
});

// Provide access to Keystone
User.schema.virtual('canAccessKeystone').get(function () {
	return this.isAdmin;
});


/**
 * Registration
 */
User.defaultColumns = 'name, email, isAdmin';
User.register();
