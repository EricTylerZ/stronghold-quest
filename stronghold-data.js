// Stronghold Quest - Card Data & Teaching Questions
// A pro-life card game from Zoseco

const STRONGHOLD_DATA = (() => {
  'use strict';

  // === Pillar Cards ===
  const PILLARS = [
    {
      id: 'purity',
      name: 'Purity',
      color: '#E8D5E0',
      icon: '\u2661',
      mission: 'Eliminate corruption to defend life.',
      prayer: 'Lord, purify our hearts and minds. Help us see the dignity in every person, born and unborn. Through clean words and clean media, may we build a culture that honors life. Amen.'
    },
    {
      id: 'protection',
      name: 'Protection',
      color: '#D5E0E8',
      icon: '\u26E8',
      mission: 'Shield the vulnerable from threats.',
      prayer: 'Heavenly Father, be a shield around the vulnerable. Give us wisdom to recognize danger and courage to stand guard. Protect the innocent from those who would do them harm. Amen.'
    },
    {
      id: 'peace',
      name: 'Peace',
      color: '#D5E8D5',
      icon: '\u2698',
      mission: 'Foster unity for the pro-life cause.',
      prayer: 'Prince of Peace, heal our divisions and unite us in love. Where there is conflict, bring reconciliation. Where there is anger, bring understanding. May we work together to defend every life. Amen.'
    },
    {
      id: 'productivity',
      name: 'Productivity',
      color: '#E8E5D5',
      icon: '\u2692',
      mission: 'Build initiatives that save lives.',
      prayer: 'Holy Spirit, stir us to action. Give us creativity, energy, and perseverance to build a world where every life is welcomed and supported. Let our work bear fruit for the Kingdom. Amen.'
    }
  ];

  // === Challenge Cards (20 total, 5 per pillar) ===
  const CHALLENGE_CARDS = [
    { pillar: 'purity', text: 'Write a 3-sentence pledge to use kind words daily.' },
    { pillar: 'purity', text: 'Commit to avoiding mean shows or games for one week.' },
    { pillar: 'purity', text: 'Name a way to help a friend be their best self.' },
    { pillar: 'purity', text: 'List 2 reasons teasing hurts families.' },
    { pillar: 'purity', text: 'Pray a short prayer for kindness in your community.' },
    { pillar: 'protection', text: 'Identify a trick someone might use to fool you and how to spot it.' },
    { pillar: 'protection', text: 'Suggest a way to keep kids safe online.' },
    { pillar: 'protection', text: 'Describe a way to tell if a story about life is true.' },
    { pillar: 'protection', text: 'Plan a simple rule to keep your family safe.' },
    { pillar: 'protection', text: 'Name a group that helps protect people.' },
    { pillar: 'peace', text: 'Propose a kind way to end an argument with a friend.' },
    { pillar: 'peace', text: 'Write a note to make up with someone you\'ve disagreed with.' },
    { pillar: 'peace', text: 'Share a happy saying that brings people together.' },
    { pillar: 'peace', text: 'Describe a family activity that makes everyone smile.' },
    { pillar: 'peace', text: 'Suggest a prayer for friends to get along.' },
    { pillar: 'productivity', text: 'Outline a 1-minute idea to cheer for life.' },
    { pillar: 'productivity', text: 'Plan a 5-person prayer event to help babies.' },
    { pillar: 'productivity', text: 'Name a craft kids can make to show love.' },
    { pillar: 'productivity', text: 'List 3 ways to help a good cause.' },
    { pillar: 'productivity', text: 'Sketch a quick idea for a life-loving poster.' }
  ];

  // === Threat Cards (10 total) ===
  const THREAT_CARDS = [
    { text: 'A friend sees a scary show.', challenge: 'Suggest a happy one instead.', pillar: 'purity' },
    { text: 'Misinformation spreads doubt.', challenge: 'Share a true fact about life.', pillar: 'protection' },
    { text: 'Conflict divides your team.', challenge: 'Suggest a peace step.', pillar: 'peace' },
    { text: 'Opposition mocks your work.', challenge: 'Affirm life\'s value.', pillar: 'productivity' },
    { text: 'A distraction stalls progress.', challenge: 'Refocus with a goal.', pillar: 'productivity' },
    { text: 'A tricky person targets a family.', challenge: 'Offer a safeguard.', pillar: 'protection' },
    { text: 'A culture of death grows.', challenge: 'Pray for strength.', pillar: 'purity' },
    { text: 'A lie about life spreads.', challenge: 'Tell the truth.', pillar: 'protection' },
    { text: 'Anger flares in your group.', challenge: 'Calm it with kindness.', pillar: 'peace' },
    { text: 'Laziness creeps in.', challenge: 'List a fun task to do.', pillar: 'productivity' }
  ];

  // === Teaching Questions (registered with TeachingModule) ===
  const QUESTIONS = [
    // PURITY - Level 1 (Basic)
    { category: 'stronghold', topic: 'purity', subtopic: 'media',
      question: 'Why should we be careful about what shows and games we watch?',
      answers: ['They can shape how we think about people and life', 'They are always bad', 'We should never watch anything', 'It doesn\'t matter what we watch'],
      correct: 0, level: 1 },
    { category: 'stronghold', topic: 'purity', subtopic: 'language',
      question: 'How do kind words help defend life?',
      answers: ['They build up the dignity of every person', 'They don\'t really help', 'Only adults need to use kind words', 'Kind words are only for special occasions'],
      correct: 0, level: 1 },
    { category: 'stronghold', topic: 'purity', subtopic: 'kindness',
      question: 'What is one way teasing hurts families?',
      answers: ['It breaks trust and makes people feel worthless', 'It doesn\'t affect families', 'Teasing is always just joking', 'Only serious teasing matters'],
      correct: 0, level: 1 },
    // PURITY - Level 2 (Intermediate)
    { category: 'stronghold', topic: 'purity', subtopic: 'media',
      question: 'How does the media we consume affect how we value other people?',
      answers: ['It shapes our view of human dignity \u2014 for better or worse', 'Media has no real influence on us', 'Only violent media is harmful', 'It only affects young children'],
      correct: 0, level: 2 },
    { category: 'stronghold', topic: 'purity', subtopic: 'language',
      question: 'What is the connection between pure speech and a culture of life?',
      answers: ['Words that honor dignity build a world that protects life', 'There is no connection', 'Only public figures need to watch their speech', 'Pure speech is about avoiding curse words only'],
      correct: 0, level: 2 },
    { category: 'stronghold', topic: 'purity', subtopic: 'kindness',
      question: 'Why is helping a friend "be their best self" an act of purity?',
      answers: ['It honors their God-given potential and dignity', 'It\'s just being nice, not really purity', 'Purity only refers to physical things', 'Friends should figure things out alone'],
      correct: 0, level: 2 },
    // PURITY - Level 3 (Advanced)
    { category: 'stronghold', topic: 'purity', subtopic: 'media',
      question: 'How does purity of heart connect to the broader pro-life mission?',
      answers: ['A pure heart sees every person as made in God\'s image, which is the foundation of defending life', 'Purity of heart is a personal matter unrelated to social issues', 'The pro-life mission is only about laws, not hearts', 'Purity is too abstract to have practical impact'],
      correct: 0, level: 3 },

    // PROTECTION - Level 1
    { category: 'stronghold', topic: 'protection', subtopic: 'safety',
      question: 'Why is it important to have safety rules for your family?',
      answers: ['Rules protect the vulnerable from harm', 'Rules are only for little kids', 'Families don\'t need rules', 'Rules make life boring'],
      correct: 0, level: 1 },
    { category: 'stronghold', topic: 'protection', subtopic: 'discernment',
      question: 'How can you tell if information about life issues is true?',
      answers: ['Check the source and compare with trusted references', 'If it\'s online, it\'s true', 'Just believe what sounds right', 'Only experts can know the truth'],
      correct: 0, level: 1 },
    { category: 'stronghold', topic: 'protection', subtopic: 'community',
      question: 'Name one type of organization that helps protect vulnerable people.',
      answers: ['Crisis pregnancy centers, shelters, or child welfare groups', 'Only the police help', 'No organizations really help', 'Protection is each person\'s own job'],
      correct: 0, level: 1 },
    // PROTECTION - Level 2
    { category: 'stronghold', topic: 'protection', subtopic: 'safety',
      question: 'What makes children especially vulnerable and in need of protection?',
      answers: ['They cannot defend themselves and depend on adults to uphold their dignity', 'Children are naturally resilient and don\'t need much protection', 'Only physical danger matters for children', 'Children are only vulnerable until age 5'],
      correct: 0, level: 2 },
    { category: 'stronghold', topic: 'protection', subtopic: 'discernment',
      question: 'How can misinformation undermine the protection of life?',
      answers: ['It can desensitize people to threats and normalize harm against the vulnerable', 'Misinformation doesn\'t affect real-world actions', 'Only intentional lies cause harm', 'People easily see through misinformation'],
      correct: 0, level: 2 },
    { category: 'stronghold', topic: 'protection', subtopic: 'community',
      question: 'Why is community watchfulness essential for protecting the innocent?',
      answers: ['No single person can see every threat \u2014 a watchful community creates a shield', 'People should only worry about their own families', 'Community involvement is meddling', 'Only professionals should be watchful'],
      correct: 0, level: 2 },
    // PROTECTION - Level 3
    { category: 'stronghold', topic: 'protection', subtopic: 'safety',
      question: 'How does the principle of subsidiarity apply to protecting life at the family level?',
      answers: ['Families are the first line of defense \u2014 larger institutions support but don\'t replace parental protection', 'The government should handle all protection', 'Subsidiarity is irrelevant to family life', 'Only churches should protect life'],
      correct: 0, level: 3 },

    // PEACE - Level 1
    { category: 'stronghold', topic: 'peace', subtopic: 'reconciliation',
      question: 'Why is making peace with someone you disagreed with important?',
      answers: ['Unity makes the pro-life cause stronger', 'Arguments don\'t really matter', 'You should always avoid disagreement', 'Only adults need to reconcile'],
      correct: 0, level: 1 },
    { category: 'stronghold', topic: 'peace', subtopic: 'unity',
      question: 'How do family activities bring peace?',
      answers: ['Shared joy strengthens bonds and builds a culture of love', 'They\'re just for fun, not peace', 'Families are naturally peaceful', 'Only prayer brings peace'],
      correct: 0, level: 1 },
    { category: 'stronghold', topic: 'peace', subtopic: 'prayer',
      question: 'How can prayer help friends get along better?',
      answers: ['Prayer opens hearts to forgiveness and understanding', 'Prayer doesn\'t change relationships', 'Only the people fighting need to pray', 'Prayer is private, not for relationships'],
      correct: 0, level: 1 },
    // PEACE - Level 2
    { category: 'stronghold', topic: 'peace', subtopic: 'reconciliation',
      question: 'What is the difference between peace and simply avoiding conflict?',
      answers: ['True peace requires justice and active love, not just silence', 'There is no difference', 'Avoiding conflict is always the best approach', 'Peace means everyone agrees'],
      correct: 0, level: 2 },
    { category: 'stronghold', topic: 'peace', subtopic: 'unity',
      question: 'How does division within the pro-life movement weaken its mission?',
      answers: ['Division distracts from the shared goal and gives opponents leverage', 'Division is normal and doesn\'t matter', 'Only one approach to pro-life work is valid', 'Internal disagreement makes the movement stronger'],
      correct: 0, level: 2 },
    { category: 'stronghold', topic: 'peace', subtopic: 'prayer',
      question: 'Why is it important to pray even for those who oppose the pro-life cause?',
      answers: ['Prayer can convert hearts, and every person has dignity worth praying for', 'Only pray for allies', 'Opponents are beyond help', 'Prayer for opponents is a waste'],
      correct: 0, level: 2 },
    // PEACE - Level 3
    { category: 'stronghold', topic: 'peace', subtopic: 'reconciliation',
      question: 'How does the Catholic understanding of peace as "tranquillitas ordinis" apply to defending life?',
      answers: ['True peace is the tranquility of right order \u2014 which requires that every life be protected in its proper dignity', 'Peace simply means the absence of war', 'Order is imposed, not organic', 'This concept only applies to nations, not individuals'],
      correct: 0, level: 3 },

    // PRODUCTIVITY - Level 1
    { category: 'stronghold', topic: 'productivity', subtopic: 'initiative',
      question: 'Why is taking action important for defending life?',
      answers: ['Good intentions alone don\'t save lives \u2014 action does', 'Thinking about it is enough', 'Only leaders need to take action', 'Action is too risky'],
      correct: 0, level: 1 },
    { category: 'stronghold', topic: 'productivity', subtopic: 'service',
      question: 'What is one simple way kids can serve the pro-life cause?',
      answers: ['Make cards, pray, or help at a community event', 'Kids can\'t really help', 'Only donations matter', 'Wait until you\'re an adult'],
      correct: 0, level: 1 },
    { category: 'stronghold', topic: 'productivity', subtopic: 'creativity',
      question: 'How can a poster or craft help defend life?',
      answers: ['It spreads the message of love and dignity to others', 'Art doesn\'t change anything', 'Only facts matter, not art', 'Posters are for advertising, not causes'],
      correct: 0, level: 1 },
    // PRODUCTIVITY - Level 2
    { category: 'stronghold', topic: 'productivity', subtopic: 'initiative',
      question: 'What makes a prayer event more effective than praying alone?',
      answers: ['Communal prayer shows solidarity and multiplies witness to the cause', 'There\'s no difference', 'Prayer events are just for show', 'God only hears individual prayer'],
      correct: 0, level: 2 },
    { category: 'stronghold', topic: 'productivity', subtopic: 'service',
      question: 'How does serving a good cause develop personal virtue?',
      answers: ['Regular service builds habits of generosity, courage, and perseverance', 'Service is just about helping others, not yourself', 'Virtue develops automatically with age', 'Service only matters if it\'s big'],
      correct: 0, level: 2 },
    { category: 'stronghold', topic: 'productivity', subtopic: 'creativity',
      question: 'Why is creativity an important weapon in the pro-life mission?',
      answers: ['Creative messages reach hearts that arguments alone cannot', 'Logic is the only tool that works', 'Creativity is frivolous', 'Only experts should create pro-life content'],
      correct: 0, level: 2 },
    // PRODUCTIVITY - Level 3
    { category: 'stronghold', topic: 'productivity', subtopic: 'initiative',
      question: 'How does the parable of the talents relate to pro-life productivity?',
      answers: ['God calls us to multiply what we\'ve been given \u2014 including our ability to defend life', 'The parable is only about money', 'We should only use safe, proven methods', 'The parable doesn\'t apply to social causes'],
      correct: 0, level: 3 },
  ];

  // === Liturgy of the Hours awareness ===
  const PRAYER_HOURS = [
    { name: 'Lauds', startHour: 6, endHour: 9,
      prayer: 'Morning Prayer for Life: Lord of all creation, as this new day dawns, we lift up every life \u2014 born and unborn. Strengthen us to be defenders of the innocent today. Amen.' },
    { name: 'Terce', startHour: 9, endHour: 12,
      prayer: 'Mid-Morning Prayer: Holy Spirit, fill us with courage at this hour when Christ was judged. May we never stand silent when innocent life is threatened. Amen.' },
    { name: 'Sext', startHour: 12, endHour: 15,
      prayer: 'Midday Prayer: Lord, at this hour of the Crucifixion, we remember that every life is purchased at infinite cost. Help us value what You have valued with Your blood. Amen.' },
    { name: 'None', startHour: 15, endHour: 17,
      prayer: 'Afternoon Prayer: Jesus, at the hour of Your death, You gave everything for us. Give us the grace to lay down our comfort for the sake of the vulnerable. Amen.' },
    { name: 'Vespers', startHour: 17, endHour: 20,
      prayer: 'Evening Prayer for Life: As the day ends, Lord, we thank You for every life sustained today. Watch over those in danger tonight \u2014 the unborn, the trafficked, the forgotten. Amen.' },
    { name: 'Compline', startHour: 20, endHour: 23,
      prayer: 'Night Prayer: Into Your hands, O Lord, we commend all life this night. Guard the sleeping, comfort the suffering, and welcome those who come home to You. Amen.' },
    { name: 'Vigils', startHour: 0, endHour: 6,
      prayer: 'Night Vigil: Lord, in the stillness of the night, we keep watch for life. May our vigilance in prayer be a shield for the helpless. Amen.' }
  ];

  // Defender of Life Prayer (shown on victory)
  const VICTORY_PRAYER = 'Prayer of the Defender of Life:\n\nAlmighty God, we thank You for the strength to complete this mission.\nYou have called us to be defenders of the innocent,\nguardians of the vulnerable,\nand builders of a culture of life.\n\nGrant us perseverance to carry this mission forward\nbeyond this game and into our daily lives.\nMay every word we speak honor dignity,\nevery action we take protect the weak,\nand every prayer we offer strengthen the cause of life.\n\nThrough Christ our Lord, who is the Way, the Truth, and the Life.\nAmen.';

  // Register questions with TeachingModule
  function registerQuestions() {
    if (typeof TeachingModule === 'undefined') return;
    TeachingModule.registerCategory('stronghold', {
      name: 'Stronghold Quest',
      topics: {
        purity: { name: 'Purity', subtopics: { media: 'Media', language: 'Language', kindness: 'Kindness' } },
        protection: { name: 'Protection', subtopics: { safety: 'Safety', discernment: 'Discernment', community: 'Community' } },
        peace: { name: 'Peace', subtopics: { reconciliation: 'Reconciliation', unity: 'Unity', prayer: 'Prayer' } },
        productivity: { name: 'Productivity', subtopics: { initiative: 'Initiative', service: 'Service', creativity: 'Creativity' } }
      },
      masteryThreshold: 2,
      maxLevel: 3
    }, QUESTIONS);
  }

  function getCurrentPrayer() {
    const hour = new Date().getHours();
    return PRAYER_HOURS.find(p => hour >= p.startHour && hour < p.endHour) || PRAYER_HOURS[6]; // default to Vigils
  }

  return {
    PILLARS,
    CHALLENGE_CARDS,
    THREAT_CARDS,
    QUESTIONS,
    PRAYER_HOURS,
    VICTORY_PRAYER,
    registerQuestions,
    getCurrentPrayer
  };
})();
