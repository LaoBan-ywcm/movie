/**
 * Created by hp-pc on 2017/6/9 0009.
 */
$(function(){

    delFN('.del-user','/admin/user/list?id=');
    delFN('.del-movie','/admin/movie/list?id=');
    delFN('.del-category','/admin/category/list?id=');





    function delFN(delButton,cUrl){
        $(delButton).on('click',function (e) {
            var $target = $(e.target);
            var id = $target.data('id');
            var tr = $('.item-id-'+ id);

            $.ajax({
                type:'DELETE',
                url:cUrl + id
            }).done(function(results){
                if(results.success === 1){
                    if(tr.length > 0){
                        tr.remove();
                    }
                }
            })
        });
    }

});











