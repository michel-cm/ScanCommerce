<script setup>
import { computed } from 'vue'

const report = {
  projectName: 'E-commerce Exemplo',
  url: 'https://exemplo.com',
  device: 'mobile',
  createdAt: '2026-03-02',

  scores: {
    performance: 72,
    accessibility: 88,
    seo: 91,
    bestPractices: 80,
  },

  metrics: {
    fcp: 2.1,
    lcp: 3.4,
    speedIndex: 3.2,
    totalBlockingTime: 320,
    cls: 0.18,
  },

  aiSummary:
    'O presente diagnóstico de performance revela que o site analisado apresenta uma base estrutural sólida em termos de SEO e acessibilidade, porém enfrenta gargalos relevantes na experiência de carregamento, especialmente em dispositivos móveis, onde a velocidade percebida impacta diretamente o comportamento do usuário e, consequentemente, os indicadores de negócio. <br><br> O score de Performance (72) indica que há espaço significativo para otimizações técnicas capazes de elevar a competitividade digital da plataforma. O LCP (3.4s) encontra-se acima do ideal recomendado pelo Google (≤ 2.5s), o que pode estar afetando negativamente tanto o ranqueamento orgânico quanto a taxa de conversão. Estudos de mercado apontam que atrasos acima de 3 segundos podem reduzir conversões em até 20%, principalmente em e-commerces e páginas de captação.<br><br>Observa-se também um Total Blocking Time elevado (320ms), sugerindo que o JavaScript atual está impactando a interatividade inicial da página. Isso pode gerar sensação de lentidão mesmo quando o conteúdo já está visível, prejudicando a experiência do usuário e aumentando a taxa de rejeição.<br><br>Por outro lado, os scores de SEO (91) e Acessibilidade (88) demonstram boa conformidade estrutural, o que indica que o site possui fundamentos corretos e potencial de crescimento orgânico caso as métricas de experiência sejam aprimoradas.<br><br>As principais oportunidades de melhoria identificadas concentram-se em:<br><br> Recomenda-se a execução de um plano de ação técnico priorizado, focando inicialmente nas métricas que possuem maior impacto direto na experiência e no faturamento, garantindo retorno rápido sobre investimento (ROI) e evolução progressiva da maturidade digital da plataforma.<br><br>Este cenário demonstra que o site não está em estado crítico, porém encontra-se em uma zona de otimização estratégica, onde pequenas intervenções técnicas podem gerar ganhos comerciais relevantes e sustentáveis no médio e longo prazo. ',

  businessImpact: {
    conversionImpact:
      'Estimativa de perda de até 18% na taxa de conversão devido ao LCP acima de 3s.',
    seoImpact:
      'Risco moderado de perda de posicionamento orgânico devido a métricas de experiência de página abaixo do ideal.',
    retentionImpact:
      'Possível aumento da taxa de rejeição em dispositivos móveis.',
  },

  opportunities: [
    'Otimização de imagens acima da dobra',
    'Redução de JavaScript bloqueante',
    'Implementação de lazy loading',
    'Uso de CDN para assets estáticos',
  ],

  projectedGain:
    'Com as otimizações aplicadas, estima-se melhoria de 15 a 25 pontos no score de performance e potencial aumento de 10–20% na conversão.',
}

const scoreCards = computed(() => [
  { key: 'performance', label: 'Performance', value: report.scores.performance },
  { key: 'accessibility', label: 'Accessibility', value: report.scores.accessibility },
  { key: 'seo', label: 'SEO', value: report.scores.seo },
  { key: 'bestPractices', label: 'Best Practices', value: report.scores.bestPractices },
])

const metricRows = computed(() => [
  { label: 'First Contentful Paint', value: report.metrics.fcp, unit: 's', thresholds: [1.8, 3.0] },
  { label: 'Largest Contentful Paint', value: report.metrics.lcp, unit: 's', thresholds: [2.5, 4.0] },
  { label: 'Speed Index', value: report.metrics.speedIndex, unit: 's', thresholds: [3.4, 5.8] },
  { label: 'Total Blocking Time', value: report.metrics.totalBlockingTime, unit: 'ms', thresholds: [200, 600] },
  { label: 'Cumulative Layout Shift', value: report.metrics.cls, unit: '', thresholds: [0.1, 0.25] },
])

const impactItems = computed(() => [
  { key: 'conversion', icon: 'cart', label: 'Impacto na Conversão', text: report.businessImpact.conversionImpact },
  { key: 'seo', icon: 'search', label: 'Impacto no SEO', text: report.businessImpact.seoImpact },
  { key: 'retention', icon: 'users', label: 'Impacto na Retenção', text: report.businessImpact.retentionImpact },
])

function scoreColor(score) {
  if (score >= 90) return 'var(--color-success-500)'
  if (score >= 70) return 'var(--color-warning-500)'
  return 'var(--color-error-500)'
}

function metricStatus(value, thresholds) {
  if (value <= thresholds[0]) return 'good'
  if (value <= thresholds[1]) return 'moderate'
  return 'poor'
}

function metricStatusColor(value, thresholds) {
  const status = metricStatus(value, thresholds)
  if (status === 'good') return 'var(--color-success-500)'
  if (status === 'moderate') return 'var(--color-warning-500)'
  return 'var(--color-error-500)'
}

function metricStatusLabel(value, thresholds) {
  const status = metricStatus(value, thresholds)
  if (status === 'good') return 'Bom'
  if (status === 'moderate') return 'Moderado'
  return 'Ruim'
}

function formatMetric(value, unit) {
  if (unit === 'ms') return `${value} ms`
  if (unit === 's') return `${value} s`
  return String(value)
}

function formatDate(dateStr) {
  const [year, month, day] = dateStr.split('-')
  return `${day}/${month}/${year}`
}

function handleDownload() {
  alert('Relatório exportado com sucesso!')
}
</script>

<template>
  <main class="report">
    <!-- Header -->
    <header class="report__header row">
      <div class="report__header-info">
        <h1 class="report__title">{{ report.projectName }}</h1>
        <div class="report__meta">
          <a class="report__url" :href="report.url" target="_blank" rel="noopener">
            {{ report.url }}
          </a>
          <span class="report__separator">·</span>
          <span class="report__date">{{ formatDate(report.createdAt) }}</span>
          <span class="report__separator">·</span>
          <span
            class="report__badge"
            :class="report.device === 'mobile' ? 'report__badge--mobile' : 'report__badge--desktop'"
          >
            <svg
              v-if="report.device === 'mobile'"
              width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            >
              <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
              <line x1="12" y1="18" x2="12.01" y2="18" />
            </svg>
            <svg
              v-else
              width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            >
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
            {{ report.device === 'mobile' ? 'Mobile' : 'Desktop' }}
          </span>
        </div>
      </div>

      <button class="report__download" @click="handleDownload">
        <svg
          width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
        >
          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        Baixar Relatório
      </button>
    </header>

    <!-- AI Summary -->
    <section class="report__section row">
      <div class="report__highlight">
        <div class="report__highlight-header">
          <span class="report__highlight-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 2a7 7 0 017 7c0 2.38-1.19 4.47-3 5.74V17a1 1 0 01-1 1h-6a1 1 0 01-1-1v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 017-7z" />
              <line x1="9" y1="21" x2="15" y2="21" />
              <line x1="10" y1="24" x2="14" y2="24" />
            </svg>
          </span>
          <h2 class="report__highlight-title">Resumo Executivo</h2>
        </div>
        <p v-html="report.aiSummary" class="report__highlight-text" />
      </div>
    </section>

    <!-- Scores -->
    <section class="report__section row">
      <h2 class="report__section-title">Scores</h2>
      <div class="report__scores">
        <div
          v-for="card in scoreCards"
          :key="card.key"
          class="report__score-card"
        >
          <div
            class="report__score-ring"
            :style="{
              '--ring-color': scoreColor(card.value),
              '--ring-pct': card.value,
            }"
          >
            <svg class="report__score-svg" viewBox="0 0 120 120">
              <circle
                class="report__score-track"
                cx="60" cy="60" r="52"
                fill="none" stroke-width="8"
              />
              <circle
                class="report__score-fill"
                cx="60" cy="60" r="52"
                fill="none" stroke-width="8"
                :stroke-dasharray="2 * Math.PI * 52"
                :stroke-dashoffset="2 * Math.PI * 52 * (1 - card.value / 100)"
                stroke-linecap="round"
              />
            </svg>
            <span class="report__score-value" :style="{ color: scoreColor(card.value) }">
              {{ card.value }}
            </span>
          </div>
          <span class="report__score-label">{{ card.label }}</span>
        </div>
      </div>
    </section>

    <!-- Core Web Vitals -->
    <section class="report__section row">
      <h2 class="report__section-title">Core Web Vitals</h2>
      <div class="report__metrics">
        <div class="report__metrics-header">
          <span class="report__metrics-col report__metrics-col--name">Métrica</span>
          <span class="report__metrics-col report__metrics-col--value">Valor</span>
          <span class="report__metrics-col report__metrics-col--status">Status</span>
        </div>
        <div
          v-for="metric in metricRows"
          :key="metric.label"
          class="report__metrics-row"
        >
          <span class="report__metrics-cell report__metrics-cell--name" data-label="Métrica">
            {{ metric.label }}
          </span>
          <span
            class="report__metrics-cell report__metrics-cell--value"
            data-label="Valor"
            :style="{ color: metricStatusColor(metric.value, metric.thresholds) }"
          >
            {{ formatMetric(metric.value, metric.unit) }}
          </span>
          <span class="report__metrics-cell report__metrics-cell--status" data-label="Status">
            <span
              class="report__metrics-badge"
              :style="{
                '--badge-color': metricStatusColor(metric.value, metric.thresholds),
              }"
            >
              {{ metricStatusLabel(metric.value, metric.thresholds) }}
            </span>
          </span>
        </div>
      </div>
    </section>

    <!-- Business Impact -->
    <section class="report__section row">
      <h2 class="report__section-title">Impacto no Negócio</h2>
      <div class="report__impact">
        <div
          v-for="item in impactItems"
          :key="item.key"
          class="report__impact-card"
        >
          <span class="report__impact-icon" :class="`report__impact-icon--${item.key}`">
            <!-- cart -->
            <svg v-if="item.icon === 'cart'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
            </svg>
            <!-- search -->
            <svg v-if="item.icon === 'search'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <!-- users -->
            <svg v-if="item.icon === 'users'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" />
            </svg>
          </span>
          <div class="report__impact-content">
            <h3 class="report__impact-label">{{ item.label }}</h3>
            <p class="report__impact-text">{{ item.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Opportunities -->
    <section class="report__section row">
      <h2 class="report__section-title">Oportunidades de Melhoria</h2>
      <div class="report__opportunities">
        <div
          v-for="(opp, idx) in report.opportunities"
          :key="idx"
          class="report__opportunity"
        >
          <span class="report__opportunity-index">{{ idx + 1 }}</span>
          <span class="report__opportunity-text">{{ opp }}</span>
          <span class="report__opportunity-priority" :class="`report__opportunity-priority--${idx === 0 ? 'high' : idx === 1 ? 'high' : 'medium'}`">
            {{ idx < 2 ? 'Alta' : 'Média' }}
          </span>
        </div>
      </div>
    </section>

    <!-- Projected Gain -->
    <section class="report__section row">
      <div class="report__projection">
        <div class="report__projection-header">
          <span class="report__projection-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
              <polyline points="17 6 23 6 23 12" />
            </svg>
          </span>
          <h2 class="report__projection-title">Projeção de Ganho Competitivo</h2>
        </div>
        <p class="report__projection-text">{{ report.projectedGain }}</p>
        <div class="report__projection-bars">
          <div class="report__projection-bar">
            <span class="report__projection-bar-label">Score Atual</span>
            <div class="report__projection-bar-track">
              <div
                class="report__projection-bar-fill report__projection-bar-fill--current"
                :style="{ width: report.scores.performance + '%' }"
              >
                <span class="report__projection-bar-value">{{ report.scores.performance }}</span>
              </div>
            </div>
          </div>
          <div class="report__projection-bar">
            <span class="report__projection-bar-label">Score Projetado</span>
            <div class="report__projection-bar-track">
              <div
                class="report__projection-bar-fill report__projection-bar-fill--projected"
                :style="{ width: Math.min(report.scores.performance + 20, 100) + '%' }"
              >
                <span class="report__projection-bar-value">~{{ report.scores.performance + 20 }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
/* ===== Report Layout ===== */
.report {
  min-height: 100vh;
  padding-bottom: 64px;
  background-color: var(--theme-bg-primary);
  color: var(--theme-text-primary);
}

/* ===== Header ===== */
.report__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 32px 16px 28px;
  gap: 16px;
}

.report__title {
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0;
  letter-spacing: -0.02em;
  color: var(--theme-text-primary);
}

.report__meta {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
  flex-wrap: wrap;
}

.report__url {
  font-size: 0.875rem;
  color: var(--color-primary-400);
  text-decoration: none;
  transition: color 0.2s;
}

.report__url:hover {
  color: var(--color-primary-300);
  text-decoration: underline;
}

.report__separator {
  color: var(--theme-text-tertiary);
  font-size: 0.875rem;
}

.report__date {
  font-size: 0.875rem;
  color: var(--theme-text-tertiary);
}

.report__badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 20px;
  text-transform: capitalize;
}

.report__badge--mobile {
  background-color: rgba(59, 130, 246, 0.12);
  color: var(--color-informationlink-400);
}

.report__badge--desktop {
  background-color: rgba(111, 179, 15, 0.12);
  color: var(--color-success-400);
}

.report__download {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background-color: var(--color-primary-500);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.15s;
  white-space: nowrap;
  flex-shrink: 0;
}

.report__download:hover {
  background-color: var(--color-primary-400);
  transform: translateY(-1px);
}

.report__download:active {
  background-color: var(--color-primary-600);
  transform: translateY(0);
}

/* ===== Sections ===== */
.report__section {
  padding: 0 16px;
  margin-bottom: 32px;
}

.report__section-title {
  font-size: 1.15rem;
  font-weight: 600;
  margin: 0 0 16px;
  color: var(--theme-text-primary);
}

/* ===== Highlight Card (AI Summary / Projection) ===== */
.report__highlight {
  background: linear-gradient(135deg, var(--color-primary-800) 0%, var(--color-neutral-800) 100%);
  border: 1px solid var(--color-primary-700);
  border-radius: 12px;
  padding: 28px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
}

.report__highlight-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.report__highlight-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background-color: rgba(45, 140, 85, 0.2);
  color: var(--color-primary-400);
  flex-shrink: 0;
}

.report__highlight-title {
  font-size: 1.15rem;
  font-weight: 600;
  margin: 0;
  color: var(--theme-text-primary);
}

.report__highlight-text {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.7;
  color: var(--theme-text-secondary);
}

/* ===== Score Cards ===== */
.report__scores {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.report__score-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  background-color: var(--theme-surface);
  border: 1px solid var(--theme-border-subtle);
  border-radius: 12px;
  padding: 28px 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: border-color 0.2s, box-shadow 0.2s;
}

.report__score-card:hover {
  border-color: var(--theme-border-secondary);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
}

.report__score-ring {
  position: relative;
  width: 100px;
  height: 100px;
}

.report__score-svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.report__score-track {
  stroke: var(--theme-bg-tertiary);
}

.report__score-fill {
  stroke: var(--ring-color);
  transition: stroke-dashoffset 0.6s ease;
}

.report__score-value {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}

.report__score-label {
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--theme-text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

/* ===== Metrics Table ===== */
.report__metrics {
  background-color: var(--theme-surface);
  border: 1px solid var(--theme-border-subtle);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.report__metrics-header {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 12px;
  padding: 12px 20px;
  background-color: var(--theme-bg-tertiary);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--theme-text-tertiary);
}

.report__metrics-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 12px;
  padding: 14px 20px;
  align-items: center;
  border-top: 1px solid var(--theme-border-subtle);
  transition: background-color 0.15s;
}

.report__metrics-row:hover {
  background-color: var(--theme-hover);
}

.report__metrics-col--name,
.report__metrics-cell--name {
  font-weight: 500;
  color: var(--theme-text-primary);
}

.report__metrics-col--value,
.report__metrics-cell--value {
  text-align: center;
  font-size: 0.9rem;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}

.report__metrics-col--status,
.report__metrics-cell--status {
  text-align: center;
}

.report__metrics-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 72px;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--badge-color);
  background-color: color-mix(in srgb, var(--badge-color) 12%, transparent);
}

/* ===== Impact Cards ===== */
.report__impact {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.report__impact-card {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  background-color: var(--theme-surface);
  border: 1px solid var(--theme-border-subtle);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: border-color 0.2s;
}

.report__impact-card:hover {
  border-color: var(--theme-border-secondary);
}

.report__impact-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  flex-shrink: 0;
}

.report__impact-icon--conversion {
  background-color: rgba(231, 54, 35, 0.12);
  color: var(--color-error-400);
}

.report__impact-icon--seo {
  background-color: rgba(255, 210, 46, 0.12);
  color: var(--color-warning-500);
}

.report__impact-icon--retention {
  background-color: rgba(59, 130, 246, 0.12);
  color: var(--color-informationlink-400);
}

.report__impact-content {
  flex: 1;
  min-width: 0;
}

.report__impact-label {
  font-size: 0.9rem;
  font-weight: 600;
  margin: 0 0 6px;
  color: var(--theme-text-primary);
}

.report__impact-text {
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.6;
  color: var(--theme-text-secondary);
}

/* ===== Opportunities ===== */
.report__opportunities {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.report__opportunity {
  display: flex;
  align-items: center;
  gap: 14px;
  background-color: var(--theme-surface);
  border: 1px solid var(--theme-border-subtle);
  border-radius: 10px;
  padding: 16px 20px;
  transition: border-color 0.2s, background-color 0.15s;
}

.report__opportunity:hover {
  border-color: var(--theme-border-secondary);
  background-color: var(--theme-hover);
}

.report__opportunity-index {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background-color: var(--theme-bg-tertiary);
  color: var(--theme-text-tertiary);
  font-size: 0.75rem;
  font-weight: 700;
  flex-shrink: 0;
}

.report__opportunity-text {
  flex: 1;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--theme-text-primary);
}

.report__opportunity-priority {
  font-size: 0.7rem;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 20px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  flex-shrink: 0;
}

.report__opportunity-priority--high {
  background-color: rgba(231, 54, 35, 0.12);
  color: var(--color-error-400);
}

.report__opportunity-priority--medium {
  background-color: rgba(255, 210, 46, 0.12);
  color: var(--color-warning-500);
}

/* ===== Projection Card ===== */
.report__projection {
  background: linear-gradient(135deg, var(--color-primary-800) 0%, var(--color-neutral-800) 100%);
  border: 1px solid var(--color-primary-700);
  border-radius: 12px;
  padding: 28px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
}

.report__projection-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.report__projection-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background-color: rgba(111, 179, 15, 0.15);
  color: var(--color-success-400);
  flex-shrink: 0;
}

.report__projection-title {
  font-size: 1.15rem;
  font-weight: 600;
  margin: 0;
  color: var(--theme-text-primary);
}

.report__projection-text {
  margin: 0 0 24px;
  font-size: 0.95rem;
  line-height: 1.7;
  color: var(--theme-text-secondary);
}

.report__projection-bars {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.report__projection-bar {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.report__projection-bar-label {
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--theme-text-tertiary);
}

.report__projection-bar-track {
  height: 32px;
  background-color: rgba(255, 255, 255, 0.06);
  border-radius: 8px;
  overflow: hidden;
}

.report__projection-bar-fill {
  height: 100%;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 12px;
  transition: width 0.6s ease;
}

.report__projection-bar-fill--current {
  background-color: var(--color-warning-600);
}

.report__projection-bar-fill--projected {
  background-color: var(--color-success-500);
}

.report__projection-bar-value {
  font-size: 0.8rem;
  font-weight: 700;
  color: #fff;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

/* ===== Responsive ===== */
@media (max-width: 900px) {
  .report__scores {
    grid-template-columns: repeat(2, 1fr);
  }

  .report__metrics-header {
    display: none;
  }

  .report__metrics-row {
    grid-template-columns: 1fr;
    gap: 8px;
    padding: 16px 20px;
  }

  .report__metrics-cell::before {
    content: attr(data-label);
    display: inline-block;
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--theme-text-tertiary);
    margin-right: 8px;
    min-width: 60px;
  }

  .report__metrics-cell--value,
  .report__metrics-cell--status {
    text-align: left;
  }
}

@media (max-width: 600px) {
  .report__header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    padding: 24px 16px 20px;
  }

  .report__download {
    width: 100%;
    justify-content: center;
  }

  .report__scores {
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  .report__score-card {
    padding: 20px 12px;
  }

  .report__score-ring {
    width: 80px;
    height: 80px;
  }

  .report__score-value {
    font-size: 1.4rem;
  }

  .report__highlight,
  .report__projection {
    padding: 20px;
  }

  .report__impact-card {
    flex-direction: column;
    gap: 12px;
  }
}
</style>
