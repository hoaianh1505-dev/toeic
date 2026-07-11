'use client'
import { useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useAuth } from '@/components/AuthContext'
import Link from 'next/link'

interface GrammarContent {
  title: string
  icon: string
  content: React.ReactNode
}

const GRAMMAR_DATABASE: Record<string, GrammarContent> = {
  'parts-of-speech': {
    title: 'Từ Loại Trong Tiếng Anh (Parts of Speech)',
    icon: '🏷️',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <div style={{ background: 'var(--bg-card)', padding: '24px', borderRadius: '8px', borderLeft: '4px solid var(--primary)' }}>
          <p style={{ margin: 0, fontSize: '0.96rem', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            Trong tiếng Anh, <strong>Từ loại (Parts of Speech)</strong> phân định chức năng, vị trí và mối quan hệ của một từ vựng trong câu. Để đạt điểm cao trong kỳ thi TOEIC (đặc biệt là các dạng bài tìm từ loại thích hợp ở Part 5 và Part 6), bạn cần nắm vững toàn diện và chi tiết <strong>9 nhóm từ loại</strong> dưới đây.
          </p>
        </div>

        {/* 1. Danh từ */}
        <div>
          <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--primary)', borderBottom: '2px solid var(--border)', paddingBottom: '6px', marginBottom: '12px' }}>
            1. Danh từ (Nouns - N)
          </h3>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: '1.7', margin: '0 0 12px 0' }}>
            • <strong>Khái niệm:</strong> Từ dùng để gọi tên một thực thể: con người, con vật, đồ vật, địa điểm, sự việc hay các khái niệm trừu tượng.<br />
            • <strong>Vị trí và chức năng trong câu:</strong>
          </p>
          <div className="vocab-table-wrapper" style={{ marginBottom: '14px' }}>
            <table className="vocab-table" style={{ fontSize: '0.88rem' }}>
              <thead>
                <tr>
                  <th className="nowrap" style={{ width: '25%' }}>Vị trí / Cấu trúc</th>
                  <th className="nowrap" style={{ width: '35%' }}>Mô tả quy tắc</th>
                  <th>Ví dụ thực tế</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="nowrap"><strong>Chủ ngữ (Subject)</strong></td>
                  <td>Đứng đầu câu, ngay trước động từ chính được chia thì.</td>
                  <td>The <strong>investor</strong> visited the factory yesterday.</td>
                </tr>
                <tr>
                  <td className="nowrap"><strong>Tân ngữ (Object)</strong></td>
                  <td>Đứng sau ngoại động từ hoặc giới từ để chịu tác động.</td>
                  <td>We finalized the <strong>agreement</strong>.</td>
                </tr>
                <tr>
                  <td className="nowrap"><strong>Đứng sau Tính từ</strong></td>
                  <td>Tính từ bổ nghĩa cho danh từ đứng ngay sau nó.</td>
                  <td>They proposed an <strong>innovative solution</strong>.</td>
                </tr>
                <tr>
                  <td className="nowrap"><strong>Đứng sau Giới từ</strong></td>
                  <td>Cấu trúc: Preposition + Noun / V-ing.</td>
                  <td>He is in charge of the <strong>marketing department</strong>.</td>
                </tr>
                <tr>
                  <td className="nowrap"><strong>Đứng sau Từ hạn định</strong></td>
                  <td>Sau mạo từ (a/an/the) hoặc tính từ sở hữu.</td>
                  <td>Our <strong>manager</strong> will approve the budget.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: '1.7', margin: 0 }}>
            • <strong>Các hậu tố (đuôi) chỉ Danh từ:</strong><br />
            &nbsp;&nbsp;- Chỉ vật/sự việc/trạng thái: <em>-tion</em> (attention), <em>-sion</em> (decision), <em>-ment</em> (management), <em>-ness</em> (sadness), <em>-ity</em> (purity), <em>-ance</em> (importance), <em>-ence</em> (difference), <em>-ship</em> (relationship), <em>-th</em> (growth), <em>-cy</em> (efficiency), <em>-ism</em> (tourism), <em>-ty</em> (safety), <em>-dom</em> (wisdom), <em>-ture</em> (furniture).<br />
            &nbsp;&nbsp;- Chỉ người: <em>-er</em> (employer), <em>-or</em> (director), <em>-ist</em> (receptionist), <em>-ee</em> (employee), <em>-ant</em> (assistant), <em>-ian</em> (technician).<br />
            • <strong>Lưu ý bẫy TOEIC (Danh từ không đếm được):</strong> Không bao giờ thêm "s/es" hoặc mạo từ "a/an" trước các danh từ sau: <strong>information</strong> (thông tin), <strong>equipment</strong> (thiết bị), <strong>furniture</strong> (đồ nội thất), <strong>luggage/baggage</strong> (hành lý), <strong>advice</strong> (lời khuyên), <strong>advertising</strong> (hoạt động quảng cáo).<br />
            • <strong>Danh từ ghép (Compound Nouns) phổ biến:</strong> sales representative (đại diện kinh doanh), customer service (dịch vụ khách hàng), performance appraisal (đánh giá hiệu suất), security guard (nhân viên bảo vệ).
          </p>
        </div>

        {/* 2. Đại từ */}
        <div>
          <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--primary)', borderBottom: '2px solid var(--border)', paddingBottom: '6px', marginBottom: '12px' }}>
            2. Đại từ (Pronouns - P)
          </h3>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: '1.7', margin: '0 0 12px 0' }}>
            • <strong>Khái niệm:</strong> Từ dùng thay thế cho danh từ đã được nhắc tới trước đó để tránh lỗi lặp từ.<br />
            • <strong>Bảng chia hệ thống đại từ nhân xưng và sở hữu:</strong>
          </p>
          <div className="vocab-table-wrapper" style={{ marginBottom: '14px' }}>
            <table className="vocab-table" style={{ fontSize: '0.88rem' }}>
              <thead>
                <tr>
                  <th className="nowrap">Đại từ làm Chủ ngữ</th>
                  <th className="nowrap">Đại từ làm Tân ngữ</th>
                  <th className="nowrap">Tính từ sở hữu (+N)</th>
                  <th className="nowrap">Đại từ sở hữu (Ø)</th>
                  <th className="nowrap">Đại từ phản thân</th>
                  <th>Cách dùng đặc thù</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="nowrap"><strong>I / We</strong></td>
                  <td className="nowrap">me / us</td>
                  <td className="nowrap">my / our</td>
                  <td className="nowrap">mine / ours</td>
                  <td className="nowrap">myself / ourselves</td>
                  <td>Đứng đầu câu làm chủ ngữ hoặc đứng sau động từ/giới từ làm tân ngữ.</td>
                </tr>
                <tr>
                  <td className="nowrap"><strong>You</strong></td>
                  <td className="nowrap">you</td>
                  <td className="nowrap">your</td>
                  <td className="nowrap">yours</td>
                  <td className="nowrap">yourself / yourselves</td>
                  <td>Tính từ sở hữu <em>bắt buộc</em> có danh từ đứng sau. Đại từ sở hữu đứng một mình.</td>
                </tr>
                <tr>
                  <td className="nowrap"><strong>He / She / It</strong></td>
                  <td className="nowrap">him / her / it</td>
                  <td className="nowrap">his / her / its</td>
                  <td className="nowrap">his / hers / -</td>
                  <td className="nowrap">himself / herself / itself</td>
                  <td>Đại từ phản thân dùng khi Chủ ngữ và Tân ngữ cùng là một đối tượng.</td>
                </tr>
                <tr>
                  <td className="nowrap"><strong>They</strong></td>
                  <td className="nowrap">them</td>
                  <td className="nowrap">their</td>
                  <td className="nowrap">theirs</td>
                  <td className="nowrap">themselves</td>
                  <td>Cấu trúc nhấn mạnh: <em>S + (đại từ phản thân) + V</em> hoặc <em>by + phản thân</em>.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: '1.7', margin: 0 }}>
            • <strong>Đại từ bất định (Indefinite Pronouns):</strong> <em>someone, everyone, no one, anyone, somebody, everybody, nobody, anybody, something, everything, nothing, anything</em>. Động từ đi kèm luôn chia ở dạng <strong>số ít</strong>.<br />
            • <strong>Đại từ chỉ định (Demonstrative Pronouns):</strong> <em>this, that, these, those</em>. Dùng để chỉ định khoảng cách gần xa của vật thể.
          </p>
        </div>

        {/* 3. Tính từ */}
        <div>
          <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--primary)', borderBottom: '2px solid var(--border)', paddingBottom: '6px', marginBottom: '12px' }}>
            3. Tính từ (Adjectives - Adj)
          </h3>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: '1.7', margin: '0 0 12px 0' }}>
            • <strong>Khái niệm:</strong> Từ bổ trợ miêu tả đặc trưng, tính chất hoặc trạng thái của danh từ/đại từ.<br />
            • <strong>Các vị trí và cấu trúc bắt buộc:</strong>
          </p>
          <div className="vocab-table-wrapper" style={{ marginBottom: '14px' }}>
            <table className="vocab-table" style={{ fontSize: '0.88rem' }}>
              <thead>
                <tr>
                  <th className="nowrap" style={{ width: '25%' }}>Cấu trúc liên kết</th>
                  <th className="nowrap" style={{ width: '35%' }}>Nguyên lý hoạt động</th>
                  <th>Ví dụ thực tế</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="nowrap"><strong>Adj + Noun</strong></td>
                  <td>Tính từ đứng trước danh từ để bổ nghĩa trực tiếp.</td>
                  <td>This is a <strong>confidential document</strong>.</td>
                </tr>
                <tr>
                  <td className="nowrap"><strong>Linking Verb + Adj</strong></td>
                  <td>Đứng sau: <em>be, become, feel, look, seem, remain, stay</em>.</td>
                  <td>The technician was very <strong>helpful</strong>.</td>
                </tr>
                <tr>
                  <td className="nowrap"><strong>Keep/Make/Find + O + Adj</strong></td>
                  <td>Tác động làm tân ngữ có trạng thái như tính từ chỉ ra.</td>
                  <td>We must keep the files <strong>secure</strong>.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: '1.7', margin: 0 }}>
            • <strong>Hậu tố tính từ:</strong> <em>-ful</em> (useful), <em>-less</em> (harmless), <em>-ive</em> (creative), <em>-able/-ible</em> (reliable, flexible), <em>-al</em> (annual), <em>-ous</em> (continuous), <em>-ic</em> (specific), <em>-ent/-ant</em> (dependent, pleasant), <em>-y</em> (easy).<br />
            • <strong>Phân biệt đuôi -ing và -ed:</strong><br />
            &nbsp;&nbsp;- Tính từ đuôi <strong>-ed</strong>: Chỉ cảm xúc, trạng thái chủ thể cảm nhận (interested in, excited about, bored with).<br />
            &nbsp;&nbsp;- Tính từ đuôi <strong>-ing</strong>: Chỉ tính chất khách quan của sự vật, sự việc tạo ra cảm xúc (interesting presentation, boring seminar).<br />
            • <strong>Tính từ có đuôi -ly (Dễ nhầm là Trạng từ):</strong> <em>friendly</em> (thân thiện), <em>costly</em> (đắt đỏ), <em>timely</em> (kịp thời), <em>lovely</em> (dễ thương), <em>orderly</em> (ngăn nắp).<br />
            • <strong>Trật tự tính từ (OpSACOMP):</strong> <strong>O</strong>pinion (Ý kiến) ➜ <strong>S</strong>ize (Kích thước) ➜ <strong>A</strong>ge (Tuổi tác) ➜ <strong>S</strong>hape (Hình dáng) ➜ <strong>C</strong>olor (Màu sắc) ➜ <strong>O</strong>rigin (Nguồn gốc) ➜ <strong>M</strong>aterial (Chất liệu) ➜ <strong>P</strong>urpose (Mục đích).
          </p>
        </div>

        {/* 4. Động từ */}
        <div>
          <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--primary)', borderBottom: '2px solid var(--border)', paddingBottom: '6px', marginBottom: '12px' }}>
            4. Động từ (Verbs - V)
          </h3>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: '1.7', margin: '0 0 12px 0' }}>
            • <strong>Khái niệm:</strong> Từ chỉ hành động, hoạt động hoặc trạng thái của chủ ngữ.<br />
            • <strong>Phân loại động từ:</strong>
          </p>
          <div className="vocab-table-wrapper" style={{ marginBottom: '14px' }}>
            <table className="vocab-table" style={{ fontSize: '0.88rem' }}>
              <thead>
                <tr>
                  <th className="nowrap" style={{ width: '25%' }}>Loại Động Từ</th>
                  <th className="nowrap" style={{ width: '35%' }}>Đặc điểm cấu trúc</th>
                  <th>Ví dụ thực tế</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="nowrap"><strong>Ngoại động từ (Transitive)</strong></td>
                  <td>Bắt buộc có tân ngữ đứng ngay sau để câu có nghĩa.</td>
                  <td>They <strong>received</strong> the confirmation code.</td>
                </tr>
                <tr>
                  <td className="nowrap"><strong>Nội động từ (Intransitive)</strong></td>
                  <td>Tự bản thân có nghĩa, không đi kèm tân ngữ trực tiếp.</td>
                  <td>The plane <strong>arrived</strong> on schedule.</td>
                </tr>
                <tr>
                  <td className="nowrap"><strong>Động từ khuyết thiếu</strong></td>
                  <td>can, could, will, would, should, must, may + V_inf.</td>
                  <td>You <strong>should review</strong> the guidelines.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: '1.7', margin: 0 }}>
            • <strong>Hậu tố động từ thường gặp:</strong> <em>-ate</em> (activate), <em>-ify</em> (modify), <em>-ize/-ise</em> (finalize), <em>-en</em> (shorten, widen).<br />
            • <strong>Lưu ý:</strong> Nội động từ (ví dụ: fall, rise, happen, arrive, proceed, expire) không bao giờ được chia ở thể bị động (passive voice).
          </p>
        </div>

        {/* 5. Trạng từ */}
        <div>
          <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--primary)', borderBottom: '2px solid var(--border)', paddingBottom: '6px', marginBottom: '12px' }}>
            5. Trạng từ (Adverbs - Adv)
          </h3>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: '1.7', margin: '0 0 12px 0' }}>
            • <strong>Khái niệm:</strong> Từ bổ trợ làm rõ cách thức, tần suất, thời gian, mức độ cho động từ, tính từ, trạng từ khác hoặc cả câu.<br />
            • <strong>Cách cấu tạo:</strong> Tính từ + đuôi <strong>-ly</strong> (e.g. careful ➜ carefully, extreme ➜ extremely).
          </p>
          <div className="vocab-table-wrapper" style={{ marginBottom: '14px' }}>
            <table className="vocab-table" style={{ fontSize: '0.88rem' }}>
              <thead>
                <tr>
                  <th className="nowrap" style={{ width: '25%' }}>Thành phần bổ nghĩa</th>
                  <th className="nowrap" style={{ width: '35%' }}>Quy tắc vị trí</th>
                  <th>Ví dụ cụ thể</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="nowrap"><strong>Động từ thường</strong></td>
                  <td>Đứng trước động từ hoặc đứng sau tân ngữ chính.</td>
                  <td>He <strong>carefully analyzed</strong> the research results.</td>
                </tr>
                <tr>
                  <td className="nowrap"><strong>Tính từ (Adv + Adj)</strong></td>
                  <td>Đứng trước để làm tăng/giảm mức độ của tính từ.</td>
                  <td>The price is <strong>extremely competitive</strong>.</td>
                </tr>
                <tr>
                  <td className="nowrap"><strong>Trạng từ khác</strong></td>
                  <td>Đứng trước trạng từ để tăng cường bổ nghĩa.</td>
                  <td>She speaks English <strong>remarkably well</strong>.</td>
                </tr>
                <tr>
                  <td className="nowrap"><strong>Cả mệnh đề</strong></td>
                  <td>Đứng đầu câu và ngăn cách bằng dấu phẩy.</td>
                  <td><strong>Unfortunately</strong>, the package was lost.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: '1.7', margin: 0 }}>
            • <strong>Trạng từ đặc biệt không có đuôi -ly:</strong> <em>hard</em> (chăm chỉ), <em>fast</em> (nhanh), <em>late</em> (muộn), <em>early</em> (sớm), <em>well</em> (tốt).<br />
            • <strong>Lưu ý phân biệt:</strong> Tránh nhầm lẫn các từ đuôi "-ly" là tính từ (đã nêu ở mục 3).
          </p>
        </div>

        {/* 6. Giới từ */}
        <div>
          <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--primary)', borderBottom: '2px solid var(--border)', paddingBottom: '6px', marginBottom: '12px' }}>
            6. Giới từ (Prepositions - Prep)
          </h3>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: '1.7', margin: '0 0 12px 0' }}>
            • <strong>Khái niệm:</strong> Từ chỉ mối quan hệ về vị trí, phương hướng, thời gian giữa cụm danh từ phía sau nó với các thành phần khác.<br />
            • <strong>Quy tắc bắt buộc:</strong> Sau giới từ phải là Danh từ, Đại từ hoặc động từ đuôi V-ing. (e.g. <em>for processing</em>).
          </p>
          <div className="vocab-table-wrapper" style={{ marginBottom: '14px' }}>
            <table className="vocab-table" style={{ fontSize: '0.88rem' }}>
              <thead>
                <tr>
                  <th className="nowrap" style={{ width: '20%' }}>Giới từ</th>
                  <th className="nowrap" style={{ width: '40%' }}>Sử dụng cho Thời gian</th>
                  <th>Sử dụng cho Nơi chốn / Không gian</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="nowrap"><strong>AT</strong></td>
                  <td>Giờ cụ thể (at 8 AM), mốc thời gian đặc biệt (at noon, at night).</td>
                  <td>Một địa điểm/điểm mốc cụ thể (at the bus stop, at the office).</td>
                </tr>
                <tr>
                  <td className="nowrap"><strong>ON</strong></td>
                  <td>Ngày cụ thể trong tuần, ngày tháng (on Monday, on October 10th).</td>
                  <td>Trên bề mặt phẳng (on the table, on the wall).</td>
                </tr>
                <tr>
                  <td className="nowrap"><strong>IN</strong></td>
                  <td>Buổi lớn (in the morning), tháng, năm, mùa, thế kỷ.</td>
                  <td>Trong một khu vực khép kín, thành phố, quốc gia.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: '1.7', margin: 0 }}>
            • <strong>Cụm giới từ cố định cực kỳ phổ biến trong đề thi TOEIC:</strong><br />
            &nbsp;&nbsp;- <em>in accordance with</em> (phù hợp với)<br />
            &nbsp;&nbsp;- <em>on behalf of</em> (thay mặt cho)<br />
            &nbsp;&nbsp;- <em>prior to</em> (trước khi = before)<br />
            &nbsp;&nbsp;- <em>regardless of</em> (bất kể, bất chấp)<br />
            &nbsp;&nbsp;- <em>in charge of</em> (chịu trách nhiệm)
          </p>
        </div>

        {/* 7. Liên từ */}
        <div>
          <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--primary)', borderBottom: '2px solid var(--border)', paddingBottom: '6px', marginBottom: '12px' }}>
            7. Liên từ (Conjunctions - Conj)
          </h3>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: '1.7', margin: '0 0 12px 0' }}>
            • <strong>Khái niệm:</strong> Từ nối dùng để liên kết các từ loại, cụm từ hoặc mệnh đề lại với nhau trong câu.<br />
            • <strong>Phân loại liên từ chi tiết:</strong>
          </p>
          <div className="vocab-table-wrapper" style={{ marginBottom: '14px' }}>
            <table className="vocab-table" style={{ fontSize: '0.88rem' }}>
              <thead>
                <tr>
                  <th className="nowrap" style={{ width: '25%' }}>Loại liên từ</th>
                  <th className="nowrap" style={{ width: '35%' }}>Mô tả & Công thức</th>
                  <th>Ví dụ minh hoạ</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="nowrap"><strong>Liên từ kết hợp</strong></td>
                  <td>Nối các từ loại tương đương (FANBOYS: for, and, nor, but, or, yet, so).</td>
                  <td>The presentation was long <strong>but</strong> interesting.</td>
                </tr>
                <tr>
                  <td className="nowrap"><strong>Liên từ tương quan</strong></td>
                  <td>Đi kèm theo cặp cố định: both... and, either... or, neither... nor, not only... but also.</td>
                  <td><strong>Either</strong> you submit the report <strong>or</strong> you will be penalized.</td>
                </tr>
                <tr>
                  <td className="nowrap"><strong>Liên từ phụ thuộc</strong></td>
                  <td>Nối mệnh đề phụ thuộc vào mệnh đề chính (because, although, unless, as long as).</td>
                  <td>We won't go out <strong>unless</strong> it stops raining.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 8. Từ hạn định */}
        <div>
          <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--primary)', borderBottom: '2px solid var(--border)', paddingBottom: '6px', marginBottom: '12px' }}>
            8. Từ hạn định (Determiners - Det)
          </h3>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: '1.7', margin: '0 0 12px 0' }}>
            • <strong>Khái niệm:</strong> Từ đứng trước danh từ để giới hạn và xác định đối tượng mà danh từ đang nói tới.<br />
            • <strong>Phân loại từ hạn định và quy tắc chia động từ:</strong>
          </p>
          <div className="vocab-table-wrapper" style={{ marginBottom: '14px' }}>
            <table className="vocab-table" style={{ fontSize: '0.88rem' }}>
              <thead>
                <tr>
                  <th className="nowrap" style={{ width: '25%' }}>Loại từ hạn định</th>
                  <th className="nowrap" style={{ width: '35%' }}>Quy tắc đi kèm danh từ</th>
                  <th>Ví dụ thực tế</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="nowrap"><strong>Mạo từ (Articles)</strong></td>
                  <td>A/An đi với danh từ số ít chưa xác định. The đi với danh từ đã xác định.</td>
                  <td>We hired <strong>a</strong> new manager. <strong>The</strong> manager is very friendly.</td>
                </tr>
                <tr>
                  <td className="nowrap"><strong>Chỉ định (Demonstratives)</strong></td>
                  <td>This / That + Danh từ số ít. <br /> These / Those + Danh từ số nhiều.</td>
                  <td>Look at <strong>those</strong> employees over there.</td>
                </tr>
                <tr>
                  <td className="nowrap"><strong>Tính từ sở hữu</strong></td>
                  <td>my, your, his, her, its, our, their + Danh từ.</td>
                  <td>This is <strong>our</strong> newly constructed office.</td>
                </tr>
                <tr>
                  <td className="nowrap"><strong>Lượng từ (Quantifiers)</strong></td>
                  <td>Danh từ số ít: each, every, another. <br /> Danh từ số nhiều: many, several, few, a few.</td>
                  <td><strong>Each</strong> participant receives a copy of the agenda.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 9. Thán từ */}
        <div>
          <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--primary)', borderBottom: '2px solid var(--border)', paddingBottom: '6px', marginBottom: '12px' }}>
            9. Thán từ (Interjections - Int)
          </h3>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: '1.7', margin: 0 }}>
            • <strong>Khái niệm:</strong> Là những từ ngắn diễn tả cảm xúc bộc phát tức thời (vui mừng, kinh ngạc, đau đớn). Thán từ không có giá trị ngữ pháp cấu trúc liên kết mệnh đề chính, đứng độc lập bằng dấu chấm than (!) hoặc ngăn cách bằng dấu phẩy.<br />
            • <strong>Các thán từ phổ biến nhất trong phần nghe TOEIC:</strong><br />
            &nbsp;&nbsp;- <strong>Wow!</strong> (Kinh ngạc, bất ngờ tích cực): <em>Wow!</em> What a spacious convention center.<br />
            &nbsp;&nbsp;- <strong>Oops!</strong> (Bất ngờ phát hiện lỗi sai nhỏ): <em>Oops!</em> I sent the invoice to the wrong email client.<br />
            &nbsp;&nbsp;- <strong>Ouch!</strong> (Diễn tả sự đau đớn tức thời): <em>Ouch!</em> I pinched my finger in the drawer.<br />
            &nbsp;&nbsp;- <strong>Oh!</strong> (Nhận ra điều gì đó mới hoặc ngạc nhiên): <em>Oh!</em> I didn't see you standing there.<br />
            &nbsp;&nbsp;- <strong>Uh-oh!</strong> (Tỏ ý nhận ra sự cố hoặc rắc rối sắp xảy ra): <em>Uh-oh!</em> The network server has crashed again.
          </p>
        </div>
      </div>
    )
  },
  'tenses': {
    title: '12 Thì Tiếng Anh Toàn Diện (12 Tenses Masterclass)',
    icon: '⏳',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
        
        {/* GIỚI THIỆU CHUNG */}
        <div style={{ background: 'var(--bg-card)', padding: '20px', borderRadius: '8px', borderLeft: '4px solid var(--primary)' }}>
          <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            Hệ thống <strong>12 thì tiếng Anh</strong> là nền tảng cốt lõi của ngữ pháp. Dưới đây là cẩm nang siêu cấp VIP trình bày đầy đủ công thức (dưới dạng bảng trực quan ở từng thì), cách dùng chi tiết có ví dụ dịch nghĩa, cùng các dấu hiệu nhận biết cụ thể giúp bạn ghi nhớ và áp dụng chính xác.
          </p>
        </div>

        {/* NHÓM THÌ HIỆN TẠI */}
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '900', color: 'var(--primary)', borderBottom: '3px solid var(--primary)', paddingBottom: '8px', marginBottom: '24px' }}>
            A. Nhóm Thì Hiện Tại (Present Tenses)
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            
            {/* 1. Hiện tại đơn */}
            <div style={{ background: 'var(--bg-card)', padding: '28px', borderRadius: '8px', border: '1px solid var(--border)' }}>
              <h3 style={{ color: 'var(--text-primary)', fontWeight: '800', margin: '0 0 16px 0', fontSize: '1.15rem', borderLeft: '4px solid #db2777', paddingLeft: '8px' }}>
                1. Hiện tại đơn (Present Simple)
              </h3>
              
              <div className="vocab-table-wrapper" style={{ marginBottom: '16px' }}>
                <table className="vocab-table" style={{ fontSize: '0.85rem' }}>
                  <thead>
                    <tr>
                      <th className="nowrap" style={{ width: '15%' }}>Thể (Form)</th>
                      <th className="nowrap" style={{ width: '40%' }}>Cấu trúc với Động từ thường (V)</th>
                      <th className="nowrap">Cấu trúc với Động từ To Be</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="nowrap"><strong>Khẳng định (+)</strong></td>
                      <td><code style={{ color: 'var(--accent)' }} className="nowrap">S + V(s/es)</code><br /><span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>e.g. He conducts surveys.</span></td>
                      <td><code style={{ color: 'var(--accent)' }} className="nowrap">S + am/is/are + Adj/N</code><br /><span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>e.g. They are qualified.</span></td>
                    </tr>
                    <tr>
                      <td className="nowrap"><strong>Phủ định (-)</strong></td>
                      <td><code style={{ color: 'var(--accent)' }} className="nowrap">S + do/does + not + V_inf</code><br /><span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>e.g. She does not agree.</span></td>
                      <td><code style={{ color: 'var(--accent)' }} className="nowrap">S + am/is/are + not + Adj/N</code><br /><span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>e.g. He is not here.</span></td>
                    </tr>
                    <tr>
                      <td className="nowrap"><strong>Nghi vấn (?)</strong></td>
                      <td><code style={{ color: 'var(--accent)' }} className="nowrap">Do/Does + S + V_inf?</code><br /><span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>e.g. Do they know us?</span></td>
                      <td><code style={{ color: 'var(--accent)' }} className="nowrap">Am/Is/Are + S + Adj/N?</code><br /><span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>e.g. Are you ready?</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                <p style={{ margin: '0 0 8px 0' }}>• <strong>Các cách sử dụng chính:</strong></p>
                <ul style={{ paddingLeft: '20px', margin: '0 0 12px 0' }}>
                  <li>Diễn tả chân lý, sự thật khách quan (e.g. Water freezes at 0°C).</li>
                  <li>Diễn tả thói quen, lịch trình lặp lại ở hiện tại (e.g. I usually check client emails at 8 AM).</li>
                  <li>Chỉ thời khóa biểu, lịch trình tàu xe, máy bay cố định (e.g. The train departs at 9 AM).</li>
                </ul>
                <p style={{ margin: '0 0 4px 0' }}>• <strong>Dấu hiệu nhận biết:</strong> always, usually, often, frequently, sometimes, seldom, rarely, never, every day/week, once a year.</p>
              </div>
            </div>

            {/* 2. Hiện tại tiếp diễn */}
            <div style={{ background: 'var(--bg-card)', padding: '28px', borderRadius: '8px', border: '1px solid var(--border)' }}>
              <h3 style={{ color: 'var(--text-primary)', fontWeight: '800', margin: '0 0 16px 0', fontSize: '1.15rem', borderLeft: '4px solid #db2777', paddingLeft: '8px' }}>
                2. Hiện tại tiếp diễn (Present Continuous)
              </h3>
              
              <div className="vocab-table-wrapper" style={{ marginBottom: '16px' }}>
                <table className="vocab-table" style={{ fontSize: '0.85rem' }}>
                  <thead>
                    <tr>
                      <th className="nowrap" style={{ width: '15%' }}>Thể (Form)</th>
                      <th className="nowrap" style={{ width: '45%' }}>Công thức (Formula)</th>
                      <th className="nowrap">Ví dụ minh hoạ</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="nowrap"><strong>Khẳng định (+)</strong></td>
                      <td><code style={{ color: 'var(--accent)' }} className="nowrap">S + am/is/are + V-ing</code></td>
                      <td>The manager <strong>is reviewing</strong> the budget.</td>
                    </tr>
                    <tr>
                      <td className="nowrap"><strong>Phủ định (-)</strong></td>
                      <td><code style={{ color: 'var(--accent)' }} className="nowrap">S + am/is/are + not + V-ing</code></td>
                      <td>They <strong>are not working</strong> today.</td>
                    </tr>
                    <tr>
                      <td className="nowrap"><strong>Nghi vấn (?)</strong></td>
                      <td><code style={{ color: 'var(--accent)' }} className="nowrap">Am/Is/Are + S + V-ing?</code></td>
                      <td><strong>Is</strong> he <strong>attending</strong> the seminar?</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                <p style={{ margin: '0 0 8px 0' }}>• <strong>Các cách sử dụng chính:</strong></p>
                <ul style={{ paddingLeft: '20px', margin: '0 0 12px 0' }}>
                  <li>Diễn tả hành động đang thực sự xảy ra ngay tại thời điểm nói (e.g. We are discussing the draft).</li>
                  <li>Diễn tả xu hướng thay đổi hoặc hành động diễn ra tạm thời xung quanh hiện tại (e.g. The company is expanding).</li>
                  <li>Diễn tả kế hoạch chắc chắn trong tương lai gần (e.g. She is flying to London tomorrow).</li>
                </ul>
                <p style={{ margin: '0 0 4px 0' }}>• <strong>Dấu hiệu nhận biết:</strong> now, right now, currently, at the moment, Look!, Listen!.</p>
              </div>
            </div>

            {/* 3. Hiện tại hoàn thành */}
            <div style={{ background: 'var(--bg-card)', padding: '28px', borderRadius: '8px', border: '1px solid var(--border)' }}>
              <h3 style={{ color: 'var(--text-primary)', fontWeight: '800', margin: '0 0 16px 0', fontSize: '1.15rem', borderLeft: '4px solid #db2777', paddingLeft: '8px' }}>
                3. Hiện tại hoàn thành (Present Perfect)
              </h3>
              
              <div className="vocab-table-wrapper" style={{ marginBottom: '16px' }}>
                <table className="vocab-table" style={{ fontSize: '0.85rem' }}>
                  <thead>
                    <tr>
                      <th className="nowrap" style={{ width: '15%' }}>Thể (Form)</th>
                      <th className="nowrap" style={{ width: '45%' }}>Công thức (Formula)</th>
                      <th className="nowrap">Ví dụ minh hoạ</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="nowrap"><strong>Khẳng định (+)</strong></td>
                      <td><code style={{ color: 'var(--accent)' }} className="nowrap">S + have/has + V3/ed</code></td>
                      <td>I <strong>have finalized</strong> the research data.</td>
                    </tr>
                    <tr>
                      <td className="nowrap"><strong>Phủ định (-)</strong></td>
                      <td><code style={{ color: 'var(--accent)' }} className="nowrap">S + have/has + not + V3/ed</code></td>
                      <td>We <strong>haven't received</strong> the invoice.</td>
                    </tr>
                    <tr>
                      <td className="nowrap"><strong>Nghi vấn (?)</strong></td>
                      <td><code style={{ color: 'var(--accent)' }} className="nowrap">Have/Has + S + V3/ed?</code></td>
                      <td><strong>Have</strong> they <strong>signed</strong> the agreement?</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                <p style={{ margin: '0 0 8px 0' }}>• <strong>Các cách sử dụng chính:</strong></p>
                <ul style={{ paddingLeft: '20px', margin: '0 0 12px 0' }}>
                  <li>Hành động xảy ra trong quá khứ kéo dài đến hiện tại (e.g. We have worked here for 5 years).</li>
                  <li>Hành động vừa mới xảy ra xong (e.g. She has just finished her presentation).</li>
                  <li>Kinh nghiệm bản thân (e.g. I have never visited this branch before).</li>
                  <li>Hành động xảy ra không rõ thời điểm trong quá khứ, nhấn mạnh kết quả hiện tại (e.g. He has lost his badge).</li>
                </ul>
                <p style={{ margin: '0 0 4px 0' }}>• <strong>Dấu hiệu nhận biết:</strong> since, for, already, yet, just, recently, lately, so far, up to now, ever, never.</p>
              </div>
            </div>

            {/* 4. Hiện tại hoàn thành tiếp diễn */}
            <div style={{ background: 'var(--bg-card)', padding: '28px', borderRadius: '8px', border: '1px solid var(--border)' }}>
              <h3 style={{ color: 'var(--text-primary)', fontWeight: '800', margin: '0 0 16px 0', fontSize: '1.15rem', borderLeft: '4px solid #db2777', paddingLeft: '8px' }}>
                4. Hiện tại hoàn thành tiếp diễn (Present Perfect Continuous)
              </h3>
              
              <div className="vocab-table-wrapper" style={{ marginBottom: '16px' }}>
                <table className="vocab-table" style={{ fontSize: '0.85rem' }}>
                  <thead>
                    <tr>
                      <th className="nowrap" style={{ width: '15%' }}>Thể (Form)</th>
                      <th className="nowrap" style={{ width: '45%' }}>Công thức (Formula)</th>
                      <th className="nowrap">Ví dụ minh hoạ</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="nowrap"><strong>Khẳng định (+)</strong></td>
                      <td><code style={{ color: 'var(--accent)' }} className="nowrap">S + have/has + been + V-ing</code></td>
                      <td>She <strong>has been auditing</strong> the accounts since 8 AM.</td>
                    </tr>
                    <tr>
                      <td className="nowrap"><strong>Phủ định (-)</strong></td>
                      <td><code style={{ color: 'var(--accent)' }} className="nowrap">S + have/has + not + been + V-ing</code></td>
                      <td>We <strong>haven't been using</strong> the backup server.</td>
                    </tr>
                    <tr>
                      <td className="nowrap"><strong>Nghi vấn (?)</strong></td>
                      <td><code style={{ color: 'var(--accent)' }} className="nowrap">Have/Has + S + been + V-ing?</code></td>
                      <td><strong>Have</strong> you <strong>been waiting</strong> for a long time?</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                <p style={{ margin: '0 0 8px 0' }}>• <strong>Các cách sử dụng chính:</strong></p>
                <ul style={{ paddingLeft: '20px', margin: '0 0 12px 0' }}>
                  <li>Diễn tả hành động diễn ra liên tục từ quá khứ đến hiện tại, nhấn mạnh tính liên tục (e.g. He has been testing coding bugs all day).</li>
                  <li>Hành động vừa kết thúc tạm thời nhưng kết quả vẫn còn thấy rõ (e.g. The ground is wet. It has been raining).</li>
                </ul>
                <p style={{ margin: '0 0 4px 0' }}>• <strong>Dấu hiệu nhận biết:</strong> all day, all morning, since, for, since yesterday.</p>
              </div>
            </div>

          </div>
        </div>

        {/* NHÓM THÌ QUÁ KHỨ */}
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '900', color: 'var(--primary)', borderBottom: '3px solid var(--primary)', paddingBottom: '8px', marginBottom: '24px' }}>
            B. Nhóm Thì Quá Khứ (Past Tenses)
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            
            {/* 5. Quá khứ đơn */}
            <div style={{ background: 'var(--bg-card)', padding: '28px', borderRadius: '8px', border: '1px solid var(--border)' }}>
              <h3 style={{ color: 'var(--text-primary)', fontWeight: '800', margin: '0 0 16px 0', fontSize: '1.15rem', borderLeft: '4px solid #2563eb', paddingLeft: '8px' }}>
                5. Quá khứ đơn (Past Simple)
              </h3>
              
              <div className="vocab-table-wrapper" style={{ marginBottom: '16px' }}>
                <table className="vocab-table" style={{ fontSize: '0.85rem' }}>
                  <thead>
                    <tr>
                      <th className="nowrap" style={{ width: '15%' }}>Thể (Form)</th>
                      <th className="nowrap" style={{ width: '40%' }}>Cấu trúc với Động từ thường (V)</th>
                      <th className="nowrap">Cấu trúc với Động từ To Be</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="nowrap"><strong>Khẳng định (+)</strong></td>
                      <td><code style={{ color: 'var(--accent)' }} className="nowrap">S + V2/ed</code><br /><span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>e.g. We hired him yesterday.</span></td>
                      <td><code style={{ color: 'var(--accent)' }} className="nowrap">S + was/were + Adj/N</code><br /><span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>e.g. He was late.</span></td>
                    </tr>
                    <tr>
                      <td className="nowrap"><strong>Phủ định (-)</strong></td>
                      <td><code style={{ color: 'var(--accent)' }} className="nowrap">S + did + not + V_inf</code><br /><span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>e.g. They did not attend.</span></td>
                      <td><code style={{ color: 'var(--accent)' }} className="nowrap">S + was/were + not + Adj/N</code><br /><span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>e.g. We were not ready.</span></td>
                    </tr>
                    <tr>
                      <td className="nowrap"><strong>Nghi vấn (?)</strong></td>
                      <td><code style={{ color: 'var(--accent)' }} className="nowrap">Did + S + V_inf?</code><br /><span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>e.g. Did you check it?</span></td>
                      <td><code style={{ color: 'var(--accent)' }} className="nowrap">Was/Were + S + Adj/N?</code><br /><span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>e.g. Were they present?</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                <p style={{ margin: '0 0 8px 0' }}>• <strong>Các cách sử dụng chính:</strong></p>
                <ul style={{ paddingLeft: '20px', margin: '0 0 12px 0' }}>
                  <li>Diễn tả hành động xảy ra và kết thúc hoàn toàn trong quá khứ, biết rõ thời gian (e.g. We met the supplier yesterday).</li>
                  <li>Các hành động xảy ra liên tiếp trong quá khứ (e.g. She entered the office, printed the contract, and signed it).</li>
                  <li>Thói quen trong quá khứ nay không còn nữa (e.g. I played golf every weekend when I lived in Seoul).</li>
                </ul>
                <p style={{ margin: '0 0 4px 0' }}>• <strong>Dấu hiệu nhận biết:</strong> yesterday, ago, last week/year, in 2020, in the past.</p>
              </div>
            </div>

            {/* 6. Quá khứ tiếp diễn */}
            <div style={{ background: 'var(--bg-card)', padding: '28px', borderRadius: '8px', border: '1px solid var(--border)' }}>
              <h3 style={{ color: 'var(--text-primary)', fontWeight: '800', margin: '0 0 16px 0', fontSize: '1.15rem', borderLeft: '4px solid #2563eb', paddingLeft: '8px' }}>
                6. Quá khứ tiếp diễn (Past Continuous)
              </h3>
              
              <div className="vocab-table-wrapper" style={{ marginBottom: '16px' }}>
                <table className="vocab-table" style={{ fontSize: '0.85rem' }}>
                  <thead>
                    <tr>
                      <th className="nowrap" style={{ width: '15%' }}>Thể (Form)</th>
                      <th className="nowrap" style={{ width: '45%' }}>Công thức (Formula)</th>
                      <th className="nowrap">Ví dụ minh hoạ</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="nowrap"><strong>Khẳng định (+)</strong></td>
                      <td><code style={{ color: 'var(--accent)' }} className="nowrap">S + was/were + V-ing</code></td>
                      <td>I <strong>was formatting</strong> the document at 8 PM.</td>
                    </tr>
                    <tr>
                      <td className="nowrap"><strong>Phủ định (-)</strong></td>
                      <td><code style={{ color: 'var(--accent)' }} className="nowrap">S + was/were + not + V-ing</code></td>
                      <td>They <strong>were not working</strong> when the power went out.</td>
                    </tr>
                    <tr>
                      <td className="nowrap"><strong>Nghi vấn (?)</strong></td>
                      <td><code style={{ color: 'var(--accent)' }} className="nowrap">Was/Were + S + V-ing?</code></td>
                      <td><strong>Were</strong> you <strong>taking</strong> notes during the speech?</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                <p style={{ margin: '0 0 8px 0' }}>• <strong>Các cách sử dụng chính:</strong></p>
                <ul style={{ paddingLeft: '20px', margin: '0 0 12px 0' }}>
                  <li>Diễn tả hành động đang diễn ra tại một thời điểm xác định trong quá khứ (e.g. At 9 PM yesterday, we were flying to Tokyo).</li>
                  <li>Hành động đang diễn ra trong quá khứ thì hành động khác chen ngang vào (chia QK đơn) (e.g. While I was talking, the phone rang).</li>
                  <li>Hai hành động xảy ra song song đồng thời trong quá khứ (e.g. While he was drafting, she was editing).</li>
                </ul>
                <p style={{ margin: '0 0 4px 0' }}>• <strong>Dấu hiệu nhận biết:</strong> at + giờ cụ thể + mốc quá khứ, while, when.</p>
              </div>
            </div>

            {/* 7. Quá khứ hoàn thành */}
            <div style={{ background: 'var(--bg-card)', padding: '28px', borderRadius: '8px', border: '1px solid var(--border)' }}>
              <h3 style={{ color: 'var(--text-primary)', fontWeight: '800', margin: '0 0 16px 0', fontSize: '1.15rem', borderLeft: '4px solid #2563eb', paddingLeft: '8px' }}>
                7. Quá khứ hoàn thành (Past Perfect)
              </h3>
              
              <div className="vocab-table-wrapper" style={{ marginBottom: '16px' }}>
                <table className="vocab-table" style={{ fontSize: '0.85rem' }}>
                  <thead>
                    <tr>
                      <th className="nowrap" style={{ width: '15%' }}>Thể (Form)</th>
                      <th className="nowrap" style={{ width: '45%' }}>Công thức (Formula)</th>
                      <th className="nowrap">Ví dụ minh hoạ</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="nowrap"><strong>Khẳng định (+)</strong></td>
                      <td><code style={{ color: 'var(--accent)' }} className="nowrap">S + had + V3/ed</code></td>
                      <td>They <strong>had signed</strong> the deal before we arrived.</td>
                    </tr>
                    <tr>
                      <td className="nowrap"><strong>Phủ định (-)</strong></td>
                      <td><code style={{ color: 'var(--accent)' }} className="nowrap">S + had + not + V3/ed</code></td>
                      <td>The train <strong>had not left</strong> yet by then.</td>
                    </tr>
                    <tr>
                      <td className="nowrap"><strong>Nghi vấn (?)</strong></td>
                      <td><code style={{ color: 'var(--accent)' }} className="nowrap">Had + S + V3/ed?</code></td>
                      <td><strong>Had</strong> they <strong>submitted</strong> it before the deadline?</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                <p style={{ margin: '0 0 8px 0' }}>• <strong>Các cách sử dụng chính:</strong></p>
                <ul style={{ paddingLeft: '20px', margin: '0 0 12px 0' }}>
                  <li>Diễn tả một hành động xảy ra trước một hành động khác trong quá khứ (e.g. He had printed the file before the system crashed).</li>
                  <li>Hành động xảy ra và kết thúc hoàn toàn trước một thời điểm xác định trong quá khứ (e.g. By 8 PM yesterday, we had finished).</li>
                </ul>
                <p style={{ margin: '0 0 4px 0' }}>• <strong>Dấu hiệu nhận biết:</strong> before, after, by the time, as soon as, by then.</p>
              </div>
            </div>

            {/* 8. Quá khứ hoàn thành tiếp diễn */}
            <div style={{ background: 'var(--bg-card)', padding: '28px', borderRadius: '8px', border: '1px solid var(--border)' }}>
              <h3 style={{ color: 'var(--text-primary)', fontWeight: '800', margin: '0 0 16px 0', fontSize: '1.15rem', borderLeft: '4px solid #2563eb', paddingLeft: '8px' }}>
                8. Quá khứ hoàn thành tiếp diễn (Past Perfect Continuous)
              </h3>
              
              <div className="vocab-table-wrapper" style={{ marginBottom: '16px' }}>
                <table className="vocab-table" style={{ fontSize: '0.85rem' }}>
                  <thead>
                    <tr>
                      <th className="nowrap" style={{ width: '15%' }}>Thể (Form)</th>
                      <th className="nowrap" style={{ width: '45%' }}>Công thức (Formula)</th>
                      <th className="nowrap">Ví dụ minh hoạ</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="nowrap"><strong>Khẳng định (+)</strong></td>
                      <td><code style={{ color: 'var(--accent)' }} className="nowrap">S + had + been + V-ing</code></td>
                      <td>We <strong>had been talking</strong> on the phone for an hour.</td>
                    </tr>
                    <tr>
                      <td className="nowrap"><strong>Phủ định (-)</strong></td>
                      <td><code style={{ color: 'var(--accent)' }} className="nowrap">S + had + not + been + V-ing</code></td>
                      <td>He <strong>had not been working</strong> there long before resigning.</td>
                    </tr>
                    <tr>
                      <td className="nowrap"><strong>Nghi vấn (?)</strong></td>
                      <td><code style={{ color: 'var(--accent)' }} className="nowrap">Had + S + been + V-ing?</code></td>
                      <td><strong>Had</strong> they <strong>been negotiating</strong> prior to the meeting?</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                <p style={{ margin: '0 0 8px 0' }}>• <strong>Các cách sử dụng chính:</strong></p>
                <ul style={{ paddingLeft: '20px', margin: '0 0 12px 0' }}>
                  <li>Diễn tả một hành động xảy ra liên tục không ngắt quãng trước một thời điểm hoặc một hành động khác trong quá khứ, nhằm nhấn mạnh khoảng thời gian kéo dài (e.g. He had been testing coding bugs for three hours before they found the issue).</li>
                </ul>
                <p style={{ margin: '0 0 4px 0' }}>• <strong>Dấu hiệu nhận biết:</strong> for + khoảng thời gian + before / by the time + quá khứ đơn.</p>
              </div>
            </div>

          </div>
        </div>

        {/* NHÓM THÌ TƯƠNG LAI */}
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '900', color: 'var(--primary)', borderBottom: '3px solid var(--primary)', paddingBottom: '8px', marginBottom: '24px' }}>
            C. Nhóm Thì Tương Lai (Future Tenses)
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            
            {/* 9. Tương lai đơn */}
            <div style={{ background: 'var(--bg-card)', padding: '28px', borderRadius: '8px', border: '1px solid var(--border)' }}>
              <h3 style={{ color: 'var(--text-primary)', fontWeight: '800', margin: '0 0 16px 0', fontSize: '1.15rem', borderLeft: '4px solid #059669', paddingLeft: '8px' }}>
                9. Tương lai đơn (Future Simple)
              </h3>
              
              <div className="vocab-table-wrapper" style={{ marginBottom: '16px' }}>
                <table className="vocab-table" style={{ fontSize: '0.85rem' }}>
                  <thead>
                    <tr>
                      <th className="nowrap" style={{ width: '15%' }}>Thể (Form)</th>
                      <th className="nowrap" style={{ width: '40%' }}>Cấu trúc với Động từ thường (V)</th>
                      <th className="nowrap">Cấu trúc với Động từ To Be</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="nowrap"><strong>Khẳng định (+)</strong></td>
                      <td><code style={{ color: 'var(--accent)' }} className="nowrap">S + will + V_inf</code><br /><span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>e.g. We will build a new office.</span></td>
                      <td><code style={{ color: 'var(--accent)' }} className="nowrap">S + will + be + Adj/N</code><br /><span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>e.g. She will be ready soon.</span></td>
                    </tr>
                    <tr>
                      <td className="nowrap"><strong>Phủ định (-)</strong></td>
                      <td><code style={{ color: 'var(--accent)' }} className="nowrap">S + will + not + V_inf</code><br /><span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>e.g. He will not attend.</span></td>
                      <td><code style={{ color: 'var(--accent)' }} className="nowrap">S + will + not + be + Adj/N</code><br /><span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>e.g. They won't be late.</span></td>
                    </tr>
                    <tr>
                      <td className="nowrap"><strong>Nghi vấn (?)</strong></td>
                      <td><code style={{ color: 'var(--accent)' }} className="nowrap">Will + S + V_inf?</code><br /><span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>e.g. Will you help me?</span></td>
                      <td><code style={{ color: 'var(--accent)' }} className="nowrap">Will + S + be + Adj/N?</code><br /><span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>e.g. Will she be present?</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                <p style={{ margin: '0 0 8px 0' }}>• <strong>Các cách sử dụng chính:</strong></p>
                <ul style={{ paddingLeft: '20px', margin: '0 0 12px 0' }}>
                  <li>Dự đoán chủ quan không có căn cứ thực tế cụ thể (e.g. I think they will win).</li>
                  <li>Quyết định bộc phát ngay tại thời điểm nói (e.g. I'll take the call now).</li>
                  <li>Lời hứa, lời đề nghị giúp đỡ, yêu cầu (e.g. We will deliver the goods tomorrow).</li>
                </ul>
                <p style={{ margin: '0 0 4px 0' }}>• <strong>Dấu hiệu nhận biết:</strong> tomorrow, next week, soon, probably, in the future.</p>
              </div>
            </div>

            {/* 10. Tương lai tiếp diễn */}
            <div style={{ background: 'var(--bg-card)', padding: '28px', borderRadius: '8px', border: '1px solid var(--border)' }}>
              <h3 style={{ color: 'var(--text-primary)', fontWeight: '800', margin: '0 0 16px 0', fontSize: '1.15rem', borderLeft: '4px solid #059669', paddingLeft: '8px' }}>
                10. Tương lai tiếp diễn (Future Continuous)
              </h3>
              
              <div className="vocab-table-wrapper" style={{ marginBottom: '16px' }}>
                <table className="vocab-table" style={{ fontSize: '0.85rem' }}>
                  <thead>
                    <tr>
                      <th className="nowrap" style={{ width: '15%' }}>Thể (Form)</th>
                      <th className="nowrap" style={{ width: '45%' }}>Công thức (Formula)</th>
                      <th className="nowrap">Ví dụ minh hoạ</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="nowrap"><strong>Khẳng định (+)</strong></td>
                      <td><code style={{ color: 'var(--accent)' }} className="nowrap">S + will + be + V-ing</code></td>
                      <td>We <strong>will be launching</strong> the app tomorrow morning.</td>
                    </tr>
                    <tr>
                      <td className="nowrap"><strong>Phủ định (-)</strong></td>
                      <td><code style={{ color: 'var(--accent)' }} className="nowrap">S + will + not + be + V-ing</code></td>
                      <td>She <strong>won't be attending</strong> the meeting at 9 AM.</td>
                    </tr>
                    <tr>
                      <td className="nowrap"><strong>Nghi vấn (?)</strong></td>
                      <td><code style={{ color: 'var(--accent)' }} className="nowrap">Will + S + be + V-ing?</code></td>
                      <td><strong>Will</strong> you <strong>be traveling</strong> at this time next Monday?</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                <p style={{ margin: '0 0 8px 0' }}>• <strong>Các cách sử dụng chính:</strong></p>
                <ul style={{ paddingLeft: '20px', margin: '0 0 12px 0' }}>
                  <li>Diễn tả hành động sẽ đang diễn ra tại một thời điểm xác định trong tương lai (e.g. At this time tomorrow, we will be flying to Tokyo).</li>
                  <li>Hành động đang diễn ra trong tương lai thì hành động khác chen ngang vào (e.g. When she arrives, we will be waiting).</li>
                </ul>
                <p style={{ margin: '0 0 4px 0' }}>• <strong>Dấu hiệu nhận biết:</strong> at this time tomorrow, at + giờ + ngày tương lai.</p>
              </div>
            </div>

            {/* 11. Tương lai hoàn thành */}
            <div style={{ background: 'var(--bg-card)', padding: '28px', borderRadius: '8px', border: '1px solid var(--border)' }}>
              <h3 style={{ color: 'var(--text-primary)', fontWeight: '800', margin: '0 0 16px 0', fontSize: '1.15rem', borderLeft: '4px solid #059669', paddingLeft: '8px' }}>
                11. Tương lai hoàn thành (Future Perfect)
              </h3>
              
              <div className="vocab-table-wrapper" style={{ marginBottom: '16px' }}>
                <table className="vocab-table" style={{ fontSize: '0.85rem' }}>
                  <thead>
                    <tr>
                      <th className="nowrap" style={{ width: '15%' }}>Thể (Form)</th>
                      <th className="nowrap" style={{ width: '45%' }}>Công thức (Formula)</th>
                      <th className="nowrap">Ví dụ minh hoạ</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="nowrap"><strong>Khẳng định (+)</strong></td>
                      <td><code style={{ color: 'var(--accent)' }} className="nowrap">S + will + have + V3/ed</code></td>
                      <td>By Friday, they <strong>will have finished</strong> the safety audit.</td>
                    </tr>
                    <tr>
                      <td className="nowrap"><strong>Phủ định (-)</strong></td>
                      <td><code style={{ color: 'var(--accent)' }} className="nowrap">S + will + not + have + V3/ed</code></td>
                      <td>He <strong>won't have completed</strong> the task before the meeting.</td>
                    </tr>
                    <tr>
                      <td className="nowrap"><strong>Nghi vấn (?)</strong></td>
                      <td><code style={{ color: 'var(--accent)' }} className="nowrap">Will + S + have + V3/ed?</code></td>
                      <td><strong>Will</strong> they <strong>have finalized</strong> the draft by next week?</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                <p style={{ margin: '0 0 8px 0' }}>• <strong>Các cách sử dụng chính:</strong></p>
                <ul style={{ paddingLeft: '20px', margin: '0 0 12px 0' }}>
                  <li>Diễn tả hành động sẽ hoàn thành trước một mốc thời gian hoặc trước một hành động khác trong tương lai (e.g. By next Monday, they will have completed the translation).</li>
                </ul>
                <p style={{ margin: '0 0 4px 0' }}>• <strong>Dấu hiệu nhận biết:</strong> by + mốc tương lai, by the time + mệnh đề hiện tại đơn.</p>
              </div>
            </div>

            {/* 12. Tương lai hoàn thành tiếp diễn */}
            <div style={{ background: 'var(--bg-card)', padding: '28px', borderRadius: '8px', border: '1px solid var(--border)' }}>
              <h3 style={{ color: 'var(--text-primary)', fontWeight: '800', margin: '0 0 16px 0', fontSize: '1.15rem', borderLeft: '4px solid #059669', paddingLeft: '8px' }}>
                12. Tương lai hoàn thành tiếp diễn (Future Perfect Continuous)
              </h3>
              
              <div className="vocab-table-wrapper" style={{ marginBottom: '16px' }}>
                <table className="vocab-table" style={{ fontSize: '0.85rem' }}>
                  <thead>
                    <tr>
                      <th className="nowrap" style={{ width: '15%' }}>Thể (Form)</th>
                      <th className="nowrap" style={{ width: '45%' }}>Công thức (Formula)</th>
                      <th className="nowrap">Ví dụ minh hoạ</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="nowrap"><strong>Khẳng định (+)</strong></td>
                      <td><code style={{ color: 'var(--accent)' }} className="nowrap">S + will + have + been + V-ing</code></td>
                      <td>I <strong>will have been working</strong> here for 5 years by next April.</td>
                    </tr>
                    <tr>
                      <td className="nowrap"><strong>Phủ định (-)</strong></td>
                      <td><code style={{ color: 'var(--accent)' }} className="nowrap">S + will + not + have + been + V-ing</code></td>
                      <td>We <strong>won't have been using</strong> that system long before changing.</td>
                    </tr>
                    <tr>
                      <td className="nowrap"><strong>Nghi vấn (?)</strong></td>
                      <td><code style={{ color: 'var(--accent)' }} className="nowrap">Will + S + have + been + V-ing?</code></td>
                      <td><strong>Will</strong> you <strong>have been living</strong> there long by the end of 2026?</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                <p style={{ margin: '0 0 8px 0' }}>• <strong>Các cách sử dụng chính:</strong></p>
                <ul style={{ paddingLeft: '20px', margin: '0 0 12px 0' }}>
                  <li>Diễn tả hành động diễn ra liên tục đến một thời điểm nhất định trong tương lai, nhằm nhấn mạnh thời lượng kéo dài liên tục của hành động đó (e.g. By next month, she will have been managing this shop for ten years).</li>
                </ul>
                <p style={{ margin: '0 0 4px 0' }}>• <strong>Dấu hiệu nhận biết:</strong> by the end of... + for... + khoảng thời gian.</p>
              </div>
            </div>

          </div>
        </div>

        {/* PHẦN ĐẶC BIỆT CỦA TOEIC - CÁCH PHÁT ÂM -ED VÀ -S/ES */}
        <div>
          <h2 style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--accent)', borderBottom: '2px solid var(--border)', paddingBottom: '6px', marginBottom: '16px' }}>
            🔥 Kiến Thức Bổ Trợ TOEIC: Quy Tắc Phát Âm Đuôi Động Từ
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="tips-layout">
            
            {/* Phát âm đuôi -ed */}
            <div className="card" style={{ padding: '20px', background: 'var(--bg-card)' }}>
              <h4 style={{ color: 'var(--primary)', fontWeight: '800', marginBottom: '10px' }}>Cách Phát Âm Đuôi -ED (Động từ Quá khứ)</h4>
              <ul style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', paddingLeft: '16px', lineHeight: '1.7' }}>
                <li>Phát âm là <strong>/id/</strong>: Khi động từ tận cùng bằng âm <strong>/t/</strong> hoặc <strong>/d/</strong>. <br />
                  <span style={{ color: 'var(--text-muted)' }}>e.g. wanted, decided, completed.</span>
                </li>
                <li style={{ marginTop: '8px' }}>Phát âm là <strong>/t/</strong>: Khi động từ tận cùng bằng các âm vô thanh: <strong>/p/, /k/, /f/, /s/, /ʃ/ (sh), /tʃ/ (ch)</strong>. <br />
                  <span style={{ color: 'var(--text-muted)' }}>e.g. stopped, checked, laughed, washed, watched.</span>
                </li>
                <li style={{ marginTop: '8px' }}>Phát âm là <strong>/d/</strong>: Khi động từ tận cùng bằng các âm hữu thanh còn lại (các nguyên âm và phụ âm còn lại). <br />
                  <span style={{ color: 'var(--text-muted)' }}>e.g. opened, played, arrived, planned.</span>
                </li>
              </ul>
            </div>

            {/* Phát âm đuôi -s/es */}
            <div className="card" style={{ padding: '20px', background: 'var(--bg-card)' }}>
              <h4 style={{ color: 'var(--primary)', fontWeight: '800', marginBottom: '10px' }}>Cách Phát Âm Đuôi -S/-ES (Hiện tại đơn)</h4>
              <ul style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', paddingLeft: '16px', lineHeight: '1.7' }}>
                <li>Phát âm là <strong>/iz/</strong>: Khi động từ tận cùng bằng các âm rít: <strong>/s/, /z/, /ʃ/ (sh), /tʃ/ (ch), /dʒ/ (ge/dge)</strong>. <br />
                  <span style={{ color: 'var(--text-muted)' }}>e.g. misses, buzzes, washes, watches, changes.</span>
                </li>
                <li style={{ marginTop: '8px' }}>Phát âm là <strong>/s/</strong>: Khi động từ tận cùng bằng các âm vô thanh: <strong>/p/, /t/, /k/, /f/, /θ/ (th)</strong>. <br />
                  <span style={{ color: 'var(--text-muted)' }}>e.g. stops, meets, works, laughs, months.</span>
                </li>
                <li style={{ marginTop: '8px' }}>Phát âm là <strong>/z/</strong>: Khi động từ tận cùng bằng các nguyên âm và phụ âm hữu thanh còn lại. <br />
                  <span style={{ color: 'var(--text-muted)' }}>e.g. plays, opens, runs, calls, details.</span>
                </li>
              </ul>
            </div>

          </div>
        </div>

      </div>
    )
  },
  'subject-verb-agreement': {
    title: 'Hòa Hợp Chủ Ngữ & Động Từ',
    icon: '🤝',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h4 style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '4px' }}>Nguyên Tắc Chia Động Từ Theo Chủ Ngữ</h4>
        <div className="vocab-table-wrapper">
          <table className="vocab-table" style={{ fontSize: '0.88rem' }}>
            <thead>
              <tr>
                <th className="nowrap">Dạng Chủ Ngữ</th>
                <th className="nowrap">Động Từ</th>
                <th>Ví dụ cụ thể</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="nowrap"><strong>N1 and N2 (2 đối tượng)</strong></td>
                <td className="nowrap" style={{ color: 'var(--success)', fontWeight: '700' }}>Số nhiều</td>
                <td>The manager and the CEO <strong>are</strong> discussing the strategy.</td>
              </tr>
              <tr>
                <td className="nowrap"><strong>N1 as well as / along with + N2</strong></td>
                <td className="nowrap" style={{ color: 'var(--accent)', fontWeight: '700' }}>Chia theo N1</td>
                <td>The supervisor along with his staff <strong>is</strong> attending. (chia theo supervisor)</td>
              </tr>
              <tr>
                <td className="nowrap"><strong>Either N1 or N2 / Neither N1 nor N2</strong></td>
                <td className="nowrap" style={{ color: 'var(--accent)', fontWeight: '700' }}>Chia theo N2</td>
                <td>Neither the director nor the employees <strong>were</strong> present. (chia theo employees)</td>
              </tr>
              <tr>
                <td className="nowrap"><strong>Danh động từ (V-ing làm chủ ngữ)</strong></td>
                <td className="nowrap" style={{ color: 'var(--danger)', fontWeight: '700' }}>Số ít</td>
                <td><strong>Recruiting</strong> qualified candidates <strong>requires</strong> time.</td>
              </tr>
              <tr>
                <td className="nowrap"><strong>Each / Every + Noun số ít</strong></td>
                <td className="nowrap" style={{ color: 'var(--danger)', fontWeight: '700' }}>Số ít</td>
                <td>Every applicant <strong>needs</strong> to submit a resume.</td>
              </tr>
              <tr>
                <td className="nowrap"><strong>Đại từ bất định (Someone, Everyone...)</strong></td>
                <td className="nowrap" style={{ color: 'var(--danger)', fontWeight: '700' }}>Số ít</td>
                <td>Everyone <strong>is</strong> satisfied with the decision.</td>
              </tr>
              <tr>
                <td className="nowrap"><strong>Khoảng cách, Thời gian, Tiền bạc</strong></td>
                <td className="nowrap" style={{ color: 'var(--danger)', fontWeight: '700' }}>Số ít</td>
                <td>Fifty thousand dollars <strong>was</strong> allocated to the project.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  },
  'passive-voice': {
    title: 'Câu Bị Động (Passive Voice)',
    icon: '🔄',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ background: 'var(--bg-card)', padding: '16px', borderRadius: '8px', borderLeft: '4px solid var(--primary)', fontSize: '0.92rem' }}>
          <strong>Quy tắc tổng quát:</strong> <code style={{ fontSize: '1rem', color: 'var(--accent)' }} className="nowrap">Active: S + V + O ➜ Passive: S + BE + V3/ed (+ by O)</code>
        </div>

        <h4 style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '4px' }}>Bảng Chuyển Đổi Bị Động Theo Các Thì</h4>
        <div className="vocab-table-wrapper">
          <table className="vocab-table" style={{ fontSize: '0.88rem' }}>
            <thead>
              <tr>
                <th className="nowrap">Thì Tiếng Anh</th>
                <th className="nowrap">Công thức Bị Động</th>
                <th>Ví dụ</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="nowrap"><strong>Hiện tại đơn</strong></td>
                <td className="nowrap"><code style={{ color: 'var(--accent)' }}>am/is/are + V3/ed</code></td>
                <td>The report <em>is submitted</em> daily.</td>
              </tr>
              <tr>
                <td className="nowrap"><strong>Hiện tại tiếp diễn</strong></td>
                <td className="nowrap"><code style={{ color: 'var(--accent)' }}>am/is/are + being + V3/ed</code></td>
                <td>The office <em>is being cleaned</em>.</td>
              </tr>
              <tr>
                <td className="nowrap"><strong>Quá khứ đơn</strong></td>
                <td className="nowrap"><code style={{ color: 'var(--accent)' }}>was/were + V3/ed</code></td>
                <td>The contract <em>was signed</em> yesterday.</td>
              </tr>
              <tr>
                <td className="nowrap"><strong>Hiện tại hoàn thành</strong></td>
                <td className="nowrap"><code style={{ color: 'var(--accent)' }}>have/has + been + V3/ed</code></td>
                <td>The plans <em>have been approved</em>.</td>
              </tr>
              <tr>
                <td className="nowrap"><strong>Tương lai đơn</strong></td>
                <td className="nowrap"><code style={{ color: 'var(--accent)' }}>will + be + V3/ed</code></td>
                <td>The product <em>will be launched</em> next week.</td>
              </tr>
              <tr>
                <td className="nowrap"><strong>Động từ khuyết thiếu</strong></td>
                <td className="nowrap"><code style={{ color: 'var(--accent)' }}>modal verb + be + V3/ed</code></td>
                <td>Safety guidelines <em>must be followed</em>.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  },
  'gerund-infinitive': {
    title: 'V-ing và To-V',
    icon: '📝',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="tips-layout">
          {/* TO-V */}
          <div className="card" style={{ padding: '20px', background: 'var(--bg-card)' }}>
            <h4 style={{ color: 'var(--primary)', fontWeight: '800', marginBottom: '10px' }}>1. Động từ + TO-V</h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              Theo sau bởi động từ nguyên thể có "To" chỉ mục đích, kế hoạch trong tương lai.<br />
              <strong>Từ thông dụng:</strong>
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '8px' }}>
              {['decide', 'plan', 'hope', 'want', 'agree', 'refuse', 'promise', 'offer', 'expect', 'attempt', 'fail', 'prepare'].map(v => (
                <span key={v} style={{ fontSize: '0.78rem', background: 'var(--border)', padding: '4px 8px', borderRadius: '4px', fontFamily: 'monospace' }} className="nowrap">{v}</span>
              ))}
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '10px' }}>
              Ví dụ: We <strong>decided to postpone</strong> the launch event.
            </p>
          </div>

          {/* V-ing */}
          <div className="card" style={{ padding: '20px', background: 'var(--bg-card)' }}>
            <h4 style={{ color: 'var(--accent)', fontWeight: '800', marginBottom: '10px' }}>2. Động từ + V-ING (Gerund)</h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              Theo sau bởi danh động từ. Đặc biệt: Tất cả giới từ (in/on/at/of/about/for...) + V-ing.<br />
              <strong>Từ thông dụng:</strong>
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '8px' }}>
              {['avoid', 'mind', 'postpone', 'delay', 'suggest', 'consider', 'enjoy', 'finish', 'recommend', 'practice', 'risk', 'keep'].map(v => (
                <span key={v} style={{ fontSize: '0.78rem', background: 'var(--border)', padding: '4px 8px', borderRadius: '4px', fontFamily: 'monospace' }} className="nowrap">{v}</span>
              ))}
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '10px' }}>
              Ví dụ: You should <strong>avoid calling</strong> clients during lunch hours.
            </p>
          </div>
        </div>

        <div className="card" style={{ padding: '20px', background: 'var(--bg-card)' }}>
          <h4 style={{ color: 'var(--success)', fontWeight: '800', marginBottom: '10px' }}>3. Nhóm từ mang nghĩa khác nhau khi đi với TO-V và V-ING</h4>
          <ul style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', paddingLeft: '16px', lineHeight: '1.7' }}>
            <li><strong>STOP:</strong> <br />
              - <em>Stop + V-ing:</em> Dừng hẳn hành động đang làm (e.g., He stopped smoking).<br />
              - <em>Stop + To-V:</em> Dừng việc đang làm để làm việc khác (e.g., She stopped to drink some water).
            </li>
            <li style={{ marginTop: '8px' }}><strong>REMEMBER / FORGET / REGRET:</strong> <br />
              - <em>+ To-V:</em> Nhớ/Quên/Tiếc sẽ phải làm một việc (hành động tương lai) (e.g., Remember to lock the door).<br />
              - <em>+ V-ing:</em> Nhớ/Quên/Tiếc đã làm một việc trong quá khứ (e.g., I remember locking the door).
            </li>
          </ul>
        </div>
      </div>
    )
  },
  'conditionals': {
    title: 'Câu Điều Kiện & Giả Định',
    icon: '🌳',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ background: 'var(--bg-card)', padding: '20px', borderRadius: '8px', borderLeft: '4px solid var(--primary)' }}>
          <strong style={{ fontSize: '1.05rem', color: 'var(--text-primary)', display: 'block', marginBottom: '8px' }}>Câu điều kiện Loại 1 (Có thật ở hiện tại/tương lai)</strong>
          <code style={{ fontSize: '0.88rem', color: 'var(--accent)' }} className="nowrap">IF + S + V(s/es), S + will / can / may + V_inf</code>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '8px', margin: 0 }}>
            • Ví dụ: If the supplier <em>ships</em> the parts today, we <em>will receive</em> them tomorrow. <br />
            • Đảo ngữ: <strong>Should + S + V_inf, S + will + V_inf</strong> (Ví dụ: <em>Should you need</em> assistance, contact us).
          </p>
        </div>

        <div style={{ background: 'var(--bg-card)', padding: '20px', borderRadius: '8px', borderLeft: '4px solid var(--primary)' }}>
          <strong style={{ fontSize: '1.05rem', color: 'var(--text-primary)', display: 'block', marginBottom: '8px' }}>Câu điều kiện Loại 2 (Không có thật ở hiện tại)</strong>
          <code style={{ fontSize: '0.88rem', color: 'var(--accent)' }} className="nowrap">IF + S + V2/ed (were), S + would / could + V_inf</code>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '8px', margin: 0 }}>
            • Lưu ý: Động từ tobe ở mệnh đề IF luôn dùng <strong>were</strong> cho tất cả các chủ ngữ.<br />
            • Ví dụ: If I <em>were</em> the director, I <em>would hire</em> more consultants. <br />
            • Đảo ngữ: <strong>Were + S + to + V_inf, S + would + V_inf</strong> (Ví dụ: <em>Were they to accept</em> the offer, they would relocate).
          </p>
        </div>

        <div style={{ background: 'var(--bg-card)', padding: '20px', borderRadius: '8px', borderLeft: '4px solid var(--primary)' }}>
          <strong style={{ fontSize: '1.05rem', color: 'var(--text-primary)', display: 'block', marginBottom: '8px' }}>Câu điều kiện Loại 3 (Không có thật ở quá khứ)</strong>
          <code style={{ fontSize: '0.88rem', color: 'var(--accent)' }} className="nowrap">IF + S + had + V3/ed, S + would / could + have + V3/ed</code>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '8px', margin: 0 }}>
            • Ví dụ: If they <em>had signed</em> the contract, the dispute <em>would have been</em> avoided. <br />
            • Đảo ngữ: <strong>Had + S + V3/ed, S + would have + V3/ed</strong> (Ví dụ: <em>Had we received</em> the feedback earlier, we would have adjusted our schedule).
          </p>
        </div>

        <div style={{ background: 'rgba(239, 68, 68, 0.03)', border: '1px solid rgba(239, 68, 68, 0.15)', padding: '20px', borderRadius: '8px', borderLeft: '4px solid var(--danger)' }}>
          <strong style={{ fontSize: '1.05rem', color: 'var(--text-primary)', display: 'block', marginBottom: '8px' }}>⭐ Thể giả định (Subjunctive Mode) - Bẫy TOEIC điểm cao</strong>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
            Sau các động từ khuyên bảo, yêu cầu (<em>suggest, recommend, request, demand, insist...</em>) + <strong>THAT</strong>, động từ ở mệnh đề sau luôn chia nguyên thể không "to" (V_inf) cho mọi chủ ngữ.<br />
            • Công thức: <strong>S1 + suggest/recommend + that + S2 + V_inf (hoặc be + V3 nếu bị động)</strong><br />
            • Ví dụ: The board recommended that he <strong>resign</strong> from his post. (không dùng resigns)
          </p>
        </div>
      </div>
    )
  },
  'relative-clauses': {
    title: 'Mệnh Đề Quan Hệ',
    icon: '📎',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h4 style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '4px' }}>Đại từ quan hệ cơ bản</h4>
        <div className="vocab-table-wrapper">
          <table className="vocab-table" style={{ fontSize: '0.88rem' }}>
            <thead>
              <tr>
                <th className="nowrap">Đại từ</th>
                <th className="nowrap">Thay cho N chỉ</th>
                <th className="nowrap">Chức năng ngữ pháp</th>
                <th>Ví dụ</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="nowrap"><strong>WHO</strong></td>
                <td className="nowrap">Người</td>
                <td className="nowrap">Làm Chủ ngữ (sau đó là Động từ)</td>
                <td>The employee <strong>who</strong> solved the issue is here.</td>
              </tr>
              <tr>
                <td className="nowrap"><strong>WHOM</strong></td>
                <td className="nowrap">Người</td>
                <td className="nowrap">Làm Tân ngữ (sau đó là S + V)</td>
                <td>The designer <strong>whom</strong> we hired did a great job.</td>
              </tr>
              <tr>
                <td className="nowrap"><strong>WHICH</strong></td>
                <td className="nowrap">Vật / Sự việc</td>
                <td className="nowrap">Làm Chủ ngữ hoặc Tân ngữ</td>
                <td>The proposal <strong>which</strong> you submitted is interesting.</td>
              </tr>
              <tr>
                <td className="nowrap"><strong>THAT</strong></td>
                <td className="nowrap">Người / Vật</td>
                <td className="nowrap">Làm Chủ ngữ/Tân ngữ (không sau dấu phẩy)</td>
                <td>The team <strong>that</strong> completed the project was awarded.</td>
              </tr>
              <tr>
                <td className="nowrap"><strong>WHOSE</strong></td>
                <td className="nowrap">Người / Vật</td>
                <td className="nowrap">Sở hữu (N1 + whose + N2)</td>
                <td>The company <strong>whose</strong> sales fell is restructuring.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{ background: 'var(--bg-card)', padding: '20px', borderRadius: '8px', borderLeft: '4px solid var(--accent)', marginTop: '8px' }}>
          <strong style={{ fontSize: '1.05rem', color: 'var(--text-primary)', display: 'block', marginBottom: '8px' }}>🔥 Giản lược mệnh đề quan hệ (Rút gọn)</strong>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
            • <strong>Chủ động:</strong> Rút gọn về động từ đuôi <strong>-ING</strong>. <br />
            &nbsp;&nbsp;&nbsp;&nbsp;➜ The man <em>who working</em> there... ➜ The man <em>working</em> there... <br />
            • <strong>Bị động:</strong> Rút gọn về phân từ <strong>V3/-ED</strong>. <br />
            &nbsp;&nbsp;&nbsp;&nbsp;➜ The report <em>which was written</em> by him... ➜ The report <em>written</em> by him...
          </p>
        </div>
      </div>
    )
  },
  'conjunctions-prepositions': {
    title: 'Liên Từ & Giới Từ Toàn Diện (Conjunctions & Prepositions Guide)',
    icon: '🔗',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
        
        {/* GIỚI THIỆU CHUNG */}
        <div style={{ background: 'var(--bg-card)', padding: '20px', borderRadius: '8px', borderLeft: '4px solid var(--primary)' }}>
          <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            Trong cấu trúc câu tiếng Anh, đặc biệt là Part 5 & 6 của đề thi TOEIC, việc phân biệt chính xác <strong>Liên từ (Conjunctions)</strong>, <strong>Giới từ (Prepositions)</strong> và <strong>Trạng từ liên kết (Conjunctive Adverbs)</strong> là điều then chốt để chọn đúng đáp án. Dưới đây là cẩm nang phân tích đầy đủ và trực quan nhất.
          </p>
        </div>

        {/* PHẦN I: GIỚI TỪ (PREPOSITIONS) */}
        <div>
          <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--primary)', borderBottom: '2px solid var(--border)', paddingBottom: '6px', marginBottom: '14px' }}>
            I. Giới từ (Prepositions) - Danh sách Đầy đủ và Phân nhóm Chi tiết
          </h3>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: '1.7', margin: '0 0 16px 0' }}>
            • <strong>Đặc điểm ngữ pháp:</strong> Giới từ là từ đứng trước cụm danh từ, đại từ hoặc danh động từ (V-ing) để kết nối chúng với các thành phần khác trong câu.<br />
            • <strong>Cấu trúc bắt buộc:</strong> <code style={{ color: 'var(--accent)' }} className="nowrap">Preposition + Noun / Pronoun / V-ing</code>
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* 1. Giới từ chỉ Thời gian */}
            <div style={{ background: 'var(--bg-card)', padding: '20px', borderRadius: '8px', border: '1px solid var(--border)' }}>
              <h4 style={{ color: 'var(--text-primary)', fontWeight: '800', marginBottom: '8px', fontSize: '1rem' }}>1. Giới từ chỉ Thời gian (Time Prepositions)</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: '0 0 10px 0', lineHeight: '1.6' }}>
                • <strong>At:</strong> Dùng cho giờ cụ thể, mốc thời gian đặc biệt (e.g. <em>at 5 PM, at noon, at midnight, at the weekend</em>).<br />
                • <strong>On:</strong> Dùng cho thứ trong tuần, ngày tháng cụ thể (e.g. <em>on Monday, on October 10th, on Christmas Day</em>).<br />
                • <strong>In:</strong> Dùng cho buổi lớn, tháng, năm, mùa, thế kỷ, thập kỷ (e.g. <em>in the morning, in August, in 2026, in summer</em>).<br />
                • <strong>During:</strong> Trong suốt một khoảng thời gian/sự kiện diễn ra (e.g. <em>during the presentation, during the seminar</em>).<br />
                • <strong>For / Since:</strong> Cho một khoảng thời gian / Từ một mốc thời gian (dùng nhiều ở thì hoàn thành) (e.g. <em>for 3 years, since 2015</em>).<br />
                • <strong>By / Until:</strong> Trước một thời điểm (hành động xong trước đó) / Cho đến khi (hành động kéo dài liên tục đến lúc đó) (e.g. <em>by Friday, until next week</em>).<br />
                • <strong>Throughout:</strong> Xuyên suốt một khoảng thời gian dài (e.g. <em>throughout the fiscal year</em>).<br />
                • <strong>Within:</strong> Trong vòng một khoảng thời gian (e.g. <em>within 10 business days</em>).<br />
                • <strong>Before / After / Prior to / Ahead of:</strong> Trước khi / Sau khi / Trước khi / Trước thời gian dự kiến (e.g. <em>ahead of schedule, prior to arrival</em>).
              </p>
            </div>

            {/* 2. Giới từ chỉ Nơi chốn / Không gian */}
            <div style={{ background: 'var(--bg-card)', padding: '20px', borderRadius: '8px', border: '1px solid var(--border)' }}>
              <h4 style={{ color: 'var(--text-primary)', fontWeight: '800', marginBottom: '8px', fontSize: '1rem' }}>2. Giới từ chỉ Nơi chốn & Vị trí (Place Prepositions)</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: '0 0 10px 0', lineHeight: '1.6' }}>
                • <strong>At:</strong> Tại một địa điểm hoặc điểm mốc cụ thể (e.g. <em>at the bus stop, at the entrance, at reception</em>).<br />
                • <strong>In:</strong> Bên trong một không gian kín, thành phố, quốc gia (e.g. <em>in the drawer, in Hanoi, in Vietnam</em>).<br />
                • <strong>On:</strong> Trên bề mặt phẳng (e.g. <em>on the desk, on the wall, on the third floor</em>).<br />
                • <strong>Above / Over:</strong> Phía trên (không chạm vào bề mặt) / Phủ lên trên (e.g. <em>above the shelf, over the bridge</em>).<br />
                • <strong>Below / Under / Beneath:</strong> Dưới (thấp hơn) / Ngay dưới (bị che phủ) / Dưới sâu (e.g. <em>below freezing point, under the desk</em>).<br />
                • <strong>Near / Close to / Next to / Beside / By:</strong> Gần / Sát bên / Cạnh bên (e.g. <em>close to the exit, next to the library</em>).<br />
                • <strong>Between / Among:</strong> Ở giữa 2 đối tượng / Ở giữa từ 3 đối tượng trở lên (e.g. <em>between you and me, among the candidates</em>).<br />
                • <strong>In front of / Behind / Opposite:</strong> Phía trước / Phía sau / Đối diện (e.g. <em>in front of the building, opposite the bank</em>).<br />
                • <strong>Inside / Outside:</strong> Bên trong / Bên ngoài (e.g. <em>inside the warehouse, outside the lobby</em>).
              </p>
            </div>

            {/* 3. Giới từ chỉ Phương hướng & Chuyển động */}
            <div style={{ background: 'var(--bg-card)', padding: '20px', borderRadius: '8px', border: '1px solid var(--border)' }}>
              <h4 style={{ color: 'var(--text-primary)', fontWeight: '800', marginBottom: '8px', fontSize: '1rem' }}>3. Giới từ chỉ Phương hướng & Chuyển động (Direction Prepositions)</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: '0 0 10px 0', lineHeight: '1.6' }}>
                • <strong>To / Toward:</strong> Đến điểm đích / Hướng về phía (e.g. <em>go to the store, head toward the exit</em>).<br />
                • <strong>Into / Onto / Out of:</strong> Vào trong / Lên trên bề mặt / Ra ngoài (e.g. <em>walk into the room, jump onto the stage, step out of the car</em>).<br />
                • <strong>Through / Across / Along:</strong> Đi xuyên qua / Băng qua bề mặt rộng / Đi dọc theo (e.g. <em>through the tunnel, across the street, along the river</em>).<br />
                • <strong>Around / Past:</strong> Xung quanh / Đi ngang qua (e.g. <em>around the globe, walk past the post office</em>).<br />
                • <strong>Up / Down / Off:</strong> Lên / Xuống / Rời khỏi, xuống xe (e.g. <em>go up the escalator, go down the stairs, get off the bus</em>).
              </p>
            </div>

            {/* 4. Giới từ chỉ Mục đích, Nguyên nhân, Cách thức, Sở hữu */}
            <div style={{ background: 'var(--bg-card)', padding: '20px', borderRadius: '8px', border: '1px solid var(--border)' }}>
              <h4 style={{ color: 'var(--text-primary)', fontWeight: '800', marginBottom: '8px', fontSize: '1rem' }}>4. Giới từ chỉ Nguyên nhân, Cách thức & Sở hữu</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: '0 0 10px 0', lineHeight: '1.6' }}>
                • <strong>For:</strong> Cho, vì mục đích (e.g. <em>apply for a position, for your reference</em>).<br />
                • <strong>Because of / Due to / Owing to / On account of:</strong> Bởi vì (e.g. <em>due to the inclement weather</em>).<br />
                • <strong>Thanks to / As a result of:</strong> Nhờ vào / Là kết quả của (e.g. <em>thanks to your dedication</em>).<br />
                • <strong>By / With:</strong> Bằng cách (phương tiện, tác nhân) / Bằng công cụ, cùng với (e.g. <em>by express mail, with a pen, with coworker</em>).<br />
                • <strong>Without:</strong> Không có (e.g. <em>without prior notice, without identification</em>).<br />
                • <strong>As:</strong> Với tư cách là, như là (chỉ chức vụ, vai trò) (e.g. <em>work as a senior programmer</em>).<br />
                • <strong>Of:</strong> Của (chỉ sở hữu hoặc chất liệu cấu tạo) (e.g. <em>the policy of the company, made of steel</em>).
              </p>
            </div>

            {/* 5. Cụm giới từ phức hợp và cụm từ cố định trong TOEIC */}
            <div style={{ background: 'var(--bg-card)', padding: '20px', borderRadius: '8px', border: '1px solid var(--border)' }}>
              <h4 style={{ color: 'var(--text-primary)', fontWeight: '800', marginBottom: '8px', fontSize: '1rem' }}>5. Các cụm giới từ phức hợp (Prepositional Phrases) bắt buộc nhớ trong TOEIC</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: '0 0 10px 0', lineHeight: '1.6' }}>
                • <strong>In accordance with:</strong> Phù hợp với, tuân theo (e.g. <em>in accordance with safety guidelines</em>).<br />
                • <strong>On behalf of:</strong> Thay mặt cho (e.g. <em>on behalf of the board of directors</em>).<br />
                • <strong>In terms of:</strong> Về mặt, xét về (e.g. <em>in terms of quality control</em>).<br />
                • <strong>In favor of:</strong> Ủng hộ cho (e.g. <em>we are in favor of the new policy</em>).<br />
                • <strong>With a view to + V-ing:</strong> Nhằm mục đích làm gì (e.g. <em>with a view to increasing sales</em>).<br />
                • <strong>In compliance with:</strong> Tuân thủ theo (e.g. <em>in compliance with environmental laws</em>).<br />
                • <strong>By means of:</strong> Bằng phương tiện, bằng cách (e.g. <em>by means of modern technology</em>).<br />
                • <strong>In light of:</strong> Sau khi cân nhắc, xét tới (e.g. <em>in light of recent events</em>).<br />
                • <strong>In the event of:</strong> Trong trường hợp xảy ra (e.g. <em>in the event of an emergency</em>).<br />
                • <strong>In response to:</strong> Đáp lại, phản hồi lại (e.g. <em>in response to customer inquiries</em>).
              </p>
            </div>

          </div>
        </div>

        {/* PHẦN II: LIÊN TỪ (CONJUNCTIONS) */}
        <div>
          <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--primary)', borderBottom: '2px solid var(--border)', paddingBottom: '6px', marginBottom: '14px' }}>
            II. Liên từ (Conjunctions) - Danh sách Đầy đủ và Cách sử dụng
          </h3>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: '1.7', margin: '0 0 16px 0' }}>
            • <strong>Đặc điểm ngữ pháp:</strong> Liên từ dùng để liên kết các từ, cụm từ hoặc mệnh đề độc lập / mệnh đề phụ thuộc lại với nhau.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* 1. Liên từ kết hợp */}
            <div style={{ background: 'var(--bg-card)', padding: '20px', borderRadius: '8px', border: '1px solid var(--border)' }}>
              <h4 style={{ color: 'var(--text-primary)', fontWeight: '800', marginBottom: '8px', fontSize: '1rem' }}>1. Liên từ Kết hợp (Coordinating Conjunctions)</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: '0 0 10px 0', lineHeight: '1.6' }}>
                Gồm nhóm <strong>FANBOYS</strong> dùng để kết nối các từ loại hoặc mệnh đề độc lập ngang hàng:<br />
                • <strong>For:</strong> Vì (chỉ lý do, nối mệnh đề độc lập, ít gặp hơn because) (e.g. <em>We decided to stay, for it was late</em>).<br />
                • <strong>And:</strong> Và (e.g. <em>She is smart and hard-working</em>).<br />
                • <strong>Nor:</strong> Cũng không (sau đó dùng đảo ngữ) (e.g. <em>He didn't call, nor did he write</em>).<br />
                • <strong>But:</strong> Nhưng (e.g. <em>The price is high but the quality is great</em>).<br />
                • <strong>Or:</strong> Hoặc (e.g. <em>You can pay by cash or credit card</em>).<br />
                • <strong>Yet:</strong> Nhưng, tuy nhiên (e.g. <em>It was simple yet effective</em>).<br />
                • <strong>So:</strong> Vì thế, do đó (e.g. <em>He was tired, so he went home</em>).<br />
                <span style={{ color: 'var(--accent)' }}><strong>* Quy tắc viết dấu phẩy:</strong> Khi nối 2 mệnh đề độc lập (S+V, conj S+V), bắt buộc có dấu phẩy đứng trước liên từ kết hợp.</span>
              </p>
            </div>

            {/* 2. Liên từ tương quan */}
            <div style={{ background: 'var(--bg-card)', padding: '20px', borderRadius: '8px', border: '1px solid var(--border)' }}>
              <h4 style={{ color: 'var(--text-primary)', fontWeight: '800', marginBottom: '8px', fontSize: '1rem' }}>2. Liên từ Tương quan (Correlative Conjunctions)</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: '0 0 10px 0', lineHeight: '1.6' }}>
                Là những cặp liên từ luôn đi đôi với nhau và nối các thành phần cùng từ loại:<br />
                • <strong>Both... and...:</strong> Cả... và... (e.g. <em>Both the manager and the employees were pleased</em>).<br />
                • <strong>Either... or...:</strong> Hoặc... hoặc... (e.g. <em>Either you or your manager needs to verify this</em>).<br />
                • <strong>Neither... nor...:</strong> Không... cũng không... (e.g. <em>Neither the CEO nor his assistants signed it</em>).<br />
                • <strong>Not only... but also...:</strong> Không những... mà còn... (e.g. <em>Not only is he intelligent but also very helpful</em>).<br />
                • <strong>Whether... or...:</strong> Liệu... hay... (e.g. <em>Whether we win or lose, it is a great experience</em>).<br />
                • <strong>Not... but...:</strong> Không phải... mà là... (e.g. <em>It is not a loss, but a lesson</em>).<br />
                • <strong>No sooner... than... / Hardly... when...:</strong> Vừa mới... thì đã... (e.g. <em>No sooner had he left than it rained</em>).
              </p>
            </div>

            {/* 3. Liên từ phụ thuộc */}
            <div style={{ background: 'var(--bg-card)', padding: '20px', borderRadius: '8px', border: '1px solid var(--border)' }}>
              <h4 style={{ color: 'var(--text-primary)', fontWeight: '800', marginBottom: '8px', fontSize: '1rem' }}>3. Liên từ Phụ thuộc (Subordinating Conjunctions)</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: '0 0 10px 0', lineHeight: '1.6' }}>
                Đứng đầu mệnh đề phụ để kết nối với mệnh đề chính:<br />
                • <strong>Thời gian:</strong> <em>when, while, as, before, after, since, until, once (khi mà, một khi), as soon as, by the time, whenever, as long as (chừng nào mà)</em>.<br />
                • <strong>Nguyên nhân:</strong> <em>because, since, as, now that (giờ đây vì), inasmuch as, seeing that (xét thấy rằng)</em>.<br />
                • <strong>Nhượng bộ/Tương phản:</strong> <em>although, even though, though, while, whereas (trong khi trái lại), even if, albeit (mặc dù)</em>.<br />
                • <strong>Điều kiện:</strong> <em>if, unless (nếu không), provided that / providing that (miễn là), as long as, so long as, in case (phòng khi), on condition that (với điều kiện là), supposing (giả sử)</em>.<br />
                • <strong>Mục đích:</strong> <em>so that, in order that (để mà)</em>.<br />
                • <strong>Kết quả:</strong> <em>so... that, such... that (quá... đến nỗi mà)</em>.
              </p>
            </div>

          </div>
        </div>

        {/* PHẦN III: BẢNG SO SÁNH ĐỐI CHIẾU TRỰC QUAN */}
        <div>
          <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--accent)', borderBottom: '2px solid var(--border)', paddingBottom: '6px', marginBottom: '14px' }}>
            III. Bảng Đối Chiếu So Sánh Đầy Đủ Giữa Liên Từ & Giới Từ Có Cùng Nghĩa
          </h3>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: '1.7', margin: '0 0 12px 0' }}>
            Đây là phần kiến thức quan trọng nhất trong đề thi TOEIC. Hãy ghi nhớ: Liên từ đi với mệnh đề `(S + V)` còn Giới từ chỉ đi với cụm danh từ hoặc động từ thêm đuôi `-ing` `(Noun / V-ing)`.
          </p>

          <div className="vocab-table-wrapper" style={{ marginBottom: '16px' }}>
            <table className="vocab-table" style={{ fontSize: '0.85rem' }}>
              <thead>
                <tr>
                  <th className="nowrap" style={{ width: '18%' }}>Ý Nghĩa</th>
                  <th className="nowrap" style={{ width: '41%' }}>LIÊN TỪ (+ Mệnh đề: S + V)</th>
                  <th className="nowrap">GIỚI TỪ (+ Cụm Danh từ / V-ing)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="nowrap"><strong>Bởi vì (Reason)</strong></td>
                  <td>
                    <code style={{ color: 'var(--accent)' }}>Because, Since, As, Inasmuch as, Now that, Seeing that</code><br />
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>e.g. <strong>Because</strong> the product was defective, they recalled it.</span>
                  </td>
                  <td>
                    <code style={{ color: 'var(--accent)' }}>Because of, Due to, Owing to, On account of, Thanks to</code><br />
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>e.g. <strong>Due to</strong> product defects, they recalled it.</span>
                  </td>
                </tr>
                <tr>
                  <td className="nowrap"><strong>Mặc dù (Concession)</strong></td>
                  <td>
                    <code style={{ color: 'var(--accent)' }}>Although, Even though, Though, While, Whereas, Albeit</code><br />
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>e.g. <strong>Although</strong> they faced budget cuts, they finished.</span>
                  </td>
                  <td>
                    <code style={{ color: 'var(--accent)' }}>Despite, In spite of, Regardless of, Notwithstanding</code><br />
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>e.g. <strong>Despite</strong> budget cuts, they finished the project.</span>
                  </td>
                </tr>
                <tr>
                  <td className="nowrap"><strong>Trong khi (Time)</strong></td>
                  <td>
                    <code style={{ color: 'var(--accent)' }}>While, As</code><br />
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>e.g. <strong>While</strong> we were holding the staff meeting...</span>
                  </td>
                  <td>
                    <code style={{ color: 'var(--accent)' }}>During, Throughout</code> (+ N chỉ thời kỳ/sự kiện)<br />
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>e.g. <strong>During</strong> the weekly staff meeting...</span>
                  </td>
                </tr>
                <tr>
                  <td className="nowrap"><strong>Nếu không (Condition)</strong></td>
                  <td>
                    <code style={{ color: 'var(--accent)' }}>Unless</code> (Nếu... không)<br />
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>e.g. We cannot ship <strong>unless</strong> you pay the deposit.</span>
                  </td>
                  <td>
                    <code style={{ color: 'var(--accent)' }}>Without, But for</code> (Không có...)<br />
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>e.g. We cannot ship <strong>without</strong> the deposit payment.</span>
                  </td>
                </tr>
                <tr>
                  <td className="nowrap"><strong>Bên cạnh đó (Addition)</strong></td>
                  <td>
                    <code style={{ color: 'var(--accent)' }}>And</code> (và)<br />
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>e.g. They ordered laptops <strong>and</strong> they bought desks.</span>
                  </td>
                  <td>
                    <code style={{ color: 'var(--accent)' }}>In addition to, Besides, Aside from, Apart from</code><br />
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>e.g. <strong>In addition to</strong> laptops, they bought desks.</span>
                  </td>
                </tr>
                <tr>
                  <td className="nowrap"><strong>Ngoại trừ (Exception)</strong></td>
                  <td>
                    <code style={{ color: 'var(--accent)' }}>Except that</code> (+ mệnh đề)<br />
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>e.g. The report is done <strong>except that</strong> data is missing.</span>
                  </td>
                  <td>
                    <code style={{ color: 'var(--accent)' }}>Except for, Aside from, Excluding, Save for</code><br />
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>e.g. The report is done <strong>except for</strong> the missing data.</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* PHẦN IV: TRẠNG TỪ LIÊN KẾT */}
        <div>
          <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--primary)', borderBottom: '2px solid var(--border)', paddingBottom: '6px', marginBottom: '14px' }}>
            IV. Trạng từ liên kết (Conjunctive Adverbs) - Danh sách và Cách ngắt dấu câu
          </h3>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: '1.7', margin: '0 0 12px 0' }}>
            Trạng từ liên kết dùng để chuyển ý giữa 2 câu độc lập. Chúng <strong>không thể đứng khơi khơi để nối hai câu bằng dấu phẩy</strong> như liên từ. <br />
            • <strong>Vị trí và dấu câu bắt buộc:</strong> <br />
            &nbsp;&nbsp;- Cách 1: <code className="nowrap" style={{ color: 'var(--accent)' }}>Mệnh đề 1. Trạng từ liên kết, Mệnh đề 2</code> (e.g. The server failed. <strong>Therefore</strong>, work stopped.)<br />
            &nbsp;&nbsp;- Cách 2: <code className="nowrap" style={{ color: 'var(--accent)' }}>Mệnh đề 1; Trạng từ liên kết, Mệnh đề 2</code> (e.g. The server failed; <strong>therefore</strong>, work stopped.)
          </p>

          <div className="vocab-table-wrapper">
            <table className="vocab-table" style={{ fontSize: '0.85rem' }}>
              <thead>
                <tr>
                  <th className="nowrap" style={{ width: '25%' }}>Mối Quan Hệ Ý Nghĩa</th>
                  <th className="nowrap" style={{ width: '35%' }}>Các Trạng Từ Liên Kết Phổ Biến</th>
                  <th>Ví dụ & Dịch Nghĩa</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="nowrap"><strong>Tuy nhiên, Trái lại (Contrast)</strong></td>
                  <td><strong>However, Nevertheless, Nonetheless, On the other hand, In contrast, Conversely, Instead</strong></td>
                  <td>Sales decreased; <strong>however</strong>, profits rose due to cuts. <br /><span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>(Doanh số giảm; tuy nhiên, lợi nhuận vẫn tăng do cắt giảm).</span></td>
                </tr>
                <tr>
                  <td className="nowrap"><strong>Do đó, Vì vậy (Result)</strong></td>
                  <td><strong>Therefore, Consequently, As a result, Thus, Hence, Accordingly</strong></td>
                  <td>He missed the train. <strong>Consequently</strong>, he was late. <br /><span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>(Anh ấy lỡ chuyến tàu. Kết quả là, anh ấy đã đi muộn).</span></td>
                </tr>
                <tr>
                  <td className="nowrap"><strong>Hơn nữa, Ngoài ra (Addition)</strong></td>
                  <td><strong>Moreover, Furthermore, In addition, Additionally, Also, Besides</strong></td>
                  <td>We need new tools; <strong>moreover</strong>, we need training. <br /><span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>(Chúng ta cần công cụ mới; hơn nữa, chúng ta cần đào tạo).</span></td>
                </tr>
                <tr>
                  <td className="nowrap"><strong>Nếu không thì (Condition)</strong></td>
                  <td><strong>Otherwise</strong></td>
                  <td>Please sign; <strong>otherwise</strong>, the order will be cancelled. <br /><span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>(Vui lòng ký nhận; nếu không thì đơn hàng sẽ bị hủy).</span></td>
                </tr>
                <tr>
                  <td className="nowrap"><strong>Trong khi đó (Time)</strong></td>
                  <td><strong>Meanwhile, Meantime</strong></td>
                  <td>He is printing files; <strong>meanwhile</strong>, she is signing bills. <br /><span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>(Anh ấy đang in tài liệu; trong khi đó cô ấy ký hóa đơn).</span></td>
                </tr>
                <tr>
                  <td className="nowrap"><strong>Tương tự, Thực tế (Others)</strong></td>
                  <td><strong>Similarly, Likewise, Indeed, In fact, Namely</strong></td>
                  <td>The price is low. <strong>Indeed</strong>, it is the cheapest in town. <br /><span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>(Mức giá này rất thấp. Thực tế, nó là rẻ nhất thành phố).</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    )
  },
  'comparisons': {
    title: 'Cấu Trúc So Sánh',
    icon: '📈',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <h4 style={{ fontWeight: '800', color: 'var(--text-primary)', marginBottom: '6px' }}>1. So Sánh Bằng</h4>
          <div style={{ background: 'var(--bg-card)', padding: '12px 16px', borderRadius: '8px', borderLeft: '3px solid var(--primary)', fontSize: '0.88rem', fontFamily: 'monospace' }} className="nowrap">
            S + V + as + Adj/Adv + as + O
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Ví dụ: The new copier is <strong>as fast as</strong> the old model.
          </p>
        </div>

        <div>
          <h4 style={{ fontWeight: '800', color: 'var(--text-primary)', marginBottom: '6px' }}>2. So Sánh Hơn (Comparative)</h4>
          <ul style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', paddingLeft: '16px', lineHeight: '1.6' }}>
            <li>Tính từ/Trạng từ ngắn (1 âm tiết): <strong>Adj-er + than</strong> (e.g., faster than).</li>
            <li>Tính từ/Trạng từ dài (từ 2 âm tiết): <strong>more + Adj/Adv + than</strong> (e.g., more expensive than).</li>
            <li>Ví dụ: Our market share is <strong>larger than</strong> last quarter.</li>
          </ul>
        </div>

        <div>
          <h4 style={{ fontWeight: '800', color: 'var(--text-primary)', marginBottom: '6px' }}>3. So Sánh Nhất (Superlative)</h4>
          <ul style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', paddingLeft: '16px', lineHeight: '1.6' }}>
            <li>Tính từ/Trạng từ ngắn: <strong>the + Adj-est</strong> (e.g., the lowest cost).</li>
            <li>Tính từ/Trạng từ dài (từ 2 âm tiết): <strong>the most + Adj/Adv</strong> (e.g., the most successful product).</li>
            <li>Ví dụ: She is <strong>the most talented</strong> coordinator in our team.</li>
          </ul>
        </div>

        <div style={{ background: 'var(--bg-card)', padding: '16px', borderRadius: '8px', borderLeft: '4px solid var(--accent)' }}>
          <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>🔥 Cấu trúc So sánh kép (Càng... thì càng...)</strong>
          <code style={{ fontSize: '0.88rem', color: 'var(--accent)' }} className="nowrap">The + Comparative + S + V, the + Comparative + S + V</code>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '6px', margin: 0 }}>
            Ví dụ: <strong>The sooner</strong> you complete the report, <strong>the better</strong> we can prepare.
          </p>
        </div>
      </div>
    )
  },
  'tag-questions': {
    title: 'Câu Hỏi Đuôi (Tag Questions)',
    icon: '❓',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ background: 'var(--bg-card)', padding: '16px', borderRadius: '8px', borderLeft: '4px solid var(--primary)', fontSize: '0.92rem' }}>
          <strong>Quy tắc cơ bản:</strong> Mệnh đề khẳng định ➜ Đuôi phủ định | Mệnh đề phủ định ➜ Đuôi khẳng định. Sử dụng trợ động từ tương ứng và đại từ làm chủ ngữ đuôi. (Ví dụ: You are coming, <em>aren't you</em>?).
        </div>

        <h4 style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '4px' }}>Các trường hợp đặc biệt hay gặp nhất</h4>
        <div className="vocab-table-wrapper">
          <table className="vocab-table" style={{ fontSize: '0.88rem' }}>
            <thead>
              <tr>
                <th className="nowrap">Mệnh đề chính</th>
                <th className="nowrap">Đuôi hỏi</th>
                <th>Ví dụ cụ thể</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="nowrap"><strong>I am...</strong></td>
                <td className="nowrap" style={{ color: 'var(--primary)', fontWeight: '700' }}>..., aren't I?</td>
                <td>I am late, <strong>aren't I</strong>?</td>
              </tr>
              <tr>
                <td className="nowrap"><strong>Let's + V</strong></td>
                <td className="nowrap" style={{ color: 'var(--primary)', fontWeight: '700' }}>..., shall we?</td>
                <td>Let's start the project, <strong>shall we</strong>?</td>
              </tr>
              <tr>
                <td className="nowrap"><strong>Câu mệnh lệnh/yêu cầu</strong></td>
                <td className="nowrap" style={{ color: 'var(--primary)', fontWeight: '700' }}>..., will you?</td>
                <td>Please open the window, <strong>will you</strong>?</td>
              </tr>
              <tr>
                <td className="nowrap"><strong>Chứa từ phủ định (Never, Seldom, Hardly)</strong></td>
                <td className="nowrap" style={{ color: 'var(--primary)', fontWeight: '700' }}>..., khẳng định?</td>
                <td>They hardly call us, <strong>do they</strong>?</td>
              </tr>
              <tr>
                <td className="nowrap"><strong>Đại từ bất định chỉ người (Someone/Everyone)</strong></td>
                <td className="nowrap" style={{ color: 'var(--primary)', fontWeight: '700' }}>..., they?</td>
                <td>Everyone signed the guest book, <strong>didn't they</strong>?</td>
              </tr>
              <tr>
                <td className="nowrap"><strong>Đại từ bất định chỉ vật (Nothing/Something)</strong></td>
                <td className="nowrap" style={{ color: 'var(--primary)', fontWeight: '700' }}>..., it?</td>
                <td>Nothing is broken, <strong>is it</strong>?</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

// Order of topics for navigation buttons
const TOPIC_ORDER = [
  'parts-of-speech',
  'tenses',
  'subject-verb-agreement',
  'passive-voice',
  'gerund-infinitive',
  'conditionals',
  'relative-clauses',
  'conjunctions-prepositions',
  'comparisons',
  'tag-questions',
]

export default function GrammarTopicPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const params = useParams()
  const topicId = (params?.topic as string) || 'parts-of-speech'

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login')
    }
  }, [user, authLoading, router])

  if (authLoading) {
    return (
      <div className="loading-center">
        <div className="spinner" />
        <p>Đang tải chuyên đề ngữ pháp...</p>
      </div>
    )
  }

  if (!user) return null

  const topicData = GRAMMAR_DATABASE[topicId]

  if (!topicData) {
    return (
      <div className="vocab-container">
        <div className="card" style={{ padding: '36px', textAlign: 'center' }}>
          <h3>⚠️ Không tìm thấy chuyên đề này</h3>
          <p style={{ color: 'var(--text-secondary)' }}>Vui lòng chọn chuyên đề khác bên Sidebar.</p>
        </div>
      </div>
    )
  }

  // Calculate Next/Prev topics
  const currentIndex = TOPIC_ORDER.indexOf(topicId)
  const prevTopicId = currentIndex > 0 ? TOPIC_ORDER[currentIndex - 1] : null
  const nextTopicId = currentIndex < TOPIC_ORDER.length - 1 ? TOPIC_ORDER[currentIndex + 1] : null

  const prevTopicData = prevTopicId ? GRAMMAR_DATABASE[prevTopicId] : null
  const nextTopicData = nextTopicId ? GRAMMAR_DATABASE[nextTopicId] : null

  return (
    <div className="vocab-container animate-fade-up" style={{ maxWidth: '1250px', width: '100%', margin: '0 auto' }}>
      
      {/* Header Info */}
      <div style={{ marginBottom: '24px' }}>
        <span style={{ fontSize: '0.78rem', fontWeight: '800', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          SỔ TAY NGỮ PHÁP TOEIC
        </span>
        <h1 className="section-title" style={{ marginTop: '4px', marginBottom: '8px', fontSize: '1.8rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>{topicData.icon}</span> {topicData.title}
        </h1>
        <p className="section-sub" style={{ margin: 0 }}>Chuyên đề {currentIndex + 1} / {TOPIC_ORDER.length}</p>
      </div>

      {/* Main Single Page Document */}
      <div className="card animate-fade" style={{ padding: '40px', minHeight: '400px' }}>
        {topicData.content}
      </div>

      {/* Navigation Buttons (Prev/Next) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', marginTop: '24px' }}>
        {prevTopicData && prevTopicId ? (
          <Link
            href={`/grammar/${prevTopicId}`}
            className="btn btn-ghost"
            style={{
              padding: '12px 20px',
              borderRadius: '8px',
              border: '1px solid var(--border)',
              background: 'var(--bg-card)',
              fontSize: '0.88rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <span>⬅️</span>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>BÀI TRƯỚC</div>
              <strong>{prevTopicData.title}</strong>
            </div>
          </Link>
        ) : (
          <div />
        )}

        {nextTopicData && nextTopicId ? (
          <Link
            href={`/grammar/${nextTopicId}`}
            className="btn btn-primary"
            style={{
              padding: '12px 20px',
              borderRadius: '8px',
              fontSize: '0.88rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginLeft: 'auto'
            }}
          >
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.7rem', opacity: 0.8 }}>BÀI TIẾP THEO</div>
              <strong>{nextTopicData.title}</strong>
            </div>
            <span>➡️</span>
          </Link>
        ) : (
          <div />
        )}
      </div>

    </div>
  )
}
