/**
 * Created by hp-pc on 2017/6/11 0011.
 */
$(function () {
    $('#douban').on('blur',function(){
       var douban = $(this);
       var id = douban.val();

       if(id){
           $.ajax({
               url:'https://api.douban.com/v2/movie/subject/' + id,
               cache:true,
               type:'get',
               dataType:'jsonp',
               jsonp:'callback',
               success:function(data){
                   $('#inputTitle').val(data.title),
                   $('#inputDector').val(data.directors[0].name),
                   $('#inputCountry').val(data.countries),
                   $('#inputLanguage').val(),
                   $('#inputPoster').val(data.images.large),
                   $('#inputFlash').val(),
                   $('#inputYear').val(data.year),
                   $('#inputSummary').val(data.summary)
               }
           })
       }
    });
});