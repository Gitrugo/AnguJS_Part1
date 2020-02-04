angular.module('myFormApp', ['dx']).
controller('CustomerController', function ($scope, $http, $location, $window) {
    $scope.cust = {};
    $scope.message = '';
    $scope.result = "color-default";
    $scope.isViewLoading = false;
    $scope.UjRogzVisible = false;
    $scope.Fontos = true;
    $scope.cMegj = "Ha már homár";
    $scope.checkBox = {
        chkFontos: {
            bindingOptions: {
                value: "Fontos"
            },
            disabled: false,
            activeStateEnabled: true
}
    };
    $scope.textBox = {
        simple: {
            bindingOptions: {
                value: "cMegj"
            },
            width: 300,
            showClearButton: true
        }
    };

    var tbSzemSzin = ["Nincs","Kék", "Zöld", "Szürke", "Barna", "Egyéb"];

    //get called when user submits the form
    $scope.submitForm = function () {
        $scope.isViewLoading = true;
        console.log('Form elküldve ezzel:', $scope.cust);  
        console.log('checkBox.chkFontos:', $scope.Fontos); 
        console.log('Textbox.simple:', $scope.cMegj);

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

    $(function () {
        $("#formContainer").dxForm({
            formData: {
                cNev: "",
                dSzulDatum: new Date(0,0,1),    // 1900.01.01
                nEletkor: 0,
                bTanulo: false,
                nSzemSzin: "",
                nIskVegz: "",     
                cMegjegyz: ""
            },
            items: [{
                dataField: "cNev",
                label: { text: "Név" },            
                validationRules: [{
                    type: "required",
                    message: "Név megadása kötelező."
                }, {
                    type: "pattern",
                    pattern: "^[a-zA-Z -]+$",
                    message: "A név csak betűket tartalmazhat."
                }]
            }, {
                dataField: "dSzulDatum",
                label: { text: "Születési dátum" },
                editorType: "dxDateBox"
            }, {
                dataField: "nEletkor",
                label: { text: "Életkor (év)" },
                editorType: "dxNumberBox",
                editorOptions: { value: 0 }
            }, {
                dataField: "bTanulo",
                label: { text: "Tanuló" },
                editorType: "dxCheckBox",
                editorOptions: { value: false }
            }, {
                dataField: "nSzemSzin",
                label: { text: "Szeme színe" },
                editorType: "dxRadioGroup",
                editorOptions: {
                    items: tbSzemSzin,
                    value: tbSzemSzin[0],
                    layout: "horizontal"
                }
            }, {
                dataField: "nIskVegz",
                label: { text: "Iskolai végzettség" },
                editorType: "dxSelectBox",
                editorOptions: { dataSource: [
                    "8 általános",
                    "Érettségi",
                    "Főiskola",
                    "Egyetem"
                ],
                placeholder: "Válaszd ki a megfelelő elemet..." }
            }, {
                dataField: "cMegjegyz",
                label: { text: "Megjegyzés" },
                editorType: "dxTextArea",
                //helpText: "Egyéb rögzítendő információk.",
                editorOptions: { placeholder: "Egyéb rögzítendő információk..." }
            }, ],
            validationGroup: "ValUjVevo"
        });
    });

    $("#validateSubmitButton").dxButton({
        // ...
        text: "Adatok rögzítése",
        type: "default",
        stylingMode: "contained",
        width: 180,
        validationGroup: "ValUjVevo",
        useSubmitBehavior: true
    });
    //{
    //    itemType: "button",
    //    buttonOptions: {
    //        useSubmitBehavior: true
    //    },
        //onClick: function () {
        //    DevExpress.ui.notify("Adatküldés folyamatban...");
                
        
    $scope.submitDxForm = function () {
        $scope.isViewLoading = true;
        console.log('DxForm elküldve ezzel:', $scope.dxForm.formData);
        $scope.isViewLoading = false;
    }

})
.config(function ($locationProvider) {

    //default = 'false'
    $locationProvider.html5Mode(true);
});
