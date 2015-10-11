$(function(){
  $(".classify-data-table table tbody tr td button").on("click",function(){
    show_modals("myModal");
  });
  $(".btn-download").on("click",function(){
    show_modals("myModal2");
  });
  $(".jianjie").css("display","block");
});

function show_modals(modal_id){
  $("#"+modal_id).modal("show");
}
function show_page(page_class){
  $(".right>div").hide();
  $("."+page_class).show();
}
function change_bg_color(obj,str){
  $(".nav-son").css("background-color","white");
  $(obj).css("background-color","#337ab7");
  $(".show-container>div").css("display","none");
  $("."+str).css("display","block");
}

