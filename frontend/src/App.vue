<script setup>
import { useScroll } from '@/composables/useScroll'
import { onMounted } from 'vue'

const { calculateScrollbarWidth } = useScroll()

function initResizeForScrollbarWidth() {
  calculateScrollbarWidth()
  window.addEventListener('resize', calculateScrollbarWidth)
}

onMounted(() => {
  initResizeForScrollbarWidth()
})
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
