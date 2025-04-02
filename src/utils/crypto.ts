import { hash } from 'node:crypto';

/**
 * Gera um hash SHA-256 da senha fornecida
 */
export function hashPassword(password: string): string {
  return hash('sha256', password);
}

/**
 * Compara uma senha em texto puro com uma senha hash
 * Retorna um booleano indicando se as senhas correspondem
 */
export async function compare(
  plainPassword: string,
  hashedPassword: string,
): Promise<boolean> {
  const hashedPlainPassword = hashPassword(plainPassword);
  return hashedPlainPassword === hashedPassword;
}

// Esta função garante explicitamente um retorno do tipo boolean
export async function safeCompare(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  return Promise.resolve(compare(password, hashedPassword))
    .then((result) => Boolean(result))
    .catch(() => false);
}
