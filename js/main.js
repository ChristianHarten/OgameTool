let $ = require("jquery");

init();

function init() {
    $("document").ready(function () {
        $(".tile").click(function () {
            $.get("http://localhost:3000/users", function (data, status) {
                $(".tile").fadeOut('slow', function () {
                    $(".main").append(data);
                });
            });
        });
    });
}