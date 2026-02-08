import { runLighthouse } from './engine/lighthouse/run-lighthouse';

(async () => {
  const result = await runLighthouse({
    url: 'https://blandigital.uappi.dev.br/',
  });

  console.log('Mobile scores:', result.mobile.scores);
  console.log('Desktop scores:', result.desktop.scores);
})();
