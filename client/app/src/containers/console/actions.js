export const CONSOLE_RUN = 'CONSOLE_RUN';

export function run(text) {
  return {
    type: CONSOLE_RUN,
    payload: text,
  };
}
