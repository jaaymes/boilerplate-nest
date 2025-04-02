declare module '@/utils/crypto' {
  /**
   * Gera um hash SHA-256 da senha fornecida
   */
  export function hashPassword(password: string): string;

  /**
   * Compara uma senha em texto puro com uma senha hash
   * Retorna um booleano indicando se as senhas correspondem
   */
  export function compare(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
