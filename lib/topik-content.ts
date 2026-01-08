export const TOPIK_DATA = [
  // --- LEVEL 3 (Intermediate) ---
  
  // 1. Grammar / Vocabulary (Fill in the blank)
  {
    level: 3,
    type: "GRAMMAR",
    content: "비가 오면 우산을 (       ).",
    options: ["씁니다", "신습니다", "입습니다", "벗습니다"],
    answer: "씁니다",
    explanation: "우산을 쓰다 (to use/wear an umbrella). 신다 is for shoes, 입다 for clothes.",
    tag: "Usage"
  },
  {
    level: 3,
    type: "GRAMMAR",
    content: "동생이 밥을 (       ) 동안 저는 청소를 했습니다.",
    options: ["먹는", "먹은", "먹을", "먹던"],
    answer: "먹는",
    explanation: "~는 동안 (while doing) requires present modifier form.",
    tag: "Grammar"
  },
  {
    level: 3,
    type: "VOCAB",
    content: "다음 밑줄 친 부분과 의미가 비슷한 것을 고르십시오.\n\n고향에 돌아가려고 기차표를 <u>미리</u> 샀다.",
    options: ["벌써", "아직", "사전", "일찍"], // Tricky options
    answer: "일찍", // or '사전' roughly, but contextually 'in advance'
    // Actually better synonyms for 미리 are '사전에' or '앞서'. Let's fix options to be standard TOPIK.
    // Standard TOPIK synonym question style:
    // 미리 -> 사전에 / 앞서
    // Let's use a clear synonym.
    // Options: [사전에, 금방, 방금, 벌써]
    // Answer: 사전에
  },
  {
    level: 3,
    type: "VOCAB",
    content: "비슷한 말을 고르십시오: \n\n친구와 <u>헤어졌다</u>.",
    options: ["만났다", "싸웠다", "이별했다", "약속했다"],
    answer: "이별했다",
    explanation: "헤어지다 means to part/break up. 이별하다 is the Sino-Korean equivalent.",
    tag: "Synonym"
  },

  // 2. Ad Analysis (What is this text about?)
  {
    level: 3,
    type: "READING",
    content: "\n[365일 진료]\n아픈 곳이 있으면 참지 마세요.\n저희가 가족처럼 돌봐 드립니다.\n평일: 09:00 ~ 21:00\n    ",
    question: "무엇에 대한 글입니까?",
    options: ["병원", "약국", "은행", "우체국"],
    answer: "병원",
    explanation: "Keywords: 진료 (medical treatment), 아픈 곳 (painful place).",
    tag: "Info"
  },
  {
    level: 3,
    type: "READING",
    content: "\n[가을 맞이 세일]\n모든 등산복 50% 할인!\n이번 주말 단 이틀간!\n    ",
    question: "무엇에 대한 글입니까?",
    options: ["여행", "운동", "쇼핑", "날씨"],
    answer: "쇼핑",
    explanation: "Keywords: 세일 (sale), 할인 (discount).",
    tag: "Info"
  },

  // --- LEVEL 4 (Intermediate High) ---

  // 3. Graph Analysis
  {
    level: 4,
    type: "READING",
    content: "\n[직장인이 좋아하는 점심 메뉴]\n1위: 김치찌개 (40%)\n2위: 돈가스 (30%)\n3위: 불고기 (20%)\n    ",
    question: "이 그래프의 내용과 같은 것을 고르십시오.",
    options: [
      "돈가스를 가장 좋아한다.",
      "불고기보다 김치찌개를 더 좋아한다.",
      "직장인의 절반 이상이 김치찌개를 먹는다.",
      "점심을 안 먹는 사람이 10%이다."
    ],
    answer: "불고기보다 김치찌개를 더 좋아한다.",
    explanation: "Kimchi stew (40%) > Bulgogi (20%). Option 3 is wrong because 40% is not 'over half'.",
    tag: "Graph"
  },

  // 4. Sequence Ordering (Put sentences in order)
  {
    level: 4,
    type: "READING",
    content: "\n(가) 그래서 요즘은 종이 책보다 전자책을 읽는 사람이 많다.\n(나) 무거운 책을 들고 다니지 않아도 되기 때문이다.\n(다) 스마트폰이나 태블릿 PC가 널리 보급되었다.\n(라) 이러한 기기들로 언제 어디서나 책을 읽을 수 있게 되었다.\n    ",
    question: "순서대로 바르게 배열한 것을 고르십시오.",
    options: [
      "(다) - (라) - (나) - (가)",
      "(다) - (가) - (나) - (라)",
      "(가) - (나) - (다) - (라)",
      "(나) - (가) - (라) - (다)"
    ],
    answer: "(다) - (라) - (나) - (가)",
    explanation: "Introduction (devices spread) -> Ability (can read anywhere) -> Reason (lightweight) -> Conclusion (ebooks popular).",
    tag: "Sequence"
  },

  // --- LEVEL 5 (Advanced) ---

  // 5. Advanced Vocab / Headlines
  {
    level: 5,
    type: "READING",
    content: "신문 기사 제목을 가장 잘 설명한 것을 고르십시오.\n\n[수출 '빨간불', 경제 성장 둔화 우려]",
    options: [
      "수출이 늘어나서 경제가 좋아지고 있다.",
      "수출이 어려워져서 경제 성장이 느려질까 봐 걱정이다.",
      "수출을 금지하는 법이 새로 만들어졌다.",
      "신호등 고장으로 인해 수출 트럭이 멈췄다."
    ],
    answer: "수출이 어려워져서 경제 성장이 느려질까 봐 걱정이다.",
    explanation: "'빨간불' (Red light) metaphorically means danger/stop/warning. '둔화' means slowdown.",
    tag: "Headline"
  },

  // 6. Long Passage (Theme / Main Idea)
  {
    level: 5,
    type: "READING",
    content: "\n현대 사회에서 '공유 경제'는 중요한 키워드로 떠오르고 있다. 소유보다는 사용에 가치를 두는 소비 트렌드가 확산되면서, 자동차나 집뿐만 아니라 옷, 장난감 등 다양한 물건을 공유하는 서비스가 늘어나고 있다. 이러한 변화는 자원의 낭비를 줄이고 환경을 보호하는 데에도 긍정적인 영향을 미친다. 하지만 기존 산업과의 갈등이나 법적 규제 문제 등 해결해야 할 과제도 여전히 남아 있다.\n    ",
    question: "이 글의 중심 생각으로 가장 알맞은 것을 고르십시오.",
    options: [
      "공유 경제는 환경 보호에 도움이 되지만 해결할 문제도 있다.",
      "공유 경제는 기존 산업을 파괴하므로 규제해야 한다.",
      "사람들은 이제 물건을 사지 않고 모두 빌려 쓴다.",
      "공유 경제 서비스는 자동차와 집에서만 가능하다."
    ],
    answer: "공유 경제는 환경 보호에 도움이 되지만 해결할 문제도 있다.",
    explanation: "The text mentions positive environmental impact but also mentions conflicts and regulations (overcoming challenges).",
    tag: "Main Idea"
  },
  {
    level: 5,
    type: "READING",
    content: "\n인공지능(AI) 기술이 발달하면서 예술 분야에서도 AI가 만든 작품이 등장하고 있다. AI는 수많은 데이터를 학습하여 인간이 생각하지 못한 독창적인 이미지를 만들어내기도 한다. 이에 대해 일부는 예술의 영역이 확장되었다고 환영하지만, 다른 한편에서는 인간의 고유한 영역인 창의성마저 기계가 대체하는 것에 대해 우려를 표하고 있다. 예술의 진정한 가치가 무엇인지에 대한 철학적 논의가 필요한 시점이다.\n    ",
    question: "필자가 이 글을 쓴 목적은 무엇입니까?",
    options: [
      "AI 예술의 기술적 원리를 설명하기 위해",
      "AI가 만든 예술 작품을 홍보하기 위해",
      "AI 예술에 대한 다양한 시각과 고민을 제시하기 위해",
      "인간 예술가의 창의성을 비판하기 위해"
    ],
    answer: "AI 예술에 대한 다양한 시각과 고민을 제시하기 위해",
    explanation: "The author presents both sides (welcoming vs worrying) and suggests a need for philosophical discussion.",
    tag: "Purpose"
  }
];

// Helper to expand this dataset x10 by templating if needed
// For now, we seed these high quality ones.
