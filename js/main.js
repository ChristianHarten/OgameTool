let $ = require('jquery');
let cookie = require('common-js-cookie');

init();
function init() {
    $('document').ready(function () {
        $('.loading').addClass('hidden');

        let href = document.location.href;
        let lastPathSegment = href.substr(href.lastIndexOf('/') + 1);
        if (lastPathSegment.toLowerCase().indexOf('users') >= 0)
        {
            $('.content').addClass('vertical');
            if (cookie.hasItem('loaded'))
            {
                $('.proposal-list').removeClass('hidden');
            }
            else
            {
                $('.proposal-list').addClass('hidden');
            }
        }
        else
        {
            $('.content').removeClass('vertical');
        }

        $('#searchForm').submit(function(event) {
            event.preventDefault();

            if (!cookie.hasItem('loaded'))
            {
                cookie.setItem('loaded', true);
            }

            /* Show Loading gif, hide table */
            $('.loading').removeClass('hidden');
            $('.proposal-list').addClass('hidden');

            let inputString = $('#input').val();
            let baseUrl = 'http://localhost:3000/users';
            let urlQueryPart = '?search=';

            let url = baseUrl + urlQueryPart + inputString;

            $.ajax(
                {
                    url: url,
                    type: 'get',
                    cache: false,
                    success: function (res) {
                        location.reload();
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