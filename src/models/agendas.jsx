import { Schema, model, models } from "mongoose";

const agendaSchema = new Schema({
  nombre: {
      type: String,


  },
  nota: {
      type: String,

  },
  userId:{
    type: String,
    //   type: Schema.Types.ObjectId,
    //   ref: 'user'
  }
    });

const Agenda = models.Agenda || model('Agenda', agendaSchema);
export default Agenda;