(() => {
  const factors = Object.freeze({
    GH: 1e9,
    TH: 1e12,
    PH: 1e15,
    EH: 1e18,
  });

  const translations = Object.freeze({
    pt: {
      pageTitle: 'Hashrate Lens — uma escala só',
      navDemo: 'Demo', navWhy: 'Como funciona', navPrivacy: 'Privacidade', profileLink: 'Perfil ↗',
      heroEyebrow: 'ROLLERCOIN / EXTENSÃO FIREFOX', heroTitle: 'Uma escala só para uma potência difícil de ler.',
      heroLede: 'O Hashrate Lens transforma GH/s, TH/s, PH/s e EH/s para a unidade que preferes — diretamente na página, sempre visível.',
      heroPrimary: 'Experimentar o conversor', heroSecondary: 'Ver instalação',
      proofOne: '<i aria-hidden="true">01</i> SEM SERVIDOR', proofTwo: '<i aria-hidden="true">02</i> SEM TRACKING', proofThree: '<i aria-hidden="true">03</i> AO VIVO',
      visualTop: 'DISPLAY / NORMALIZADO', liveDisplay: 'LIVE DISPLAY', localOnly: 'LOCAL ONLY', decimalScale: 'DECIMAL SCALE', visualBottom: 'THE NUMBER STAYS THE SAME',
      demoEyebrow: 'EXPERIMENTA A ESCALA', demoTitle: 'Vê a conversão antes de abrir o jogo.', demoDescription: 'Esta demonstração corre apenas nesta página. Não envia nada para lado nenhum.',
      inputLabel: 'INPUT / HASHRATE', valueLabel: 'Valor', fromLabel: 'De', toLabel: 'Para', decimalsLabel: 'Casas', outputLabel: 'OUTPUT / LEGÍVEL', resultNote: 'Zeros desnecessários desaparecem. A escala fica.',
      whyEyebrow: 'UMA FERRAMENTA PEQUENA COM UM TRABALHO CLARO', whyTitle: 'Menos ruído. Mais leitura.',
      featureOneTitle: 'Sempre visível', featureOneText: 'A unidade escolhida aparece no lugar do valor original. Sem tooltip, sem contas mentais.',
      featureTwoTitle: 'Acompanha o jogo', featureTwoText: 'Valores que entram depois, incluindo componentes React, também passam pela mesma escala.',
      featureThreeTitle: 'Local por desenho', featureThreeText: 'Sem API, sem servidor, sem perfil de mineração. Só uma transformação visual no browser.',
      privacyEyebrow: 'PRIVACIDADE / POR PADRÃO', privacyTitle: 'O teu hashrate fica no teu browser.', privacyText: 'O Hashrate Lens guarda apenas a unidade, precisão e estado que escolheste no armazenamento local do Firefox. Não recolhe atividade, saldo, conta ou valores de mineração.',
      installEyebrow: 'FIREFOX ADD-ONS / PRÓXIMO PASSO', installTitle: 'Uma escala. Em qualquer sessão.', installText: 'A publicação no Firefox Add-ons está a ser preparada. O download oficial ficará disponível aqui depois da aprovação da Mozilla.', installButton: 'Abrir Firefox Add-ons',
      footerName: 'HASHRATE LENS / 2026', footerDisclaimer: 'RollerCoin é um site de terceiros.', footerIssues: 'Reportar problema ↗', footerAuthor: 'Feito por Walter ↗',
    },
    en: {
      pageTitle: 'Hashrate Lens — one scale',
      navDemo: 'Demo', navWhy: 'How it works', navPrivacy: 'Privacy', profileLink: 'Profile ↗',
      heroEyebrow: 'ROLLERCOIN / FIREFOX EXTENSION', heroTitle: 'One scale for a number that is hard to read.',
      heroLede: 'Hashrate Lens turns GH/s, TH/s, PH/s, and EH/s into the unit you choose — directly on the page, always visible.',
      heroPrimary: 'Try the converter', heroSecondary: 'See installation',
      proofOne: '<i aria-hidden="true">01</i> NO SERVER', proofTwo: '<i aria-hidden="true">02</i> NO TRACKING', proofThree: '<i aria-hidden="true">03</i> LIVE',
      visualTop: 'DISPLAY / NORMALIZED', liveDisplay: 'LIVE DISPLAY', localOnly: 'LOCAL ONLY', decimalScale: 'DECIMAL SCALE', visualBottom: 'THE NUMBER STAYS THE SAME',
      demoEyebrow: 'TRY THE SCALE', demoTitle: 'See the conversion before you open the game.', demoDescription: 'This demo runs only on this page. It sends nothing anywhere.',
      inputLabel: 'INPUT / HASHRATE', valueLabel: 'Value', fromLabel: 'From', toLabel: 'To', decimalsLabel: 'Decimals', outputLabel: 'OUTPUT / READABLE', resultNote: 'Unnecessary zeros disappear. The scale stays.',
      whyEyebrow: 'A SMALL TOOL WITH A CLEAR JOB', whyTitle: 'Less noise. More signal.',
      featureOneTitle: 'Always visible', featureOneText: 'Your chosen unit replaces the original value. No tooltip, no mental math.',
      featureTwoTitle: 'Keeps up with the game', featureTwoText: 'Values added later, including React components, go through the same scale too.',
      featureThreeTitle: 'Local by design', featureThreeText: 'No API, no server, no mining profile. Just a visual transformation in your browser.',
      privacyEyebrow: 'PRIVACY / BY DEFAULT', privacyTitle: 'Your hashrate stays in your browser.', privacyText: 'Hashrate Lens stores only the unit, precision, and enabled state you choose in Firefox local storage. It does not collect activity, balances, account details, or mining values.',
      installEyebrow: 'FIREFOX ADD-ONS / NEXT', installTitle: 'One scale. Every session.', installText: 'The Firefox Add-ons release is being prepared. The official download will appear here after Mozilla approval.', installButton: 'Open Firefox Add-ons',
      footerName: 'HASHRATE LENS / 2026', footerDisclaimer: 'RollerCoin is a third-party website.', footerIssues: 'Report an issue ↗', footerAuthor: 'Built by Walter ↗',
    },
  });

  const form = document.querySelector('#demo-form');
  const amountInput = document.querySelector('#amount');
  const sourceSelect = document.querySelector('#source-unit');
  const targetSelect = document.querySelector('#target-unit');
  const decimalsSelect = document.querySelector('#decimals');
  const output = document.querySelector('#demo-output');
  const equation = document.querySelector('#demo-equation');
  const languageButtons = document.querySelectorAll('[data-language]');

  function formatValue(value, decimals) {
    return new Intl.NumberFormat('en-US', { useGrouping: false, maximumFractionDigits: decimals }).format(value);
  }

  function updateDemo() {
    const amount = Number(amountInput.value);
    const source = sourceSelect.value;
    const target = targetSelect.value;
    const decimals = Math.min(6, Math.max(0, Number(decimalsSelect.value)));

    if (!Number.isFinite(amount) || amount < 0 || !factors[source] || !factors[target]) {
      output.textContent = '—';
      equation.textContent = 'Enter a valid value';
      return;
    }

    const converted = amount * factors[source] / factors[target];
    const formatted = formatValue(converted, decimals);
    const sourceFormatted = formatValue(amount, decimals);

    output.textContent = `${formatted} ${target}/s`;
    equation.innerHTML = `${sourceFormatted} ${source}/s <span>→</span> ${formatted} ${target}/s`;
  }

  function setLanguage(language) {
    const selectedLanguage = translations[language] ? language : 'en';
    const copy = translations[selectedLanguage];

    document.documentElement.lang = selectedLanguage === 'en' ? 'en' : 'pt-PT';
    document.querySelector('meta[name="description"]').setAttribute(
      'content',
      selectedLanguage === 'en'
        ? 'Hashrate Lens normalizes RollerCoin hashrates to a unit chosen in Firefox.'
        : 'Hashrate Lens normaliza os hashrates do RollerCoin para uma unidade escolhida no Firefox.',
    );
    document.querySelectorAll('[data-i18n]').forEach((element) => {
      const value = copy[element.dataset.i18n];
      if (value === undefined) return;
      if (value.includes('<')) element.innerHTML = value;
      else element.textContent = value;
    });
    document.title = copy.pageTitle;
    languageButtons.forEach((button) => {
      const active = button.dataset.language === selectedLanguage;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
  }

  languageButtons.forEach((button) => {
    button.addEventListener('click', () => setLanguage(button.dataset.language));
  });
  form.addEventListener('input', updateDemo);
  form.addEventListener('change', updateDemo);
  updateDemo();
  setLanguage('en');
})();
