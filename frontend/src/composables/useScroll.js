import { ref } from 'vue';

const scrollWidth = ref(0);

export function useScroll() {
  function calculateScrollbarWidth() {
    const div = document.createElement('div');
    div.style.cssText = `
      position: absolute;
      bottom: 0;
      left: -200px;
      width: 100px;
      height: 100px;
      overflow: scroll;
      visibility: hidden;
    `;

    document.body.appendChild(div);
    const scrollbarWidth = div.offsetWidth - div.clientWidth;
    document.body.removeChild(div);

    scrollWidth.value = scrollbarWidth;

    document.documentElement.style.setProperty(
      '--scrollbar-width-positive',
      `${scrollbarWidth}px`,
    );
    document.documentElement.style.setProperty(
      '--scrollbar-width-negative',
      `-${scrollbarWidth}px`,
    );
  }

  return {
    scrollWidth,
    calculateScrollbarWidth,
  };
}
