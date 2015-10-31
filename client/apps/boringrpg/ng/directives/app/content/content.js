define([
	'offirmo-app-bootstrap',
	'lodash',
	'boringrpg/lib/static-data/view/view',
	'boringrpg/lib/state-tree',
	'text!client/apps/boringrpg/ng/directives/app/content/content.html',
	'css!client/apps/boringrpg/ng/directives/app/content/content.css',
	'boringrpg/ng/directives/app/content/panels/adventure/adventure',
	'boringrpg/ng/directives/app/content/panels/inventory/inventory',
	'boringrpg/ng/directives/app/content/panels/knowledge/knowledge',
	'boringrpg/ng/directives/app/content/panels/social/social',
	'boringrpg/ng/directives/app/content/panels/achievements/achievements',
	'boringrpg/ng/directives/app/content/panels/chat/chat',
],
function(offirmo_app, _, view_static_data, state_tree, tpl) {
	'use strict';

	offirmo_app.global_ng_module.directive('appContent', ['$q', '$famous', function ($q, $famous) {
		return {
			scope: {},
			template: tpl,
			controller: ['$scope', function($scope) {
				var Transitionable = $famous['famous/transitions/Transitionable'];

				var SLIDE_DURATION_MS = 500;

				var panels = view_static_data.panels;
				var selected_panel_cursor = state_tree.select('view', 'layout', 'app', 'selected_panel');
				var screen_size_cursor = state_tree.select('view', 'screen', 'size');
				var screen_width = null;

				$scope.is_ui_stable = !false;
				$scope.global_translation_able = new Transitionable([0, 0, 0]);
				$scope.translations = {};
				$scope.opacities = {};
				$scope.screen_width = screen_width;

				function on_screen_size_update() {
					$scope.$evalAsync(function () {
						$scope.screen_width = screen_width = screen_size_cursor.get()[0];

						_.forEach(panels, function (panel, index) {
							$scope.translations[panel.id] = [ screen_width * index, 0];
						});

						console.log('on_screen_size_update', $scope.translations);
					});
				}
				function on_selected_panel_update() {
					$scope.$evalAsync(function () {
						var active_panel = selected_panel_cursor.get();
						var active_panel_index = _.findIndex(panels, {id: active_panel});

						// make all panels visible
						_.forEach(panels, function (panel, index) {
							$scope.opacities[panel.id] = 0.999999;
						});

						// scroll
						$scope.global_translation_able.set([-1 * screen_width * active_panel_index, 0, 0], {
							duration: SLIDE_DURATION_MS,
							curve: 'easeOut'
						}, function on_animation_finished() {
							// hide all panels except the active one
							// reason : they could be seen when flipping app <-> meta
							_.forEach(panels, function (panel, index) {
								$scope.opacities[panel.id] = (panel.id === active_panel) ? 0.999999 : 0;
							});
						});




						console.log('on_selected_panel_update', active_panel, $scope.translations);
					});
				}

				screen_size_cursor.on('update', on_screen_size_update);
				on_screen_size_update();
				selected_panel_cursor.on('update', on_selected_panel_update);
				on_selected_panel_update();
			}],
			link: function postLink($scope) {

				// signal the loader to hide
				/*if (window.offirmo_loader.stage < 2) {
					window.offirmo_loader.change_stage(2);
					window.onerror = window.offirmo_loader.display_unhandled_error; // reinstall
				}*/

				/*var selected_panel_cursor = state_tree.select('view', 'layout', 'app', 'selected_panel');
				function go_to_required_panel() {
					var target_panel_id = selected_panel_cursor.get();

					console.log('1 - trying to activate panel ', target_panel_id);
					$scope.$evalAsync(function () {
						console.log('2 - trying to activate panel ', target_panel_id);
						$scope.panel_id = target_panel_id;
						//$scope.$broadcast('panel_switch', target_panel_id);
					});
				}
				go_to_required_panel();
				selected_panel_cursor.on('update', go_to_required_panel);*/
			}
		};
	}]);
});
