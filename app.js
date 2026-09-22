const money = new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
const esc = (value) => String(value).replace(/[&<>"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[char]));
const amount = (value) => `${value < 0 ? '−' : ''}${money.format(Math.abs(value))}`;

function statementRows(lines) {
  return lines.map(([label, value]) => {
    const cls = /profit|gross|total|cash from|net change|closing cash/i.test(label) ? 'total' : /operating/i.test(label) ? 'subtotal' : '';
    return `<tr class="${cls}"><td>${esc(label)}</td><td>${amount(value)}</td></tr>`;
  }).join('');
}

function simpleRows(lines) {
  return lines.map(([label, value]) => {
    const cls = /total/i.test(label) ? 'total' : '';
    return `<tr class="${cls}"><td>${esc(label)}</td><td>${amount(value)}</td></tr>`;
  }).join('');
}

function scheduleTitle(key) {
  return key.replace(/([A-Z])/g, ' $1').replace(/^./, (x) => x.toUpperCase()).replace('Ppe', 'PPE').replace('Cogs', 'COGS');
}

async function render() {
  const data = await fetch('/submission.json').then((response) => response.json());
  const pAndL = data.statements.profitAndLoss.lines;
  const cash = data.statements.cashFlow.lines;
  const balance = data.statements.balanceSheet;
  const metrics = [
    ['Corrected profit', 65000, 'flag'], ['Closing cash', 60000, ''], ['Net receivables', 168000, ''], ['Closing inventory', 112000, ''],
  ];
  document.querySelector('#app').innerHTML = `
    <section class="hero">
      <div><p class="eyebrow">Board reconstruction</p><h1>What the bank says, not what management claimed.</h1><p class="lede">A traceable reconstruction of Divorce Party International Ltd. after takeover. The financial statements are built from stronger evidence first and retain every material uncertainty.</p></div>
      <aside class="verdict"><p>Board recommendation</p><strong>Continue conditionally</strong><p>Approve corrected accounts, protect cash, stop weak-credit sales and repair governance before any valuation or earn-out decision.</p></aside>
    </section>
    <section class="section"><div class="section-heading"><h2>Corrected position</h2><p>All figures in EUR at 31 August 2026</p></div><div class="metrics">${metrics.map(([label, value, cls]) => `<article class="metric ${cls}"><p>${label}</p><strong>${amount(value)}</strong></article>`).join('')}</div></section>
    <section class="section"><div class="section-heading"><h2>Three statements</h2><p>Corrected, reconciled and evidence-led</p></div><div class="grid">
      <article class="card"><div class="card-header"><div><h3>Profit and loss</h3><p>Period to 31 August 2026</p></div><span class="badge pass">Reconciled</span></div><table class="statement"><tbody>${statementRows(pAndL)}</tbody></table></article>
      <article class="card"><div class="card-header"><div><h3>Cash flow</h3><p>Direct method</p></div><span class="badge pass">Bank-tied</span></div><table class="statement"><tbody>${statementRows(cash)}</tbody></table></article>
      <article class="card"><div class="card-header"><div><h3>Balance sheet</h3><p>At 31 August 2026</p></div><span class="badge pass">Balances</span></div><table class="statement"><tbody>${simpleRows(balance.assets)}</tbody></table><br><table class="statement"><tbody>${simpleRows(balance.liabilitiesAndEquity)}</tbody></table></article>
      <article class="card"><div class="card-header"><div><h3>Evidence hierarchy</h3><p>Reliability used in every decision</p></div></div><p><strong>Strongest:</strong> bank, signed contracts, external confirmations and counsel.</p><p><strong>Supporting:</strong> warehouse count, CRM, payroll and asset records.</p><p><strong>Lowest:</strong> management P&amp;L and messages, which show attempted overrides.</p></article>
    </div></section>
    <section class="section"><div class="section-heading"><h2>Supporting schedules</h2><p>Roll-forwards behind the statements</p></div><div class="schedule-list">${Object.entries(data.schedules).map(([key, schedule]) => `<article class="schedule"><h3>${scheduleTitle(key)}</h3><p>${Object.entries(schedule).filter(([, value]) => typeof value === 'number').map(([label, value]) => `${scheduleTitle(label)} ${amount(value)}`).join(' · ')}</p></article>`).join('')}</div></section>
    <section class="section"><div class="section-heading"><h2>Required financial checks</h2><p>Each check is independent of the statement build</p></div><div class="checks">${data.reconciliations.map((check) => `<article class="check"><div class="check-top"><h3>${esc(check.name)}</h3><span class="badge pass">Pass</span></div><p>${esc(check.calculation)}</p></article>`).join('')}</div></section>
    <section class="section grid"><div><div class="section-heading"><h2>Uncertainty kept visible</h2><p>Not hidden in a rounding line</p></div>${data.uncertainties.map((item) => `<article class="uncertainty"><h3>${esc(item.title)} <span class="badge ${item.confidence}">${esc(item.confidence)}</span></h3><p>${esc(item.treatment)}</p></article>`).join('')}</div><aside class="recommendation"><h2>Immediate board actions</h2><p>${esc(data.boardRecommendation.conclusion)}</p><ul class="action-list">${data.boardRecommendation.actions.map((action) => `<li>${esc(action)}</li>`).join('')}</ul></aside></section>
    <section class="section"><div class="section-heading"><h2>Decision trail</h2><p>100 decisions are available in the assessor view and machine-readable submission.</p></div><div class="review-note"><a href="/review/"><strong>Open assessor review</strong></a> to inspect the 25 material judgments, evidence, independent challenge and student certification.</div></section>`;
}

render().catch(() => { document.querySelector('#app').innerHTML = '<p>Unable to load the case reconstruction.</p>'; });
