export type GuideSection = {
  heading: string;
  paragraphs: string[];
};

export type GuideFaq = {
  question: string;
  answer: string;
};

export type GuideContent = {
  title: string;
  description: string;
  excerpt: string;
  sections: GuideSection[];
  faq: GuideFaq[];
  ctaHeading: string;
  ctaBody: string;
};

export type Guide = {
  slug: string;
  publishedAt: string;
  relatedListingSlugs: string[];
  /** Prefer Russian when locale is ru; everything else uses English. */
  content: { en: GuideContent; ru: GuideContent };
};

export const guides: Guide[] = [
  {
    slug: "rent-apartment-alanya",
    publishedAt: "2026-03-20",
    relatedListingSlugs: [
      "besthome-36-rent-1-1",
      "besthome-37-rent-1-1",
      "besthome-36-rent-2-1",
      "besthome-37-duplex-rent-2-1",
    ],
    content: {
      en: {
        title: "How to Rent an Apartment in Alanya: Prices, Deposits & Tips",
        description:
          "Practical guide to renting an apartment in Alanya, Turkey — monthly prices for 1+1 and 2+1, deposits, contracts, BestHome complexes, and how LOS ESTATE helps English- and Russian-speaking tenants.",
        excerpt:
          "From deposit rules to BestHome 1+1 and 2+1 options — what to expect when renting long-term in Alanya Center.",
        sections: [
          {
            heading: "Who rents in Alanya and why",
            paragraphs: [
              "Alanya attracts remote workers, winter residents, and families who want Mediterranean living with lower costs than Western Europe. Most long-term tenants look for furnished 1+1 or 2+1 apartments close to Cleopatra Beach, the center, or well-managed complexes such as BestHome.",
              "LOS ESTATE works daily with English- and Russian-speaking clients: we shortlist apartments, arrange viewings, and coordinate keys and contracts so you can move in without guessing from portal ads alone.",
            ],
          },
          {
            heading: "Typical monthly rent levels",
            paragraphs: [
              "Prices move with season, furnishing, and complex quality. As a working range for Alanya Center / BestHome-style residences: compact 1+1 units often sit in a mid monthly band, while larger 2+1 and duplex apartments command higher rents — especially with pool views or full furniture packages.",
              "Always confirm the current asking rent and what it includes (internet, building dues, pool access). Our live listings show verified photos and prices; ask on WhatsApp for today’s availability.",
            ],
          },
          {
            heading: "Deposit, contract and move-in",
            paragraphs: [
              "Expect a security deposit (commonly one or two months) plus the first month’s rent. Read the contract for notice period, inventory list, and who pays building maintenance (aidat).",
              "We recommend a written inventory with photos on move-in day. If you need a Turkish contract explained in English or Russian, our team walks you through the main clauses before you sign.",
            ],
          },
          {
            heading: "Best areas for long-term rent",
            paragraphs: [
              "Alanya Center suits tenants who want shops, cafés, and beach access on foot. BestHome 36 and BestHome 37 (The Legend) are popular for secure complexes with pools and consistent finishes — ideal if you want predictable quality rather than a one-off private flat.",
              "If you plan a winter stay (October–March), book earlier: good furnished units fill up when European and CIS tenants arrive for the season.",
            ],
          },
        ],
        faq: [
          {
            question: "Can foreigners rent an apartment in Alanya?",
            answer:
              "Yes. Non-residents commonly rent with a passport and a standard Turkish rental contract. LOS ESTATE helps prepare documents and coordinates with the landlord.",
          },
          {
            question: "Is furniture included?",
            answer:
              "Most of our rental listings are furnished or semi-furnished. Check each listing description and ask us to confirm inventory before signing.",
          },
          {
            question: "How fast can I move in?",
            answer:
              "If the apartment is vacant and documents are ready, move-in can be arranged within a few days after deposit and contract. Message us on WhatsApp with your dates.",
          },
        ],
        ctaHeading: "Ready to rent in Alanya?",
        ctaBody:
          "Tell us your budget, dates, and preferred layout (1+1 or 2+1). We reply on WhatsApp with matching apartments from our current stock.",
      },
      ru: {
        title: "Как снять квартиру в Алании: цены, залог и советы",
        description:
          "Практический гид по аренде квартиры в Алании, Турция — цены на 1+1 и 2+1, залог, договор, комплексы BestHome и помощь LOS ESTATE для русскоязычных арендаторов.",
        excerpt:
          "Залог, договор и варианты 1+1 / 2+1 в BestHome — что важно знать перед долгосрочной арендой в центре Алании.",
        sections: [
          {
            heading: "Кто снимает жильё в Алании",
            paragraphs: [
              "Алания популярна у удалённых специалистов, «зимовщиков» и семей, которые хотят жить у моря дешевле, чем в Западной Европе. Чаще всего ищут меблированные 1+1 или 2+1 рядом с пляжем Клеопатра, в центре или в комплексах вроде BestHome.",
              "LOS ESTATE ежедневно работает с русско- и англоязычными клиентами: подбираем объекты, организуем просмотры, ключи и договор — без риска ориентироваться только на объявления с порталов.",
            ],
          },
          {
            heading: "Ориентиры по месячной аренде",
            paragraphs: [
              "Цены зависят от сезона, мебели и уровня комплекса. В центре Алании и в BestHome компактные 1+1 обычно в среднем диапазоне, а просторные 2+1 и дуплексы дороже — особенно с видом на бассейн или полной меблировкой.",
              "Всегда уточняйте актуальную цену и что входит (интернет, aidat, бассейн). На сайте — проверенные фото и цены; напишите в WhatsApp, чтобы узнать свободные варианты сегодня.",
            ],
          },
          {
            heading: "Залог, договор и заселение",
            paragraphs: [
              "Обычно берут залог (один–два месяца) плюс оплату первого месяца. В договоре смотрите срок уведомления, опись имущества и кто платит за содержание дома (aidat).",
              "Рекомендуем фото-опись при заселении. Если нужен турецкий договор с пояснениями на русском — мы разберём ключевые пункты до подписи.",
            ],
          },
          {
            heading: "Лучшие районы для долгосрочной аренды",
            paragraphs: [
              "Центр Алании удобен, если важны магазины, кафе и пляж пешком. BestHome 36 и BestHome 37 (The Legend) выбирают за охраняемый комплекс, бассейн и стабильное качество отделки.",
              "На зиму (октябрь–март) бронируйте раньше: хорошие меблированные квартиры разбирают, когда приезжают арендаторы из Европы и СНГ.",
            ],
          },
        ],
        faq: [
          {
            question: "Могут ли иностранцы снимать квартиру в Алании?",
            answer:
              "Да. Обычно достаточно паспорта и стандартного турецкого договора аренды. LOS ESTATE помогает с документами и связью с собственником.",
          },
          {
            question: "Мебель входит в аренду?",
            answer:
              "Большинство наших объектов сдаются с мебелью или частично меблированными. Уточняйте опись по каждому объявлению перед подписанием.",
          },
          {
            question: "Как быстро можно заехать?",
            answer:
              "Если квартира свободна и документы готовы, заселение часто возможно за несколько дней после залога и договора. Напишите даты в WhatsApp.",
          },
        ],
        ctaHeading: "Готовы снять квартиру в Алании?",
        ctaBody:
          "Напишите бюджет, даты и желаемую планировку (1+1 или 2+1). Ответим в WhatsApp с подходящими вариантами из актуальной базы.",
      },
    },
  },
  {
    slug: "buy-apartment-alanya",
    publishedAt: "2026-03-21",
    relatedListingSlugs: [
      "besthome-36-sale-2-1-84",
      "besthome-36-sale-duplex-2-1-99",
      "besthome-37-sale-duplex-2-1-119",
      "gazipasa-beach-hotel",
    ],
    content: {
      en: {
        title: "Buying an Apartment in Alanya as a Foreigner: Steps & Costs",
        description:
          "How foreigners buy property in Alanya, Turkey — steps, typical costs, BestHome apartments for sale, and hotel investments in Gazipaşa with LOS ESTATE support in English and Russian.",
        excerpt:
          "From viewing to title deed: a clear path for international buyers looking at Alanya apartments and coastal investments.",
        sections: [
          {
            heading: "Why buyers choose Alanya",
            paragraphs: [
              "Alanya combines year-round climate, rental demand, and a mature market of residential complexes. Investors often buy 1+1 or 2+1 apartments for personal use plus seasonal rental income; others look at boutique hotels for higher yield.",
              "LOS ESTATE advises English- and Russian-speaking buyers on stock that is actually available — not only portal screenshots — including BestHome sale units and selected hotels in Alanya and Gazipaşa.",
            ],
          },
          {
            heading: "Main steps of a purchase",
            paragraphs: [
              "Typical flow: shortlist and viewings → reservation / deposit → due diligence and lawyer review → notary / title deed (tapu) process → keys and utilities. Exact documents depend on nationality and property type.",
              "We coordinate viewings, introduce trusted local lawyers when needed, and keep communication in your language so you understand each fee and signature.",
            ],
          },
          {
            heading: "Apartments vs hotel investments",
            paragraphs: [
              "Apartments in complexes like BestHome 36 / 37 are easier to manage and rent. They suit buyers who want living space or simple long-term / winter rental income.",
              "Hotels (for example beachfront stock in Gazipaşa) need operational experience or a management partner. Higher capital, higher complexity — and potentially higher return. Ask us which profile matches your budget and risk.",
            ],
          },
          {
            heading: "Costs beyond the asking price",
            paragraphs: [
              "Budget for title deed fees, possible VAT or exemptions depending on the case, lawyer fees, and furniture if the unit is sold empty. Building dues (aidat) continue after purchase.",
              "Request a written cost outline before you commit. Transparent numbers protect both sides and speed up closing.",
            ],
          },
        ],
        faq: [
          {
            question: "Can foreigners get a title deed in Turkey?",
            answer:
              "In most cases yes for residential property, subject to current regulations and property location. We recommend confirming eligibility with a lawyer for your nationality.",
          },
          {
            question: "Do I need to visit Alanya in person?",
            answer:
              "In-person viewings are best, but some steps can be prepared remotely. Tell us your timeline and we will propose a realistic plan.",
          },
          {
            question: "What budgets are common for BestHome apartments?",
            answer:
              "Sale prices vary by floor, view, and layout (1+1, 2+1, duplex). Check our current BestHome sale listings or ask WhatsApp for an updated shortlist.",
          },
        ],
        ctaHeading: "Looking to buy in Alanya?",
        ctaBody:
          "Share your budget and goal (live, rent out, or hotel investment). We will send matching sale options on WhatsApp.",
      },
      ru: {
        title: "Покупка квартиры в Алании для иностранцев: этапы и расходы",
        description:
          "Как иностранцу купить недвижимость в Алании — этапы сделки, расходы, квартиры BestHome на продажу и отели в Газипаше с поддержкой LOS ESTATE на русском и английском.",
        excerpt:
          "От просмотра до тапу: понятный путь для покупателей из-за рубежа — квартиры в Алании и инвестиции у моря.",
        sections: [
          {
            heading: "Почему покупают в Алании",
            paragraphs: [
              "Алания даёт климат круглый год, спрос на аренду и понятный рынок жилых комплексов. Часто берут 1+1 или 2+1 для себя и сезонной сдачи; кто-то смотрит бутик-отели ради доходности.",
              "LOS ESTATE показывает русско- и англоязычным покупателям реально доступные объекты — включая продажу в BestHome и отобранные отели в Алании и Газипаше.",
            ],
          },
          {
            heading: "Основные этапы покупки",
            paragraphs: [
              "Обычный путь: подбор и просмотры → бронь / задаток → проверка и юрист → нотариат / тапу → ключи и коммуникации. Документы зависят от гражданства и типа объекта.",
              "Мы организуем просмотры, при необходимости подключаем проверенных юристов и ведём общение на вашем языке — чтобы каждая сумма и подпись были понятны.",
            ],
          },
          {
            heading: "Квартиры или отель",
            paragraphs: [
              "Квартиры в BestHome 36 / 37 проще в управлении и сдаче — удобны для жизни или зимней / долгосрочной аренды.",
              "Отели (например, у моря в Газипаше) требуют опыта или управляющего партнёра. Больше капитал и сложность — выше потенциальная доходность. Скажите бюджет и риск — подскажем формат.",
            ],
          },
          {
            heading: "Расходы сверх цены объекта",
            paragraphs: [
              "Заложите пошлины за тапу, возможные налоги / льготы по ситуации, юриста и мебель, если объект пустой. Aidat платится уже после покупки.",
              "Просите письменный расчёт до решения. Прозрачные цифры ускоряют сделку и снижают споры.",
            ],
          },
        ],
        faq: [
          {
            question: "Может ли иностранец получить тапу в Турции?",
            answer:
              "В большинстве случаев для жилья — да, с учётом актуальных правил и локации. Правоспособность лучше подтвердить с юристом под ваше гражданство.",
          },
          {
            question: "Нужно ли приезжать в Аланию?",
            answer:
              "Просмотры лично — лучший вариант, часть подготовки возможна удалённо. Напишите сроки — предложим реалистичный план.",
          },
          {
            question: "Какие бюджеты на квартиры BestHome?",
            answer:
              "Цены зависят от этажа, вида и планировки (1+1, 2+1, дуплекс). Смотрите актуальные объявления о продаже или запросите подборку в WhatsApp.",
          },
        ],
        ctaHeading: "Ищете квартиру на покупку в Алании?",
        ctaBody:
          "Напишите бюджет и цель (жить, сдавать или отель). Пришлём подходящие варианты на продажу в WhatsApp.",
      },
    },
  },
  {
    slug: "besthome-36-vs-37",
    publishedAt: "2026-03-22",
    relatedListingSlugs: [
      "besthome-36-sale-2-1-84",
      "besthome-37-sale-duplex-2-1-119",
      "besthome-36-rent-2-1",
      "besthome-37-rent-2-1",
      "besthome-36-37-the-legend",
    ],
    content: {
      en: {
        title: "BestHome 36 vs BestHome 37 in Alanya: Which Complex to Choose",
        description:
          "Compare BestHome 36 and BestHome 37 (The Legend) in Alanya — layouts 1+1 and 2+1, rent vs sale, duplex options, and how LOS ESTATE helps you pick the right apartment.",
        excerpt:
          "Two popular Alanya complexes side by side — so you can choose by layout, budget, and rent or buy goal.",
        sections: [
          {
            heading: "Quick overview",
            paragraphs: [
              "BestHome 36 and BestHome 37 (often marketed as The Legend) are among the most requested residential brands we show to tenants and buyers in Alanya. Both offer modern finishes, complex amenities, and a mix of 1+1, 2+1, and duplex stock.",
              "The “better” choice depends on your goal: long-term rent, winter stay, or purchase for living / investment — not on marketing names alone.",
            ],
          },
          {
            heading: "Layouts: 1+1, 2+1 and duplex",
            paragraphs: [
              "1+1 suits singles, couples, or investors who want easier rental turnover. 2+1 works better for families or shared winter stays. Duplex units add space and privacy — popular on both sale and rent sides of our catalogue.",
              "Browse our live BestHome 36 and 37 listings to compare floor area, balcony orientation, and furniture level photo by photo.",
            ],
          },
          {
            heading: "Rent or buy in these complexes",
            paragraphs: [
              "For rent, availability changes weekly — especially before the winter season. For sale, duplex and sea- or pool-oriented units move faster when priced correctly.",
              "LOS ESTATE manages inquiries in English and Russian and can shortlist units in both buildings in one WhatsApp thread so you do not lose time switching portals.",
            ],
          },
          {
            heading: "How we help you decide",
            paragraphs: [
              "Tell us budget, preferred layout, and whether you need rent or sale. We send a short comparison of current BestHome 36 vs 37 options with links to photos and prices on this site.",
              "If you already own in one complex, ask about property management — we also work with landlords who want stable occupancy.",
            ],
          },
        ],
        faq: [
          {
            question: "Is BestHome 37 the same as The Legend?",
            answer:
              "BestHome 37 is widely associated with The Legend branding in Alanya. Always verify the exact building and unit on the listing page before you visit.",
          },
          {
            question: "Which is cheaper to rent?",
            answer:
              "It depends on size, floor, and season — not only the complex number. Ask for today’s 1+1 and 2+1 rents in both buildings.",
          },
          {
            question: "Can I view both complexes in one day?",
            answer:
              "Yes. Message preferred dates on WhatsApp and we will plan a viewing route.",
          },
        ],
        ctaHeading: "Compare BestHome 36 and 37 with us",
        ctaBody:
          "Write your budget and layout. We reply with current apartments for rent or sale in both complexes.",
      },
      ru: {
        title: "BestHome 36 или BestHome 37 в Алании: какой комплекс выбрать",
        description:
          "Сравнение BestHome 36 и BestHome 37 (The Legend) в Алании — планировки 1+1 и 2+1, аренда и продажа, дуплексы и помощь LOS ESTATE в выборе квартиры.",
        excerpt:
          "Два популярных комплекса Алании рядом — выбирайте по планировке, бюджету и цели: аренда или покупка.",
        sections: [
          {
            heading: "Коротко о комплексах",
            paragraphs: [
              "BestHome 36 и BestHome 37 (часто как The Legend) — одни из самых частых запросов у наших арендаторов и покупателей в Алании. Современная отделка, инфраструктура комплекса, варианты 1+1, 2+1 и дуплексы.",
              "«Лучший» вариант зависит от цели: долгосрочная аренда, зимовка или покупка — а не только от названия в рекламе.",
            ],
          },
          {
            heading: "Планировки: 1+1, 2+1 и дуплекс",
            paragraphs: [
              "1+1 удобен для пары или инвестора с быстрой ротацией арендаторов. 2+1 — для семьи или совместной зимовки. Дуплексы дают больше пространства — их часто смотрят и в аренду, и на покупку.",
              "Сравнивайте актуальные объявления BestHome 36 и 37: метраж, балкон, мебель — по реальным фото.",
            ],
          },
          {
            heading: "Аренда или покупка",
            paragraphs: [
              "В аренде свободные даты меняются каждую неделю — особенно перед зимой. На продаже быстрее уходят удачные дуплексы и квартиры с видом, если цена рыночная.",
              "LOS ESTATE ведёт запросы на русском и английском и может прислать подборку по обоим домам в одном чате WhatsApp.",
            ],
          },
          {
            heading: "Как мы помогаем выбрать",
            paragraphs: [
              "Напишите бюджет, планировку и аренда/продажа. Пришлём короткое сравнение текущих вариантов BestHome 36 и 37 со ссылками на фото и цены.",
              "Если квартира уже ваша — спросите про управление: работаем и с собственниками, которым нужна стабильная загрузка.",
            ],
          },
        ],
        faq: [
          {
            question: "BestHome 37 — это The Legend?",
            answer:
              "BestHome 37 часто связан с брендом The Legend в Алании. Перед просмотром сверяйте точный корпус и квартиру на странице объекта.",
          },
          {
            question: "Где дешевле снимать?",
            answer:
              "Зависит от метража, этажа и сезона — не только от номера комплекса. Запросите актуальные цены 1+1 и 2+1 по обоим домам.",
          },
          {
            question: "Можно посмотреть оба комплекса за день?",
            answer:
              "Да. Напишите даты в WhatsApp — составим маршрут просмотров.",
          },
        ],
        ctaHeading: "Сравните BestHome 36 и 37 с нами",
        ctaBody:
          "Напишите бюджет и планировку. Пришлём актуальные квартиры в аренду или на продажу в обоих комплексах.",
      },
    },
  },
  {
    slug: "winter-rent-alanya",
    publishedAt: "2026-03-23",
    relatedListingSlugs: [
      "besthome-37-legend-rent-1-1",
      "besthome-36-rent-1-1-52",
      "besthome-37-rent-1-1-54",
      "besthome-36-duplex-rent-2-1",
    ],
    content: {
      en: {
        title: "Winter Stay in Alanya: Monthly Rent Guide (Oct–March)",
        description:
          "Winter rental guide for Alanya — monthly apartment prices October to March, 1+1 and 2+1 options, BestHome stock, and how to book with LOS ESTATE in English or Russian.",
        excerpt:
          "Plan a warm winter on the Turkish coast: when to book, what rents look like, and which layouts work for long stays.",
        sections: [
          {
            heading: "Why winters in Alanya work",
            paragraphs: [
              "From October to March, many Europeans and CIS residents spend several months in Alanya for climate, cost of living, and walking access to the sea and cafés. Demand for furnished monthly rentals rises sharply in early autumn.",
              "If your goal is a calm winter base — not a one-week holiday — focus on heated, well-furnished 1+1 or 2+1 apartments in managed complexes.",
            ],
          },
          {
            heading: "When to book",
            paragraphs: [
              "The best units for October–December often lock in by late summer. January–March can still offer openings, but choice narrows. Message early with exact dates and budget.",
              "LOS ESTATE tracks vacancies across BestHome and similar residences and can hold a shortlist while you decide.",
            ],
          },
          {
            heading: "What affects winter rent",
            paragraphs: [
              "Length of stay (3+ months is often easier to negotiate), furniture quality, internet, heating, and complex amenities (pool may be seasonal, but gym / security still matter).",
              "Compare our current winter-friendly rentals — including compact 1+1 and larger 2+1 / duplex options — then confirm inclusions on WhatsApp.",
            ],
          },
          {
            heading: "Practical checklist",
            paragraphs: [
              "Confirm heating type, water heater, washing machine, and building dues. Ask for a Wi‑Fi speed note if you work remotely. Keep passport copies ready for the contract.",
              "We reply in English and Russian and can align move-in with your flight dates.",
            ],
          },
        ],
        faq: [
          {
            question: "Is Alanya warm enough in winter?",
            answer:
              "Days are mild compared with Northern Europe, but evenings are cooler — choose an apartment with proper heating and sealed windows.",
          },
          {
            question: "Minimum stay for winter rent?",
            answer:
              "Many landlords prefer one month or longer; multi-month stays are more common for Oct–March. Ask us what each listing allows.",
          },
          {
            question: "Can you help from abroad before I fly?",
            answer:
              "Yes. Share dates and budget on WhatsApp; we send options and schedule viewings for your arrival day when possible.",
          },
        ],
        ctaHeading: "Book your Alanya winter stay",
        ctaBody:
          "Send arrival month, length of stay, and layout. We will match monthly rentals from our live list.",
      },
      ru: {
        title: "Зимовка в Алании: гид по помесячной аренде (окт–март)",
        description:
          "Гид по зимней аренде в Алании — цены на месяцы с октября по март, варианты 1+1 и 2+1, BestHome и бронирование с LOS ESTATE на русском и английском.",
        excerpt:
          "Тёплая зима на турецком побережье: когда бронировать, какие цены и какие планировки удобны для долгого проживания.",
        sections: [
          {
            heading: "Почему зимуют в Алании",
            paragraphs: [
              "С октября по март многие из Европы и СНГ живут в Алании месяцами ради климата, цен и прогулок к морю. Спрос на меблированную помесячную аренду растёт уже в начале осени.",
              "Если нужна именно зимовка, а не неделя отпуска — смотрите отапливаемые меблированные 1+1 или 2+1 в управляемых комплексах.",
            ],
          },
          {
            heading: "Когда бронировать",
            paragraphs: [
              "Лучшие варианты на октябрь–декабрь часто разбирают к концу лета. На январь–март ещё бывают окна, но выбор уже меньше. Пишите заранее даты и бюджет.",
              "LOS ESTATE отслеживает свободные квартиры в BestHome и похожих комплексах и может держать короткий список, пока вы решаете.",
            ],
          },
          {
            heading: "От чего зависит зимняя цена",
            paragraphs: [
              "Срок (от 3 месяцев чаще проще торговаться), мебель, интернет, отопление и удобства комплекса (бассейн может быть сезонным, охрана и инфраструктура важны всё равно).",
              "Сравните актуальные объекты под зимовку — компактные 1+1 и более просторные 2+1 / дуплексы — и уточните, что входит, в WhatsApp.",
            ],
          },
          {
            heading: "Практический чек-лист",
            paragraphs: [
              "Уточните отопление, бойлер, стиральную машину и aidat. Если работаете удалённо — спросите про Wi‑Fi. Держите копии паспорта для договора.",
              "Отвечаем на русском и английском и подстроим заселение под ваш рейс.",
            ],
          },
        ],
        faq: [
          {
            question: "Насколько тепло зимой в Алании?",
            answer:
              "Днём мягче, чем на севере Европы, вечером прохладнее — берите квартиру с нормальным отоплением и плотными окнами.",
          },
          {
            question: "Какой минимальный срок зимой?",
            answer:
              "Часто от месяца и дольше; на октябрь–март чаще берут несколько месяцев. Уточняйте условия по каждому объекту.",
          },
          {
            question: "Можно подобрать жильё до приезда?",
            answer:
              "Да. Напишите даты и бюджет в WhatsApp — пришлём варианты и по возможности назначим просмотры в день прилёта.",
          },
        ],
        ctaHeading: "Забронируйте зимовку в Алании",
        ctaBody:
          "Напишите месяц заезда, срок и планировку. Подберём помесячную аренду из актуальной базы.",
      },
    },
  },
];

export function getGuideSlugs(): string[] {
  return guides.map((g) => g.slug);
}

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

/** EN for all locales except RU (SEO priority: English + Russian). */
export function getGuideContent(guide: Guide, locale: string): GuideContent {
  if (locale === "ru") return guide.content.ru;
  return guide.content.en;
}
