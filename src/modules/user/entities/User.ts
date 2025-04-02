import { randomUUID } from 'node:crypto';
import { Replace } from 'src/utils/replace';

interface UserSchema {
  avatar: string | null;
  email: string;
  name: string;
  password: string;
  createdAt: Date;
}

export class User {
  private props: UserSchema;
  private _id: string;

  constructor(
    props: Replace<UserSchema, { createdAt?: Date; avatar?: string | null }>,
    id?: string,
  ) {
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      avatar: props.avatar ?? null,
    };
    this._id = id ?? randomUUID();
  }

  get id() {
    return this._id;
  }

  get email() {
    return this.props.email;
  }

  set email(email: string) {
    this.props.email = email;
  }

  get name() {
    return this.props.name;
  }

  get avatar() {
    return this.props.avatar;
  }

  set avatar(avatar: string | null) {
    this.props.avatar = avatar;
  }

  set name(name: string) {
    this.props.name = name;
  }

  get password() {
    return this.props.password;
  }

  set password(password: string) {
    this.props.password = password;
  }

  get createdAt() {
    return this.props.createdAt;
  }
}
