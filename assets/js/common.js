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

function show_classify_result_page(){
  $("#myModal").modal("hide");
  show_page("classify-result");
}
function set_radio(obj){
  if($(obj).attr("checked")){
    $(obj).attr("checked",false) ;
    $(obj).attr("value","0");
  }else {
    $(obj).attr("checked",true) ;
    $(obj).attr("value","1");
  }
}
function show_manual(obj,id){
  //alert($(obj).find("a").text());
  var a = $(obj).prev().eq(0);//a是用来保存搜索查询条件的
  //alert(a.text());
  $("#"+id).modal("show");
  $('#'+id).modal().css({
    width: '200px',
    'margin-left': function () {
      return -($(this).width() / 2);
    }
  });

}

function logout(){//退出登录
  window.location.href = "login.html";
}

