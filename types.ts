export type AppState = 'input' | 'loading' | 'result';

export interface FormData {
  language: string;
  engine: string;
  concept: string;
  task: string;
  constraints: string;
}