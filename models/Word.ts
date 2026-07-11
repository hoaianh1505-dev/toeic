import mongoose, { Schema, Document } from 'mongoose'

export interface IWord extends Document {
  stt: number
  word: string
  type: string
  phonetic: string
  meaning: string
  page: number
}

const WordSchema = new Schema<IWord>({
  stt: { type: Number, required: true },
  word: { type: String, required: true },
  type: { type: String, required: true },
  phonetic: { type: String, default: '' },
  meaning: { type: String, required: true },
  page: { type: Number, default: 1 },
}, {
  timestamps: true,
})

WordSchema.index({ word: 1 })
WordSchema.index({ stt: 1 })

export default mongoose.models.Word || mongoose.model<IWord>('Word', WordSchema)
