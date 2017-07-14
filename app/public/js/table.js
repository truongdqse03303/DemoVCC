$(document).ready(function () {
    $('.addBody').hide()
    $('.editBody').hide()

    $.ajax({
        type: 'GET',
        url: '/api/user/',
        dataType: 'json',
        contentType: 'application/x-www-form-urlencoded',
        success: function (res) {
            var Arr = res
            console.log(res)
            if (res !== null) {
                jQuery.each(Arr, function (i, val) {
                    $('.table.memberList').append('<tr> <td>' + Arr[i].name + '</td> <td>' + Arr[i].email + '</td> <td>' + Arr[i].phoneNumber + '</td> <td> <button class="btn-add' + i + '">Add</button> </td> <td> <button class="btn-edit' + i + '">Edit</button> </td> <td> <button class="btn-remove' + i + '">Remove</button> </td></tr>')

                    $('.btn-add' + i + '').click(function () {
                        $('.addBody').show()
                    })

                    $('.btn-edit' + i + '').click(function () {
                        $('.editBody').show()
                        $('#editId').val($('#editId').val() + Arr[i].id)
                        $('#editName').val($('#editName').val() + Arr[i].name)
                        $('#editEmail').val($('#editEmail').val() + Arr[i].email)
                        $('#editPhoneNumber').val($('#editPhoneNumber').val() + Arr[i].phoneNumber)
                    })

                    $('.btn-remove' + i + '').click(function () {
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

    $(".btn-edit").click(function () {
        $('.editBody').hide()
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
})