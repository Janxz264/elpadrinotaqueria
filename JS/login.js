function recargar()
{
    window.location.reload();
}
$(document).keypress(function(e) {
    if(e.which == 13) {
        var usu = $("#nombre").val();
        var pass = $("#contra").val();
        if(usu==""||pass=="")
        {
            $.mobile.changePage('#pageLlenar','pop',true,true);
            return null;
        }
        var $this = $( this ),
        theme = $this.jqmData( "theme" ) || $.mobile.loader.prototype.options.theme,
        msgText = $this.jqmData( "msgtext" ) || $.mobile.loader.prototype.options.text,
        textVisible = $this.jqmData( "textvisible" ) || $.mobile.loader.prototype.options.textVisible,
        textonly = !!$this.jqmData( "textonly" );
        html = $this.jqmData( "html" ) || "";
    $.mobile.loading( "show", {
            text: msgText,
            textVisible: textVisible,
            theme: theme,
            textonly: textonly,
            html: html
    });
        $.post("PHP/login.php",{ usu : usu, pass : pass},function(respuesta){
            if (respuesta == 1) {
                $("#nombre").val("");
                $("#contra").val("");
                location.href="HTML/main.html";
            }
            if (respuesta == 2){
                $.mobile.changePage('#pageError', 'pop', true, true);
                $("#errorMsg").fadeIn(300);
                $("#errorMsg").css("display", "block");
            }
            if (respuesta == 3){
                $.mobile.changePage('#pageUsuario', 'pop', true, true);
                $("#errorMsg").fadeIn(300);
                $("#errorMsg").css("display", "block");
            }
            if (respuesta == 4){
                $.mobile.changePage('#pageConexion', 'pop', true, true);
                $("#errorMsg").fadeIn(300);
                $("#errorMsg").css("display", "block");
            }
        });
    }
});
$(document).ready(function(){
    $("#errorMsg").hide();
    $("#login").click(function(){
        var usu = $("#nombre").val();
        var pass = $("#contra").val();
        if(usu==""||pass=="")
        {
            $.mobile.changePage('#pageLlenar','pop',true,true);
            return null;
        }
        var $this = $( this ),
        theme = $this.jqmData( "theme" ) || $.mobile.loader.prototype.options.theme,
        msgText = $this.jqmData( "msgtext" ) || $.mobile.loader.prototype.options.text,
        textVisible = $this.jqmData( "textvisible" ) || $.mobile.loader.prototype.options.textVisible,
        textonly = !!$this.jqmData( "textonly" );
        html = $this.jqmData( "html" ) || "";
    $.mobile.loading( "show", {
            text: msgText,
            textVisible: textVisible,
            theme: theme,
            textonly: textonly,
            html: html
    });
        $.post("PHP/login.php",{ usu : usu, pass : pass},function(respuesta){
            if (respuesta == 1) {
                $("#nombre").val("");
                $("#contra").val("");
                location.href="HTML/main.html";
            }
            if (respuesta == 2){
                $.mobile.changePage('#pageError', 'pop', true, true);
                $("#errorMsg").fadeIn(300);
                $("#errorMsg").css("display", "block");
            }
            if (respuesta == 3){
                $.mobile.changePage('#pageUsuario', 'pop', true, true);
                $("#errorMsg").fadeIn(300);
                $("#errorMsg").css("display", "block");
            }
            if (respuesta == 4){
                $.mobile.changePage('#pageConexion', 'pop', true, true);
                $("#errorMsg").fadeIn(300);
                $("#errorMsg").css("display", "block");
            }
        });
    });
});
function mostrarcontra()
{
    var x = document.getElementById("contra");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}