<script setup>
import { statusLabels, statusOrder } from '@/data/commercialMock'

const props = defineProps({
  search: { type: String, default: '' },
  statusFilter: { type: String, default: '' },
  sortBy: { type: String, default: 'date' },
  activeTag: { type: String, default: '' },
  availableTags: { type: Array, default: () => [] },
})

const emit = defineEmits([
  'update:search',
  'update:statusFilter',
  'update:sortBy',
  'update:activeTag',
])
</script>

<template>
  <div class="commercial__filters">
    <div class="commercial__filters-row">
      <div class="commercial__filters-search">
        <svg class="commercial__filters-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          class="commercial__filters-input"
          placeholder="Buscar por empresa ou URL..."
          :value="search"
          @input="emit('update:search', $event.target.value)"
        />
      </div>

      <select
        class="commercial__filters-select"
        :value="statusFilter"
        @change="emit('update:statusFilter', $event.target.value)"
      >
        <option value="">Todos os status</option>
        <option
          v-for="status in statusOrder"
          :key="status"
          :value="status"
        >
          {{ statusLabels[status] }}
        </option>
      </select>

      <select
        class="commercial__filters-select"
        :value="sortBy"
        @change="emit('update:sortBy', $event.target.value)"
      >
        <option value="date">Mais recente</option>
        <option value="mobile">Score Mobile</option>
        <option value="desktop">Score Desktop</option>
      </select>
    </div>

    <div v-if="availableTags.length" class="commercial__filters-tags">
      <button
        class="commercial__filters-tag"
        :class="{ 'commercial__filters-tag--active': activeTag === '' }"
        @click="emit('update:activeTag', '')"
      >
        Todas
      </button>
      <button
        v-for="tag in availableTags"
        :key="tag"
        class="commercial__filters-tag"
        :class="{ 'commercial__filters-tag--active': activeTag === tag }"
        @click="emit('update:activeTag', activeTag === tag ? '' : tag)"
      >
        {{ tag }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.commercial__filters {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

.commercial__filters-row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.commercial__filters-search {
  position: relative;
  flex: 1;
  min-width: 220px;
}

.commercial__filters-search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--theme-text-tertiary);
  pointer-events: none;
}

.commercial__filters-input {
  width: 100%;
  padding: 10px 12px 10px 36px;
  background-color: var(--theme-surface);
  color: var(--theme-text-primary);
  border: 1px solid var(--theme-border-primary);
  border-radius: 8px;
  font-size: 0.875rem;
  font-family: inherit;
  outline: none;
  transition: border-color 0.2s;
  box-sizing: border-box;
}

.commercial__filters-input::placeholder {
  color: var(--theme-text-tertiary);
}

.commercial__filters-input:focus {
  border-color: var(--color-primary-500);
}

.commercial__filters-select {
  padding: 10px 12px;
  background-color: var(--theme-surface);
  color: var(--theme-text-primary);
  border: 1px solid var(--theme-border-primary);
  border-radius: 8px;
  font-size: 0.875rem;
  font-family: inherit;
  outline: none;
  cursor: pointer;
  transition: border-color 0.2s;
  min-width: 160px;
}

.commercial__filters-select:focus {
  border-color: var(--color-primary-500);
}

.commercial__filters-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.commercial__filters-tag {
  padding: 5px 12px;
  background-color: var(--theme-bg-tertiary);
  color: var(--theme-text-secondary);
  border: 1px solid var(--theme-border-subtle);
  border-radius: 20px;
  font-size: 0.78rem;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.2s;
}

.commercial__filters-tag:hover {
  border-color: var(--color-primary-500);
  color: var(--color-primary-400);
}

.commercial__filters-tag--active {
  background-color: rgba(45, 140, 85, 0.15);
  border-color: var(--color-primary-500);
  color: var(--color-primary-400);
  font-weight: 600;
}

@media (max-width: 600px) {
  .commercial__filters-row {
    flex-direction: column;
  }

  .commercial__filters-select {
    min-width: unset;
    width: 100%;
  }
}
</style>
