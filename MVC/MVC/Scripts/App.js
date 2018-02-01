$(document).ready(function () {


    $("#id").on(function () {

        $.ajax({
            type: "POST",
            url: url,
            data: data,
            success: success,
            dataType: dataType
        });
    })

    function sendDataAjax(nombre, apellido) {
        var actionData = {"nombre":  + $('#txtNombre').val() ,
                          "apellido": + $('#txtApellido').val() };
           
    $.ajax(
    {
        url: "jqAjax.aspx/GetDataAjax",
        data: actionData,
        dataType: "json",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function(msg) { alert(msg.d); },
        error: function(result) {
            alert("ERROR " + result.status + ' ' + result.statusText);
        }
    });

    $(document).ready(function () {
        $.ajax({
            type: 'GET',
            url: 'http://example/functions.php',
            data: { get_param: 'value' },
            success: function (data) {
                var names = data
                $('#cand').html(data);
            }
        });
    });

    $.getJSON('/functions.php', { get_param: 'value' }, function (data) {
        $.each(data, function (index, element) {
            $('body').append($('<div>', {
                text: element.name
            }));
        });
    });
};

})