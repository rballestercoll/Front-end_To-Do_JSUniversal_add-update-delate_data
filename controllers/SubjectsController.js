const { gql } = require("apollo-server-express");
const Subject = require("../models/Subject");

const SubjecttypeDefs = gql`
  scalar Upload  // Añade este escalar para manejar archivos adjuntos
  
  type Subject {
    id: ID,
    name: String,
    dateStart: String,
    dateEnd: String,
    color: String,
    description: String,
    opinion: String,
    difficulty: Int,
    status: String,
    attachedFile: Upload  # Añade este campo para manejar archivos adjuntos
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
    attachedFile: Upload  # Añade este campo para manejar archivos adjuntos
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
  Upload: GraphQLUpload,  // Añade este resolver para GraphQLUpload
  
  Query: {
        helloSubject: () => "Hello world",
        getAllSubjects: async () => {
            const subjects = await Subject.find();  
            return subjects; 
          },
    },
    Mutation: {
        async createSubject(parent, { SubjectInput }, context, info) {
          const { name, year, dateStart, dateEnd, color, description, opinion, difficulty, status, attachedFile  } = SubjectInput; 

          // Lógica para manejar el archivo adjunto
  let attachedFileData;
  if (attachedFile) {
    const { createReadStream, filename, mimetype, encoding } = await attachedFile;

    // Crea una función para convertir el stream a un Buffer
    const streamToBuffer = async (stream) => {
      return new Promise((resolve, reject) => {
        const chunks = [];
        stream.on('data', (chunk) => chunks.push(chunk));
        stream.on('end', () => resolve(Buffer.concat(chunks)));
        stream.on('error', (error) => reject(error));
      });
    };

    // Convierte el stream del archivo a un Buffer
    const fileBuffer = await streamToBuffer(createReadStream());

  // Almacena el Buffer directamente en la base de datos MongoDB
attachedFileData = { data: fileBuffer, contentType: mimetype, filename };

// Almacenamos el Buffer directamente en el campo attachedFile
newSubject.attachedFile = attachedFileData;

      // Crear la nueva asignatura con el archivo adjunto
          const newSubject = new Subject({ name, year, dateStart, dateEnd, color, description, opinion, difficulty, status, attachedFile: attachedFileData });
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