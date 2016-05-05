 $(document).on('pageinit', '#pageFeed', function(){

//                var id_usuario = localStorage.getItem("id_usuario");
    var id_usuario = '0';

    $.ajax({
            url: 'http://192.168.37.17:8080/Yecas1/yecas/listar',
            data: 'idUsuario=' + id_usuario,
            dataType: "json",
            async: true,

            success: function (resultados) {
                for(var i in resultados) {
					agregar(resultados[i]);
				}
            },
            error: function (request,error) {
                alert("Error " + error);
            }
    });

    function agregar(resultado){
        var clase = '';
        
        if(resultado.votado){
            clase = 'active';
        }

    	var html =  '<div class="post">'+
                '   <div class="postHeader">'+
                '       <div class="userPhoto"><img src="' +  resultado.foto_usuario + '" alt="' + resultado.nombre_usuario + '"></div>'+
                '       <div class="userName">'+
                '            <h2>' + resultado.nombre_usuario + '</h2><span class="verifiedUserBadge"><i class="material-icons">check</i></span>'+
                '       </div>'+
                '       <div class="timeStamp">'+  resultado.tiempo +'</div>'+
                '   </div>'+
                '   <div class="postPhoto">'+
                '        <img src="'+  resultado.foto_yeca +'" />'+
                '   </div>'+
                '   <div class="postTitle">'+
                '        <h3>'+  resultado.titulo +'</h3>'+
                '   </div>'+
                '   <div class="postActions">'+
                '        <a href="#" class="postActionsLike ' + clase + '" id="megusta-' +  resultado.id + '" onclick="votar(\'' +  resultado.id + '\')"><i class="material-icons md-20">thumb_up</i><span id="votos-' +  resultado.id + '">'+  resultado.cantidadVotos +'</span></a>'+
                '        <a href="post.html" class="postActionsComment"><i class="material-icons md-20">comment</i></a>'+
                '        <a href="#" class="postActionsShare"><i class="material-icons md-20">share</i></a>'+
                '        <a href="#popupBasic" data-rel="popup" class="postActionsMore"><i class="material-icons md-20">more_vert</i></a>'+
                '   </div>'+
                '   <div id="postComments" class="postComments" onload="agregarComentarios(\'' +  resultado.id + '\')">'+
                '   </div>'+
                '</div>';

            $("#main").append(html);
    }


    function agregarComentarios(idYeca){
        $.ajax({
            url: 'http://192.168.37.17:8080/Yecas1/yecas/comentarios/listar',
            data: 'idYeca=' + idYeca,
            dataType: "json",
            async: true,
            success: function (resultados) {
                for(var i in resultados) {
                    agregarComentario(resultados[i]);
                }
            },
            error: function (request,error) {
                alert("Error " + error);
            }
        });
    }


    function agregarComentario(resultado){
        html = '<div class="postComment">'+
               '    <h2>'+
               '        <a href="#">'+  resultado.usuario +'</a>'+
               '    </h2>'+
               '    <span class="verifiedUserBadge">'+
               '        <i class="material-icons">check</i>'+
               '    </span>'+  resultado.comentario +' '+
               '    <a href="#">#Unhashtag</a>'+
               '</div>';

            $("#postComments").append(html);
    }

});



    function votar(idYeca){
        if($("#megusta-" + idYeca).hasClass("active")){
            eliminar_voto(idYeca);
        } else {
            sumarVoto(idYeca);
        }
    }

    function sumarVoto(idYeca){
        $.ajax({
            url: 'http://192.168.37.17:8080/Yecas1/yecas/voto',
            data: 'idYeca=' + idYeca + '&idUsuario=0',
            dataType: "json",
            async: true,
            success: function (resultado) {
                //$("#votos-" + idYeca).append('');
                $("#votos-" + idYeca).html(resultado.cantidadVotos);
                $("#megusta-" + idYeca).addClass("active");
            },
            error: function (request,error) {
                alert("Error " + error);
            }
        });
    }

    function eliminar_voto(idYeca){
        $.ajax({
            url: 'http://192.168.37.17:8080/Yecas1/yecas/eliminar_voto',
            data: 'idYeca=' + idYeca + '&idUsuario=0',
            dataType: "json",
            async: true,
            success: function (resultado) {
               // $("#votos-" + idYeca).append('');
                $("#votos-" + idYeca).html(resultado.cantidadVotos);
                $("#megusta-" + idYeca).removeClass("active");
            },
            error: function (request,error) {
                alert("Error " + error);
            }
        });
    }

    $(".categorias").click(function(event) {

        var categoria = $(this);

        var c1 = $("#categoria1").val();
        var c2 = $("#categoria2").val();
        var c3 = $("#categoria3").val();

        var valor = categoria.attr("id"); 

        if(categoria.hasClass("active")){
            if(c1 == valor){
                $("#categoria1").val('');
            } else if(c2 == valor){
                $("#categoria2").val('');
            } else if(c3 == valor){
                $("#categoria3").val('');
            }

            categoria.removeClass("active");
        } else {
            if(c1 == '' || c2 == '' || c3 == ''){
                if(c1 == ''){
                    $("#categoria1").val(valor);
                } else if(c2 == ''){
                    $("#categoria2").val(valor);
                } else {
                    $("#categoria3").val(valor);
                }
                categoria.addClass("active");
            } else {
                categoria.removeClass("active");
            }
        }

        categoria.blur();



        function seleccionarCategoria() {

        }
    });