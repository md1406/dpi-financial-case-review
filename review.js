const esc = (value) => String(value).replace(/[&<>"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[char]));
const confidence = (value) => `<span class="badge ${value}">${esc(value)}</span>`;
const currency = new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
const signed = (value) => `${value < 0 ? '−' : value > 0 ? '+' : ''}${currency.format(Math.abs(value))}`;
const effectBasisLabel = {
  original_transaction: 'Original transaction',
  correction: 'Correction',
  closing_balance: 'Closing balance',
};

function tableRow(decision) {
  const state = [decision.changedFromAI ? 'changed' : '', decision.confidence === 'low' ? 'low-confidence' : ''].join(' ');
  return `<tr class="${state}" data-tier="${decision.reviewTier}" data-confidence="${decision.confidence}" data-changed="${Boolean(decision.changedFromAI)}"><td><span class="decision-id">${esc(decision.id)}</span><br>${esc(decision.category)}</td><td><strong>${esc(decision.question)}</strong><br>${esc(decision.answer)}</td><td>${decision.reviewTier === 'material_judgment' ? `<strong>Agent 1:</strong> ${esc(decision.aiProposal)}<br><strong>Agent 2:</strong> ${esc(decision.independentChallenge)}<br><strong>Certification:</strong> ${esc(decision.studentReasoning)}` : 'Operational decision; evidence and confidence certified.'}</td><td>${decision.evidence.map(esc).join('<br>')}</td><td>${confidence(decision.confidence)}${decision.changedFromAI ? '<br><span class="badge disagreement">Student override</span>' : ''}</td></tr>`;
}

function effectRow(decision) {
  const effect = decision.statementEffect;
  const explanation = decision.effectBasis === 'closing_balance'
    ? `Inventory ${currency.format(decision.closingBalance.inventory)} - closing balance, not a movement`
    : esc(decision.effectNote);
  return `<tr><td><span class="decision-id">${esc(decision.id)}</span></td><td><strong>${effectBasisLabel[decision.effectBasis]}</strong></td><td>${signed(effect.profit)}</td><td>${signed(effect.cash)}</td><td>${signed(effect.assets)}</td><td>${signed(effect.liabilities)}</td><td>${signed(effect.equity)}</td><td>${explanation}</td></tr>`;
}

function filterRows(filter) {
  document.querySelectorAll('.decision-table tbody tr').forEach((row) => {
    const show = filter === 'all' || (filter === 'material' && row.dataset.tier === 'material_judgment') || (filter === 'low' && row.dataset.confidence === 'low') || (filter === 'changed' && row.dataset.changed === 'true');
    row.classList.toggle('hidden', !show);
  });
  document.querySelectorAll('.filter').forEach((button) => button.classList.toggle('active', button.dataset.filter === filter));
}

async function render() {
  const data = await fetch('/submission.json').then((response) => response.json());
  const material = data.decisions.filter((decision) => decision.reviewTier === 'material_judgment');
  const low = data.decisions.filter((decision) => decision.confidence === 'low');
  document.querySelector('#review-app').innerHTML = `
    <section class="review-hero"><div><p class="eyebrow">Compact assessor view</p><h1>100 decisions, 25 material judgments.</h1><p class="lede">Every row retains its evidence and confidence. Material judgments record both independent AI positions and the final certified treatment.</p></div><div class="verdict"><p>Corrected profit</p><strong>€65,000</strong><p>Do not use management profit €312,000 for valuation or earn-out.</p></div></section>
    <section class="metrics"><article class="metric"><p>Total decisions</p><strong>${data.decisions.length}</strong></article><article class="metric"><p>Material judgments</p><strong>${material.length}</strong></article><article class="metric"><p>Low-confidence decisions</p><strong>${low.length}</strong></article><article class="metric flag"><p>Student override</p><strong>1</strong></article></section>
    <section class="section"><div class="review-note"><strong>Highlighted override:</strong> the final treatment writes down €22,000 damaged stock but does not recognise the separate €2,000 disposal quote as a 31 August provision. It is disclosed as uncertainty because no present obligation is evidenced.</div><div class="filter-row" role="group" aria-label="Decision filters"><button class="filter active" data-filter="all">All 100</button><button class="filter" data-filter="material">Material 25</button><button class="filter" data-filter="changed">Student override</button><button class="filter" data-filter="low">Low confidence</button></div><div class="decision-table-wrap"><table class="decision-table"><thead><tr><th>ID</th><th>Final treatment</th><th>AI review trail</th><th>Evidence</th><th>Confidence</th></tr></thead><tbody>${data.decisions.map(tableRow).join('')}</tbody></table></div></section>
    <section class="section"><div class="section-heading"><h2>Financial effect basis</h2><p>Each row is a standalone original transaction, correction, or closing balance. Cash is included in total assets; rows are not added together.</p></div><div class="decision-table-wrap"><table class="decision-table effect-table"><thead><tr><th>ID</th><th>Basis</th><th>Profit</th><th>Cash component</th><th>Total assets</th><th>Liabilities</th><th>Equity</th><th>Explanation</th></tr></thead><tbody>${material.map(effectRow).join('')}</tbody></table></div></section>`;
  document.querySelectorAll('.filter').forEach((button) => button.addEventListener('click', () => filterRows(button.dataset.filter)));
}

render().catch(() => { document.querySelector('#review-app').innerHTML = '<p>Unable to load the review trail.</p>'; });

