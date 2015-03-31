(function () {
    'use strict';

    angular
        .module('app.account')
        .controller('AccountController', AccountController);

    /* @ngInject */
    function AccountController ($ionicHistory, $ionicPopup, $localStorage, $state, api, data, logger) {
        /* jshint validthis:true */
        var vm = this;
        vm.login = {};
        vm.logout = logout;
        vm.register = {};
        vm.submitLogin = submitLogin;
        vm.submitRegister = submitRegister;

        activate();

        ///////////
        function activate () {
            var promises = [];
            return api.ready(promises).then(function (){
                logger.info('Activated Products View');
            });
        }
        
        function logout () {
            $localStorage.$reset();
            $ionicHistory.nextViewOptions({
              disableBack: true,
              historyRoot: true
            });
            $state.go('app.account.login');
        }

        function submitForgot () {
            // body...
        }
        
        function submitLogin () {
            console.info(vm.login);
            data.post('login', vm.login)
                .then(function (response) {
                    $ionicHistory.clearHistory();
                    logger.info(response.message);
                    $localStorage.token     = response.data.token;
                    $localStorage.account   = response.data.account;
                    
                    $ionicHistory.nextViewOptions({
                      disableBack: true,
                      historyRoot: true
                    });
                    $state.go('app.account.menu');
                })
                .catch(function (e) {
                    vm.errors = e.data.message;
                    logger.error(e.data.message);
                });
        }

        function submitRegister () {
            data.post('register', vm.register)
                .then(function (response) {
                    logger.info(response.message);
                    $ionicPopup.alert({
                        title: 'Berhasil mendaftar',
                        template: 'Tunggu hingga administrator mengaktifkan akun anda'
                    })
                        .then(function (res) {
                            $state.go('app.account.login');
                        })
                })
                .catch(function (e) {
                    vm.errors = e.data.message;
                    logger.error(e.data.message);
                });
        }
    }
})();