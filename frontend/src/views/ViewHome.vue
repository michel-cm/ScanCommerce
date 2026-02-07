<script setup>
import { ref } from 'vue'
import ThemeToggle from '../components/ThemeToggle.vue'

// Estado do formulário
const form = ref({
  url: '',
  description: '',
  lighthouseFile: null,
})

// Estado de UI
const fileName = ref('')
const isDragOver = ref(false)
const isLoading = ref(false)

// Refs para inputs
const fileInput = ref(null)

// Handlers
const triggerFileUpload = () => {
  fileInput.value.click()
}

const handleFileChange = (event) => {
  const file = event.target.files[0]
  validateAndSetFile(file)
}

const handleDrop = (event) => {
  event.preventDefault()
  isDragOver.value = false

  if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
    const file = event.dataTransfer.files[0]
    validateAndSetFile(file)
    // Limpa o input caso o usuário queira selecionar o mesmo arquivo depois via clique
    event.dataTransfer.clearData()
  }
}

const validateAndSetFile = (file) => {
  if (!file) return

  if (file.type !== 'application/json' && !file.name.endsWith('.json')) {
    alert('Por favor, envie apenas arquivos .json')
    return
  }

  form.value.lighthouseFile = file
  fileName.value = file.name
}

const removeFile = () => {
  form.value.lighthouseFile = null
  fileName.value = ''
  if (fileInput.value) fileInput.value.value = ''
}

const handleSubmit = async () => {
  // Simulação de submit
  if (!form.value.url) return

  isLoading.value = true
  console.log('Iniciando análise...', { ...form.value })

  // Mock de tempo de espera
  setTimeout(() => {
    isLoading.value = false
    alert(`Análise iniciada para: ${form.value.url}`)
  }, 1500)
}
</script>

<template>
  <main class="home">
    <div class="home__header row">
      <h1>Home</h1>
      <ThemeToggle />
    </div>

    <main class="card row">
      <form @submit.prevent="handleSubmit" class="analysis-form">
        <div class="form-group">
          <label for="url" class="label">URL da Loja <span class="required">*</span></label>
          <div class="input-wrapper">
            <input
              id="url"
              v-model="form.url"
              type="url"
              placeholder="https://exemplo.com.br"
              class="input"
              required
            />
          </div>
        </div>

        <div class="form-group">
          <div class="label-header">
            <label for="description" class="label">Sobre a loja</label>
            <span class="optional-badge">Opcional</span>
          </div>
          <textarea
            id="description"
            v-model="form.description"
            rows="3"
            placeholder="Ex: Loja especializada em peças automotivas para carros clássicos..."
            class="textarea"
          ></textarea>
        </div>

        <div class="form-group">
          <div class="label-header">
            <label class="label">Relatório Lighthouse (JSON)</label>
            <span class="optional-badge">Opcional</span>
          </div>

          <div
            class="upload-area"
            :class="{ 'is-active': isDragOver, 'has-file': form.lighthouseFile }"
            @click="!form.lighthouseFile ? triggerFileUpload() : null"
            @dragover.prevent="isDragOver = true"
            @dragleave.prevent="isDragOver = false"
            @drop="handleDrop"
          >
            <input
              ref="fileInput"
              type="file"
              accept=".json"
              class="hidden-input"
              @change="handleFileChange"
            />

            <div v-if="!form.lighthouseFile" class="upload-placeholder">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="icon-upload"
              >
                <path
                  d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M17 8L12 3L7 8"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M12 3V15"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <span>Clique ou arraste o arquivo .json aqui</span>
            </div>

            <div v-else class="file-selected">
              <div class="file-info">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon-file"
                >
                  <path
                    d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <span class="filename">{{ fileName }}</span>
              </div>
              <button
                type="button"
                class="btn-remove"
                @click.stop="removeFile"
                title="Remover arquivo"
              >
                ✕
              </button>
            </div>
          </div>
        </div>

        <div class="form-actions">
          <button type="submit" class="btn-primary" :disabled="isLoading || !form.url">
            <span v-if="isLoading">Analisando...</span>
            <span v-else>Analisar Loja</span>
          </button>
        </div>
      </form>
    </main>
  </main>
</template>

<style scoped>
.home {
  padding-bottom: 32px;
  background-color: var(--theme-bg-primary);
  color: var(--theme-text-primary);
  min-height: 100vh;
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
}

.home__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 16px;
}

.home h1 {
  color: var(--theme-text-primary);
  margin: 0;
}

/* -----------------------------------------------------*/
/* Reset básico para inputs neste componente */
input,
textarea,
button {
  font-family: inherit;
  box-sizing: border-box;
}

.home-container {
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--theme-bg-primary);
  color: var(--theme-text-primary);
  padding: 1rem;
}

.content-wrapper {
  width: 100%;
  max-width: 520px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* Header */
.header {
  text-align: center;
}

.title {
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  letter-spacing: -0.02em;
  color: var(--theme-text-primary);
}

.subtitle {
  font-size: 1rem;
  color: var(--theme-text-secondary);
  line-height: 1.5;
  margin: 0;
}

/* Card Container */
.card {
  background-color: var(--theme-surface);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.analysis-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Form Groups */
.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.label-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--theme-text-secondary);
}

.required {
  color: var(--color-primary-500);
}

.optional-badge {
  font-size: 0.75rem;
  color: var(--theme-text-tertiary);
  background-color: var(--theme-bg-tertiary);
  padding: 2px 8px;
  border-radius: 4px;
}

/* Inputs & Textareas */
.input,
.textarea {
  width: 100%;
  background-color: var(--theme-bg-tertiary);
  border: 1px solid var(--theme-border-secondary);
  border-radius: 8px;
  padding: 0.75rem 1rem;
  color: var(--theme-text-primary);
  font-size: 1rem;
  transition: all 0.2s ease;
}

.input:hover,
.textarea:hover {
  border-color: var(--theme-border-primary);
  background-color: var(--theme-bg-secondary);
}

.input:focus,
.textarea:focus {
  outline: none;
  border-color: var(--theme-focus);
  box-shadow: 0 0 0 3px rgba(45, 140, 85, 0.2); /* Opacidade baseada na cor primária */
}

.textarea {
  resize: vertical;
  min-height: 80px;
}

/* Upload Area */
.hidden-input {
  display: none;
}

.upload-area {
  background-color: var(--theme-bg-tertiary);
  border: 1px dashed var(--theme-border-secondary);
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.upload-area:hover {
  border-color: var(--theme-text-tertiary);
  background-color: var(--theme-bg-secondary);
}

.upload-area.is-active {
  border-color: var(--theme-focus);
  background-color: var(--theme-surface-elevated);
}

.upload-area.has-file {
  border-style: solid;
  padding: 1rem;
  cursor: default;
  border-color: var(--color-primary-600);
  background-color: rgba(45, 140, 85, 0.1);
}

.upload-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: var(--theme-text-tertiary);
  font-size: 0.9rem;
}

.icon-upload {
  color: var(--theme-text-tertiary);
}

/* File Selected State */
.file-selected {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.file-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-primary-400);
}

.filename {
  font-size: 0.9rem;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
}

.btn-remove {
  background: none;
  border: none;
  color: var(--theme-text-tertiary);
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;
}

.btn-remove:hover {
  color: var(--color-error-400);
  background-color: rgba(255, 255, 255, 0.05);
}

/* Botão Principal */
.btn-primary {
  width: 100%;
  background-color: var(--color-primary-500);
  color: white;
  border: none;
  padding: 1rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 0.5rem;
}

.btn-primary:hover:not(:disabled) {
  background-color: var(--color-primary-400);
  transform: translateY(-1px);
}

.btn-primary:active:not(:disabled) {
  background-color: var(--color-primary-600);
  transform: translateY(0);
}

.btn-primary:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(45, 140, 85, 0.4);
}

.btn-primary:disabled {
  background-color: var(--theme-bg-tertiary);
  color: var(--theme-text-tertiary);
  cursor: not-allowed;
}

/* Responsividade */
@media (max-width: 600px) {
  .card {
    padding: 1.5rem;
  }

  .title {
    font-size: 1.5rem;
  }
}
</style>
