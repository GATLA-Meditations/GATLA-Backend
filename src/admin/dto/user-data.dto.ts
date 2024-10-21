export class UserDataDto {
  id: string;
  patient_code: string;
  password: string;
  treatments: { id: string; name: string }[];

  constructor(id: string, patient_code: string, password: string, treatments: { id: string; name: string }[]) {
    this.id = id;
    this.patient_code = patient_code;
    this.password = password;
    this.treatments = treatments;
  }
}
