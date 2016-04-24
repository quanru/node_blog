$(function(){
    $('#content')
        .bind('input propertychange', function(){
            $('#preview').html(marked($('#content').val()));
        })
        .trigger('input');
});