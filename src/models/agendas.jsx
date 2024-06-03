import mongoose from "mongoose";

const NotasSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  nota: {
    type: String,
    required: true,
  },
  usuarioId: {
    type: mongoose.Schema.Types.ObjectId, // Si es un ObjectId, usa este tipo
    required: true,
    ref: 'Usuario' // Opcional, si tienes una colección 'Usuario'
  }
});

export default mongoose.models.Notas || mongoose.model('Notas', NotasSchema);
