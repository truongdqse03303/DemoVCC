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
                        document.location.href = '/admin'
                    }, 500)
                } else alert('Login false')
            }
        })
    });

    $.ajax({
        type: 'GET',
        url: '/api/user/',
        dataType: 'json',
        contentType: 'application/x-www-form-urlencoded',
        success: function (res) {
            var arr = res
            if (!res === null) {
                $('.table.memberList').append('<tr> <td>' + Arr[i].name + '</td> <td>' + Arr[i].email + '</td> <td>' + Arr[i].phoneNumber + '</td> <td><a href="#">Add</a></td> <td><a href="#">Edit</a></td> <td><a href="#">Remove</a></td> </tr>')
            }
        }
    })
})