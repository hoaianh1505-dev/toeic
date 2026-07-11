import mongoose, { Schema, Document } from 'mongoose'

export interface IToeicQuestion extends Document {
  part: number
  category: 'Grammar' | 'Vocabulary' | 'Listening' | 'Reading'
  passage?: string
  imageUrl?: string
  audioUrl?: string
  questionText: string
  choices: string[] // [A, B, C, D]
  correctAnswer: string // 'A' | 'B' | 'C' | 'D'
  explanation?: string
  blockId?: string
  sourcePdf?: string
}

const ToeicQuestionSchema = new Schema<IToeicQuestion>({
  part: { type: Number, required: true, min: 1, max: 7 },
  category: { type: String, required: true, enum: ['Grammar', 'Vocabulary', 'Listening', 'Reading'] },
  passage: { type: String },
  imageUrl: { type: String },
  audioUrl: { type: String },
  questionText: { type: String, required: true },
  choices: [{ type: String, required: true }],
  correctAnswer: { type: String, required: true, enum: ['A', 'B', 'C', 'D'] },
  explanation: { type: String },
  blockId: { type: String },
  sourcePdf: { type: String }
}, {
  timestamps: true
})

export default mongoose.models.ToeicQuestion || mongoose.model<IToeicQuestion>('ToeicQuestion', ToeicQuestionSchema)
