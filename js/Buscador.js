$( function() {
    //$( "#tabs" ).tabs();

    $('#fIn').datepicker({
        locale: 'es-es',
        uiLibrary: 'bootstrap4'
    });
    $('#fOut').datepicker({
        locale: 'es-es',
        uiLibrary: 'bootstrap4'
    });

    $('.child-dinamic-sc').change( function () {
        pegarPlantillaHijos( jQuery(this).val(), 'sc', 'mL_edadChild' );
    });

    $('.child-dinamic-atp').change( function () {
        pegarPlantillaHijos( jQuery(this).val(), 'atp', 'edad_Chd_HO' );
    });

    $("#child1").change(function(){
        var id=jQuery(this).val();
        var clonara=jQuery(this).parent().parent().attr("id");
        //jquery(this).parent().parent().appendTo($(this).parent().find("#year").clone());  

        jQuery(this).parent().find("#year").clone().appendTo(jQuery(this).parent().parent());
    });


    $("#mL_cmbHab,#habitaciones_arma").change(function(){
        var id=jQuery(this).val();

        switch ( id ) {
            case "1": 
        jQuery(this).parent().parent().parent().find("#hab_2, #adultos_hab_2, #child_hab_2,#hab_3, #adultos_hab_3, #child_hab_3").hide();    

            break; 
            case "2": 
            jQuery(this).parent().parent().parent().find("#hab_"+id +",#adultos_hab_"+id+ ",#child_hab_"+id ).show();
            jQuery(this).parent().parent().parent().find("#hab_3, #adultos_hab_3, #child_hab_3").hide();
            break;
            case "3":  jQuery(this).parent().parent().parent().find("div").show(); break;
        }
        //
    });

$("#mL_cmbHab").change( function () {
        pegarPlantilla( jQuery(this).val(), 'salidas-confirmadas' );
    });

    jQuery("#habitaciones_arma").change( function () {
        pegarPlantilla( jQuery(this).val(), 'arma-tu-paquete' );
    });

    //jquery('#mL_txtCiudadDestino').removeAttr('selected').find('option:first').attr('selected', 'selected');
    //jquery('#mL_cmbSalidas').removeAttr('selected').find('option:first').attr('selected', 'selected');
    //jquery('#mL_cmbHab').removeAttr('selected').find('option:first').attr('selected', 'selected');

    jQuery("#mL_cmbHab").change(function () {
        var cantidad = jQuery(this).val();

        for (var i = 0; i <= 3; i++)
        {
        jQuery("#habi" + i).hide();
        }
        for (var i = 0; i <= cantidad; i++)
        {
    jQuery("#habi" + i).show();
        }
    });

    jQuery('#cantHab').change(function(){

            var cantidad = $(this).val();

            for (var i = 0; i <= 3; i++)
            {
            jQuery("#hab_Hot_" + i).hide();
            }
            for (var i = 0; i <= cantidad; i++)
            {
            jQuery("#hab_Hot_" + i).show();
            }
        });
} );

function actualizaSalidas() {

    // obtenemos el valor seleccionado
    var ciudad = jQuery("#mL_txtCiudadDestino").val();

    if (ciudad != 0) {

        var datos = {
        ciudad: jQuery("#mL_txtCiudadDestino").val()
        };

        $.post("<?php echo BASE_URL; ?>index/json_ciudades", datos, function (ciudades) {

        // obtenemos el combo de ciudades
        var $comboCiudades = $("#mL_cmbSalidas");

        // lo vaciamos
        $comboCiudades.empty();

        $comboCiudades.append("<option value='01/01/2000'>Todas</option>");
        // iteramos a través del arreglo de ciudades
        $.each(ciudades, function (index, salida) {
        // agregamos opciones al combo


        $comboCiudades.append("<option value='" + salida + "'>" + salida + "</option>");

        //$comboCiudades.append("<option>" + cuidad.nombre + "</option>");
        });

        }, 'json');

    }
    else {

        // limpiamos el combo e indicamos que se seleccione un país
        var $comboCiudades = jQuery("#mL_cmbSalidas");
        $comboCiudades.empty();
        $comboCiudades.append("<option value='0'>Seleccione</option>");
    }
}
/**
*
*/
function arma_tu_paquete () {
    var f_in;
    var f_out;

    f_in =jQuery('#fIn').val().split("-");
    jQuery('#hotelIn').val(f_in[2]+"/"+f_in[1]+"/"+f_in[0]);

    f_out=jQuery('#fOut').val().split("-");
    jQuery('#hotelOut').val(f_out[2]+"/"+f_out[1]+"/"+f_out[0]);

    return true;
}
/**
*
*/
function pegarPlantilla ( cantidad , container ) {


    if ( cantidad == 1 ) cantidad = 0;
    if ( cantidad == 2 ) cantidad = 1;
    if ( cantidad == 3 ) cantidad = 2;

    jQuery(`.dinamic-container-${container}`).html('');

    //
    if ( cantidad > 0 ) {
        for ( var i = cantidad - 1; i >= 0; i-- ) {
            jQuery(`.dinamic-container-${container}`).append( 

                
                    <div class="row form-group dinamic-${container}-added-${ i + 1 }">
                        <!--Adultos-->
                        <div class="col-md-2">
                            <label for="cant_Adul_HO_1_${ i + 1 }">Adultos</label>
                               <select class="form-control select-paralel" name="cant_Adul_HO_1_${ i + 1 }">
                                <option value="0">Adultos</option>
                                <option value="1" selected="selected">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select>
                        </div>	
                        <!---->
                        <div class="col-md-2">
                            <label for="child1_${ i + 1 }">Niños</label>
                            <select class="form-control select-paralel" id="child1_${ i + 1 }" name="cant_Chd_HO_1_${ i + 1 }" onchange="pergarPlantillaHijosDinamica('child1_${ i + 1 }', 'dinamic-${container}-added-${ i + 1 }')">
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                            </select>
                        </div>
                    </div>

                
             )	
        }
    }
    //
}
/**
*
*/
function pegarPlantillaHijos ( cantidad, container, name_select ) {


    jQuery(`.age-added-child-${ container }`).remove()
    
    for ( var i = 0; i < ( cantidad ); i++ ) {
        jQuery(`.child-dinamic-container-${ container }`).append(
            
                <div class="col-md-2 age-added-child-${ container }">
                    <label for="edad1Habi1">Edad Niño ${ ( i + 1 ) }</label>
                    <select class="form-control select-paralel" id="edad1Habi1" name="${ name_select }_${ ( i + 1 ) }_1">
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option> 								
                    </select>
                </div>
            
        );
    }
}
/**
*
*/
function pergarPlantillaHijosDinamica ( container_child, container_parent ) {

    jQuery(`.dcsc-${container_parent}`).remove()

    for (var i =jQuery(`#${container_child}`).val() - 1; i >= 0; i--) {
        jQuery(`.${container_parent}`).append(
            
            <div class="col-md-2 dcsc-${container_parent}">
                <label for="edad1Habi1_${ i + 1 }">Edad</label>
                <select class="form-control select-paralel" id="edad1Habi1_${ i + 1 }" name="edad_Chd_HO_1_1_${ i + 1 }">
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                </select>
            </div>	
            
        )
    }

}


var BASE_URL_JS = "<?php echo BASE_URL; ?>";

window.parent.postMessage({
'height': $('#tabs').height() - 100,
'viz': 'Dis',
'location': window.location.href
}, "*");