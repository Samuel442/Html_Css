
// ################## Função para calcular os pontos intermediários entre A e B em um caminho linear
function calcular_pontos_intermediarios_linear(xa, ya, za, xb,  yb, zb, numero_de_pontos) {
    const distancia_sub_pontos = 1.0 / numero_de_pontos; // distância entre os subpontos  entre A e B
    const sub_pontos = [];                               // lista que vai receber os subpontos na interpolação
    // Interpolação em linha reta
    for (let i = 0; i <= numero_de_pontos; i++) { // percorre os subpontos de um em um
      const alfa = i * distancia_sub_pontos;      // i equivale ao ponto atual, vezes a distancia entre eles
      const x = alfa * xa + (1 - alfa) * xb;      // fórmula da combinação linear para x
      const y = alfa * ya + (1 - alfa) * yb;      // fórmula da combinação linear para y
      const z = alfa * za + (1 - alfa) * zb;      // fórmula da combinação linear para z
      sub_pontos.push([x, y, z]);                 // coloca na lista um vetor com as coordenadas x,y e z
    }
    return sub_pontos;     // retorna a lista
  }
  export { calcular_pontos_intermediarios_linear }; // exportando a função para uso em outros arquivos
  

// ######################## calcular pontos intermediarios spline ##################################
function calcular_pontos_intermediarios_spline(xa, ya, za, xb, yb, zb, numero_de_pontos) {
  const sub_pontos = [];

  for (let i = 0; i <= numero_de_pontos; i++) {
      const t = i / (numero_de_pontos - 1); // Ajuste aqui

      const x = interpolaCubica(t, xa, xb);
      const y = interpolaCubica(t, ya, yb);
      const z = interpolaCubica(t, za, zb);

      sub_pontos.push([x, y, z]);
  }

  return sub_pontos;
}
function interpolaCubica(t, p0, p1) {
  const a = 2 * p0 - 2 * p1 + 1;
  const b = -3 * p0 + 3 * p1;
  const c = p0;
  const d = t;

  return a * d ** 3 + b * d ** 2 + c * d; // a.t^3 + b.t^2 + c.t + d
}
export { calcular_pontos_intermediarios_spline };

