// Keep the calculator, teaching steps and live preview on the same notation.
export function normalizeExpression(source: string): string {
  return source.replaceAll('−', '-').replaceAll('π', 'pi').replaceAll('²', '^2').replaceAll('³', '^3').replace(/\bln\s*\(/g, 'log(').replace(/\bsen\s*\(/g, 'sin(')
    .replace(/(?<![a-zA-Z_])([xy])\s*\(/g, '$1*(');
}
export function insertMath(source: string, start: number, end: number, before: string, after = '', placeholder = '') {
  const selected = source.slice(start, end), middle = selected || placeholder;
  return { value: source.slice(0, start) + before + middle + after + source.slice(end), start: start + before.length, end: start + before.length + middle.length };
}
