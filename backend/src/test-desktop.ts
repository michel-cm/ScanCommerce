import { runDesktopEngine } from './engine/desktop-engine';

(async () => {
  const result = await runDesktopEngine('https://blandigital.uappi.dev.br/');

  console.log(result);
})();
