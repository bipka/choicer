// src/data.js

const data = {
  themes: [
    { id: 1, title: 'Фильмы', ord: 1 },
    { id: 2, title: 'Подкасты', ord: 2 },
    { id: 3, title: 'Музыкальные клипы', ord: 3 },
    { id: 4, title: 'Дорамы', ord: 4 },
    { id: 5, title: 'Аниме', ord: 5 },
    { id: 6, title: 'Сериалы', ord: 6 }
  ],

  subthemes: [
    // ФИЛЬМЫ
    { id: 1, themeId: 1, title: 'Триллеры', ord: 1 },
    { id: 2, themeId: 1, title: 'Психологические триллеры', ord: 2 },
    { id: 3, themeId: 1, title: 'Документальные фильмы', ord: 3 },
    { id: 4, themeId: 1, title: 'Романтические комедии', ord: 4 },
    { id: 5, themeId: 1, title: 'Комедии', ord: 5 },

    // ПОДКАСТЫ
    { id: 6, themeId: 2, title: 'True crime', ord: 6 },
    { id: 7, themeId: 2, title: 'Психология и отношения', ord: 7 },
    { id: 8, themeId: 2, title: 'Личные дневники', ord: 8 },

    // КЛИПЫ
    { id: 9, themeId: 3, title: 'Поп', ord: 9 },
    { id: 10, themeId: 3, title: 'Рэп', ord: 10 },
    { id: 11, themeId: 3, title: 'Альтернатива', ord: 11 },

    // ДОРАМЫ
    { id: 12, themeId: 4, title: 'Романтика', ord: 12 },
    { id: 13, themeId: 4, title: 'Фэнтези', ord: 13 },
    { id: 14, themeId: 4, title: 'Школьные', ord: 14 },

    // АНИМЕ
    { id: 15, themeId: 5, title: 'Психологическое', ord: 15 },
    { id: 16, themeId: 5, title: 'Экшен', ord: 16 },
    { id: 17, themeId: 5, title: 'Slice of life', ord: 17 },

    // СЕРИАЛЫ
    { id: 18, themeId: 6, title: 'Криминал', ord: 18 },
    { id: 19, themeId: 6, title: 'Драмы', ord: 19 },
    { id: 20, themeId: 6, title: 'Ситкомы', ord: 20 }
  ],

  contents: [
    // ---------- ФИЛЬМЫ → Триллеры (subThemeId: 1) ----------
    {
      id: 1,
      subThemeId: 1,
      title: 'Не дыши',
      ord: 1,
      year: 2016,
      director: 'Феде Альварес',
      cast: 'Джейн Леви, Стивен Лэнг, Дилан Миннетт',
      rating: '7.1/10',
      description:
        'Компания подростков вламывается в дом слепого ветерана, рассчитывая на лёгкую добычу. Но хозяин оказывается куда опаснее, чем кажется.',
      trailerUrl: 'https://www.youtube.com/embed/76yBTNDB6vU'
    },
    {
      id: 2,
      subThemeId: 1,
      title: '10 Cloverfield Lane',
      ord: 2,
      year: 2016,
      director: 'Дэн Трахтенберг',
      cast: 'Мэри Элизабет Уинстэд, Джон Гудман, Джон Галлахер мл.',
      rating: '7.2/10',
      description:
        'Девушка приходит в себя в подземном бункере мужчины, который утверждает, что на поверхности произошла катастрофа и выхода нет.',
      trailerUrl: 'https://www.youtube.com/embed/saHzng8fxLs'
    },
    {
      id: 3,
      subThemeId: 1,
      title: 'The Invisible Man',
      ord: 3,
      year: 2020,
      director: 'Ли Уоннелл',
      cast: 'Элизабет Мосс, Оливер Джексон-Коэн, Олдис Ходж',
      rating: '7.1/10',
      description:
        'Женщина сбегает от абьюзивного партнёра, но после его мнимой смерти начинает чувствовать чьё-то невидимое присутствие.',
      trailerUrl: 'https://www.youtube.com/embed/Pso0Aj_cTh0'
    },
    {
      id: 4,
      subThemeId: 1,
      title: 'Hush',
      ord: 4,
      year: 2016,
      director: 'Майк Флэнеган',
      cast: 'Кейт Сигел, Джон Галлахер мл.',
      rating: '6.6/10',
      description:
        'Глухонемая писательница живёт в уединённом доме в лесу, когда на её пороге появляется маньяк в маске.',
      trailerUrl: 'https://www.youtube.com/embed/Q_P8WCbhC6s'
    },

    // ---------- ФИЛЬМЫ → Психологические триллеры (subThemeId: 2) ----------
    {
      id: 5,
      subThemeId: 2,
      title: 'Исчезнувшая',
      ord: 1,
      year: 2014,
      director: 'Дэвид Финчер',
      cast: 'Бен Аффлек, Розамунд Пайк',
      rating: '8.1/10',
      description:
        'В день годовщины свадьбы жена таинственно исчезает, а муж оказывается в центре медийного скандала и подозрений в убийстве.',
      imageUrl:
        'https://image.tmdb.org/t/p/w500/qymaJhucquUwjpb8oiqynMeXnID.jpg'
    },
    {
      id: 6,
      subThemeId: 2,
      title: 'Чёрный лебедь',
      ord: 2,
      year: 2010,
      director: 'Даррен Аронофски',cast: 'Натали Портман, Мила Кунис',
      rating: '8.0/10',
      description:
        'Балерина получает шанс исполнить главную партию, но погружается в паранойю, перфекционизм и галлюцинации.',
      imageUrl:
        'https://image.tmdb.org/t/p/w500/rXsh4MI6uyVgZBSSzXCfitJnVPy.jpg'
    },
    {
      id: 7,
      subThemeId: 2,
      title: 'Shutter Island',
      ord: 3,
      year: 2010,
      director: 'Мартин Скорсезе',
      cast: 'Леонардо ДиКаприо, Марк Руффало',
      rating: '8.1/10',
      description:
        'Двое федеральных маршалов расследуют исчезновение пациентки из психиатрической клиники на отдалённом острове.',
      trailerUrl: 'https://www.youtube.com/embed/5iaYLCiq5RM'
    },

    // ---------- ФИЛЬМЫ → Документальные (subThemeId: 3) ----------
    {
      id: 8,
      subThemeId: 3,
      title: 'The Social Dilemma',
      ord: 1,
      year: 2020,
      director: 'Джефф Орловски',
      cast: 'Экс-сотрудники Facebook, Google, Twitter',
      rating: '7.6/10',
      description:
        'Документальный фильм о том, как социальные сети манипулируют вниманием и формируют поведение людей.',
      trailerUrl: 'https://www.youtube.com/embed/uaaC57tcci0'
    },
    {
      id: 9,
      subThemeId: 3,
      title: '13th',
      ord: 2,
      year: 2016,
      director: 'Ава ДюВерней',
      cast: 'Интервью с активистами и экспертами',
      rating: '8.2/10',
      description:
        'Документальный фильм о расизме и массовом заключении в США, отсылающий к 13-й поправке к Конституции.',
      trailerUrl: 'https://www.youtube.com/embed/krfcq5pF8u8'
    },

    // ---------- ФИЛЬМЫ → Ромкомы (subThemeId: 4) ----------
    {
      id: 10,
      subThemeId: 4,
      title: '10 Things I Hate About You',
      ord: 1,
      year: 1999,
      director: 'Гил Джунгер',
      cast: 'Хит Леджер, Джулия Стайлз',
      rating: '7.3/10',
      description:
        'Хулиган с обаятельной улыбкой берётся растопить сердце колкой и независимой старшей сестры одноклассницы.',
      imageUrl:
        'https://image.tmdb.org/t/p/w500/ujERk3aKABXU3NDXOAxMMbXcQeR.jpg'
    },
    {
      id: 11,
      subThemeId: 4,
      title: 'Crazy Rich Asians',
      ord: 2,
      year: 2018,
      director: 'Джон М. Чу',
      cast: 'Констанс Ву, Генри Голдинг, Мишель Йео',
      rating: '7.0/10',
      description:
        'Нью-йоркская профессор узнаёт, что её парень — наследник безумно богатой семьи из Сингапура.',
      imageUrl:
        'https://image.tmdb.org/t/p/w500/1XxL4LJ5WHdrcYcihEZUCgNCpAW.jpg'
    },

    // ---------- ФИЛЬМЫ → Комедии (subThemeId: 5) ----------
    {
      id: 12,
      subThemeId: 5,
      title: 'Superbad',
      ord: 1,
      year: 2007,
      director: 'Грег Моттола',
      cast: 'Джона Хилл, Майкл Сера, Кристофер Минц-Плассе',
      rating: '7.6/10',
      description:
        'Два школьника пытаются устроить «вечеринку мечты» перед выпуском, но всё идёт совсем не по плану.',
      imageUrl:
        'https://image.tmdb.org/t/p/w500/ek8e8txUyUwd2BNqj6lFEerJfbq.jpg'
    },
    {
      id: 13,
      subThemeId: 5,
      title: 'Project X',
      ord: 2
      // У этого элемента намеренно нет доп. информации:
      // карточка покажет заглушку "Подробная информация пока не добавлена."
    },

    // ---------- ПОДКАСТЫ → True crime (subThemeId: 6) ----------
    {
      id: 14,
      subThemeId: 6,
      title: 'Serial',
      ord: 1,
      year: 2014,
      director: 'Ведущая: Sarah Koenig',
      cast: 'Sarah Koenig',
      rating: '4.8/5',
      description:
        'Документальный подкаст-расследование, который по сериям разбирает одно реальное уголовное дело.',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/en/5/5c/Serial_Podcast_Logo.jpg'
    },

    // ---------- ПОДКАСТЫ → Психология и отношения (subThemeId: 7) ----------
    {
      id: 15,
      subThemeId: 7,
      title: 'Call Her Daddy',
      ord: 1,
      year: 2018,
      director: 'Ведущая: Alex Cooper',
      cast: 'Alex Cooper',
      rating: '4.7/5',
      description:'Подкаст о сексе, отношениях и самоценности в стиле «подруги, которая говорит без фильтров».',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/en/2/2e/Call_Her_Daddy_podcast_cover.jpg'
    },

    // ---------- ПОДКАСТЫ → Личные дневники (subThemeId: 8) ----------
    {
      id: 16,
      subThemeId: 8,
      title: 'Терапия с подругой',
      ord: 1,
      year: 2020,
      director: 'Анонимные ведущие',
      cast: 'Две подруги',
      rating: '4.6/5',
      description:
        'Разговорный подкаст, где две подруги обсуждают тревоги, травмы и маленькие радости взрослой жизни.',
      imageUrl:
        'https://images.pexels.com/photos/1181716/pexels-photo-1181716.jpeg'
    },

    // ---------- КЛИПЫ → Поп (subThemeId: 9) ----------
    {
      id: 17,
      subThemeId: 9,
      title: 'Beyoncé — ALIEN SUPERSTAR',
      ord: 1,
      year: 2022,
      director: 'Beyoncé',
      cast: 'Beyoncé',
      rating: '★ ★ ★ ★ ★',
      description:
        'Глянцевый, футуристичный перформанс с отсылками к high fashion и клубной культуре.',
      imageUrl:
        'https://images.pexels.com/photos/167404/pexels-photo-167404.jpeg'
    },
    {
      id: 18,
      subThemeId: 9,
      title: 'Dua Lipa — New Rules',
      ord: 2,
      year: 2017,
      director: 'Henry Scholfield',
      cast: 'Dua Lipa',
      rating: '★ ★ ★ ★ ☆',
      description:
        'Поп-гимн о правилах, которые нужно выработать, чтобы не возвращаться к токсичному бывшему.',
      trailerUrl: 'https://www.youtube.com/embed/k2qgadSvNyU'
    },

    // ---------- КЛИПЫ → Рэп (subThemeId: 10) ----------
    {
      id: 19,
      subThemeId: 10,
      title: 'Nicki Minaj — Super Freaky Girl',
      ord: 1,
      year: 2022,
      director: 'Nicki Minaj',
      cast: 'Nicki Minaj',
      rating: '★ ★ ★ ★ ☆',
      description:
        'Яркий, откровенный клип в розово-барби эстетике с отсылками к 80-м и трэп-звучанию.',
      trailerUrl: 'https://www.youtube.com/embed/vFEVNHabdbo'
    },
    {
      id: 20,
      subThemeId: 10,
      title: 'Cardi B — WAP',
      ord: 2,
      year: 2020,
      director: 'Colin Tilley',
      cast: 'Cardi B, Megan Thee Stallion',
      rating: '★ ★ ★ ★ ★',
      description:
        'Скандальный клип о женской сексуальности и власти, стилизованный под роскошный сюрреалистичный особняк.',
      trailerUrl: 'https://www.youtube.com/embed/hsm4poTWjMs'
    },

    // ---------- КЛИПЫ → Альтернатива (subThemeId: 11) ----------
    {
      id: 21,
      subThemeId: 11,
      title: 'Billie Eilish — bad guy',
      ord: 1,
      year: 2019,
      director: 'Billie Eilish, Dave Meyers',
      cast: 'Billie Eilish',
      rating: '★ ★ ★ ★ ★',
      description:
        'Минималистичный клип с сюрреалистичными образами и жёлтой цветовой палитрой, ставший вирусным мемом.',
      trailerUrl: 'https://www.youtube.com/embed/DyDfgMOUjCI'
    },

    // ---------- ДОРАМЫ → Романтика (subThemeId: 12) ----------
    {
      id: 22,
      subThemeId: 12,
      title: 'Crash Landing on You',
      ord: 1,
      year: 2019,
      director: 'Ли Чжон-хё',
      cast: 'Хён Бин, Сон Е-джин',
      rating: '8.7/10',
      description:
        'Южнокорейская наследница случайно попадает в Северную Корею и влюбляется в офицера армии.',
      imageUrl:
        'https://image.tmdb.org/t/p/w500/e3Z7dS2C1YQqC2pFk88vLvyjZfk.jpg'
    },
    {
      id: 23,
      subThemeId: 12,
      title: 'It’s Okay to Not Be Okay',
      ord: 2,
      year: 2020,
      director: 'Пак Шин-у',
      cast: 'Ким Су-хён, Со Йе-джи',
      rating: '8.6/10',
      description:
        'История писательницы мрачных сказок и санитара психбольницы, которые помогают друг другу справиться с травмами.',
      imageUrl:
        'https://image.tmdb.org/t/p/w500/fgWbNojCKKgAGvUuFQ3ar0QJ6J0.jpg'
    },

    // ---------- ДОРАМЫ → Фэнтези (subThemeId: 13) ----------
    {
      id: 24,
      subThemeId: 13,
      title: 'Goblin',
      ord: 1,
      year: 2016,
      director: 'Ли Ын-бок',
      cast: 'Гон Ю, Ким Го-ын',
      rating: '8.6/10',
      description:'Бессмертный хранитель душ ищет невесту, чтобы разорвать проклятие, но влюбляется по-настоящему.',
      imageUrl:
        'https://image.tmdb.org/t/p/w500/qc6Dx6UxZtRL9cJlcHO9bAGaFJG.jpg'
    },

    // ---------- ДОРАМЫ → Школьные (subThemeId: 14) ----------
    {
      id: 25,
      subThemeId: 14,
      title: 'True Beauty',
      ord: 1,
      year: 2020,
      director: 'Ким Сан-хёп',
      cast: 'Moon Ga-young, Cha Eun-woo',
      rating: '8.0/10',
      description:
        'Скромная школьница становится звездой школы после того, как находит «идеальный» макияж, но учится принимать свою реальную внешность.',
      imageUrl:
        'https://image.tmdb.org/t/p/w500/3WjbxaqYB4vAbdUfdr5vbglrW8z.jpg'
    },
    {
      id: 26,
      subThemeId: 14,
      title: 'Extraordinary You',
      ord: 2,
      year: 2019,
      director: 'Ким Сан-хёп',
      cast: 'Kim Hye-yoon, Rowoon',
      rating: '8.1/10',
      description:
        'Школьница вдруг понимает, что живёт внутри манхвы, и решает переписать свою судьбу, отказываясь быть второстепенным персонажем.',
      imageUrl:
        'https://image.tmdb.org/t/p/w500/6Jh3KqXc5teLo75fW4rWuHwo2RC.jpg'
    },

    // ---------- АНИМЕ → Психологическое (subThemeId: 15) ----------
    {
      id: 27,
      subThemeId: 15,
      title: 'Monster',
      ord: 1,
      year: 2004,
      director: 'Масаюки Кодзима',
      cast: 'Kentarou Itou и др.',
      rating: '8.8/10',
      description:
        'Врач спасает жизнь мальчику, который позже оказывается серийным убийцей. Доктор пытается остановить монстра, которого сам создал.',
      imageUrl:
        'https://image.tmdb.org/t/p/w500/1sBx2Ew4QkVAiZSW0S2K3ElVRoQ.jpg'
    },

    // ---------- АНИМЕ → Экшен (subThemeId: 16) ----------
    {
      id: 28,
      subThemeId: 16,
      title: 'Attack on Titan',
      ord: 1,
      year: 2013,
      director: 'Тэцуро Араки',
      cast: 'Ёки Кадзи, Юи Исикава',
      rating: '9.0/10',
      description:
        'Человечество живёт за стенами, скрываясь от гигантов-людоедов, пока один парень не решает изменить всё.',
      imageUrl:
        'https://image.tmdb.org/t/p/w500/hTP1DtLGFamjfu8WqjnuQdP1n4i.jpg'
    },
    {
      id: 29,
      subThemeId: 16,
      title: 'Jujutsu Kaisen',
      ord: 2,
      year: 2020,
      director: 'Сунгах Парка',
      cast: 'Юма Утияма, Юити Накамура',
      rating: '8.6/10',
      description:
        'Школьник проглатывает палец проклятого духа и становится его сосудом, вступая в мир магов дзюдзюцу.',
      imageUrl:
        'https://image.tmdb.org/t/p/w500/2nhiJH1GgS5pSiyCqkq8N1fW7gA.jpg'
    },

    // ---------- АНИМЕ → Slice of life (subThemeId: 17) ----------
    {
      id: 30,
      subThemeId: 17,
      title: 'Horimiya',
      ord: 1,
      year: 2021,
      director: 'Масаси Исихама',
      cast: 'Haruka Tomatsu, Kouki Uchiyama',
      rating: '8.2/10',
      description:
        'Популярная девочка и тихий одноклассник с пирсингами и тату узнают друг друга настоящих и постепенно сближаются.',
      imageUrl:
        'https://image.tmdb.org/t/p/w500/3rZsU1cWmvMRGsiE9zMDZ7Z2qxd.jpg'
    },
    {
      id: 31,
      subThemeId: 17,
      title: 'My Dress-Up Darling',
      ord: 2,
      year: 2022,
      director: 'Кадзумаса Касэ',
      cast: 'Hina Suguta, Shoya Ishige',
      rating: '8.1/10',
      description:
        'Интроверт, увлекающийся изготовлением кукол, знакомится с яркой одноклассницей, мечтающей о косплее.',
      imageUrl:
        'https://image.tmdb.org/t/p/w500/3Vf3A2kZZgwyUr0YJIUKGwEuUXX.jpg'
    },

    // ---------- СЕРИАЛЫ → Криминал (subThemeId: 18) ----------
    {
      id: 32,
      subThemeId: 18,
      title: 'Mindhunter',
      ord: 1,
      year: 2017,
      director: 'Дэвид Финчер и др.',
      cast: 'Джонатан Грофф, Холт Маккаллани',
      rating: '8.6/10',
      description:
        'Агенты ФБР в 70-х годах изучают психологию серийных убийц и формируют основы профайлинга.',
      trailerUrl: 'https://www.youtube.com/embed/PHlJQCyqiaI'
    },// ---------- СЕРИАЛЫ → Драмы (subThemeId: 19) ----------
    {
      id: 33,
      subThemeId: 19,
      title: 'Euphoria',
      ord: 1,
      year: 2019,
      director: 'Сэм Левинсон',
      cast: 'Зендея, Хантер Шафер',
      rating: '8.4/10',
      description:
        'Жёсткая взрослая драма о подростках, зависимости, сексуальности и поиске себя в мире соцсетей.',
      imageUrl:
        'https://image.tmdb.org/t/p/w500/Id8T9Y9nqQX2pKmHtI0i4kLxA3c.jpg'
    },

    // ---------- СЕРИАЛЫ → Ситкомы (subThemeId: 20) ----------
    {
      id: 34,
      subThemeId: 20,
      title: 'Friends',
      ord: 1,
      year: 1994,
      director: 'Дэвид Крейн, Марта Кауффман',
      cast: 'Дженнифер Энистон, Кортни Кокс, Мэттью Перри и др.',
      rating: '8.9/10',
      description:
        'Классический ситком о шестерых друзьях, живущих в Нью-Йорке, кофе, отношениях и бесконечных шутках.',
      imageUrl:
        'https://image.tmdb.org/t/p/w500/f496cm9enuEsZkSPzCwnTESEK5s.jpg'
    },
    {
      id: 35,
      subThemeId: 20,
      title: 'Brooklyn Nine-Nine',
      ord: 2,
      year: 2013,
      director: 'Майкл Шур, Дэн Гур',
      cast: 'Энди Сэмберг, Терри Крюс',
      rating: '8.4/10',
      description:
        'Комедийный сериал о необычной команде детективов нью-йоркского участка и их строгого капитана.',
      imageUrl:
        'https://image.tmdb.org/t/p/w500/hiKmpZMGZsrkA3cdce8a7Dpos1j.jpg'
    }
  ]
};

export default data;