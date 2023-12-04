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