<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: { type: String, default: '' },
})

const emit = defineEmits(['update:modelValue'])

const localNotes = ref(props.modelValue)
const saved = ref(false)

watch(
  () => props.modelValue,
  (val) => {
    localNotes.value = val
  }
)

function handleSave() {
  emit('update:modelValue', localNotes.value)
  saved.value = true
  setTimeout(() => {
    saved.value = false
  }, 2000)
}
</script>

<template>
  <div class="commercial__notes">
    <h3 class="commercial__notes-title">Notas Internas</h3>
    <textarea
      v-model="localNotes"
      class="commercial__notes-textarea"
      placeholder="Adicione notas sobre este diagnóstico..."
      rows="4"
    ></textarea>
    <div class="commercial__notes-footer">
      <button class="commercial__notes-btn" @click="handleSave">
        Salvar Notas
      </button>
      <span v-if="saved" class="commercial__notes-saved">Salvo com sucesso!</span>
    </div>
  </div>
</template>

<style scoped>
.commercial__notes {
  background-color: var(--theme-surface);
  border: 1px solid var(--theme-border-subtle);
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.commercial__notes-title {
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 12px;
  color: var(--theme-text-primary);
}

.commercial__notes-textarea {
  width: 100%;
  padding: 12px;
  background-color: var(--theme-bg-secondary);
  color: var(--theme-text-primary);
  border: 1px solid var(--theme-border-primary);
  border-radius: 8px;
  font-size: 0.875rem;
  font-family: inherit;
  resize: vertical;
  outline: none;
  transition: border-color 0.2s;
  box-sizing: border-box;
  min-height: 100px;
}

.commercial__notes-textarea::placeholder {
  color: var(--theme-text-tertiary);
}

.commercial__notes-textarea:focus {
  border-color: var(--color-primary-500);
}

.commercial__notes-footer {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 12px;
}

.commercial__notes-btn {
  padding: 8px 20px;
  background-color: var(--color-primary-500);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: background-color 0.2s;
}

.commercial__notes-btn:hover {
  background-color: var(--color-primary-400);
}

.commercial__notes-saved {
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--color-success-500);
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
