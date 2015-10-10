$(function(){
  $(".classify-data-table table tbody tr td button").on("click",function(){
    show_modals("myModal");
  });
  $(".btn-download").on("click",function(){
    show_modals("myModal2");
  });

});

function show_modals(modal_id){
  $("#"+modal_id).modal("show");
}
function show_page(page_class){
  $(".right>div").hide();
  $("."+page_class).show();
}
