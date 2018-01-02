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
                    updata: "",
                    groupname: "",
                    amount : 0,
                    userId: -1,
                    generate: function(){
                        var url = "/api/admin/gen/";
                        $.ajax({
                            beforeSend: csrfTokenHeader,
                            url: url,
                            dataType: "json",
                            method: "post",
                            data: {"prefixname": vm.prefix, "amount": vm.amount, "groupname": vm.groupname},
                            success: function(data)
                            {
                                if (data.code){
                                    bsAlert(data.data);
                                }
                                else{
                                    var outtable = document.getElementsByName("outtable")[0];
                                    outtable.innerHTML += data.data.content;
                                }
                            }
                        })
                    },
                    upload: function(){
                        var url = "/api/admin/upd/";
                        $.ajax({
                            beforeSend: csrfTokenHeader,
                            url: url,
                            dataType: "json",
                            method: "post",
                            data: {"updata": vm.updata },
                            success: function(data)
                            {
                                if (data.code){
                                    bsAlert(data.data);
                                }
                                else{
                                    var outtable = document.getElementsByName("outtable")[0];
                                    outtable.innerHTML += data.data.content;
                                }
                            }
                        })
                    }
                });
            }
        });
        avalon.scan();
    });
