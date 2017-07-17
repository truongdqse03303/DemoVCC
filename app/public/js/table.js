$(document).ready(function () {
    $('.addBody').hide()
    $('.editBody').hide()
    setTimeout(function () {
        if (document.cookie.indexOf('token') !== -1) {

            $.ajax({
                type: 'GET',
                url: '/api/user/',
                dataType: 'json',
                contentType: 'application/x-www-form-urlencoded',
                success: function (res) {
                    var Arr = res.allUser
                    $('#me').val(res.me.username)
                    if (res !== null) {
                        jQuery.each(Arr, function (i, val) {
                            $('.table.memberList').append('<tr> <td>' + Arr[i].name + '</td> <td>' + Arr[i].email + '</td> <td>' + Arr[i].phoneNumber + '</td> <td id="action"> <button class="btn btn-primary btn-xs btn-add' + i + '" data-title="Add" data-toggle="modal">Add</button> <button class="btn btn-primary btn-xs btn-edit' + i + '" data-title="Edit" data-toggle="modal">Edit</button> <button class="btn btn-primary btn-xs btn-remove' + i + '" data-title="Remove" data-toggle="modal">Remove</button> </td></tr>')

                            $('.btn-add' + i + '').click(function () {
                                $('.addBody').show()
                                $('.editBody').hide()
                            })

                            $('.btn-edit' + i + '').click(function () {
                                $('.editBody').show()
                                $('.addBody').hide()
                                $('#editId').val("")
                                $('#editName').val("")
                                $('#editEmail').val("")
                                $('#editPhoneNumber').val("")
                                $('#editId').val($('#editId').val() + Arr[i].id)
                                $('#editName').val($('#editName').val() + Arr[i].name)
                                $('#editEmail').val($('#editEmail').val() + Arr[i].email)
                                $('#editPhoneNumber').val($('#editPhoneNumber').val() + Arr[i].phoneNumber)
                            })

                            $('.btn-remove' + i + '').click(function () {
                                $('.addBody').hide()
                                $('.editBody').hide()
                                setTimeout(function () {
                                    var r = confirm("Are you sure!");
                                    if (r == true) {
                                        $.ajax({
                                            type: 'GET',
                                            url: '/api/user/delete/' + Arr[i].id + '',
                                            contentType: 'application/x-www-form-urlencoded',
                                            success: function (res) {
                                                if (res === true) {
                                                    alert('Removed')
                                                    setTimeout(function () {
                                                        document.location.href = '/table.html'
                                                    }, 500)
                                                } else alert('Edit fail')
                                            }
                                        })
                                    } else {
                                        alert('You pressed Cancel!')
                                        document.location.href = '/table.html'
                                    }
                                }, 100);

                            })
                        })

                    }
                }
            })

            $(".btn-add").click(function () {
                $('.addBody').hide()
                var obj = {
                    name: $('#addName').val(),
                    phoneNumber: $('#addPhoneNumber').val(),
                    email: $('#addEmail').val()
                }
                $.ajax({
                    type: 'POST',
                    url: '/api/user',
                    dataType: 'json',
                    contentType: 'application/x-www-form-urlencoded',
                    data: obj,
                    success: function (res) {
                        console.log(res)
                        if (res.success !== null) {
                            alert('Create user success')
                            setTimeout(function () {
                                document.location.href = '/table.html'
                            }, 500)
                        } else alert('Create fail')
                    }
                })
            })

            $(".btn-close").click(function () {
                $('.editBody').hide()
                $('.addBody').hide()
            })

            $(".btn-logout").click(function () {
                alert('Logout success')
                eraseCookie('token')
                console.log(document.cookie)
                document.location.href = '/'
            })

            $(".btn-edit").click(function () {
                var obj = {
                    name: $('#editName').val(),
                    phoneNumber: $('#editPhoneNumber').val(),
                    email: $('#editEmail').val()
                }
                $.ajax({
                    type: 'POST',
                    url: '/api/user/update/' + $('#editId').val() + '',
                    dataType: 'json',
                    contentType: 'application/x-www-form-urlencoded',
                    data: obj,
                    success: function (res) {
                        console.log(res)
                        if (res.success !== null) {
                            alert('Edit user success')
                            setTimeout(function () {
                                document.location.href = '/table.html'
                            }, 500)
                        } else alert('Edit fail')
                    }
                })
            })

            function createCookie(name, value, days) {
                var expires;

                if (days) {
                    var date = new Date();
                    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                    expires = "; expires=" + date.toGMTString();
                } else {
                    expires = "";
                }
                document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/";
            }

            function eraseCookie(name) {
                createCookie(name, "", -1);
            }
        } else { // not yet logged in
            alert('You are not logged in')
            document.location.href = '/'
            console.log('no token')
        }
    }, 100);

})