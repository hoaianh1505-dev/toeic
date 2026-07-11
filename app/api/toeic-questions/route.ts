import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import ToeicQuestion from '@/models/ToeicQuestion'

// GET questions by Part
export async function GET(request: Request) {
  try {
    await connectDB()
    const { searchParams } = new URL(request.url)
    const part = searchParams.get('part')
    const limit = parseInt(searchParams.get('limit') || '10')

    const filter: any = {}
    if (part) {
      filter.part = parseInt(part)
    }

    const questions = await ToeicQuestion.find(filter).limit(limit)
    return NextResponse.json({ questions })
  } catch (error) {
    console.error('GET /api/toeic-questions error:', error)
    return NextResponse.json({ error: 'Failed to fetch TOEIC questions' }, { status: 500 })
  }
}

// POST: Seed mock questions or add single question
export async function POST(request: Request) {
  try {
    await connectDB()
    const body = await request.json()

    if (body.action === 'seed') {
      // Clear existing TOEIC questions to avoid duplicates
      await ToeicQuestion.deleteMany({})

      const mockQuestions = [
        // --- PART 1: PHOTOGRAPHS ---
        {
          part: 1,
          category: 'Listening',
          imageUrl: 'https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?w=800&auto=format&fit=crop&q=60',
          questionText: 'Look at the picture and choose the statement that best describes what you see.',
          choices: [
            '(A) They are walking out of the building.',
            '(B) They are having a business discussion in a meeting room.',
            '(C) They are setting up a projection screen.',
            '(D) They are cleaning the conference table.'
          ],
          correctAnswer: 'B',
          explanation: 'Bức ảnh chụp một nhóm người đang thảo luận công việc trong phòng họp họp. Do đó, phương án (B) - "They are having a business discussion in a meeting room" là câu mô tả chính xác nhất.'
        },
        {
          part: 1,
          category: 'Listening',
          imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=60',
          questionText: 'Look at the picture and choose the statement that best describes what you see.',
          choices: [
            '(A) The warehouse worker is operating a forklift truck.',
            '(B) Some cargo boxes are being stacked onto shelves.',
            '(C) The technician is assembling a wooden cabinet.',
            '(D) The shipping packages are being loaded into a truck.'
          ],
          correctAnswer: 'B',
          explanation: 'Bức ảnh mô tả các hộp hàng hóa đang được xếp chồng lên kệ/giá đỡ trong nhà kho. Do đó phương án (B) là câu trả lời chính xác.'
        },

        // --- PART 2: QUESTION-RESPONSE ---
        {
          part: 2,
          category: 'Listening',
          questionText: 'Listen to the question: "When will the executive board members approve the relocation budget?"',
          choices: [
            '(A) Next Monday morning during the weekly assembly.',
            '(B) Yes, they really enjoyed the new office layout.',
            '(C) In the downtown financial headquarters.'
          ],
          correctAnswer: 'A',
          explanation: 'Câu hỏi bắt đầu bằng "When" hỏi về mốc thời gian. (A) "Next Monday morning" trả lời trực tiếp cho câu hỏi thời gian. (B) Trả lời "Yes/No" là bẫy cho câu hỏi WH. (C) Trả lời địa điểm.'
        },
        {
          part: 2,
          category: 'Listening',
          questionText: 'Listen to the question: "Should we hire a consulting agency or develop the software ourselves?"',
          choices: [
            '(A) Yes, I already signed the agreement.',
            '(B) We should recruit two more developers.',
            '(C) Outsource it, as it will save us a lot of time.'
          ],
          correctAnswer: 'C',
          explanation: 'Đây là câu hỏi lựa chọn (choice question). Người hỏi hỏi nên thuê bên ngoài hay tự code. (C) Đề xuất phương án "Outsource it" (thuê ngoài) là câu trả lời hợp lý nhất.'
        },

        // --- PART 5: INCOMPLETE SENTENCES ---
        {
          part: 5,
          category: 'Grammar',
          questionText: 'Mr. Henderson requested that all sales representatives _______ their weekly reports by Friday afternoon.',
          choices: [
            '(A) submits',
            '(B) submit',
            '(C) submitting',
            '(D) submitted'
          ],
          correctAnswer: 'B',
          explanation: 'Cấu trúc giả định (Subjunctive Mode) với động từ "request": S1 + request + that + S2 + V_inf. Động từ "submit" phải giữ ở dạng nguyên thể không chia cho mọi ngôi chủ ngữ. Do đó chọn (B).'
        },
        {
          part: 5,
          category: 'Grammar',
          questionText: 'The seminar on digital advertising was postponed _______ the keynote speaker was unable to travel due to the storm.',
          choices: [
            '(A) because of',
            '(B) although',
            '(C) because',
            '(D) in spite of'
          ],
          correctAnswer: 'C',
          explanation: 'Phía sau khoảng trống là một mệnh đề đầy đủ (S + V): "the keynote speaker was unable...". Ta cần một liên từ chỉ nguyên nhân. (A) là giới từ. (B) chỉ sự nhượng bộ. (C) "because" là liên từ chỉ nguyên nhân chính xác.'
        },
        {
          part: 5,
          category: 'Vocabulary',
          questionText: 'The CEO offered her _______ congratulations to the research team for finalizing the innovative patent on schedule.',
          choices: [
            '(A) sincere',
            '(B) sincerely',
            '(C) sincerity',
            '(D) sincerest'
          ],
          correctAnswer: 'A',
          explanation: 'Vị trí trống đứng trước danh từ "congratulations" và sau tính từ sở hữu "her". Do đó cần điền một tính từ (Adjective) bổ nghĩa cho danh từ. (A) "sincere" (chân thành) là tính từ chính xác.'
        },
        {
          part: 5,
          category: 'Grammar',
          questionText: 'By the time the new assembly machinery arrives next month, the technicians _______ their intensive training.',
          choices: [
            '(A) will complete',
            '(B) will have completed',
            '(C) completed',
            '(D) had completed'
          ],
          correctAnswer: 'B',
          explanation: 'Cấu trúc phối thì: By the time + Hiện tại đơn, Tương lai hoàn thành (will have + V3). Diễn tả hành động hoàn tất trước một thời điểm/hành động khác trong tương lai. Chọn (B).'
        },
        {
          part: 5,
          category: 'Grammar',
          questionText: '_______ the high cost of the security system, the manager decided to install it to protect the database.',
          choices: [
            '(A) Although',
            '(B) Even though',
            '(C) Despite',
            '(D) In addition to'
          ],
          correctAnswer: 'C',
          explanation: 'Phía sau trống là cụm danh từ: "the high cost...". Do đó cần điền một giới từ chỉ sự nhượng bộ. (A) và (B) là liên từ. (C) "Despite" là giới từ chỉ nhượng bộ phù hợp nhất.'
        },

        // --- PART 6: TEXT COMPLETION ---
        {
          part: 6,
          category: 'Reading',
          passage: `To: All Marketing Team Members\nFrom: Sarah Jenkins, Director\nDate: July 12th\nSubject: Launch of Summer Campaign\n\nThis is to notify everyone that our summer campaign will officially start on July 20th. We are currently [1] _______ the final digital advertisements.`,
          questionText: 'Choose the correct word to fill in blank [1].',
          choices: [
            '(A) finalize',
            '(B) finalizing',
            '(C) finalized',
            '(D) finalizes'
          ],
          correctAnswer: 'B',
          explanation: 'Trước khoảng trống có động từ To Be "are" và trạng từ "currently", diễn tả hành động đang diễn ra ở hiện tại tiếp diễn (are + V-ing). Do đó chọn (B) "finalizing".'
        },
        {
          part: 6,
          category: 'Reading',
          passage: `Please make sure that all graphics meet the layout specifications. [2] _______, the budget limit must not be exceeded. If you need assistance, please contact the lead designer.`,
          questionText: 'Choose the correct word to fill in blank [2].',
          choices: [
            '(A) Consequently',
            '(B) Furthermore',
            '(C) However',
            '(D) Otherwise'
          ],
          correctAnswer: 'B',
          explanation: 'Blank [2] dùng để nối thêm một thông tin bổ trợ khác (hạn mức ngân sách không được vượt quá). Do đó trạng từ liên kết chỉ sự thêm vào (Addition) "Furthermore" (Hơn thế nữa) là phù hợp nhất.'
        },

        // --- PART 7: READING COMPREHENSION ---
        {
          part: 7,
          category: 'Reading',
          passage: `--- INVOICE ---
Invoice #: INV-9988
Date: October 5th
Bill To: Apex Solutions Inc.
From: Nexus Training Systems Ltd.

Description: Corporate English Training Workshop (20 participants)
Duration: 3 weeks (September 10th - September 30th)
Subtotal: $4,500.00
Late Payment Fee (applied if paid after Oct 20th): 5% of subtotal

Notes: Please transfer the payment to account number 123-456-789. Thank you for your business.`,
          questionText: 'What is the purpose of this document?',
          choices: [
            '(A) To advertise a corporate workshop.',
            '(B) To request payment for services rendered.',
            '(C) To register participants for a course.',
            '(D) To schedule a meeting date.'
          ],
          correctAnswer: 'B',
          explanation: 'Tài liệu này là một hóa đơn (Invoice) liệt kê chi phí dịch vụ đào tạo ($4,500). Mục đích của hóa đơn là yêu cầu thanh toán (request payment). Chọn (B).'
        },
        {
          part: 7,
          category: 'Reading',
          passage: `--- INVOICE ---
Invoice #: INV-9988
Date: October 5th
Bill To: Apex Solutions Inc.
From: Nexus Training Systems Ltd.

Description: Corporate English Training Workshop (20 participants)
Duration: 3 weeks (September 10th - September 30th)
Subtotal: $4,500.00
Late Payment Fee (applied if paid after Oct 20th): 5% of subtotal

Notes: Please transfer the payment to account number 123-456-789. Thank you for your business.`,
          questionText: 'How much extra fee must Apex Solutions pay if they transfer money on October 25th?',
          choices: [
            '(A) $225.00',
            '(B) $4,500.00',
            '(C) $45.00',
            '(D) Nothing'
          ],
          correctAnswer: 'A',
          explanation: 'Nếu thanh toán sau ngày 20/10 sẽ chịu phí phạt 5%. Ngày 25/10 muộn hơn 20/10 nên phí phạt là 5% của $4,500 = $225.00. Chọn (A).'
        }
      ]

      await ToeicQuestion.insertMany(mockQuestions)
      return NextResponse.json({ message: 'Seeded TOEIC questions successfully!', count: mockQuestions.length })
    }

    // Add a single custom question
    const newQuestion = await ToeicQuestion.create(body)
    return NextResponse.json({ message: 'Question created successfully!', question: newQuestion }, { status: 201 })
  } catch (error: any) {
    console.error('POST /api/toeic-questions error:', error)
    return NextResponse.json({ error: error.message || 'Failed to handle request' }, { status: 500 })
  }
}
