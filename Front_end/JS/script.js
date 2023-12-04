// INTERFAZ 1 Y 2
var semestersData ={
  "23241":{
    numSemester:1,
    year:"23/24",
    dateStart:"",
    dateEnd:"",
    color:"#33aaff",
    description:"El semestre más importante",
    opinion:"Me encanta",
    difficulty:1
  },
  "23242":{
    numSemester:2,
    year:"23/24",
    dateStart:"",
    dateEnd:"",
    color:"#CCCCCC",
    description:"El semestre más importante",
    opinion:"Me encanta",
    "difficulty":3
  }
};

function emptySemesters() {
  $("#semester-list").empty();
}

function drawSemesters(semesters) {
  // Vaciamos el HTML de Semestres
  emptySemesters();
  // Insertamos las cards de semestre
  $.each(semesters, function (index, semester) {
    drawSemester(index, semester);
  });
}

// Función para pintar el card del semestre
function drawSemester(index, semester) {
  // Construimos el card del semestre
  $(
    '<div class="margen-top-lg col-sm-4" id="' +
      index +
      '"><div class="card" style="width: 18rem;"><div class="card-body"><h5 class="card-title" style="background-color:' +
      semester.color +
      '">Semestre ' +
      semester.numSemester +
      " del curso " +
      semester.year +
      '</h5><div class="padding-sm"><p class="card-text">Fecha inicio: ' +
      semester.dateStart +
      "</br>Fecha fin: " +
      semester.dateEnd +
      "</br>Descripción: " +
      semester.description +
      "</br>Opinión: " +
      semester.opinion +
      "</br>Dificultad: " +
      semester.difficulty +
      '</p><a href="#" class="btn btn-primary" id="añadir" onclick="drawModalSemester(' +
      index +
      ')">editar<a href="interfaz_3.html" class="btn btn-primary" id="añadir" onclick="drawModalSemester(' +
      index +
      ')">Ver</a><button class="btn btn-danger" id="eliminar" onclick="eliminar(' +
      index +
      ')"><i class="fas fa-trash"></i></button></div></div></div></div>'
  ).appendTo("#semester-list");
}

// Función para pintar el modal con el formulario
function drawModalSemester(index) {
  // Inicializamos valores del formulario
  var semester = new Object();
  semester.numSemester = "";
  semester.year = "";
  semester.dateStart = "";
  semester.dateEnd = "";
  semester.color = "#cccccc";
  semester.description = "";
  semester.opinion = "";
  semester.difficulty = "";
  var title = "Añadir ";

  // Si viene definido un índice de semestre, cargamos los datos en el formulario
  if (index && typeof semestersData[index] != "undefined") {
    semester = semestersData[index];
    title = "Ver/Editar ";
  }

  // Preparamos las opciones de los elementos del formulario
  var selected = "";
  // SELECCIÓN DE SEMESTRE
  var options_numSemester = "";
  for (var i = 1; i < 3; i++) {
    selected = "";
    if (i == semester.numSemester) {
      selected = "selected";
    }
    options_numSemester +=
      "<option value=" + i + " " + selected + ">" + i + "</option>";
  }
  // SELECCIÓN AÑO
  var options_year = "";
  for (
    var i = new Date().getFullYear();
    i < new Date().getFullYear() + 10;
    i++
  ) {
    selected = "";
    if (i == semester.year) {
      selected = "selected";
    }
    options_year +=
      "<option value=" + i + " " + selected + ">" + i + "</option>";
  }

  // BARRA DE DIFICULTAD
  document.addEventListener("DOMContentLoaded", function () {
    const currentValue = document.getElementById("current-value");
    const dificultad = document.getElementById("dificultad");

    currentValue.textContent = dificultad.value; // Inicializamos el valor actual con 5

    dificultad.addEventListener("input", function () {
      currentValue.textContent = dificultad.value;
    });
  });

  // Preparamos HTML de cada campo del formulario
  var field_numSemester =
    '<select class="form-select" id="numSemester" name="numSemester" aria-label="Default select example"><option selected>Selecciona un semestre</option>' +
    options_numSemester +
    '</select><label for="floatingSelect">Semestre</label>';
  var field_year =
    '<select class="form-select" id="year" name="year" aria-label="Default select example"><option selected>Selecciona un año</option>' +
    options_year +
    '</select><label for="floatingSelect">Año</label>';
  var field_dateStart =
    '<input type="date" class="form-control" id="dateStart" name="dateStart" placeholder="Fecha de Inicio" value="' +
    semester.dateStart +
    '"><label for="floatingInput">Fecha de Inicio</label>';
  var field_dateEnd =
    '<input type="date" class="form-control" id="dateEnd" name="dateEnd" placeholder="Fecha de Fin" value="' +
    semester.dateEnd +
    '"><label for="floatingInput">Fecha de Fin</label>';
  var field_color =
    '<label for="color" class="form-label" style="display: block; text-align: left;">Color</label><input type="color" class="form-control form-control-color" id="color" name="color" value="' +
    semester.color +
    '" title="Selecciona un color">';
  var field_description =
    '<textarea class="form-control" id="description" name="description" rows="4">' +
    semester.description +
    '</textarea><label for="floatingInput">Descripción</label>';
  var field_opinion =
    '<textarea class="form-control" id="opinion" name="opinion" rows="4">' +
    semester.opinion +
    '</textarea><label for "floatingInput">Opinión</label>';
  var field_difficulty =
    '<label for="dificultad" class="form-label" style="display: block; text-align: left;">Dificultad</label><div class="d-flex justify-content-between"><span id="min-value">0</span><span id="max-value">10</span></div><input type="range" class="form-range" min="0" max="10" step="1" id="dificultad" name="difficulty"><p>Valor Actual: <span id="current-value"></span></p>';

  // Preparamos HTML del formulario con los campos
  var formHtml =
    '<div class="modal fade" id="modal-semestre" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h1 class="modal-title fs-5" id="exampleModalLabel">' +
    title +
    ' semestre</h1><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div><form id="semestre-form" class="needs-validation"><div class="modal-body"><div class="form-floating mb-3">' +
    field_numSemester +
    '</div><div class="form-floating">' +
    field_year +
    '</div><br><div class="form-floating mb-3">' +
    field_dateStart +
    '</div><div class="form-floating mb-3">' +
    field_dateEnd +
    '</div><div class="form-floating mb-3">' +
    field_description +
    '</div><div class="mb-3">' +
    field_color +
    '</div> <div class="form-floating mb-3">' +
    field_opinion +
    '</div><div class="mb-3">' +
    field_difficulty +
    '</div></div><div class="modal-footer"><button type="submit" class="btn btn-primary">Guardar</button></div></form></div></div></div>';

  // Borramos el formulario si existe y lo insertamos en el DOM
  $("#modal-semestre").remove();
  $(formHtml).appendTo("#semester-list");

  // Añadimos el listener al evento de enviar el formulario para validar
  var form = document.getElementById("semestre-form");
form.addEventListener(
  "submit",
  async function (event) {
    event.preventDefault();

    // Validar el formulario
    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }

    // Recoger datos del formulario
    var values = {};
    $.each($("#semestre-form").serializeArray(), function (i, field) {
      values[field.name] = field.value;
    });

    // Enviar la información al servidor GraphQL
    const response = await fetch('https://n22twm-3000.csb.app/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          mutation CreateSemestre($SemestreInput: SemestreInput) {
            createSemestre(SemestreInput: $SemestreInput) {
              id
              numSemester
              year
              dateStart
              dateEnd
              color
              description
              opinion
              difficulty
            }
          }
        `,
        variables: {
          SemestreInput: values,
        },
      }),
    });

    const result = await response.json();

    // Manejar la respuesta del servidor
    if (result.data && result.data.drawModalSemester) {
      // El semestre se creó exitosamente
      alert('Semestre creado exitosamente');
      // Puedes hacer algo más si es necesario
    } else if (result.errors) {
      // Hubo errores en la creación del semestre
      alert('Error al crear el semestre');
      console.error(result.errors);
    }

    // Volvemos a dibujar las tarjetas de semestres (opcional)
    drawSemesters(semestersData);

    // Cerrar el modal
    $("#modal-semestre").modal("hide");
    $(".modal-backdrop.show").remove();
  },
  false
);

  // Abrimos el modal
  $("#modal-semestre").modal("show");
}
//----------------------------------------------------------------------------------------------------------------------
function eliminar(index) {
  // Eliminar semestre
  if (confirm("¿Quieres eliminar el semestre?")) {
    $("#" + index).remove();
  } else {
    alert("No se ha eliminado el semestre");
  }
}

function drawSelectSemester(semesters, selected = null) {
  // seleccionamos el select
  var selectSemestre = $("#select-semestre");
  let searchParams = new URLSearchParams(window.location.search);
  // comprobamos si existe el select
  if (selectSemestre) {
    // borramos las opciones
    $("#select-semestre option").remove();
    // insertamos semestres
    $.each(semesters, function (index, semester) {
      selectSemestre.append(
        $("<option>", {
          value: index,
          text: semester.year + " - " + semester.numsemester,
          selected: selected == index ? true : false
        })
      );
    });
    // si hay definida la variable de la semestre en la url la seteamos por defecto
    if (searchParams.has("yearsemester")) {
      $("#select-semestre").val(searchParams.get("yearsemester"));
    }
    // seleccionamos la primera semestre por defecto si ninguna esta seleccionada
    if (!$("#select-semestre").val()) {
      $("#select-semestre").val($("#select-semestre option:first").val());
    }
  }
}

$(document).ready(function () {
  // coge los datos de semestres e inserta las cards de semestres en el DOM
  drawSemesters(semestersData);
  //drawSelectsemester(semestersData);
});
