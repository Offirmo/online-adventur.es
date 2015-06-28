// if node.js : use amdefine (add it with npm)
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(function(require) {
	'use strict';

	var _ = require('lodash');

	var parent_messages = require('../../../i18n/common.fr');

	var messages = {
		hello_world: 'Bonjour, monde !',
		title: 'Une web app bonjour monde'
	};

	return _.defaults(messages, parent_messages);
});