/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../../typings/client-reference.ts" />

var modules = ['myApp.controllers', 'myApp.services'];
modules.forEach((m) => {
    angular.module(m, []);
});

var thirdPartyModules = [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ui.router',
    'ui.bootstrap'
];
angular.module('myApp', modules.concat(thirdPartyModules))
    .config(($stateProvider:ng.ui.IStateProvider, $urlRouterProvider, $locationProvider)=> {
        $urlRouterProvider
            .otherwise('/');

        $locationProvider.html5Mode(true);
    });

module myApp {
    declare var controllers;

    export function registerController(className:string, dependencies:Array<string> = []) {
        var controllerName = 'myApp.controllers.' + className;
        var controller = myApp.controllers[className];
        controller.$inject = dependencies;
        angular.module('myApp.controllers').controller(controllerName, controller);
    }

    export function registerState(name:string, config:any){
        angular.module('myApp').config(($stateProvider: ng.ui.IStateProvider)=>{
            $stateProvider.state(name, config);
        })
    }
}
