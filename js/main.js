let $ = require("jquery");

init();

function init() {
    $("document").ready(function () {
        $("#input").click(function(event) {
            event.preventDefault();
            console.log("sdfsaf");
            let $form = $(this),
                term = $form.val(),
                url = "http://localhost:3000/users";

            $.ajax(
                {
                    url: url + '?name=' + term,
                    type: 'get',
                    success: function (res) {
                        console.log(res);
                    },
                    error: function (xhr) {
                        console.error(xhr);
                    }
                }
            );

            /*let posting = $.get(url, {
                s: term
            });

            posting.done(function(data) {
                let content = $(data).find('#content');
                $("#result").empty().append(content);
            });*/
        });
        $(".tile").click(function () {
            $.get("http://localhost:3000/users", function (data, status) {
                $(".tile").fadeOut('slow', function () {
                    $(".main").append(data);
                });
            });
        });
    });
}