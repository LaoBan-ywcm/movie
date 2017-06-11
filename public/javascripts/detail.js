/**
 * Created by hp-pc on 2017/6/10 0010.
 */
$(function(){
    $('.comments').on('click',function () {
        var target = $(this);
        var cid = target.data('cid');
        var tid = target.data('tid');

        if($('#toid').length>0){
            //如果用户之前就点击了一个用户头像，当再次点击时就不在生成input，而是只要改变toid的值
            $('#toid').val(tid);
        }else{
            //之前没有点过用户头像
            $('<input>').attr({
                type:'hidden',
                id:'toid',
                name:'comment[tid]',
                value:tid
            }).appendTo('#commentForm');
        }

        if($('#commentid').length >0){

            $('#commentid').val(cid);
        }else{
            $('<input>').attr({
                type:'hidden',
                id:'commentid',
                name:'comment[cid]',
                value:cid
            }).appendTo('#commentForm');
        }


    })
});