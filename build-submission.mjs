import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..', '..');
const templatePath = path.join(root, '04 CODEX FILES - Give These to Codex', '01 GIVE TO CODEX - Answer Template.json');
const outputPath = path.join(import.meta.dirname, 'submission.json');
const template = JSON.parse(fs.readFileSync(templatePath, 'utf8').replace(/^\uFEFF/, ''));

const files = {
  bank: '02 Bank Export August.csv',
  contracts: '04 Contracts Returns and Angry Customers.pdf',
  warehouse: '05 Warehouse Count Marta Notes.pdf',
  purchases: '06 Purchases Invoices and Goods Received.pdf',
  payroll: '07 Payroll Bonuses Contractors NEW.xlsx',
  assets: '08 Assets Repairs Leases Maybe.xlsx',
  loan: '09 Loans Owner Card and Legal Problems.pdf',
  later: '11 Evidence Received After Takeover.pdf',
  crm: '03 CRM Export Cleaned FINAL.xlsx',
  management: '01 USE THIS NUMBERS FINAL v9.xlsx',
};

const op = (answer, evidence, confidence = 'high') => ({ answer, evidence, confidence });
const material = (answer, evidence, confidence, aiProposal, independentChallenge, studentReasoning, statementEffect, changedFromAI = false) => ({
  answer, evidence, confidence, aiProposal, independentChallenge, studentReasoning, statementEffect, changedFromAI,
});

const decisions = {
  D001: op('Match RCPT-NS €180,000 to NorthStar accepted invoice INV-26012; record collection of recognised revenue.', [files.bank, files.contracts, files.crm]),
  D002: op('Match RCPT-FF €142,000 to Freedom invoice INV-26031; record partial collection and leave €58,000 receivable.', [files.bank, files.contracts, files.crm]),
  D003: op('Match RCPT-PHX €70,000 to Phoenix completed event INV-26047; record partial collection and leave €30,000 receivable.', [files.bank, files.contracts, files.crm]),
  D004: op('Match RCPT-LIB €95,000 to Liberty delivered invoice INV-26063; record partial collection and leave €25,000 receivable.', [files.bank, files.contracts, files.crm]),
  D005: op('RCPT-001 €35,000 is settlement of opening receivables, not current-period revenue.', [files.bank]),
  D006: op('PLAT-FSB €250,000 is collection against €270,000 Finally Single web revenue; closing platform receivable is €20,000.', [files.bank, files.crm]),
  D007: op('PLAT-NCB €37,000 is collection against €90,000 Never Call Back web revenue; gross receivable is €53,000 before the €18,000 R-17 write-off.', [files.bank, files.crm, files.later]),
  D008: op('DEP-NB €60,000 is a customer deposit for a 15 September event; record a contract liability.', [files.bank, files.contracts]),
  D009: op('DEP-FF2 €30,000 is a customer deposit for a 24 September event; record a contract liability.', [files.bank, files.contracts]),
  D010: op('SUP-BOX €105,000 is payment to BoxWorks. Purchases are €130,000 and the confirmed closing payable is €25,000.', [files.bank, files.purchases]),
  D011: op('SUP-GLS €92,000 is payment to Glass & Drama. Purchases are €120,000 and the confirmed closing payable is €28,000.', [files.bank, files.purchases]),
  D012: op('SUP-PRT €81,000 is payment to Print Again. Purchases are €95,000 and the confirmed closing payable is €14,000.', [files.bank, files.purchases]),
  D013: op('SUP-EVT €100,000 is payment to Event Things. The €59,000 final balance includes €45,000 opening payable plus the current-period movement.', [files.bank, files.purchases]),
  D014: op('No reliable January-only cash amount exists. The bank supports one €231,000 combined Jan-Aug payroll payment; do not invent a monthly split.', [files.bank, files.payroll], 'low'),
  D015: op('No reliable February-only cash amount exists. Use the combined Jan-Aug payroll evidence only.', [files.bank, files.payroll], 'low'),
  D016: op('No reliable March-only cash amount exists. Use the combined Jan-Aug payroll evidence only.', [files.bank, files.payroll], 'low'),
  D017: op('No reliable April-only cash amount exists. Use the combined Jan-Aug payroll evidence only.', [files.bank, files.payroll], 'low'),
  D018: op('No reliable May-only cash amount exists. Use the combined Jan-Aug payroll evidence only.', [files.bank, files.payroll], 'low'),
  D019: op('No reliable June-only cash amount exists. Use the combined Jan-Aug payroll evidence only.', [files.bank, files.payroll], 'low'),
  D020: op('No reliable July-only cash amount exists. Use the combined Jan-Aug payroll evidence only.', [files.bank, files.payroll], 'low'),
  D021: op('No reliable August-only cash amount exists. Use the combined Jan-Aug payroll evidence only.', [files.bank, files.payroll], 'low'),
  D022: op('RENT €48,000 is an operating rent payment and expense for the period.', [files.bank]),
  D023: op('MKT €55,000 is marketing expense: Meta, TikTok and influencer payments.', [files.bank]),
  D024: op('SOFT €16,000 is software-subscription expense.', [files.bank]),
  D025: op('UTIL €12,000 is utilities expense.', [files.bank]),
  D026: op('REPAIR €10,000 is a repair expense, not capital expenditure.', [files.bank, files.purchases, files.assets]),
  D027: op('CAPEX-PACK €60,000 is the Pack-O-Matic 9000 equipment purchase; capitalise it.', [files.bank, files.purchases, files.assets]),
  D028: op('CAPEX-PHOTO €20,000 is the Regret Photo Booth equipment purchase; capitalise it.', [files.bank, files.purchases, files.assets]),
  D029: op('LOAN-ADV €50,000 is new bank borrowing, not income.', [files.bank, files.loan]),
  D030: op('PRINCIPAL €19,000 is financing repayment that reduces loan principal.', [files.bank, files.loan]),
  D031: op('INT €10,000 is interest paid. Total interest expense is €12,000, leaving €2,000 payable.', [files.bank, files.loan, files.later]),
  D032: op('VILLA €70,000 is a personal owner distribution, not marketing or payroll.', [files.bank, files.loan]),
  D033: op('OWNERCARD €40,000 is a personal owner distribution, not an operating expense.', [files.bank, files.loan]),
  D034: op('No insurance cash movement or reliable insurance evidence was supplied. Record no adjustment and disclose the evidence gap.', [files.bank, files.assets], 'low'),
  D035: op('Write down water-damaged basement stock by €22,000. Physical existence does not support a recoverable asset value.', [files.warehouse, files.later]),
  D036: op('Write off R-17 receivable €18,000 after the liquidator confirmed no distribution is expected.', [files.contracts, files.later]),
  D037: op('Recognise former employee claim provision €25,000, the external counsel best estimate at 31 August.', [files.loan, files.later]),
  D038: op('Recognise €459,000 purchases from goods-received supplier invoices; confirm €126,000 closing supplier payables.', [files.purchases]),
  D039: op('Customer cash collections total €809,000: €35,000 opening receivable plus €774,000 collections on recognised current-period revenue.', [files.bank, files.crm]),
  D040: op('Closing bank balance is €60,000, confirmed by the bank export and post-takeover bank confirmation.', [files.bank, files.later]),
  D041: material('Classify €90,000 September deposits as contract liabilities, not August revenue.', [files.bank, files.contracts], 'high', 'Record the deposits as deferred revenue because delivery occurs in September.', 'The independent analysis reached the same conclusion from the signed delivery dates and bank receipts.', 'Cash arrived before performance. Recognition as revenue would overstate August profit by €90,000.', { profit: 0, cash: 90000, assets: 0, liabilities: 90000, equity: 0 }),
  D042: material('Classify €50,000 new bank advance as borrowing.', [files.bank, files.loan], 'high', 'Record the €50,000 as new loan principal, not income.', 'The independent analysis confirmed that the signed bank agreement describes a repayable loan.', 'The legal form and repayment requirement are clear. Income classification would overstate profit by €50,000.', { profit: 0, cash: 50000, assets: 0, liabilities: 50000, equity: 0 }),
  D043: material('Capitalise the €60,000 Pack-O-Matic 9000 as PPE.', [files.purchases, files.assets, files.bank], 'high', 'Capitalise the machine because it is available for use and provides a long-term operating resource.', 'The independent analysis agreed and treated the bank payment as investing cash flow.', 'The machine creates a long-term resource rather than restoring ordinary output.', { profit: 0, cash: -60000, assets: 60000, liabilities: 0, equity: 0 }),
  D044: material('Capitalise the €20,000 Regret Photo Booth as PPE.', [files.purchases, files.assets, files.bank], 'high', 'Capitalise the photo booth and depreciate it within the period estimate.', 'The independent analysis agreed that the booth was available for use on 10 May.', 'The booth is equipment that remains available to support future events.', { profit: 0, cash: -20000, assets: 20000, liabilities: 0, equity: 0 }),
  D045: material('Expense €10,000 belt replacement and calibration as repair.', [files.purchases, files.assets, files.bank], 'high', 'Expense the repair because it restored normal output without increasing capacity or useful life.', 'The independent analysis agreed with the supplier description of a restoration, not an improvement.', 'The evidence directly states that the work did not extend life or increase capacity.', { profit: -10000, cash: -10000, assets: 0, liabilities: 0, equity: -10000 }),
  D046: material('Classify the €70,000 villa reservation as owner distribution.', [files.bank, files.loan], 'high', 'Remove the villa from operating expense and record it as distribution to the owner.', 'The independent analysis agreed because the villa is personally owned and no customer meeting occurred.', 'There is no business purpose supported by evidence.', { profit: 0, cash: -70000, assets: 0, liabilities: 0, equity: -70000 }),
  D047: material('Classify €40,000 owner-card spending as owner distribution.', [files.bank, files.loan], 'high', 'Record the chairman card payment as a distribution, not payroll or marketing.', 'The independent analysis reached the same conclusion from the bank and owner-card evidence.', 'The payment lacks evidence of a genuine business purpose.', { profit: 0, cash: -40000, assets: 0, liabilities: 0, equity: -40000 }),
  D048: material('Classify €405,000 materials consumed on valid delivered sales as COGS.', [files.warehouse], 'medium', 'Use the independent physical-product consumption schedule as COGS.', 'The independent analysis agreed, while retaining the separate €9,000 stock uncertainty.', 'Consumption relates to fulfilled product sales rather than period-end inventory.', { profit: -405000, cash: 0, assets: -405000, liabilities: 0, equity: -405000 }),
  D049: material('Classify €80,000 event-delivery staff as direct cost of events.', [files.payroll], 'medium', 'Include event delivery payroll in COGS because employees work directly on paid events.', 'The independent analysis agreed with the payroll file description.', 'The work is directly attributable to delivering the service sold to customers.', { profit: -80000, cash: 0, assets: 0, liabilities: 0, equity: -80000 }),
  D050: op('Classify €72,000 sales and partnerships payroll as selling expense.', [files.payroll], 'medium'),
  D051: op('Classify €96,000 office and finance payroll as administrative expense.', [files.payroll], 'medium'),
  D052: op('Classify €48,000 rent as operating expense.', [files.bank]),
  D053: op('Classify €55,000 marketing as operating expense.', [files.bank]),
  D054: op('Classify €16,000 software subscriptions as operating expense.', [files.bank]),
  D055: op('Classify €12,000 utilities as operating expense.', [files.bank]),
  D056: material('Recognise €24,000 period depreciation.', [files.assets], 'medium', 'Use the independent depreciation estimate of €24,000.', 'The independent analysis agreed but flagged missing useful-life detail as an uncertainty.', 'The supplied asset schedule identifies €24,000 as the independent period estimate.', { profit: -24000, cash: 0, assets: -24000, liabilities: 0, equity: -24000 }),
  D057: material('Recognise €18,000 bad-debt write-off for R-17.', [files.contracts, files.later], 'high', 'Write off R-17 because no recovery is expected after liquidation.', 'The independent analysis agreed based on the liquidator notice.', 'The later notice confirms insolvency already present at the reporting date.', { profit: -18000, cash: 0, assets: -18000, liabilities: 0, equity: -18000 }),
  D058: material('Recognise €22,000 write-down of damaged basement stock.', [files.warehouse, files.later], 'high', 'Reduce damaged inventory to nil recoverable value.', 'The independent analysis agreed that physical presence does not establish recoverability.', 'Both warehouse and independent assessment state that the stock is unsaleable.', { profit: -22000, cash: 0, assets: -22000, liabilities: 0, equity: -22000 }),
  D059: material('Recognise €25,000 provision for former employee claim.', [files.loan, files.later], 'high', 'Recognise the external counsel best estimate as a provision.', 'The independent analysis agreed that the claim was probable at 31 August.', 'The obligation arose before reporting date and is both probable and reliably estimated.', { profit: -25000, cash: 0, assets: 0, liabilities: 25000, equity: -25000 }),
  D060: op('No insurance consumption is evidenced; record €0 and retain the evidence gap as low-confidence uncertainty.', [files.bank, files.assets], 'low'),
  D061: op('Recognise €2,000 unpaid interest: €12,000 expense less €10,000 cash paid.', [files.loan, files.later]),
  D062: op('Recognise €32,000 unpaid payroll: €15,000 opening accrual plus €248,000 expense less €231,000 paid.', [files.payroll, files.bank], 'medium'),
  D063: op('Recognise €126,000 unpaid suppliers, independently confirmed at 31 August.', [files.purchases]),
  D064: material('Recognise NorthStar revenue €180,000 on accepted delivery, 12 February.', [files.contracts, files.crm, files.bank], 'high', 'Recognise revenue on the accepted NorthStar delivery.', 'The independent analysis matched the contract, CRM and bank record despite customer-name variations.', 'Delivery and acceptance occurred before reporting date and cash was collected.', { profit: 180000, cash: 180000, assets: 0, liabilities: 0, equity: 180000 }),
  D065: material('Recognise Freedom revenue €200,000 on accepted delivery, 18 March.', [files.contracts, files.crm, files.bank], 'high', 'Recognise the full invoice on accepted delivery; retain €58,000 receivable.', 'The independent analysis agreed with the signed acceptance and partial cash collection.', 'Recognition follows delivery, not cash collection.', { profit: 200000, cash: 142000, assets: 58000, liabilities: 0, equity: 200000 }),
  D066: material('Recognise Phoenix revenue €100,000 on completed event, 29 April.', [files.contracts, files.crm, files.bank], 'high', 'Recognise revenue when the Phoenix event was completed.', 'The independent analysis agreed; customer email acceptance supports completion.', 'The service was completed before reporting date despite partial cash collection.', { profit: 100000, cash: 70000, assets: 30000, liabilities: 0, equity: 100000 }),
  D067: material('Recognise Liberty revenue €120,000 on delivered order, 20 June.', [files.contracts, files.crm, files.bank], 'high', 'Recognise the full Liberty invoice on delivery and retain €25,000 receivable.', 'The independent analysis agreed with delivery evidence and customer acceptance.', 'The delivery and acceptance predate 31 August.', { profit: 120000, cash: 95000, assets: 25000, liabilities: 0, equity: 120000 }),
  D068: material('Do not recognise revenue for undelivered September events; retain €90,000 deposits as liabilities.', [files.contracts, files.bank, files.crm], 'high', 'Defer both September-event deposits until performance occurs.', 'The independent analysis independently reached the same conclusion from the September delivery dates.', 'Neither event had been delivered by 31 August.', { profit: 0, cash: 90000, assets: 0, liabilities: 90000, equity: 0 }),
  D069: op('Classify €19,000 loan principal payment as financing cash flow and reduction of debt.', [files.bank, files.loan]),
  D070: op('Classify €80,000 equipment purchases as investing cash flow and PPE additions.', [files.bank, files.assets, files.purchases]),
  D071: material('Estimate bad-debt write-off at €18,000 for R-17.', [files.contracts, files.later], 'high', 'Use the liquidator confirmation to write off the €18,000 balance.', 'The independent analysis agreed that recovery is not expected.', 'The later evidence confirms the customer condition at 31 August.', { profit: -18000, cash: 0, assets: -18000, liabilities: 0, equity: -18000 }),
  D072: material('Estimate damaged-inventory write-off at €22,000; disclose but do not provide for €2,000 future disposal.', [files.warehouse, files.later], 'medium', 'Write off the unsaleable €22,000 stock and initially provide €2,000 for disposal.', 'The independent analysis challenged the €2,000 provision because no present obligation existed at reporting date.', 'I accepted the challenge: write down the stock, but treat future disposal cost as uncertainty until an obligation arises.', { profit: -22000, cash: 0, assets: -22000, liabilities: 0, equity: -22000 }, true),
  D073: material('Estimate legal provision at €25,000.', [files.loan, files.later], 'high', 'Recognise the lawyer best estimate within the €20,000-€30,000 range.', 'The independent analysis agreed that probability and estimation thresholds are met.', 'External counsel confirms the condition and best estimate at reporting date.', { profit: -25000, cash: 0, assets: 0, liabilities: 25000, equity: -25000 }),
  D074: material('Estimate period depreciation at €24,000.', [files.assets], 'medium', 'Use the asset schedule independent depreciation estimate.', 'The independent analysis agreed but highlighted missing useful-life detail.', 'The schedule provides the only quantified independent estimate; the limitation is disclosed.', { profit: -24000, cash: 0, assets: -24000, liabilities: 0, equity: -24000 }),
  D075: material('Estimate closing inventory at €112,000, with €9,000 gross-count difference disclosed.', [files.warehouse, files.purchases], 'medium', 'Apply the roll-forward: €80,000 opening plus €459,000 purchases less €405,000 consumption less €22,000 write-down.', 'The independent analysis agreed with €112,000 and separately identified the €9,000 unresolved warehouse difference.', 'The roll-forward uses confirmed purchases and stated valid-sale consumption, while the unexplained count difference remains visible.', { profit: 0, cash: 0, assets: 112000, liabilities: 0, equity: 112000 }),
  D076: op('Closing receivables are €168,000: €35,000 opening plus €960,000 revenue less €809,000 collections less €18,000 write-off.', [files.crm, files.bank, files.later]),
  D077: op('Expense €10,000 repair; capitalise €80,000 equipment. Repair restores normal output and does not improve the asset.', [files.assets, files.purchases]),
  D078: op('Insurance expense is €0 because no insurance movement is evidenced.', [files.bank, files.assets], 'low'),
  D079: op('Interest payable is €2,000.', [files.loan, files.later]),
  D080: op('Accrued payroll is €32,000.', [files.payroll, files.bank], 'medium'),
  D081: op('Customer-deposit liability is €90,000 for undelivered September events.', [files.contracts, files.bank]),
  D082: op('Closing PPE cost is €260,000: €180,000 opening cost plus €80,000 additions.', [files.assets]),
  D083: op('Closing accumulated depreciation is €69,000: €45,000 opening plus €24,000 period depreciation.', [files.assets]),
  D084: op('Supplier payable is €126,000, independently confirmed.', [files.purchases]),
  D085: op('Closing loan principal is €131,000: €100,000 opening plus €50,000 advance less €19,000 repayment.', [files.loan, files.later]),
  D086: op('Physical-material COGS is €405,000, based on valid delivered sales.', [files.warehouse], 'medium'),
  D087: op('Service direct payroll is €80,000 event-delivery staff.', [files.payroll], 'medium'),
  D088: op('Owner distributions total €110,000: €70,000 villa plus €40,000 owner card. Do not add an unsupported separate founder bonus.', [files.bank, files.loan]),
  D089: op('Net profit is €65,000 after all approved corrections.', [files.bank, files.contracts, files.purchases, files.payroll, files.assets, files.loan, files.later]),
  D090: op('Closing cash is €60,000, reconciled to both bank evidence and cash flow.', [files.bank, files.later]),
  D091: material('Approve corrected accounts before valuation or earn-out analysis.', [files.management, files.bank, files.contracts, files.loan], 'high', 'Reject the management presentation and approve corrected accounts before valuation.', 'The independent analysis agreed because management overstated revenue, classified debt as income and did not reconcile cash.', 'A valuation based on the management deck would rely on materially misstated profit and financial position.', { profit: 0, cash: 0, assets: 0, liabilities: 0, equity: 0 }),
  D092: op('Approve immediate freeze of owner-card access pending investigation and formal approval controls.', [files.loan, files.bank], 'high'),
  D093: op('Approve reclassification of September deposits to contract liabilities.', [files.contracts, files.bank], 'high'),
  D094: op('Begin a weekly 13-week cash forecast because liquidity and debt maturity are key risks.', [files.bank, files.loan], 'medium'),
  D095: op('Stop new credit sales to insolvent or high-risk customers until credit controls are implemented.', [files.later, files.contracts], 'high'),
  D096: op('Approve disposal of unsaleable damaged stock, but recognise future disposal cash cost only when an obligation arises.', [files.warehouse, files.later], 'medium'),
  D097: op('Investigate management override, duplicate claims and unsupported classifications.', [files.management, files.loan], 'high'),
  D098: op('Renegotiate supplier terms because €126,000 remains payable and supplier balances are confirmed.', [files.purchases], 'high'),
  D099: op('Continue core Finally Single and event operations conditionally, subject to cash forecasting, credit control and governance fixes.', [files.contracts, files.crm, files.bank], 'medium'),
  D100: material('Do not use the management claim of €312,000 profit for earn-out; use corrected profit €65,000 only after board approval.', [files.management, files.bank, files.contracts, files.loan], 'high', 'Reject management profit €312,000 for earn-out and rely on corrected accounts.', 'The independent analysis agreed after reconciling cash, deposits, debt and omitted provisions.', 'The management figure includes September deposits and loan income and omits material corrections.', { profit: 0, cash: 0, assets: 0, liabilities: 0, equity: 0 }),
};

const filledDecisions = template.decisions.map((decision) => ({ ...decision, ...decisions[decision.id] }));
if (filledDecisions.some((decision) => !decision.answer || !decision.evidence?.length || !decision.confidence)) {
  throw new Error('Every decision must have an answer, evidence and confidence.');
}

const submission = {
  schemaVersion: '1.0',
  caseId: template.caseId,
  student: { id: 'dm25067', name: 'Darja Matjušonoka' },
  evidence: Object.entries(files).map(([id, file]) => ({ id, file, role: 'Case evidence used in the reconstruction' })),
  decisions: filledDecisions,
  schedules: {
    revenueAndReceivables: { openingReceivables: 35000, recognisedRevenue: 960000, cashCollections: 809000, writeOff: 18000, closingReceivables: 168000 },
    inventoryAndCogs: { openingInventory: 80000, purchases: 459000, materialsConsumed: 405000, damagedInventoryWriteDown: 22000, closingInventory: 112000, unresolvedGrossCountDifference: 9000 },
    payroll: { openingAccrual: 15000, expense: 248000, cashPaid: 231000, closingAccrual: 32000 },
    operatingExpenses: { rent: 48000, marketing: 55000, software: 16000, utilities: 12000, repairs: 10000, total: 141000 },
    ppeAndDepreciation: { openingCost: 180000, additions: 80000, closingCost: 260000, openingAccumulatedDepreciation: 45000, depreciation: 24000, closingAccumulatedDepreciation: 69000, closingNetPpe: 191000 },
    debtAndInterest: { openingPrincipal: 100000, newBorrowing: 50000, principalRepaid: 19000, closingPrincipal: 131000, interestExpense: 12000, interestPaid: 10000, interestPayable: 2000 },
    equityAndDistributions: { openingEquity: 170000, profit: 65000, ownerDistributions: 110000, closingEquity: 125000 },
  },
  statements: {
    profitAndLoss: {
      currency: 'EUR', periodEnd: '2026-08-31',
      lines: [
        ['Revenue', 960000], ['Materials consumed', -405000], ['Damaged-inventory write-down', -22000], ['Event-delivery payroll', -80000], ['Gross profit', 453000],
        ['Sales and partnerships payroll', -72000], ['Office and finance payroll', -96000], ['Rent, marketing, software, utilities and repairs', -141000], ['Depreciation', -24000], ['Bad-debt write-off', -18000], ['Legal provision', -25000], ['Operating profit', 77000], ['Interest expense', -12000], ['Profit for the period', 65000],
      ],
    },
    cashFlow: {
      currency: 'EUR', periodEnd: '2026-08-31',
      lines: [
        ['Customer collections, including opening receivable', 809000], ['September customer deposits', 90000], ['Supplier payments', -378000], ['Payroll paid', -231000], ['Other operating payments', -141000], ['Interest paid', -10000], ['Cash from operations', 139000],
        ['Capital expenditure', -80000], ['Cash from investing', -80000], ['New borrowing', 50000], ['Principal repayment', -19000], ['Owner distributions', -110000], ['Cash from financing', -79000], ['Net change in cash', -20000], ['Opening cash', 80000], ['Closing cash', 60000],
      ],
    },
    balanceSheet: {
      currency: 'EUR', periodEnd: '2026-08-31',
      assets: [['Cash', 60000], ['Trade receivables, net', 168000], ['Inventory, net', 112000], ['PPE, net', 191000], ['Total assets', 531000]],
      liabilitiesAndEquity: [['Suppliers', 126000], ['Accrued payroll', 32000], ['September customer deposits', 90000], ['Interest payable', 2000], ['Legal provision', 25000], ['Bank debt', 131000], ['Total liabilities', 406000], ['Equity', 125000], ['Total liabilities and equity', 531000]],
    },
  },
  reconciliations: [
    { name: 'Balance sheet', calculation: '€531,000 assets - €406,000 liabilities - €125,000 equity', result: 0, status: 'pass' },
    { name: 'Cash', calculation: '€80,000 opening + €139,000 operating - €80,000 investing - €79,000 financing', result: 60000, status: 'pass' },
    { name: 'Revenue and receivables', calculation: '€35,000 opening + €960,000 revenue - €809,000 collections - €18,000 write-off', result: 168000, status: 'pass' },
    { name: 'Inventory and COGS', calculation: '€80,000 opening + €459,000 purchases - €405,000 consumption - €22,000 write-down', result: 112000, status: 'pass' },
    { name: 'PPE and depreciation', calculation: '€260,000 cost - €69,000 accumulated depreciation', result: 191000, status: 'pass' },
    { name: 'Debt and interest', calculation: '€100,000 + €50,000 - €19,000 = €131,000 principal; €12,000 - €10,000 = €2,000 interest payable', result: 0, status: 'pass' },
    { name: 'Equity', calculation: '€170,000 opening + €65,000 profit - €110,000 distributions', result: 125000, status: 'pass' },
  ],
  uncertainties: [
    { title: 'Warehouse gross-count difference', amount: 9000, confidence: 'medium', treatment: 'Closing inventory is €112,000 from the supported roll-forward; €9,000 remains unexplained and requires item-by-item investigation.' },
    { title: 'Disposal quote', amount: 2000, confidence: 'medium', treatment: 'Do not recognise a provision at 31 August because no present obligation is evidenced. Recognise expense when an obligation arises.' },
    { title: 'Depreciation useful lives', amount: 24000, confidence: 'medium', treatment: 'Use the independent €24,000 period estimate; obtain supporting useful-life and residual-value assumptions.' },
    { title: 'Former employee claim range', amount: 25000, confidence: 'high', treatment: 'Recognise external counsel best estimate €25,000; disclosed range is €20,000-€30,000.' },
    { title: 'Insurance evidence', amount: 0, confidence: 'low', treatment: 'No movement is recognised because no insurance record was supplied.' },
  ],
  boardRecommendation: {
    conclusion: 'Continue core operations conditionally, but only after corrected accounts are approved and immediate cash, credit and governance controls are implemented.',
    actions: ['Approve corrected accounts before valuation or earn-out.', 'Freeze owner-card access and investigate overrides.', 'Move September deposits to contract liabilities.', 'Start a weekly 13-week cash forecast.', 'Stop unsecured credit sales to insolvent or high-risk customers.', 'Dispose of damaged stock when authorised.', 'Renegotiate supplier terms and obtain debt maturity terms.'],
  },
};

fs.writeFileSync(outputPath, `${JSON.stringify(submission, null, 2)}\n`);
console.log(`Wrote ${outputPath} with ${submission.decisions.length} decisions.`);
