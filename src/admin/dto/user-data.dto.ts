export class UserDataDto {
  patient_code: string;
  password: string;
  treatments: { id: string; name: string }[];

  constructor(patient_code: string, password: string, treatments: { id: string; name: string }[]) {
    this.patient_code = patient_code;
    this.password = password;
    this.treatments = treatments;
  }
}
