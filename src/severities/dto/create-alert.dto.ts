export class CreateAlertDto {
  name: string;
  country: string;
  alertSeverities: { severity: string; count: number }[];
}
