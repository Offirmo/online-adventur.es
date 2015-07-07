// if node.js : use amdefine (add it with npm)
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(function(require) {
	'use strict';

	var _ = require('lodash');

	var parent_messages = require('../../../common/i18n/common.en');

	var messages = {
		title: 'An offline-enabled web app'
	};

	return _.defaults(messages, parent_messages);
});
