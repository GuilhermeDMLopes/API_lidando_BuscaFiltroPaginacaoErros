import mongoose from "mongoose";
const livroSchema = new mongoose.Schema( 
  {
    id: {type: String},
    titulo: {
      type: String, 
      required: [true, "O título é obrigatório"]
    },
    autor: {
      type: mongoose.Schema.Types.ObjectId, 
      ref:"autores", 
      required: [true, "O autor é obrigatório"]
    },
    editora: {
      type: String, 
      required: [true, "A editora é obrigatória"],
      //Definindo limitações para editora. Pode ser um dos nomes do array.
      enum: {
        values: ["Casa do código", "Alura"],
        //O mongoose vai substituir o valor VALUE pelo valor que inserimos
        message: "A editora {VALUE} não é um valor permitido"
      }
    },
    //Validação de numero de pagina, minimo e maximo
    numeroPaginas: {
      type: Number,
      /*min: [10, "O número de página deve estar entre 10 e 5000. Valor fornecido: {VALUE}"],
      max: [5000, "O número de página deve estar entre 10 e 5000. Valor fornecido: {VALUE}"]*/
      //Fazendo uma validação personalizada
      validate: {
        validator: (valor) => {
          //Se o valor estiver dentro dessa faixa, retorna verdadeiro.
          return valor >= 10 && valor <= 5000;
        },
        message: "O número de página deve estar entre 10 e 5000. Valor fornecido: {VALUE}"
      }
    }
  }      
);

const livros = mongoose.model("livros", livroSchema);

export default livros;