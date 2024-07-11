export function timeAgo(data: Date): string {
  if (!(data instanceof Date)) {
    throw new Error('A entrada deve ser um objeto Date.');
  }

  const agora = new Date();
  const diferenca = agora.getTime() - data.getTime();
  const segundos = Math.floor(diferenca / 1000);

  let intervalo = Math.floor(segundos / 60);

  if (intervalo < 1) {
    return 'agora';
  }
  if (intervalo < 60) {
    return `${intervalo} ${intervalo === 1 ? 'minuto' : 'minutos'} atrás`;
  }

  intervalo = Math.floor(intervalo / 60);
  if (intervalo < 24) {
    return `${intervalo} ${intervalo === 1 ? 'hora' : 'horas'} atrás`;
  }

  intervalo = Math.floor(intervalo / 24);
  if (intervalo < 30) {
    return `${intervalo} ${intervalo === 1 ? 'dia' : 'dias'} atrás`;
  }

  intervalo = Math.floor(intervalo / 30);
  if (intervalo < 12) {
    return `${intervalo} ${intervalo === 1 ? 'mês' : 'meses'} atrás`;
  }

  intervalo = Math.floor(intervalo / 12);

  return `${intervalo} ${intervalo === 1 ? 'ano' : 'anos'} atrás`;
}