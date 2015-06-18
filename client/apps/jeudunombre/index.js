window.main = function() {
	'use strict';

	console.log('\n\nLe jeu du nombre\n\n ');

	requirejs([
		'lodash',
		'carnet',
		'angular-ui-router',
		'angular-strap',
		'css!app/jeudunombre/index.css',
	],
	function(_, Carnet) {
		console.log('main require done.');

		// build this app logger
		var logger = Carnet.make_new({enhanced: true});
		logger.info('App is bootstrapping…');

		// ui
		global_ng_module.controller('LandingCtrl', function($scope, $document) {
			logger.info('LandingCtrl…');
			$scope.title = 'Le jeu du nombre';
			$scope.scoped_angular = angular;

			// TOREVIEW
			$scope.lang = $document[0].documentElement.lang;
			logger.info('detected lang :', $document[0].documentElement.lang);
			$scope.pready = true;
		});

		// http://angular-ui.github.io/bootstrap/#/alert
		global_ng_module.controller('AlertCtrl', ['$scope', '$document', function($scope, $document) {
			$scope.alerts = [
				{ type: 'success', msg: 'Well done! You successfully read this important alert message.' }
			];

			$scope.add_alert = function(msg) {
				$scope.alerts.push({'msg': msg});
			};

			$scope.close_alert = function(index) {
				$scope.alerts.splice(index, 1);
			};
		}]);

		// angular manual initialisation since we use a script loader
		// cf. http://docs.angularjs.org/guide/bootstrap
		console.log('Bootstrapping angular...');
		// we must bind on document to encompass page title
		angular.element(document).ready(function() {
			angular.bootstrap(document, ['global_ng_module']);
		});
	});
};
