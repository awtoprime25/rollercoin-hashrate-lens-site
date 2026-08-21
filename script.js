(() => {
  const factors = Object.freeze({ GH: 1e9, TH: 1e12, PH: 1e15, EH: 1e18 });

  const translations = Object.freeze({
    pt: {
      pageTitle: 'Hashrate Lens — uma escala só', navDemo: 'Demo', navWhy: 'Como funciona', navPrivacy: 'Privacidade', profileLink: 'Perfil ↗', heroEyebrow: 'ROLLERCOIN / EXTENSÃO FIREFOX', heroTitle: 'Uma escala só para uma potência difícil de ler.', heroLede: 'O Hashrate Lens transforma GH/s, TH/s, PH/s e EH/s para a unidade que preferes — diretamente na página, sempre visível.', heroPrimary: 'Instalar no Firefox', heroSecondary: 'Experimentar o conversor', proofOne: '<i aria-hidden="true">01</i> SEM SERVIDOR', proofTwo: '<i aria-hidden="true">02</i> SEM TRACKING', proofThree: '<i aria-hidden="true">03</i> AO VIVO', visualTop: 'DISPLAY / NORMALIZADO', liveDisplay: 'LIVE DISPLAY', localOnly: 'LOCAL ONLY', decimalScale: 'DECIMAL SCALE', visualBottom: 'THE NUMBER STAYS THE SAME', demoEyebrow: 'EXPERIMENTA A ESCALA', demoTitle: 'Vê a conversão antes de abrir o jogo.', demoDescription: 'Esta demonstração corre apenas nesta página. Não envia nada para lado nenhum.', inputLabel: 'INPUT / HASHRATE', valueLabel: 'Valor', fromLabel: 'De', toLabel: 'Para', decimalsLabel: 'Casas', outputLabel: 'OUTPUT / LEGÍVEL', resultNote: 'Zeros desnecessários desaparecem. A escala fica.', whyEyebrow: 'UMA FERRAMENTA PEQUENA COM UM TRABALHO CLARO', whyTitle: 'Menos ruído. Mais leitura.', featureOneTitle: 'Sempre visível', featureOneText: 'A unidade escolhida aparece no lugar do valor original. Sem tooltip, sem contas mentais.', featureTwoTitle: 'Acompanha o jogo', featureTwoText: 'Valores que entram depois, incluindo componentes React, também passam pela mesma escala.', featureThreeTitle: 'Local por desenho', featureThreeText: 'Sem API, sem servidor, sem perfil de mineração. Só uma transformação visual no browser.', privacyEyebrow: 'PRIVACIDADE / POR PADRÃO', privacyTitle: 'O teu hashrate fica no teu browser.', privacyText: 'O Hashrate Lens guarda apenas a unidade, precisão e estado que escolheste no armazenamento local do Firefox. Não recolhe atividade, saldo, conta ou valores de mineração.', installEyebrow: 'FIREFOX ADD-ONS / DISPONÍVEL AGORA', installTitle: 'Uma escala. Em qualquer sessão.', installText: 'A versão oficial está disponível no Firefox Add-ons. Instala o Hashrate Lens diretamente no Firefox e escolhe a unidade que preferes.', installButton: 'Instalar no Firefox', footerName: 'HASHRATE LENS / 2026', footerDisclaimer: 'RollerCoin é um site de terceiros.', footerIssues: 'Reportar problema ↗', footerAuthor: 'Feito por Walter ↗',
    },
    en: {
      pageTitle: 'Hashrate Lens — one scale', navDemo: 'Demo', navWhy: 'How it works', navPrivacy: 'Privacy', profileLink: 'Profile ↗', heroEyebrow: 'ROLLERCOIN / FIREFOX EXTENSION', heroTitle: 'One scale for a number that is hard to read.', heroLede: 'Hashrate Lens turns GH/s, TH/s, PH/s, and EH/s into the unit you choose — directly on the page, always visible.', heroPrimary: 'Install for Firefox', heroSecondary: 'Try the converter', proofOne: '<i aria-hidden="true">01</i> NO SERVER', proofTwo: '<i aria-hidden="true">02</i> NO TRACKING', proofThree: '<i aria-hidden="true">03</i> LIVE', visualTop: 'DISPLAY / NORMALIZED', liveDisplay: 'LIVE DISPLAY', localOnly: 'LOCAL ONLY', decimalScale: 'DECIMAL SCALE', visualBottom: 'THE NUMBER STAYS THE SAME', demoEyebrow: 'TRY THE SCALE', demoTitle: 'See the conversion before you open the game.', demoDescription: 'This demo runs only on this page. It sends nothing anywhere.', inputLabel: 'INPUT / HASHRATE', valueLabel: 'Value', fromLabel: 'From', toLabel: 'To', decimalsLabel: 'Decimals', outputLabel: 'OUTPUT / READABLE', resultNote: 'Unnecessary zeros disappear. The scale stays.', whyEyebrow: 'A SMALL TOOL WITH A CLEAR JOB', whyTitle: 'Less noise. More signal.', featureOneTitle: 'Always visible', featureOneText: 'Your chosen unit replaces the original value. No tooltip, no mental math.', featureTwoTitle: 'Keeps up with the game', featureTwoText: 'Values added later, including React components, go through the same scale too.', featureThreeTitle: 'Local by design', featureThreeText: 'No API, no server, no mining profile. Just a visual transformation in your browser.', privacyEyebrow: 'PRIVACY / BY DEFAULT', privacyTitle: 'Your hashrate stays in your browser.', privacyText: 'Hashrate Lens stores only the unit, precision, and enabled state you choose in Firefox local storage. It does not collect activity, balances, account details, or mining values.', installEyebrow: 'FIREFOX ADD-ONS / AVAILABLE NOW', installTitle: 'One scale. Every session.', installText: 'The official release is now available on Firefox Add-ons. Install Hashrate Lens directly in Firefox and choose the unit you prefer.', installButton: 'Install for Firefox', footerName: 'HASHRATE LENS / 2026', footerDisclaimer: 'RollerCoin is a third-party website.', footerIssues: 'Report an issue ↗', footerAuthor: 'Built by Walter ↗',
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

  function mountFavicon() {
    const favicon = document.createElement('link');
    favicon.rel = 'icon';
    favicon.type = 'image/svg+xml';
    favicon.href = 'assets/icon.svg';
    document.head.append(favicon);
  }

  function mountLogo() {
    const mark = document.querySelector('.brand-mark');
    if (!mark) return;
    const logo = document.createElement('img');
    logo.alt = '';
    logo.src = 'assets/icon.svg';
    logo.width = 35;
    logo.height = 35;
    logo.style.display = 'block';
    logo.style.height = '35px';
    logo.style.width = '35px';
    logo.style.borderRadius = '50%';
    mark.textContent = '';
    mark.style.border = '0';
    mark.style.padding = '0';
    mark.append(logo);
  }

  function mountLanguageFlags() {
    const flags = { pt: 'assets/flag-pt.svg', en: 'assets/flag-uk.svg' };
    const labels = { pt: 'Português', en: 'English' };
    languageButtons.forEach((button) => {
      const language = button.dataset.language;
      const flag = document.createElement('img');
      flag.alt = '';
      flag.src = flags[language];
      flag.width = 24;
      flag.height = 16;
      flag.style.borderRadius = '2px';
      flag.style.display = 'inline-block';
      flag.style.marginRight = '5px';
      flag.style.verticalAlign = '-3px';
      button.textContent = '';
      button.append(flag, document.createTextNode(language.toUpperCase()));
      button.setAttribute('aria-label', labels[language]);
    });
  }

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
    document.querySelector('meta[name="description"]').setAttribute('content', selectedLanguage === 'en' ? 'Hashrate Lens normalizes RollerCoin hashrates to a unit chosen in Firefox.' : 'Hashrate Lens normaliza os hashrates do RollerCoin para uma unidade escolhida no Firefox.');
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

  mountFavicon();
  mountLogo();
  mountLanguageFlags();
  languageButtons.forEach((button) => button.addEventListener('click', () => setLanguage(button.dataset.language)));
  form.addEventListener('input', updateDemo);
  form.addEventListener('change', updateDemo);
  updateDemo();
  setLanguage('en');
})();
