// Função para calcular a cinemática inversa
function calcular_cinematica_inversa(x, y, z, cotovelo) {
    // Comprimentos dos elos
    const L1 = 3.0;
    const L2 = 3.5;
  
    // Verificação da existência de solução válida
    const distancia_alvo = Math.sqrt(x**2 + y**2);
    if (distancia_alvo > L1 + L2) {
        console.error("Posição alvo fora do alcance do robô.");
        return null; // ou outra ação apropriada
    }

    // Cálculo do ângulo psi considerando a posição do cotovelo
    let psi;
    let teta2;
    if (cotovelo === 'para cima') 
    {
      psi = Math.acos((x**2 + y**2 + L1**2 - L2**2) / (2 * L1 * Math.sqrt(x**2 + y**2)));
      // Cálculo do ângulo teta2
      teta2 = Math.acos((x**2 + y**2 - L1**2 - L2**2) / (2 * L1 * L2));
    } 
    else 
    {
      psi = -Math.acos((x**2 + y**2 + L1**2 - L2**2) / (2 * L1 * Math.sqrt(x**2 + y**2)));
      // Cálculo do ângulo teta2
      teta2 = -Math.acos((x**2 + y**2 - L1**2 - L2**2) / (2 * L1 * L2));
    }
  
    // Cálculo do ângulo teta1
    const teta1 = Math.atan2(y, x) + psi;
  
    // Cálculo da distância entre a base e o ponto no plano xy
    const r = Math.sqrt(x**2 + y**2);
  
    // Cálculo da altura do ponto em relação à base
    const h = z - L1;

    // Cálculo do ângulo teta3
    const phi = Math.atan2(h, r);
    const teta3 = phi - (teta1 + teta2);
  
    return [teta1, teta2, teta3];
  }

  export { calcular_cinematica_inversa };
  