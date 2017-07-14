$(document).ready(function () {

    $(".btn-login").click(function () {
        var obj = {
            username: $('#username').val(),
            password: $('#password').val()
        }
        $.ajax({
            type: 'POST',
            url: '/api/account/authen',
            dataType: 'json',
            contentType: 'application/x-www-form-urlencoded',
            data: obj,
            success: function (res) {
                if (res.success === true) {
                    alert('Login success')
                    setTimeout(function () {
                        document.location.href = '/table.html'
                    }, 500)
                } else alert('Login fail')
            }
        })
    });



})