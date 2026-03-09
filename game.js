// Stronghold Quest - Game Engine
// A pro-life card game from Zoseco

(function () {
  'use strict';

  const { PILLARS, CHALLENGE_CARDS, THREAT_CARDS, VICTORY_PRAYER,
          registerQuestions, getCurrentPrayer } = STRONGHOLD_DATA;

  // ===== Game State =====
  let state = null;

  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function newState(pillarId) {
    const pillar = PILLARS.find(p => p.id === pillarId) || PILLARS[0];
    return {
      pillar,
      challengeDeck: shuffle(CHALLENGE_CARDS),
      threatDeck: shuffle(THREAT_CARDS),
      collected: [],        // collected challenge cards
      turn: 0,
      totalTurns: 0,
      threatsDefeated: 0,
      threatsFailed: 0,
      gameOver: false,
      won: false,
      greaterVictory: false,
      currentCard: null,
      currentQuestion: null,
      waitingForAnswer: false,
      waitingForThreatAnswer: false,
      prayerShown: false,
      meritEarned: 0,
      progressState: typeof TeachingModule !== 'undefined' ? TeachingModule.createProgressState() : null
    };
  }

  // ===== Game Logic =====

  function isThreatTurn() {
    return state.totalTurns > 0 && state.totalTurns % 3 === 0;
  }

  function drawCard() {
    if (state.gameOver) return;

    state.totalTurns++;

    if (isThreatTurn()) {
      // Draw threat card
      if (state.threatDeck.length === 0) {
        state.threatDeck = shuffle(THREAT_CARDS);
      }
      state.currentCard = state.threatDeck.pop();
      state.currentCard._type = 'threat';
      // Get a teaching question for the threat's pillar
      loadQuestion(state.currentCard.pillar);
      state.waitingForThreatAnswer = true;
    } else {
      // Draw challenge card
      if (state.challengeDeck.length === 0) {
        state.challengeDeck = shuffle(CHALLENGE_CARDS);
      }
      state.currentCard = state.challengeDeck.pop();
      state.currentCard._type = 'challenge';
      // Get a teaching question for the challenge's pillar
      loadQuestion(state.currentCard.pillar);
      state.waitingForAnswer = true;
    }
    updateUI();
  }

  function loadQuestion(pillar) {
    if (typeof TeachingModule === 'undefined') {
      state.currentQuestion = null;
      return;
    }
    const q = TeachingModule.getRandomQuestion({
      state: state.progressState,
      category: 'stronghold',
      topic: pillar,
      preferUnmastered: true
    });
    state.currentQuestion = q;
  }

  function answerQuestion(answerIndex) {
    if (!state.currentQuestion) return;

    const correct = answerIndex === state.currentQuestion.correct;

    if (correct && typeof TeachingModule !== 'undefined') {
      TeachingModule.incrementProgress(
        state.progressState,
        state.currentQuestion.category,
        state.currentQuestion.topic,
        state.currentQuestion.subtopic
      );
    }

    if (state.waitingForAnswer) {
      // Challenge card
      state.waitingForAnswer = false;
      if (correct) {
        state.collected.push(state.currentCard);
        state.meritEarned += 1;
      }
    } else if (state.waitingForThreatAnswer) {
      // Threat card
      state.waitingForThreatAnswer = false;
      if (correct) {
        state.threatsDefeated++;
        state.meritEarned += 1;
      } else {
        state.threatsFailed++;
        // Lose a card if possible
        if (state.collected.length > 0) {
          state.collected.pop();
        }
      }
    }

    // Check win conditions
    if (state.collected.length >= 12) {
      endGame(true, true);
    } else if (state.collected.length >= 7) {
      // Offer to continue for greater victory or stop
      // For simplicity: auto-win at 12, prompt at 7
      if (!state._offered7) {
        state._offered7 = true;
      }
    }

    state.currentCard = null;
    state.currentQuestion = null;
    updateUI();
    return correct;
  }

  function claimVictory() {
    if (state.collected.length >= 12) {
      endGame(true, true);
    } else if (state.collected.length >= 7) {
      endGame(true, false);
    }
  }

  function endGame(won, greater) {
    state.gameOver = true;
    state.won = won;
    state.greaterVictory = greater || false;

    // Victory bonus merit
    if (won) {
      state.meritEarned += greater ? 3 : 1;
    }

    // Submit merit to Sentinel Ops
    if (typeof SentinelAPI !== 'undefined' && SentinelAPI.isLoggedIn()) {
      SentinelAPI.submitMerit(state.meritEarned, {
        game_name: 'Stronghold Quest',
        won: state.won,
        greater_victory: state.greaterVictory,
        cards_collected: state.collected.length,
        threats_defeated: state.threatsDefeated,
        pillar: state.pillar.name
      }).catch(() => { /* offline is fine */ });
    }

    updateUI();
  }

  // ===== UI =====

  function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
  }

  function updateUI() {
    if (!state) return;

    // Status bar
    const statusEl = document.getElementById('game-status');
    if (statusEl) {
      const pillarCounts = {};
      PILLARS.forEach(p => pillarCounts[p.id] = 0);
      state.collected.forEach(c => pillarCounts[c.pillar]++);
      statusEl.innerHTML = `
        <div class="status-pillar">${state.pillar.icon} ${state.pillar.name}</div>
        <div class="status-cards">Cards: ${state.collected.length} / 7</div>
        <div class="status-merit">Merit: ${state.meritEarned}</div>
        <div class="status-turn">Turn ${state.totalTurns}</div>
      `;
    }

    // Pillar counts
    const countsEl = document.getElementById('pillar-counts');
    if (countsEl) {
      const counts = { purity: 0, protection: 0, peace: 0, productivity: 0 };
      state.collected.forEach(c => counts[c.pillar]++);
      countsEl.innerHTML = PILLARS.map(p =>
        `<div class="pillar-count" style="border-color:${p.color}">
          <span class="pillar-icon">${p.icon}</span>
          <span class="pillar-name">${p.name}</span>
          <span class="pillar-num">${counts[p.id]}</span>
        </div>`
      ).join('');
    }

    // Card area
    const cardArea = document.getElementById('card-area');
    if (!cardArea) return;

    if (state.gameOver) {
      showScreen('gameover-screen');
      renderGameOver();
      return;
    }

    if (state.currentCard && (state.waitingForAnswer || state.waitingForThreatAnswer)) {
      renderCardAndQuestion();
    } else {
      renderDrawPrompt();
    }
  }

  function renderDrawPrompt() {
    const cardArea = document.getElementById('card-area');
    const isThreat = state.totalTurns > 0 && (state.totalTurns + 1) % 3 === 0;

    let html = '<div class="draw-prompt">';

    // Show victory claim option if >= 7 cards
    if (state.collected.length >= 7 && state.collected.length < 12) {
      html += `<div class="victory-available">
        <p>You have ${state.collected.length} cards! You can claim victory now or continue for greater victory (12 cards).</p>
        <button class="btn btn-victory" onclick="StrongholdGame.claimVictory()">Claim Victory!</button>
        <p class="or-text">- or -</p>
      </div>`;
    }

    html += `<p class="next-card-hint">${isThreat ? 'Threat incoming! (Every 3rd turn)' : 'Draw a Challenge Card'}</p>`;
    html += `<button class="btn btn-draw ${isThreat ? 'btn-threat' : 'btn-challenge'}" onclick="StrongholdGame.drawCard()">
      ${isThreat ? 'Face Threat' : 'Draw Card'}
    </button>`;
    html += '</div>';

    cardArea.innerHTML = html;
  }

  function renderCardAndQuestion() {
    const cardArea = document.getElementById('card-area');
    const card = state.currentCard;
    const q = state.currentQuestion;
    const isThreat = card._type === 'threat';
    const pillar = PILLARS.find(p => p.id === card.pillar);

    let html = `<div class="card-display ${isThreat ? 'threat-card' : 'challenge-card'}">`;
    html += `<div class="card-header" style="background:${isThreat ? '#c0392b' : (pillar ? pillar.color : '#00918b')}">`;
    html += `<span class="card-type">${isThreat ? 'THREAT' : pillar.name + ' Challenge'}</span>`;
    html += '</div>';
    html += `<div class="card-body">`;

    if (isThreat) {
      html += `<p class="card-text">${card.text}</p>`;
      html += `<p class="card-challenge">To keep your cards: <strong>${card.challenge}</strong></p>`;
    } else {
      html += `<p class="card-text">${card.text}</p>`;
    }
    html += '</div></div>';

    // Teaching question
    if (q) {
      html += '<div class="question-area">';
      html += `<p class="question-text">${q.question}</p>`;
      html += '<div class="answers">';
      q.answers.forEach((a, i) => {
        html += `<button class="btn btn-answer" onclick="StrongholdGame.answer(${i})">${a}</button>`;
      });
      html += '</div></div>';
    } else {
      // No teaching module, auto-collect
      html += `<button class="btn btn-draw" onclick="StrongholdGame.answer(0)">Continue</button>`;
    }

    cardArea.innerHTML = html;
  }

  function renderGameOver() {
    const el = document.getElementById('gameover-content');
    if (!el) return;

    let html = '';
    if (state.won) {
      html += `<h2>${state.greaterVictory ? 'Greater Victory!' : 'Victory!'}</h2>`;
      html += `<p class="victory-subtitle">${state.greaterVictory ? 'You collected 12 cards \u2014 a true Defender of Life!' : 'You collected 7 cards and fortified your stronghold!'}</p>`;

      // Badge
      html += '<div class="badge">';
      html += '<div class="badge-border">';
      html += `<h3>Defender of Life</h3>`;
      html += `<p>Pillar: ${state.pillar.name}</p>`;
      html += `<p>Cards: ${state.collected.length} | Threats Defeated: ${state.threatsDefeated}</p>`;
      html += `<p>EZ Merit Earned: ${state.meritEarned}</p>`;
      html += '</div></div>';

      // Victory prayer
      html += `<div class="victory-prayer"><pre>${VICTORY_PRAYER}</pre></div>`;
    } else {
      html += '<h2>Mission Incomplete</h2>';
      html += `<p>Cards collected: ${state.collected.length} / 7</p>`;
      html += `<p>EZ Merit Earned: ${state.meritEarned}</p>`;
    }

    html += `<button class="btn btn-draw" onclick="StrongholdGame.restart()">Play Again</button>`;
    el.innerHTML = html;
  }

  // ===== Prayer Modal =====

  function showPrayer() {
    const prayer = getCurrentPrayer();
    const modal = document.getElementById('prayer-modal');
    const content = document.getElementById('prayer-content');
    if (!modal || !content) return;

    content.innerHTML = `
      <h3>${prayer.name}</h3>
      <p class="prayer-text">${prayer.prayer}</p>
      <button class="btn btn-draw" onclick="StrongholdGame.closePrayer()">Amen</button>
    `;
    modal.classList.add('active');
  }

  function closePrayer() {
    const modal = document.getElementById('prayer-modal');
    if (modal) modal.classList.remove('active');
    state.prayerShown = true;
    state.meritEarned += 1; // Prayer merit
    updateUI();
  }

  // ===== Initialization =====

  function init() {
    // Register teaching questions
    registerQuestions();

    // Pillar selection
    const pillarGrid = document.getElementById('pillar-grid');
    if (pillarGrid) {
      pillarGrid.innerHTML = PILLARS.map(p => `
        <button class="pillar-btn" data-pillar="${p.id}" style="border-color:${p.color}">
          <span class="pillar-btn-icon">${p.icon}</span>
          <span class="pillar-btn-name">${p.name}</span>
          <span class="pillar-btn-mission">${p.mission}</span>
        </button>
      `).join('');

      pillarGrid.addEventListener('click', e => {
        const btn = e.target.closest('.pillar-btn');
        if (!btn) return;
        startGame(btn.dataset.pillar);
      });
    }

    // Rules button
    document.getElementById('rules-btn')?.addEventListener('click', () => showScreen('rules-screen'));

    // Back buttons
    document.querySelectorAll('.back-btn').forEach(btn => {
      btn.addEventListener('click', () => showScreen(btn.dataset.target));
    });

    // Sentinel Ops login
    setupSentinel();

    // Prayer button
    document.getElementById('prayer-btn')?.addEventListener('click', showPrayer);
  }

  function setupSentinel() {
    if (typeof SentinelAPI === 'undefined') return;

    const statusEl = document.getElementById('sentinel-status');
    const loginForm = document.getElementById('sentinel-login-form');
    const registerForm = document.getElementById('sentinel-register-form');

    // Check if already logged in
    if (SentinelAPI.isLoggedIn()) {
      statusEl.textContent = `Logged in as ${SentinelAPI.getStoredName() || SentinelAPI.getRoleId()}`;
      statusEl.className = 'sentinel-online';
    }

    // Login
    document.getElementById('sentinel-login-btn')?.addEventListener('click', async () => {
      const roleId = document.getElementById('sentinel-role-id').value.trim();
      if (!roleId) return;
      try {
        await SentinelAPI.login(roleId);
        statusEl.textContent = `Logged in as ${SentinelAPI.getStoredName()}`;
        statusEl.className = 'sentinel-online';
      } catch (e) {
        statusEl.textContent = `Login failed: ${e.message}`;
      }
    });

    // Register
    document.getElementById('sentinel-register-btn')?.addEventListener('click', async () => {
      const name = document.getElementById('sentinel-reg-name').value.trim();
      if (!name) return;
      try {
        await SentinelAPI.register(name, '1.0');
        statusEl.textContent = `Registered as ${name}`;
        statusEl.className = 'sentinel-online';
      } catch (e) {
        statusEl.textContent = `Register failed: ${e.message}`;
      }
    });

    // Toggle register/login
    document.getElementById('sentinel-toggle-register')?.addEventListener('click', e => {
      e.preventDefault();
      loginForm.classList.toggle('hidden');
      registerForm.classList.toggle('hidden');
    });
  }

  function startGame(pillarId) {
    state = newState(pillarId);
    showScreen('game-screen');

    // Show opening prayer if not shown
    if (!state.prayerShown) {
      showPrayer();
    }

    updateUI();
  }

  function restart() {
    showScreen('title-screen');
    state = null;
  }

  // ===== Expose API =====
  window.StrongholdGame = {
    init,
    drawCard,
    answer: answerQuestion,
    claimVictory,
    restart,
    showPrayer,
    closePrayer
  };

  document.addEventListener('DOMContentLoaded', init);
})();
