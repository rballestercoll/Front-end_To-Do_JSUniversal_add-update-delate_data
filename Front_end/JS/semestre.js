$(document).ready(function () {
  limpiarSemestres();
  cargarSemestres();
});

function limpiarSemestres()
{
  $("#semester-list").html("");
}

function cargarSemestres()
{
  fetch('./api', {
    method: 'POST',
    headers: {'Content-Type': "application/json"},
    body: JSON.stringify({
      query: `
      query {
        getAllSemestre {
          id
          numSemester
          opinion
          dateStart
          dateEnd
          description
          difficulty
          year
        }
      }
      `
    })
  })
  .then(res => res.json())
  .then(data => {
    console.log(data.data.getAllSemestre)
  
    data.data.getAllSemestre.forEach(semestre => {
      console.log(semestre.id);
  
      let semester = {color:semestre.color, numSemester:semestre.numSemester, year:semestre.year, dateStart:semestre.dateStart, dateEnd:semestre.dateEnd, description:semestre.description, opinion:semestre.opinion, difficulty:semestre.difficulty};
      drawSemester(semestre.id, semester);
    });
  })
}

function eliminarSemestre(id)
{
  var values = {};
  values["ID"] = id;

  fetch('./api', {
    method: 'POST',
    headers: {'Content-Type': "application/json"},
    body: JSON.stringify({
      query: `
      mutation DeleteSemestre($deleteSemestreId: ID) {
        deleteSemestre(id: $deleteSemestreId)
      }
      `,
      variables: {
        deleteSemestreId: id,
      }
    })
  })
  .then(res => res.json())
  .then(data => {
    limpiarSemestres();
    cargarSemestres();
  })
}