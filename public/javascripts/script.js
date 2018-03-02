var currentUserName,
    currentUserAssig;

// Logic when the site is first opened
$(document).ready(function() {
    $("#logoutBtn").hide(250);
    $("#catalogPage").hide(250);
    $("#userManagementPage").hide(250);
    $("#branchManagementPage").hide(250);
});
/*
// Attaches a submit handler to the login form
$(document).ready(function() {
    $("#loginForm").submit(function(event) {
        // Stops form from submitting normally
        event.preventDefault();

        // Gets some values from elements on the page
        var $form = $(this),
            userName = $form.find("#userName").val(),
            password = $form.find("#password").val(),

            dataString = { userName: userName, password: password };

        currentUserName = userName;
        // Loads data from a server using an AJAX HTTP POST request
        $.post("/login", dataString, function(data, status) {
            var tempData = data;
            alert(data); // show response from the server

            if (data == "Logged in as manager")
                currentUserAssig = "Manager";
            else if (data == "Logged in as employee")
                currentUserAssig = "Employee";
            else if (data == "Logged in as client")
                currentUserAssig = "Client";
            else
                currentUserAssig = "Supplier";

            if (data != "Wrong Username / Password.\nPlease try again.") {
                $.get("/about", { userName: currentUserName }, function(data, status) {
                    if (status == "success") {
                        $("#main").fadeOut(250, function() {
                            $(this).html(data).fadeIn(500);
                        });

                        $("#loginModal").modal("toggle");

                        $("#loginBtn").hide(250);
                        $("#logoutBtn").show(250);

                        $("#catalogPage").show(250);

                        if (currentUserAssig == "Employee")
                            $("#userManagementPage").show(250);
                        else if (currentUserAssig == "Manager") {
                            $("#branchManagementPage").show(250);
                            $("#userManagementPage").show(250);
                        }
                    }
                });
            }
        });
    });
});
*/
/*
// Gets user management page data
$(document).ready(function() {
    $("#userManagementPage").click(function() {
        $.get("/userManagement", { userName: currentUserName }, function(data, status) {
            if (status == "success") {

                $("#mainIndex").fadeOut(250, function() {
                    $(this).html(data).fadeIn(500);
                });

                $("html, body").animate({
                    scrollTop: $(".container-fluid").offset().top
                }, 1500);
            }
        });
    });
});
*/
/*
// Gets branch management page data
$(document).ready(function() {
    $("#branchManagementPage").click(function() {
        $.get("/branchManagement", { userName: currentUserName }, function(data, status) {
            if (status == "success") {
                $("#mainIndex").fadeOut(250, function() {
                    $(this).html(data).fadeIn(500);
                });

                $("html, body").animate({
                    scrollTop: $(".container-fluid").offset().top
                }, 1500);
            }
        });
    })
});
*/
/*
// Gets catalog page data
$(document).ready(function() {
    $("#catalogPage").click(function() {
        $("#mainIndex").fadeOut(250, function() {
            $(this).load("/catalog", function(responseTxt, statusTxt, xhr) {
                if (statusTxt == "success") {
                    $(this).fadeIn(250);

                    $("html, body").animate({
                        scrollTop: $(".container-fluid").offset().top
                    }, 1500);
                }
            });
        });
    })
});
*/