require(["jquery", "avalon", "csrfToken", "bsAlert", "pager", "validator"],
    function ($, avalon, csrfTokenHeader, bsAlert) {
        avalon.ready(function () {
            if (avalon.vmodels.userPswReset) {
                var vm = avalon.vmodels.userPswReset;
            }
            else {
                var vm = avalon.define({
                    $id: "userPswReset",
                    userList : [],
                    prefix : "",
                    password : "",
                    username : "",
                    updata: "",
                    groupname: "",
                    amount : 0,
                    userId: -1,
                    generate: function(){
                        var url = "/api/admin/pswreset/";
                        $.ajax({
                            beforeSend: csrfTokenHeader,
                            url: url,
                            dataType: "json",
                            method: "post",
                            data: {"updata": vm.updata},
                            success: function(data)
                            {
                                if (data.code){
                                    bsAlert(data.data);
                                }
                                else{
                                    var checktable = document.getElementsByName("checktable")[0];
                                    checktable.innerHTML += data.data.content;
                                }
                            }
                        })
                    },
                });
            }
        });
        avalon.scan();
    });
