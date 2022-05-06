
  let url = 'http://localhost:3000/clientes/listaClientes';        
  let tablaClientes =  $('#tablaArticulos').DataTable({    
  "ajax":{
      "url": url,
      "dataSrc":""
  },
  "language": {

    "lengthMenu": "Mostrar _MENU_ registros",

    "zeroRecords": "No se encontraron resultados",

    "info": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",

    "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",

    "infoFiltered": "(filtrado de un total de _MAX_ registros)",

    "sSearch": "Buscar:",

    "oPaginate": {

        "sFirst": "Primero",

        "sLast":"Último",

        "sNext":">>",

        "sPrevious": "<<"

     },

     "sProcessing":"Procesando...",

},
  "columns":[
      {"data":"rut",},
      {"data":"nombre"},
      {"data":"paterno"},
      {"data":"materno"},
      {"data":"telefono"},
      {"data":"correo"},
      {"data" :"rut",  render:function(data)
      {
        return `<td>  <a href='/clientes/editarCliente/`+data+`' class='edit' title='Actualizar' data-toggle='tooltip'><i class='material-icons'>&#xE254;</i></a></td>`+
               `<td>  <a href='#' onClick='eliminarCliente("`+data+`")'class='delete' title='Eliminar' data-toggle='tooltip'><i class='material-icons'>&#xE872;</i></a> </td>`
      }}
  ],             
});

function eliminarCliente(id) {

  Swal.fire({
    title: 'Estas seguro?',
    text: "No podrás revertir esto!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, Borrar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {

      $.ajax({

        url: "/clientes/eliminarCliente/" + id,
        type: "POST",
        data: {
          id: id
        },
        success: () => {
          tablaClientes.ajax.reload();      
          Swal.fire(
            'Eliminado!',
            'El cliente ha sido eliminado.',
            'success'
          );
        }
      });
    }
  })


};







  function detalle(rut) {
    $.ajax({
      url: "/clientes/detalle/" + rut,
      type: "GET",
      success: function (data) {    
        $('.tbDetalle').empty();
        $.each(data, function (i, item) {
          $('#detalleCliente').append(
            $('<tr>'),
            $('<td>').text(item.Sexo),
            $('<td>').text(item.Calle +" "+ item.Numero),
            $('<td>').text(item.Comuna),
            $('<td>').text(item.Region),
            $('<td>').text(item.Tipo)
          ); 
        }
        );
      }
    })
  };



  let url2 = 'http://localhost:3000/productos/listaProductos';        
  let tablaProductos =  $('#tablaProductos').DataTable({    
  "ajax":{
      "url": url2,
      "dataSrc":""
  },
  "language": {

    "lengthMenu": "Mostrar _MENU_ registros",

    "zeroRecords": "No se encontraron resultados",

    "info": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",

    "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",

    "infoFiltered": "(filtrado de un total de _MAX_ registros)",

    "sSearch": "Buscar:",

    "oPaginate": {

        "sFirst": "Primero",

        "sLast":"Último",

        "sNext":">>",

        "sPrevious": "<<"

     },

     "sProcessing":"Procesando...",

},
  "columns":[
      {"data":"idproducto",},
      {"data":"nombre"},
      {"data":"categoria"},
      {"data":"sub_categoria"},
      {"data":"precio"},
      {"data":"valor_descuento"},
      {"data" :"idproducto",  render:function(data)
      {
        return `<td>  <a href='/productos/editarProductos/`+data+`' class='edit' title='Actualizar' data-toggle='tooltip'><i class='material-icons'>&#xE254;</i></a></td>`+
               `<td>  <a href='#' onClick='eliminarProductos("`+data+`")'class='delete' title='Eliminar' data-toggle='tooltip'><i class='material-icons'>&#xE872;</i></a> </td>`
      }}
      
     
  ],             
});

let url3 = 'http://localhost:3000/servicios/listaServicios';        
  let tablaServicios =  $('#tablaServicio').DataTable({    
  "ajax":{
      "url": url3,
      "dataSrc":""
  },
  "language": {

    "lengthMenu": "Mostrar _MENU_ registros",

    "zeroRecords": "No se encontraron resultados",

    "info": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",

    "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",

    "infoFiltered": "(filtrado de un total de _MAX_ registros)",

    "sSearch": "Buscar:",

    "oPaginate": {

        "sFirst": "Primero",

        "sLast":"Último",

        "sNext":">>",

        "sPrevious": "<<"

     },

     "sProcessing":"Procesando...",

},
  "columns":[
      {"data":"idservicio",},
      {"data":"nombre"},
      {"data":"tipo_servicio"},
      {"data":"sub_categoria"},
      {"data":"precio"},
      {"data" :"idservicio",  render:function(data)
      {
        return `<td>  <a href='/servicios/editarServicios/`+data+`' class='edit' title='Actualizar' data-toggle='tooltip'><i class='material-icons'>&#xE254;</i></a></td>`+
               `<td>  <a href='#' onClick='eliminarServicios("`+data+`")'class='delete' title='Eliminar' data-toggle='tooltip'><i class='material-icons'>&#xE872;</i></a> </td>`
      }}
      
     
  ],             
});

function eliminarServicios(id) {
  console.log(id);
  Swal.fire({
    title: 'Estas seguro?',
    text: "No podrás revertir esto!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, Borrar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {

      $.ajax({

        url: "/servicios/eliminarServicios/" + id,
        type: "POST",
        data: {
          id: id
        },
        success: () => {
          tablaServicios.ajax.reload();      
          Swal.fire(
            'Eliminado!',
            'El cliente ha sido eliminado.',
            'success'
          );
        }
      });
    }
  })


};

function eliminarProductos(id) {
  console.log(id);
  Swal.fire({
    title: 'Estas seguro?',
    text: "No podrás revertir esto!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, Borrar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {

      $.ajax({

        url: "/productos/eliminarProducto/" + id,
        type: "POST",
        data: {
          id: id
        },
        success: () => {
          tablaProductos.ajax.reload();      
          Swal.fire(
            'Eliminado!',
            'El cliente ha sido eliminado.',
            'success'
          );
        }
      });
    }
  })


};


$("#Seccion").change(function () {
  const id = $("#Seccion").val();
  $.ajax({
    url: "/productos/seccion/" + id,
    type: "GET",
    success: function (data) {
      let len = data.length;
      if (len <= 0) {
        $("#Rubro").empty();
        $("#Rubro").append("<option value='0'>Seleccione el Rubro..</option>");
      } else {
        $("#Rubro").empty();
        $("#Rubro").append("<option value='0'>Seleccione el Rubro</option>");
        for (let i = 0; i < len; i++) {
          let value1 = data[i]['CategoriaRubro'];
          let value2 = data[i]['idRubro'];
          $("#Rubro").append("<option value='" + value2 + "' >" + value1 + "</option>");

        }
      }

    }
  });
});


$("#Rubro").change(function () {
  const id = $("#Rubro").val();
  console.log(id);
  $.ajax({
    url: "/productos/rubro/" + id,
    type: "GET",
    success: function (data) {
      console.log(data);
      let len = data.length;
      if (len <= 0) {
        $("#Subrubro").empty();
        $("#Subrubro").append("<option value='0'>Seleccione Subrubro..</option>");
      } else {
        $("#Subrubro").empty();
        for (let i = 0; i < len; i++) {
          let value1 = data[i]['categoria'];
          let value2 = data[i]['idSubrubro'];
          console.log(value1+ " " + value2)
          $("#Subrubro").append("<option value='" + value2 + "' >" + value1 + "</option>");

        }
      }

    }
  });
});

let url1 = 'http://localhost:3000/proveedor/listaProveedorAjax';        
let tablaProveedor =  $('#tablaProveedor').DataTable({    
  "ajax":{
      "url": url1,
      "dataSrc":""
  },
  "language": {

    "lengthMenu": "Mostrar _MENU_ registros",

    "zeroRecords": "No se encontraron resultados",

    "info": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",

    "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",

    "infoFiltered": "(filtrado de un total de _MAX_ registros)",

    "sSearch": "Buscar:",

    "oPaginate": {

        "sFirst": "Primero",

        "sLast":"Último",

        "sNext":">>",

        "sPrevious": "<<"

     },

     "sProcessing":"Procesando...",

},
  "columns":[
      {"data":"idProveedor"},
      {"data":"Rut",},
      {"data":"nombre"},
      {"data":"Comuna"},
      {"data":"telefono"},
      {"data":"direccion"},
      {"data":"numero"},
      {"data" :"Correo"},  
      {"data": "idProveedor", render:function(data)
      {
        return `<td>  <a href='/proveedor/editarProveedor/`+data+`' class='edit' title='ActualizarProveedor' data-toggle='tooltip'><i class='material-icons'>&#xE254;</i></a></td>`+
               `<td>  <a href='#' onClick='eliminarProveedor("`+data+`")'class='delete' title='EliminarProvedoor' data-toggle='tooltip'><i class='material-icons'>&#xE872;</i></a> </td>`
      }}
  ],             
});


function eliminarProveedor(id) {
  console.log(id);
  Swal.fire({
    title: 'Estas seguro?',
    text: "No podrás revertir esto!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, Borrar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {

      $.ajax({

        url: "/proveedor/eliminarProveedor/" + id,
        type: "POST",
        data: {
          id: id
        },
        success: () => {
          tablaProveedor.ajax.reload();      
          Swal.fire(
            'Eliminado!',
            'El proveedor ha sido eliminado.',
            'success'
          );
        }
      });
    }
  })


};