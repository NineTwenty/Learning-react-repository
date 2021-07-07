export type User = {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  phoneNumber: string;
  birthDate: string;
  online: boolean;
  lastOnlineTime: string;
  avatar: string;
  friends: number[];
  music: [];
  images: Image[];
  id: string;
};

export type Image = {
  src: string;
  id: number;
};

export type Post = {
  views: number;
  postText: string;
  id: string;
  author: string;
};
