require(["jquery", "avalon", "csrfToken", "bsAlert", "pager", "validator"],
    function ($, avalon, csrfTokenHeader, bsAlert) {
        avalon.ready(function () {
            if (avalon.vmodels.userAdd) {
                var vm = avalon.vmodels.userAdd;
            }
            else {
                var vm = avalon.define({
                    $id: "userAdd",
                    userList : [],
                    prefix : "",
                    password : "",
                    username : "",
                    amount : 0,
                    userId: -1,
                    generate: function(){
                        var url = "/api/admin/gen/";
                        $.ajax({
                            beforeSend: csrfTokenHeader,
                            url: url,
                            dataType: "json",
                            method: "post",
                            data: {"prefixname": vm.prefix, "amount": vm.amount},
                            success: function(data)
                            {
                                if (!data.code){
                                    vm.userList = data.data.results;
                                }
                                else{
                                    bsAlert(data.data)
                                }
                            }
                        })
                    }
                });
            }
        });
        avalon.scan();
    });
