export class CreateNotificacionDto {
  readonly usuarioId: number;
  readonly mensaje: string;
  readonly leida: boolean;
  readonly fechaEnvio: Date;
}
