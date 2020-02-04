angular.module('myFormApp', ['dx']).
controller('CustomerController', function ($scope, $http, $location, $window) {
    $scope.cust = {};
    $scope.message = '';
    $scope.result = "color-default";
    $scope.isViewLoading = false;
    $scope.UjRogzVisible = false;
    $scope.Fontos = true;
    $scope.cNev = "Kacsa Kázmér";
    $scope.checkBox = {
        chkFontos: {
            bindingOptions: {
                value: "Fontos"
            },
        }
    };
    $scope.textBox = {
        simple: {
            bindingOptions: {
                value: "cNev"
            },
            showClearButton: true,
            stylingMode: 'filled'
        }
    };


    //get called when user submits the form
    $scope.submitForm = function () {
        $scope.isViewLoading = true;
        console.log('Form elküldve ezzel:', $scope.cust);  
        console.log('checkBox.chkFontos:', $scope.Fontos); 
        console.log('Textbox.simple:', $scope.cNev);  

        //$http service that send or receive data from the remote server
        $http({
            method: 'POST',
            url: '/Home/CreateCustomer',
            data: $scope.cust
        }).success(function (data, status, headers, config) {
            $scope.errors = [];
            if (data.success === true) {
                $scope.UjRogzVisible = true;
                //$scope.cust = {};
                $scope.message = 'Ügyfél rögzítve!  ---> Id: ' + data.nid;
                $scope.result = "color-green";
                //$location.path(data.redirectUrl);
                //$scope.showPopup(data.nid)
                //$window.location.reload();
           }
            else {
                $scope.errors = data.errors;
            }
        }).error(function (data, status, headers, config) {
            $scope.errors = [];
            $scope.message = 'Hiba történt az adat mentése közben!!';
        });
        $scope.isViewLoading = false;
    }

   $scope.showPopup = function (id) {
            window.alert("Ügyfél rögzítve! ---> Id: " + id);
        }

   $scope.Nevjegy = function () {
        $scope.isViewLoading = true;
        $scope.message = '';
        $window.location.href = '/Home/About';
        $scope.isViewLoading = false;
    }
    //$scope.UjRogzit = function () {
    //    $scope.isViewLoading = true;
    //    $scope.message = '';
    //    $scope.UjRogzVisible = false;
    //    //$location.path('/Home/Index');
    //    $window.location.reload();
    //    $scope.isViewLoading = false;
    //}
    $scope.UjRogzit = function () {
        $scope.message = '';
        $scope.UjRogzVisible = false;
        $scope.cust = {};
        $scope.frmCustomer.$setPristine();   //  alapállapot
    }

    $scope.showMessage = function (e) {
        //var mode = e.component.option("stylingMode");
        DevExpress.ui.notify("Üzenet jött a liftből.");
    }

    //$scope.Bezar = function () {
    //    $scope.message = '';
    //    $window.close();
    //}
})
.config(function ($locationProvider) {

    //default = 'false'
    $locationProvider.html5Mode(true);
});
