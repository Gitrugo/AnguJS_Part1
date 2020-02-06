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

    var tbSzemSzin = [{ szov: "Nincs", kulcs: 0 }, { szov: "Kék", kulcs: 1 }, { szov: "Zöld", kulcs: 2 }, { szov: "Szürke", kulcs: 3 }, { szov: "Barna", kulcs: 4 }, { szov: "Egyéb", kulcs: 5 }];

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
   $scope.showChkUzenet = function (ert) {
       window.alert("Checkbox: " + ert);
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

    var frfr = $(function () {
        $("#formContainer").dxForm({
            formData: {
                cNev: "",
                dSzulDatum: new Date(0,0,1),    // 1900.01.01
                nEletkor: 0,
                bTanulo: false,
                nSzemSzin: 0,
                cSzemSzinKod: "",
                nIskVegz: 0,     
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
                    pattern: "^[a-zA-Z -éáűőúöüóíÉÁŰŐÚÖÜÓÍ]+$",
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
                editorOptions: { value: false,
                    onValueChanged: function (e) {
                        var previousValue = e.previousValue;
                        var newValue = e.value;
                        // Event handling commands go here
                        $scope.showChkUzenet(newValue)
                        //console.log('Checkbox:', newValue);
                    }
                }

            }, {
                dataField: "nSzemSzin",
                label: { text: "Szeme színe" },
                editorType: "dxRadioGroup",
                editorOptions: {
                    items: tbSzemSzin,
                    displayExpr: "szov",
                    valueExpr: "kulcs",
                    value: 0,     // nincs
                    layout: "horizontal",
                    onValueChanged: function (e) {
                        var previousValue = e.previousValue;
                        var newValue = e.value;
                        // Event handling commands go here
                        console.log('dxRadioGroup:', newValue);
                        $('#formContainer').dxForm('instance').updateData('cSzemSzinKod', newValue);
                        //$('#formContainer').dxForm('instance').getEditor('cSzemSzinKod').option('value', newValue);
                     }
                }
            }, {
                dataField: "cSzemSzinKod",
                label: { text: "Szem szín kód" },
                editorType: "dxTextBox",
                editorOptions: {
                    value: "- nincs kiválasztva -",
                    readOnly: true
                }

            }, {
                dataField: "nIskVegz",
                label: { text: "Iskolai végzettség" },
                editorType: "dxSelectBox",
                editorOptions: { dataSource: [
                    { szov: "8 általános", kulcs: 0 },
                    { szov: "Érettségi", kulcs: 1 },
                    { szov: "Főiskola", kulcs: 2 },
                    { szov: "Egyetem", kulcs: 3 }
                    ],
                    displayExpr: "szov",
                    valueExpr: "kulcs",
                    value: 0,     // ÁLT isk
                    placeholder: "Válaszd ki a megfelelő elemet..."
                }
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

    //$("#checkBoxContainer").dxCheckBox({
    //    onValueChanged: function (e) {
    //        var previousValue = e.previousValue;
    //        var newValue = e.value;
    //        // Event handling commands go here
    //    }
    //});

    $("#validateSubmitButton").dxButton({
        // ...
        text: "Adatok rögzítése",
        type: "default",
        stylingMode: "contained",
        width: 180,
        validationGroup: "ValUjVevo",
        useSubmitBehavior: true
    });

                 
    //$scope.submitDxForm = function () {
    //    $scope.isViewLoading = true;
    //    console.log('DxForm elküldve ezzel:', $scope.dxForm.formData);  // nem működik

    //    //$http service that send or receive data from the remote server
    //    $http({
    //        method: 'POST',
    //        url: '/Home/UjVevo',
    //        data: $scope.dxForm.formData
    //    }).success(function (data, status, headers, config) {
    //        $scope.errors = [];
    //        if (data.success === true) {
    //            $scope.UjRogzVisible = true;
    //            //$scope.cust = {};
    //            $scope.message = 'Ügyfél rögzítve!  ---> Id: ' + data.nid;
    //            $scope.result = "color-green";
    //            //$location.path(data.redirectUrl);
    //            //$scope.showPopup(data.nid)
    //            //$window.location.reload();
    //        }
    //        else {
    //            $scope.errors = data.errors;
    //        }
    //    }).error(function (data, status, headers, config) {
    //        $scope.errors = [];
    //        $scope.message = 'Hiba történt az adat mentése közben!!';
    //    });
    //    $scope.isViewLoading = false;
    //}


})

.config(function ($locationProvider) {

    //default = 'false'
    $locationProvider.html5Mode(true);
});
