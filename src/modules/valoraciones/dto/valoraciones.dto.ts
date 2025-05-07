export class CreateValoracionDto {
  readonly usuarioId: number;
  readonly eventoId: number;
  readonly puntuacion: number; // Ejemplo: 1 a 5
  readonly comentario?: string;
}
