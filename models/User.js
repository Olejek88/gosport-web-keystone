var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */
var User = new keystone.List('User');
const uuid = require('uuid');

var myStorage = new keystone.Storage({
    adapter: keystone.Storage.Adapters.FS,
    fs: {
      path: keystone.expandPath('public/images/upload/'),
      publicPath: '/images/'
    }
  }); 

User.add({
//	userId: { type: Types.Number, noedit: true, initial: true, label: 'Идентификатор' },
	uuid: {
		type: String,
		index: { unique: true },
		default: uuid.v4,
		label: 'Идентификатор',
	},
	//name: { type: Types.Name, index: true },
	email: { type: Types.Email, initial: true, required: true, unique: true, index: true },
	name: { type: String, initial: true, required: true, index: true },
	password: { type: Types.Password, initial: true, required: true },
	type: { type: Number, default: 1, label: 'Type' },
	birthDate: { type: Types.Date },	
	age: { type: Number, default: 10, label: 'Age' },	
	image: { 
		type: Types.File, 
    		storage: myStorage,
		initial: true, 
		default: '', 
		required: true, 
		label: 'Фото',
		},
	phone: { type: String, default: '', label: 'Phone' },
	vk: { type: String, default: '', label: 'Описание' },
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
