export interface UserData {
  avatar: string;
  bio: string;
  email: string;
  emailVerifiedAt: string;
  name: string;
  role: {
    _id: string;
    name: string;
    permissions: string[];
  };
  __v: number;
  _id: string;
}
