export class UpdateAdmin {
  email?: string;
  password?: string;
  name?: string;

  constructor(email?: string, password?: string, name?: string) {
    if (email) {
      this.email = email;
    }
    if (password) {
      this.password = password;
    }
    if (name) {
      this.name = name;
    }
  }
}
