export class UserModel {
  constructor(private email: string, private password: string) {}
}

export class RegisterModel {
  constructor(
    private id: number,
    public name: string,
    public lastname: string,
    public userName: string,
    public identification: string,
    public password: string,
    public email: string
  ) {}
}
