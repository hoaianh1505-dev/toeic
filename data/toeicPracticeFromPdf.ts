export interface PdfToeicQuestion {
  _id: string
  part: 5 | 6 | 7
  category: 'Grammar' | 'Reading'
  sourcePdf: string
  passage?: string
  questionText: string
  choices: string[]
  correctAnswer: 'A' | 'B' | 'C' | 'D'
  explanation: string
}

export const toeicPracticeFromPdf: PdfToeicQuestion[] = [
  {
    _id: 'da2-p5-108',
    part: 5,
    category: 'Grammar',
    sourcePdf: 'DA2.pdf',
    questionText:
      'Corporate executives who are unwilling _____ calculated risks occasionally seldom manage to reach the very top.',
    choices: ['at taking', 'taken', 'took', 'to take'],
    correctAnswer: 'D',
    explanation:
      'Trich tu DA2.pdf. Giai thich trong file chi ra cau truc "to be + willing/unwilling + to V", nen dap an dung la "to take".',
  },
  {
    _id: 'da2-p5-109',
    part: 5,
    category: 'Grammar',
    sourcePdf: 'DA2.pdf',
    questionText:
      "Unfortunately, we will have to change all the dates and times _____ on the itinerary I sent you for Mr. Fourie's visit.",
    choices: ['list', 'listing', 'lists', 'listed'],
    correctAnswer: 'D',
    explanation:
      'Trich tu DA2.pdf. Phan giai thich trong file ghi ro can phan tu qua khu dung sau danh tu de bo nghia bi dong, vi vay dap an la "listed".',
  },
  {
    _id: 'da2-p5-110',
    part: 5,
    category: 'Grammar',
    sourcePdf: 'DA2.pdf',
    questionText:
      "The plan to utilize direct marketing techniques _____ from the recommendations made in Ms. Matai's research report.",
    choices: ['involved', 'revolved', 'devolved', 'evolved'],
    correctAnswer: 'D',
    explanation:
      'Trich tu DA2.pdf. Phan giai thich trong PDF neu ro cum nghia "rut ra tu", tuong ung voi "evolved from".',
  },
  {
    _id: 'da2-p5-111',
    part: 5,
    category: 'Grammar',
    sourcePdf: 'DA2.pdf',
    questionText:
      "VH Telecom spokesman, Greg Hollis, predicted that the company's performance would be even _____ next quarter.",
    choices: ['strong', 'strongly', 'strength', 'stronger'],
    correctAnswer: 'D',
    explanation:
      'Trich tu DA2.pdf. Giai thich trong file ghi ro sau "to be" can tinh tu va trong ngu canh nay dang so sanh rut gon, nen chon "stronger".',
  },
  {
    _id: 'da2-p5-112',
    part: 5,
    category: 'Grammar',
    sourcePdf: 'DA2.pdf',
    questionText:
      'The state government today _____ a study showing that the standard of living across society has improved markedly over the last 2 years.',
    choices: ['released', 'enticed', 'avoided', 'grasped'],
    correctAnswer: 'A',
    explanation:
      'Trich tu DA2.pdf. Phan giai thich trong PDF cho biet can chon dong tu co nghia phu hop, va "released a study" la cum dung trong ngu canh.',
  },
  {
    _id: 'da2-p5-113',
    part: 5,
    category: 'Grammar',
    sourcePdf: 'DA2.pdf',
    questionText:
      'Although he is very experienced, Gavin Hastings will not be promoted because he is not _____ appropriate for the executive position.',
    choices: ['advised', 'forced', 'given', 'deemed'],
    correctAnswer: 'D',
    explanation:
      'Trich tu DA2.pdf. PDF giai thich rang cau can mot dong tu mang nghia "duoc danh gia la", vi vay dap an la "deemed".',
  },
  {
    _id: 'da2-p5-114',
    part: 5,
    category: 'Grammar',
    sourcePdf: 'DA2.pdf',
    questionText:
      'The Federal Reserve Bank managed to keep inflation low _____ the period that the economy was in recession.',
    choices: ['throughout', 'among', 'without', 'beside'],
    correctAnswer: 'A',
    explanation:
      'Trich tu DA2.pdf. Giai thich trong file neu can chon tu chi xuyen suot mot khoang thoi gian, do do "throughout" la dap an dung.',
  },
  {
    _id: 'da2-p5-115',
    part: 5,
    category: 'Grammar',
    sourcePdf: 'DA2.pdf',
    questionText:
      '_____ his public speech on the new taxation plan, the governor answered many questions from concerned citizens.',
    choices: ['During', 'For', 'Without', 'By'],
    correctAnswer: 'A',
    explanation:
      'Trich tu DA2.pdf. Cum "during his public speech" phu hop ve nghia va cau truc, nen dap an la "During".',
  },
  {
    _id: 'da2-p6-141',
    part: 6,
    category: 'Reading',
    sourcePdf: 'DA2.pdf',
    passage:
      'From: Tom Knight, Portsmouth Community Board Chairman\nTo: Gregor Berkov, Public Conscience\n\nDear Gregor,\nI am writing to express my _____ again for the work your firm did in promoting our appeal. Thanks to the outstanding effort you made in publicizing our cause, we have been able to collect over $100,000 in donations.\n\nThis should be enough to _____ the cost of building the new youth center downtown. With the serious and growing concerns over youth crime and gangs, our community badly needs a fun and safe facility for young adults to hang out at.\n\nWe would be delighted to use your consulting services again in the future. I will also be happy to recommend your firm to _____ potential clients.\n\nThank you,\nTom Knight',
    questionText:
      'I am writing to express my _____ again for the work your firm did in promoting our appeal.',
    choices: ['ambivalence', 'dissatisfaction', 'gratitude', 'condolence'],
    correctAnswer: 'C',
    explanation:
      'Trich tu DA2.pdf. Trong phan giai thich, dap an duoc xac dinh la "gratitude" vi nguoi viet dang bay to su biet on.',
  },
  {
    _id: 'da2-p6-142',
    part: 6,
    category: 'Reading',
    sourcePdf: 'DA2.pdf',
    passage:
      'From: Tom Knight, Portsmouth Community Board Chairman\nTo: Gregor Berkov, Public Conscience\n\nDear Gregor,\nI am writing to express my gratitude again for the work your firm did in promoting our appeal. Thanks to the outstanding effort you made in publicizing our cause, we have been able to collect over $100,000 in donations.\n\nThis should be enough to _____ the cost of building the new youth center downtown. With the serious and growing concerns over youth crime and gangs, our community badly needs a fun and safe facility for young adults to hang out at.\n\nWe would be delighted to use your consulting services again in the future. I will also be happy to recommend your firm to _____ potential clients.\n\nThank you,\nTom Knight',
    questionText:
      'This should be enough to _____ the cost of building the new youth center downtown.',
    choices: ['estimate', 'charge', 'cover', 'account'],
    correctAnswer: 'C',
    explanation:
      'Trich tu DA2.pdf. Phan giai thich trong PDF cho biet can chon dong tu hop nghia voi "chi tra chi phi", do do "cover" la dap an dung.',
  },
  {
    _id: 'da2-p6-143',
    part: 6,
    category: 'Reading',
    sourcePdf: 'DA2.pdf',
    passage:
      'From: Tom Knight, Portsmouth Community Board Chairman\nTo: Gregor Berkov, Public Conscience\n\nDear Gregor,\nI am writing to express my gratitude again for the work your firm did in promoting our appeal. Thanks to the outstanding effort you made in publicizing our cause, we have been able to collect over $100,000 in donations.\n\nThis should be enough to cover the cost of building the new youth center downtown. With the serious and growing concerns over youth crime and gangs, our community badly needs a fun and safe facility for young adults to hang out at.\n\nWe would be delighted to use your consulting services again in the future. I will also be happy to recommend your firm to _____ potential clients.\n\nThank you,\nTom Knight',
    questionText: 'I will also be happy to recommend your firm to _____ potential clients.',
    choices: ['other', 'another', 'others', 'the other'],
    correctAnswer: 'A',
    explanation:
      'Trich tu DA2.pdf. PDF giai thich ro "other + N", nen phuong an dung la "other potential clients".',
  },
  {
    _id: 'da2-p6-144',
    part: 6,
    category: 'Reading',
    sourcePdf: 'DA2.pdf',
    passage:
      "Living Interiors - Home renovation made easy!\n\nLiving Interiors is the one-stop shop for all your building and renovating needs. Those searching for inspiration or basic advice on how to enhance the look of their home should look no further than Living Interiors' specialist Renovation Consultants. Our consultants are all friendly, highly-trained professionals _____ have a great deal of knowledge and expertise.\n\nOn the other hand, Living Interiors also has plenty to offer more _____ renovators as well. With top quality and reasonably priced building materials, paint and wallpaper, interior fabrics and accessories, builders and experienced home renovators will not need to look anywhere else.\n\nLiving Interiors is the place to go for renovators _____ of innovative ideas, useful advice and affordable materials. Visit your local Living Interiors today!",
    questionText:
      'Our consultants are all friendly, highly-trained professionals _____ have a great deal of knowledge and expertise.',
    choices: ['which', 'who', 'what', 'this'],
    correctAnswer: 'B',
    explanation:
      'Trich tu DA2.pdf. Dai tu quan he thay cho nguoi trong menh de nay la "who", dung nhu giai thich trong PDF.',
  },
  {
    _id: 'da2-p6-145',
    part: 6,
    category: 'Reading',
    sourcePdf: 'DA2.pdf',
    passage:
      "Living Interiors - Home renovation made easy!\n\nLiving Interiors is the one-stop shop for all your building and renovating needs. Those searching for inspiration or basic advice on how to enhance the look of their home should look no further than Living Interiors' specialist Renovation Consultants. Our consultants are all friendly, highly-trained professionals who have a great deal of knowledge and expertise.\n\nOn the other hand, Living Interiors also has plenty to offer more _____ renovators as well. With top quality and reasonably priced building materials, paint and wallpaper, interior fabrics and accessories, builders and experienced home renovators will not need to look anywhere else.\n\nLiving Interiors is the place to go for renovators _____ of innovative ideas, useful advice and affordable materials. Visit your local Living Interiors today!",
    questionText:
      'On the other hand, Living Interiors also has plenty to offer more _____ renovators as well.',
    choices: ['season', 'seasonable', 'seasoned', 'seasoning'],
    correctAnswer: 'C',
    explanation:
      'Trich tu DA2.pdf. Trong phan giai thich, "seasoned" duoc xac dinh la tinh tu chi nguoi da co kinh nghiem.',
  },
  {
    _id: 'da2-p6-146',
    part: 6,
    category: 'Reading',
    sourcePdf: 'DA2.pdf',
    passage:
      "Living Interiors - Home renovation made easy!\n\nLiving Interiors is the one-stop shop for all your building and renovating needs. Those searching for inspiration or basic advice on how to enhance the look of their home should look no further than Living Interiors' specialist Renovation Consultants. Our consultants are all friendly, highly-trained professionals who have a great deal of knowledge and expertise.\n\nOn the other hand, Living Interiors also has plenty to offer more seasoned renovators as well. With top quality and reasonably priced building materials, paint and wallpaper, interior fabrics and accessories, builders and experienced home renovators will not need to look anywhere else.\n\nLiving Interiors is the place to go for renovators _____ of innovative ideas, useful advice and affordable materials. Visit your local Living Interiors today!",
    questionText:
      'Living Interiors is the place to go for renovators _____ of innovative ideas, useful advice and affordable materials.',
    choices: ['needless', 'in need', 'necessary', 'by necessity'],
    correctAnswer: 'B',
    explanation:
      'Trich tu DA2.pdf. PDF giai thich ro cum co dinh "in need of", do do dap an dung la "in need".',
  },
  {
    _id: 'da2-p6-147',
    part: 6,
    category: 'Reading',
    sourcePdf: 'DA2.pdf',
    passage:
      'Attention Museum Patrons.\n\nWe would like to give you advance notice about a temporary closure of the National Museum.\nThere _____ a major ceremony for veterans of World War II in the main gallery at dawn on Friday, April 17. Admission to the event is by invitation, with spaces reserved for public figures and veterans and their families only.\n\n_____ , the museum will be closed to the general public for the entire morning. The museum will not reopen for normal business until 12:30 p.m. in order to give the staff time to clean up after the _____ .\n\nWe would like to apologize to our regular patrons for the inconvenience. However, we trust that you will realize how important it is to honor our war heroes in an appropriate manner.',
    questionText:
      'There _____ a major ceremony for veterans of World War II in the main gallery at dawn on Friday, April 17.',
    choices: ['was', 'will be', 'would have been', 'has been'],
    correctAnswer: 'B',
    explanation:
      'Trich tu DA2.pdf. Giai thich trong file chi ra day la hanh dong se dien ra tai thoi diem cu the trong tuong lai, nen dung thi tuong lai don: "will be".',
  },
  {
    _id: 'da2-p6-148',
    part: 6,
    category: 'Reading',
    sourcePdf: 'DA2.pdf',
    passage:
      'Attention Museum Patrons.\n\nWe would like to give you advance notice about a temporary closure of the National Museum.\nThere will be a major ceremony for veterans of World War II in the main gallery at dawn on Friday, April 17. Admission to the event is by invitation, with spaces reserved for public figures and veterans and their families only.\n\n_____ , the museum will be closed to the general public for the entire morning. The museum will not reopen for normal business until 12:30 p.m. in order to give the staff time to clean up after the _____ .\n\nWe would like to apologize to our regular patrons for the inconvenience. However, we trust that you will realize how important it is to honor our war heroes in an appropriate manner.',
    questionText: '_____ , the museum will be closed to the general public for the entire morning.',
    choices: ['Accord', 'Accordance', 'According', 'Accordingly'],
    correctAnswer: 'D',
    explanation:
      'Trich tu DA2.pdf. PDF giai thich can mot trang tu dung dau cau de bo nghia cho ca cau, va "Accordingly" la lua chon dung.',
  },
  {
    _id: 'da2-p6-149',
    part: 6,
    category: 'Reading',
    sourcePdf: 'DA2.pdf',
    passage:
      'Attention Museum Patrons.\n\nWe would like to give you advance notice about a temporary closure of the National Museum.\nThere will be a major ceremony for veterans of World War II in the main gallery at dawn on Friday, April 17. Admission to the event is by invitation, with spaces reserved for public figures and veterans and their families only.\n\nAccordingly, the museum will be closed to the general public for the entire morning. The museum will not reopen for normal business until 12:30 p.m. in order to give the staff time to clean up after the _____ .\n\nWe would like to apologize to our regular patrons for the inconvenience. However, we trust that you will realize how important it is to honor our war heroes in an appropriate manner.',
    questionText:
      'The museum will not reopen for normal business until 12:30 p.m. in order to give the staff time to clean up after the _____.',
    choices: ['function', 'instance', 'issue', 'situation'],
    correctAnswer: 'A',
    explanation:
      'Trich tu DA2.pdf. Giai thich trong PDF cho biet danh tu phu hop trong ngu canh la "function" theo nghia buoi le/su kien.',
  },
  {
    _id: 'da2-p7-153',
    part: 7,
    category: 'Reading',
    sourcePdf: 'DA2.pdf',
    passage:
      "Announcing Gunnison Motors' Annual January Mega Sale!\nThat's right. It's the beginning of a new year, and that means great deals for you. Gunnison Motors is slashing prices on all 2006 car and truck models to make room for our new inventory.\n\nWe have everything you could ask for. Whether you're interested in a gas-saving small sedan, or a powerful and roomy SUV, you've got to come check out our selection.\n\nBuy now and receive incredible financing options on all of our vehicles. You'll pay absolutely nothing for the first 12 months, with no interest. You can't beat a deal like this.",
    questionText: 'For whom is this advertisement intended?',
    choices: [
      'Owners of 2006 trucks',
      'Someone who wants to buy a used car',
      'A person in need of a new vehicle',
      'Car factory workers',
    ],
    correctAnswer: 'C',
    explanation:
      'Trich tu DA2.pdf. Phan giai thich dan lai cau mo ta cac loai xe va doi tuong mua xe, nen dap an dung la nguoi dang can mot phuong tien moi.',
  },
  {
    _id: 'da2-p7-154',
    part: 7,
    category: 'Reading',
    sourcePdf: 'DA2.pdf',
    passage:
      "Announcing Gunnison Motors' Annual January Mega Sale!\nThat's right. It's the beginning of a new year, and that means great deals for you. Gunnison Motors is slashing prices on all 2006 car and truck models to make room for our new inventory.\n\nWe have everything you could ask for. Whether you're interested in a gas-saving small sedan, or a powerful and roomy SUV, you've got to come check out our selection.\n\nBuy now and receive incredible financing options on all of our vehicles. You'll pay absolutely nothing for the first 12 months, with no interest. You can't beat a deal like this.",
    questionText: 'Why is the sale being held?',
    choices: [
      "To clear out the dealer's old vehicles",
      'To promote brand-new models',
      "To celebrate the business's anniversary",
      'To attract customers in a new region',
    ],
    correctAnswer: 'A',
    explanation:
      'Trich tu DA2.pdf. PDF giai thich dua thang cau "slashing prices on all 2006 car and truck models to make room for our new inventory", nen muc dich la xa hang cu.',
  },
  {
    _id: 'da2-p7-155',
    part: 7,
    category: 'Reading',
    sourcePdf: 'DA2.pdf',
    passage:
      'WORLD CIRCLE TRAVEL AGENCY\nTravel Itinerary\nTraveler: Zachary Sturgis\n\n12/12/07  British Sky #114   London -> Copenhagen   07:25 -> 10:55\n12/18/07  European Air #77   Copenhagen -> Stockholm   09:00 -> 09:45\n12/27/07  European Air #4068 Stockholm -> Vienna   08:10 -> 11:55\n01/05/08  Air Eastern #603   Vienna -> Istanbul   10:40 -> 13:50\n01/15/08  British Sky #82    Istanbul -> London   23:10 -> 05:30',
    questionText: 'About how long will Mr. Sturgis be away from London?',
    choices: ['One week', 'Three weeks', 'One month', 'Three months'],
    correctAnswer: 'C',
    explanation:
      'Trich tu DA2.pdf. Theo lich trinh, chuyen di bat dau ngay 12/12 va ket thuc 15/01, xap xi mot thang.',
  },
  {
    _id: 'da2-p7-156',
    part: 7,
    category: 'Reading',
    sourcePdf: 'DA2.pdf',
    passage:
      'WORLD CIRCLE TRAVEL AGENCY\nTravel Itinerary\nTraveler: Zachary Sturgis\n\n12/12/07  British Sky #114   London -> Copenhagen   07:25 -> 10:55\n12/18/07  European Air #77   Copenhagen -> Stockholm   09:00 -> 09:45\n12/27/07  European Air #4068 Stockholm -> Vienna   08:10 -> 11:55\n01/05/08  Air Eastern #603   Vienna -> Istanbul   10:40 -> 13:50\n01/15/08  British Sky #82    Istanbul -> London   23:10 -> 05:30',
    questionText: 'At what time does Mr. Sturgis leave from Stockholm?',
    choices: ['8:10', '9:45', '10:40', '11:55'],
    correctAnswer: 'A',
    explanation:
      'Trich tu DA2.pdf. Dong lich trinh Stockholm -> Vienna cho thay gio khoi hanh la 08:10.',
  },
  {
    _id: 'da2-p7-157',
    part: 7,
    category: 'Reading',
    sourcePdf: 'DA2.pdf',
    passage:
      'Attention all Freemont City Literature Society members:\nWe are happy to announce the upcoming appearance by Allie Garcia at the Freemont City Auditorium this Thursday at 7:30 p.m. As you know, Ms. Garcia is the award-winning author of the novel Life on the Sea. She will be speaking about the art of imaginative fiction writing and will stay for a cocktail reception afterwards.\n\nAs usual, members of the Freemont City Literature Society enjoy half off on tickets to events at the Freemont City Auditorium. Just remember to bring your membership card with you to the event.',
    questionText: 'Why was this email written?',
    choices: [
      'To notify members of a meeting cancellation',
      'To discuss preparations for a cocktail reception',
      'To announce the publication of a book',
      'To inform members of a special event',
    ],
    correctAnswer: 'D',
    explanation:
      'Trich tu DA2.pdf. Phan giai thich trong PDF dan lai dong thong bao su xuat hien cua Allie Garcia, nen email duoc viet de thong tin ve mot su kien dac biet.',
  },
  {
    _id: 'da2-p7-158',
    part: 7,
    category: 'Reading',
    sourcePdf: 'DA2.pdf',
    passage:
      'Attention all Freemont City Literature Society members:\nWe are happy to announce the upcoming appearance by Allie Garcia at the Freemont City Auditorium this Thursday at 7:30 p.m. As you know, Ms. Garcia is the award-winning author of the novel Life on the Sea. She will be speaking about the art of imaginative fiction writing and will stay for a cocktail reception afterwards.\n\nAs usual, members of the Freemont City Literature Society enjoy half off on tickets to events at the Freemont City Auditorium. Just remember to bring your membership card with you to the event.',
    questionText: 'What is taking place at the Freemont City Auditorium?',
    choices: [
      'A literature society presidential election',
      'A talk on creative writing',
      'A seminar about an author',
      'A private dinner party',
    ],
    correctAnswer: 'B',
    explanation:
      'Trich tu DA2.pdf. File giai thich dan lai chi tiet ve viec Allie Garcia se noi ve imaginative fiction writing, nen dap an dung la mot bua noi chuyen ve sang tac.',
  },
  {
    _id: 'da2-p7-159',
    part: 7,
    category: 'Reading',
    sourcePdf: 'DA2.pdf',
    passage:
      'Attention all Freemont City Literature Society members:\nWe are happy to announce the upcoming appearance by Allie Garcia at the Freemont City Auditorium this Thursday at 7:30 p.m. As you know, Ms. Garcia is the award-winning author of the novel Life on the Sea. She will be speaking about the art of imaginative fiction writing and will stay for a cocktail reception afterwards.\n\nAs usual, members of the Freemont City Literature Society enjoy half off on tickets to events at the Freemont City Auditorium. Just remember to bring your membership card with you to the event.',
    questionText: 'What will Freemont City Literature Society members receive?',
    choices: [
      'Discounted admission',
      'Free copies of a novel',
      'New membership cards',
      "The author's autograph",
    ],
    correctAnswer: 'A',
    explanation:
      'Trich tu DA2.pdf. PDF giai thich chi ro thanh vien duoc half off on tickets, nen dap an la "Discounted admission".',
  },
]
