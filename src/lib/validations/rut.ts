export function formatRUT(rut: string): string {
  const cleanRUT = rut.replace(/[^0-9kK]/g, '').toUpperCase();
  if (cleanRUT.length <= 1) return cleanRUT;
  
  const body = cleanRUT.slice(0, -1);
  const dv = cleanRUT.slice(-1);
  return `${body.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}-${dv}`;
}

export function validateRUT(rut: string): boolean {
  const cleanRUT = rut.replace(/[^0-9kK]/g, '').toUpperCase();
  if (cleanRUT.length < 8) return false;

  const body = cleanRUT.slice(0, -1);
  const dv = cleanRUT.slice(-1);

  let sum = 0;
  let multiplier = 2;

  for (let i = body.length - 1; i >= 0; i--) {
    sum += parseInt(body[i]) * multiplier;
    multiplier = multiplier === 7 ? 2 : multiplier + 1;
  }

  const expectedDv = 11 - (sum % 11);
  const computedDv = expectedDv === 11 ? '0' : expectedDv === 10 ? 'K' : expectedDv.toString();

  return dv === computedDv;
}
