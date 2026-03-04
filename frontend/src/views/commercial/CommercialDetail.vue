<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { diagnostics as mockData, statusLabels, statusOrder } from '@/data/commercialMock'
import CommercialNotes from './components/CommercialNotes.vue'

const router = useRouter()
const route = useRoute()

const diagnosticId = Number(route.params.id)
const original = mockData.find((d) => d.id === diagnosticId)

const diagnostic = ref(original ? { ...original, tags: [...original.tags] } : null)
const newTag = ref('')

function scoreColor(score) {
  if (score >= 90) return 'var(--color-success-500)'
  if (score >= 50) return 'var(--color-warning-500)'
  return 'var(--color-error-500)'
}

function scoreLabel(score) {
  if (score >= 90) return 'Bom'
  if (score >= 50) return 'Médio'
  return 'Ruim'
}

function lcpStatus(lcp) {
  if (lcp <= 2.5) return { color: 'var(--color-success-500)', label: 'Bom' }
  if (lcp <= 4.0) return { color: 'var(--color-warning-500)', label: 'Médio' }
  return { color: 'var(--color-error-500)', label: 'Ruim' }
}

function tbtStatus(tbt) {
  if (tbt <= 200) return { color: 'var(--color-success-500)', label: 'Bom' }
  if (tbt <= 600) return { color: 'var(--color-warning-500)', label: 'Médio' }
  return { color: 'var(--color-error-500)', label: 'Ruim' }
}

function removeTag(index) {
  diagnostic.value.tags.splice(index, 1)
}

function addTag() {
  const tag = newTag.value.trim().toLowerCase()
  if (tag && !diagnostic.value.tags.includes(tag)) {
    diagnostic.value.tags.push(tag)
  }
  newTag.value = ''
}

function handleGeneratePdf() {
  alert('Geração de PDF será integrada futuramente.')
}

function handleUpdateDiagnostic() {
  alert('Atualização de diagnóstico será integrada com a API.')
}

function goBack() {
  router.push({ name: 'commercial-list' })
}
</script>

<template>
  <main class="commercial">
    <template v-if="diagnostic">
      <header class="commercial__header row">
        <div class="commercial__header-left">
          <button class="commercial__btn-back" @click="goBack">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <div class="commercial__header-text">
            <h1 class="commercial__title">{{ diagnostic.companyName }}</h1>
            <p class="commercial__subtitle">
              <a :href="diagnostic.url" target="_blank" rel="noopener" class="commercial__link">
                {{ diagnostic.url }}
              </a>
            </p>
          </div>
        </div>
      </header>

      <!-- General Info -->
      <section class="commercial__detail-section row">
        <div class="commercial__detail-grid">
          <div class="commercial__detail-info">
            <h3 class="commercial__detail-block-title">Informações Gerais</h3>

            <div class="commercial__detail-field">
              <label class="commercial__detail-label">Status</label>
              <select
                v-model="diagnostic.status"
                class="commercial__detail-select"
              >
                <option
                  v-for="status in statusOrder"
                  :key="status"
                  :value="status"
                >
                  {{ statusLabels[status] }}
                </option>
              </select>
            </div>

            <div class="commercial__detail-field">
              <label class="commercial__detail-label">Tags</label>
              <div class="commercial__detail-tags">
                <span
                  v-for="(tag, idx) in diagnostic.tags"
                  :key="tag"
                  class="commercial__detail-tag"
                >
                  {{ tag }}
                  <button class="commercial__detail-tag-remove" @click="removeTag(idx)">×</button>
                </span>
                <div class="commercial__detail-tag-input-wrap">
                  <input
                    v-model="newTag"
                    class="commercial__detail-tag-input"
                    placeholder="Nova tag..."
                    @keydown.enter.prevent="addTag"
                  />
                  <button class="commercial__detail-tag-add" @click="addTag">+</button>
                </div>
              </div>
            </div>
          </div>

          <!-- Scores -->
          <div class="commercial__detail-scores">
            <h3 class="commercial__detail-block-title">Scores</h3>

            <div class="commercial__detail-scores-grid">
              <!-- Mobile -->
              <div class="commercial__score-card">
                <div class="commercial__score-header">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                    <line x1="12" y1="18" x2="12.01" y2="18" />
                  </svg>
                  <span>Mobile</span>
                </div>
                <div class="commercial__score-value" :style="{ color: scoreColor(diagnostic.mobile.score) }">
                  {{ diagnostic.mobile.score }}
                  <span class="commercial__score-label">{{ scoreLabel(diagnostic.mobile.score) }}</span>
                </div>
                <div class="commercial__score-metrics">
                  <div class="commercial__score-metric">
                    <span class="commercial__score-metric-name">LCP</span>
                    <span class="commercial__score-metric-value" :style="{ color: lcpStatus(diagnostic.mobile.lcp).color }">
                      {{ diagnostic.mobile.lcp }}s
                    </span>
                  </div>
                  <div class="commercial__score-metric">
                    <span class="commercial__score-metric-name">TBT</span>
                    <span class="commercial__score-metric-value" :style="{ color: tbtStatus(diagnostic.mobile.tbt).color }">
                      {{ diagnostic.mobile.tbt }}ms
                    </span>
                  </div>
                </div>
              </div>

              <!-- Desktop -->
              <div class="commercial__score-card">
                <div class="commercial__score-header">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                  <span>Desktop</span>
                </div>
                <div class="commercial__score-value" :style="{ color: scoreColor(diagnostic.desktop.score) }">
                  {{ diagnostic.desktop.score }}
                  <span class="commercial__score-label">{{ scoreLabel(diagnostic.desktop.score) }}</span>
                </div>
                <div class="commercial__score-metrics">
                  <div class="commercial__score-metric">
                    <span class="commercial__score-metric-name">LCP</span>
                    <span class="commercial__score-metric-value" :style="{ color: lcpStatus(diagnostic.desktop.lcp).color }">
                      {{ diagnostic.desktop.lcp }}s
                    </span>
                  </div>
                  <div class="commercial__score-metric">
                    <span class="commercial__score-metric-name">TBT</span>
                    <span class="commercial__score-metric-value" :style="{ color: tbtStatus(diagnostic.desktop.tbt).color }">
                      {{ diagnostic.desktop.tbt }}ms
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Issues -->
      <section class="commercial__detail-section row">
        <h3 class="commercial__detail-block-title">Principais Problemas</h3>
        <div class="commercial__issues">
          <div
            v-for="(issue, idx) in diagnostic.issues"
            :key="idx"
            class="commercial__issue"
          >
            <span class="commercial__issue-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </span>
            <span class="commercial__issue-text">{{ issue }}</span>
          </div>
        </div>
      </section>

      <!-- Notes -->
      <section class="commercial__detail-section row">
        <CommercialNotes v-model="diagnostic.notes" />
      </section>

      <!-- Actions -->
      <section class="commercial__detail-section row">
        <div class="commercial__detail-actions">
          <button class="commercial__btn-secondary" @click="handleGeneratePdf">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            Gerar PDF
          </button>
          <button class="commercial__btn-primary" @click="handleUpdateDiagnostic">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="23 4 23 10 17 10" />
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
            </svg>
            Atualizar Diagnóstico
          </button>
        </div>
      </section>
    </template>

    <template v-else>
      <div class="commercial__not-found row">
        <h2>Diagnóstico não encontrado</h2>
        <p>O diagnóstico solicitado não existe ou foi removido.</p>
        <button class="commercial__btn-primary" @click="goBack">Voltar à lista</button>
      </div>
    </template>
  </main>
</template>

<style scoped>
.commercial {
  min-height: 100vh;
  padding-bottom: 48px;
  background-color: var(--theme-bg-primary);
  color: var(--theme-text-primary);
}

/* ===== Header ===== */
.commercial__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32px 16px 24px;
}

.commercial__header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.commercial__btn-back {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background-color: var(--theme-surface);
  border: 1px solid var(--theme-border-subtle);
  border-radius: 8px;
  color: var(--theme-text-secondary);
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;
}

.commercial__btn-back:hover {
  background-color: var(--theme-hover);
  color: var(--theme-text-primary);
  border-color: var(--theme-border-secondary);
}

.commercial__title {
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0;
  letter-spacing: -0.02em;
  color: var(--theme-text-primary);
}

.commercial__subtitle {
  margin: 4px 0 0;
  font-size: 0.9rem;
}

.commercial__link {
  color: var(--color-primary-400);
  text-decoration: none;
  transition: color 0.2s;
}

.commercial__link:hover {
  color: var(--color-primary-300);
  text-decoration: underline;
}

/* ===== Detail Sections ===== */
.commercial__detail-section {
  padding: 0 16px;
  margin-bottom: 24px;
}

.commercial__detail-block-title {
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 16px;
  color: var(--theme-text-primary);
}

.commercial__detail-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

/* ===== Info Block ===== */
.commercial__detail-info {
  background-color: var(--theme-surface);
  border: 1px solid var(--theme-border-subtle);
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.commercial__detail-field {
  margin-bottom: 16px;
}

.commercial__detail-field:last-child {
  margin-bottom: 0;
}

.commercial__detail-label {
  display: block;
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--theme-text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-bottom: 6px;
}

.commercial__detail-select {
  padding: 8px 12px;
  background-color: var(--theme-bg-secondary);
  color: var(--theme-text-primary);
  border: 1px solid var(--theme-border-primary);
  border-radius: 8px;
  font-size: 0.875rem;
  font-family: inherit;
  outline: none;
  cursor: pointer;
  width: 100%;
  transition: border-color 0.2s;
}

.commercial__detail-select:focus {
  border-color: var(--color-primary-500);
}

.commercial__detail-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}

.commercial__detail-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  background-color: var(--theme-bg-tertiary);
  border: 1px solid var(--theme-border-subtle);
  border-radius: 6px;
  font-size: 0.78rem;
  font-weight: 500;
  color: var(--theme-text-secondary);
}

.commercial__detail-tag-remove {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  padding: 0;
  background: none;
  border: none;
  color: var(--theme-text-tertiary);
  font-size: 1rem;
  line-height: 1;
  cursor: pointer;
  border-radius: 50%;
  transition: all 0.15s;
}

.commercial__detail-tag-remove:hover {
  background-color: var(--color-error-500);
  color: #fff;
}

.commercial__detail-tag-input-wrap {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.commercial__detail-tag-input {
  padding: 4px 8px;
  background-color: var(--theme-bg-secondary);
  color: var(--theme-text-primary);
  border: 1px solid var(--theme-border-primary);
  border-radius: 6px;
  font-size: 0.78rem;
  font-family: inherit;
  outline: none;
  width: 100px;
  transition: border-color 0.2s;
}

.commercial__detail-tag-input::placeholder {
  color: var(--theme-text-tertiary);
}

.commercial__detail-tag-input:focus {
  border-color: var(--color-primary-500);
}

.commercial__detail-tag-add {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 0;
  background-color: var(--color-primary-500);
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.commercial__detail-tag-add:hover {
  background-color: var(--color-primary-400);
}

/* ===== Scores Block ===== */
.commercial__detail-scores {
  background-color: var(--theme-surface);
  border: 1px solid var(--theme-border-subtle);
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.commercial__detail-scores-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.commercial__score-card {
  background-color: var(--theme-bg-secondary);
  border: 1px solid var(--theme-border-subtle);
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.commercial__score-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--theme-text-secondary);
}

.commercial__score-value {
  font-size: 2.5rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1;
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.commercial__score-label {
  font-size: 0.8rem;
  font-weight: 500;
  opacity: 0.8;
}

.commercial__score-metrics {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 12px;
  border-top: 1px solid var(--theme-border-subtle);
}

.commercial__score-metric {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.commercial__score-metric-name {
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--theme-text-tertiary);
}

.commercial__score-metric-value {
  font-size: 0.9rem;
  font-weight: 700;
}

/* ===== Issues ===== */
.commercial__issues {
  background-color: var(--theme-surface);
  border: 1px solid var(--theme-border-subtle);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.commercial__issue {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  background-color: rgba(231, 54, 35, 0.06);
  border: 1px solid rgba(231, 54, 35, 0.15);
  border-radius: 8px;
}

.commercial__issue-icon {
  display: inline-flex;
  color: var(--color-error-500);
  flex-shrink: 0;
}

.commercial__issue-text {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--theme-text-primary);
}

/* ===== Actions ===== */
.commercial__detail-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.commercial__btn-primary {
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
}

.commercial__btn-primary:hover {
  background-color: var(--color-primary-400);
  transform: translateY(-1px);
}

.commercial__btn-primary:active {
  background-color: var(--color-primary-600);
  transform: translateY(0);
}

.commercial__btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background-color: transparent;
  color: var(--theme-text-primary);
  border: 1px solid var(--theme-border-primary);
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.commercial__btn-secondary:hover {
  background-color: var(--theme-hover);
  border-color: var(--theme-border-secondary);
}

/* ===== Not Found ===== */
.commercial__not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 16px;
  text-align: center;
  gap: 12px;
}

.commercial__not-found h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  color: var(--theme-text-primary);
}

.commercial__not-found p {
  font-size: 0.9rem;
  color: var(--theme-text-tertiary);
  margin: 0 0 16px;
}

/* ===== Responsive ===== */
@media (max-width: 900px) {
  .commercial__detail-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .commercial__header {
    padding: 24px 16px 20px;
  }

  .commercial__title {
    font-size: 1.35rem;
  }

  .commercial__detail-scores-grid {
    grid-template-columns: 1fr;
  }

  .commercial__score-value {
    font-size: 2rem;
  }

  .commercial__detail-actions {
    flex-direction: column;
  }

  .commercial__btn-primary,
  .commercial__btn-secondary {
    width: 100%;
    justify-content: center;
  }
}
</style>
