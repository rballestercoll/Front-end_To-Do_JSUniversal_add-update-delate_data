const { gql } = require("apollo-server-express");
const Subject = require("../models/Subject");

const SubjecttypeDefs = gql`
  type Subject {
    id: ID
    name: String,
    dateStart: String,
    dateEnd: String,
    color: String,
    description: String,
    opinion: String,
    difficulty: Int,
    status: String,
  }

  input SubjectInput {
    name: String
    dateStart: String
    dateEnd: String
    color: String
    description: String
    opinion: String
    difficulty: Int
    status: String
  }   

  type Query {
    helloSubject: String,
    getAllSubjects: [Subject],
  }
  type Mutation {
    createSubject(SubjectInput: SubjectInput): Subject,
    deleteSubject(id: ID): String
    updateSubjectState(id: ID!, newState: String!): Subject
  }
`; 

const Subjectresolvers = {
    Query: {
        helloSubject: () => "Hello world",
        getAllSubjects: async () => {
            const subjects = await Subject.find();  
            return subjects; 
          },
    },
    Mutation: {
        async createSubject(parent, { SubjectInput }, context, info) {
          const { name, year, dateStart, dateEnd, color, description, opinion, difficulty, status  } = SubjectInput; 
          const newSubject = new Subject({ name, year, dateStart, dateEnd, color, description, opinion, difficulty, status });
          await newSubject.save();
          return newSubject;
        },
        async deleteSubject(_, { id }) {
            await Subject.findByIdAndDelete(id);
            return "Task Deleted";
        },
        async updateSubjectState(_, { id, newState }) {
          try {
              const subject = await Subject.findById(id);
              if (!subject) {
                  throw new Error("La asignatura no fue encontrada.");
              }
  
              // Actualiza el estado de la asignatura con el nuevo estado proporcionado
              subject.estado = newState;
              await subject.save();
  
              return subject;
          } catch (error) {
              throw new Error(`Error al actualizar el estado de la asignatura: ${error}`);
          }
      },
    }
  };

  module.exports = {
    SubjecttypeDefs,
    Subjectresolvers,
  };