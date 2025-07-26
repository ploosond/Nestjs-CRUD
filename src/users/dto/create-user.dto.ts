export class CreateUserDto {
  username: string;
  name: string;
  password: string;
  age: number;
  gender: 'Male' | 'Female';
}
