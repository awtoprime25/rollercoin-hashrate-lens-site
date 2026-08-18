(() => {
  const factors = Object.freeze({
    GH: 1e9,
    TH: 1e12,
    PH: 1e15,
    EH: 1e18,
  });

  const form = document.querySelector('#demo-form');
  const amountInput = document.querySelector('#amount');
  const sourceSelect = document.querySelector('#source-unit');
  const targetSelect = document.querySelector('#target-unit');
  const decimalsSelect = document.querySelector('#decimals');
  const output = document.querySelector('#demo-output');
  const equation = document.querySelector('#demo-equation');

  function formatValue(value, decimals) {
    return new Intl.NumberFormat('en-US', {
      useGrouping: false,
      maximumFractionDigits: decimals,
    }).format(value);
  }

  function updateDemo() {
    const amount = Number(amountInput.value);
    const source = sourceSelect.value;
    const target = targetSelect.value;
    const decimals = Math.min(6, Math.max(0, Number(decimalsSelect.value)));

    if (!Number.isFinite(amount) || amount < 0 || !factors[source] || !factors[target]) {
      output.textContent = '—';
      equation.textContent = 'Introduz um valor válido';
      return;
    }

    const converted = amount * factors[source] / factors[target];
    const formatted = formatValue(converted, decimals);
    const sourceFormatted = formatValue(amount, decimals);

    output.textContent = `${formatted} ${target}/s`;
    equation.innerHTML = `${sourceFormatted} ${source}/s <span>→</span> ${formatted} ${target}/s`;
  }

  form.addEventListener('input', updateDemo);
  form.addEventListener('change', updateDemo);
  updateDemo();
})();
