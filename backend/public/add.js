$("#btn1").on("click",function(){
    $.ajax({
        url: "/students/student",
        data: $('#formID').serialize(),
        type: 'POST',
        success: function(data){
            window.location = "/students";
           },
           error: function(xhr, type, exception) { 
             // if ajax fails display error alert
             alert("ajax error response type "+type);
           }
    })
    
});

$(".btn2").on("click",function(){
  var id=$(this).attr("value");
  console.log(id);
  $.ajax({
      url: "/students/student/"+ id,
      dataType:'text',
      data:id,
      type: 'delete',
      success:function(data){
        $("card-deck").hide();
        window.location = "/students";
      }
  })
  
});