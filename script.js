$(function () {
    var config = {syncURL: "https://wd4762749852uxvqau.wilddogio.com" };
     wilddog.initializeApp(config);
     var ref = wilddog.sync().ref();

     var arr=[];
  
     // $(".s_text").click(function () {
     //  var text=$(".text").val();
     //   ref.child("message").push(text);
     //   $(".text").val("");
     // });
     $(".s_text").click(function() {
      var text = $(".text").val();
      ref.child('message').push(text);
      $(".text").val('');
    });

     $(".text").keypress(function (e) {
       // body...
       if(e.keyCode=="13"){
        $('s_text').trigger("click");
       }
     });
     $(".s_empty").click(function(){
      arr=[];
      ref.remove();
      $(".dnm_show").empty();
     });
     ref.child("message").on("child_added",function(snapshot) {
       var text = snapshot.val();

       arr.push(text);
       var obj=$("<div></div>");
       obj.text(text);
       $(".dnm_show").append(obj);
       moveObj(obj);

     });


     var minTop=$(".dnm_show").offset().top;
     var maxTop=minTop+$(".dnm_show").height();
     var _top=minTop;
     function moveObj(obj){
      _top+=50;
      if(_top>(maxTop-50)){
        _top=minTop;
      }
      var _left=$(".dnm_show").width()-obj.width();
      obj.css({
        top:_top+"px",
        left:_left+"px",
        color:getColor()
      });
      var time=20000+Math.random()*10000;
      obj.animate({
        left:"-"+_left+"px"},time,function(){
          obj.remove();
        });

     }
   function getColor (){
     var colors=["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"];
     var color="#";
       var n=0;
     for(var i=0;i<6;i++){
     n=Math.floor(Math.random()*16);
      color+=colors[n];
     }
     return color;
     }
     function rundmn(){
      if(arr.length>0){
        var n=Math.floor(Math.random()*arr.length);
         var obj=$("<div></div>");
         obj.text(arr[n]);
         $(".dnm_show").appendTo(obj);
         moveObj(obj);


      }

     }
      jQuery.fx.interval = 50;
      setInterval(rundmn(),5000);
});
//   $(document).ready(function() {
//     //提示：已经在页面导航部分的Settings中的JavaScript部分引入了wildog.js和jquery.js
//     //在www.wildog.com 注册一个账号，创建一个应用，自动生成一个url,替换下边url即可
//     var config = {syncURL: "https://wd4762749852uxvqau.wilddogio.com" };
//      wilddog.initializeApp(config);
//      var ref = wilddog.sync().ref();



    
//     var arr = [];
//     //把数据提交到野狗云
//     $(".s_text").click(function() {
//       var text = $(".text").val();
//       ref.child('message').push(text);
//       $(".text").val('');
//     });
//     //响应按键点击事件
//     $(".text").keypress(function(event) {
//       if (event.keyCode == "13") {
//         $(".s_text").trigger('click');
//       }
//     });
//     //响应按键清除事件
//     $(".s_empty").click(function() {
//       ref.remove();
//       arr = [];
//       $('.dnm_show').empty();
//     });
//     //监听云端数据变更，云端数据变化，弹幕框里数据也跟着变化。
//     //输入框的数据都会先存储在云里，然后一旦云里面新增节点就在数组里增加这个信息（主要是为了后面定时器使用），
//     ref.child('message').on('child_added', function(snapshot) {
//       var text = snapshot.val();
//       arr.push(text);
//       var textObj = $("<div class=\"dm_message\"></div>");
//       textObj.text(text);
//       $(".dnm_show").append(textObj);
//       moveObj(textObj);//讲新增的text加入到div中，然后让他移动
//     });

//     ref.on('child_removed', function() {
//       arr = [];
//       $('.dnm_show').empty();
//     });
//     //按照时间规则显示弹幕内容。 
//     var topMin = $('.dnm_show').offset().top;
//     var topMax = topMin + $('.dnm_show').height();
//     var _top = topMin;//初始top是0，后面会逐渐增加50，直到到底部，就归零

//     var moveObj = function(obj) {
//       var _left = $('.dnm_show').width() - obj.width();
//       _top = _top + 50;
//       if (_top > (topMax - 50)) {
//         _top = topMin;
//       }
//       obj.css({
//         left: _left+"px",
//         top: _top+"px",
//         color: getRandomColor()
//       });
//       var time = 20000 + 10000 * Math.random();
//       obj.animate({
//         left: "-" + _left + "px"
//       }, time, function() {
//         obj.remove();
//       });
//     }

//     var getRandomColor = function() {
//       return '#' + (function(h) {
//         return new Array(7 - h.length).join("0") + h
//       })((Math.random() * 0x1000000 << 0).toString(16))
//     }
// //，move只动了一次，这里是让已经有的弹幕定时性的动起来。
//     var getAndRun = function() {
//       if (arr.length > 0) {
//         var n = Math.floor(Math.random() * arr.length + 1) - 1;
//         var textObj = $("<div>" + arr[n] + "</div>");
//         $(".dnm_show").append(textObj);
//         moveObj(textObj);
//       }

//       setTimeout(getAndRun, 3000);
//     }

//     jQuery.fx.interval = 50;
//     getAndRun();
//   });