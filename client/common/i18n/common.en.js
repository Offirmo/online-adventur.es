// common strings in given language

if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(function(require) {
	'use strict';

	var _ = require('lodash');

	var parent_messages = require('./common');

	var messages = {
		title: 'A web app',
		description: 'A web app in development',
		keywords: '',

		warning_nojs: 'Your browser either does not support JavaScript, or has it turned off. Either way, this website can’t work...',
		warning_lowie: 'You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.',

		coming_soon: 'coming soon',
	};

	return _.defaults(messages, parent_messages);
});