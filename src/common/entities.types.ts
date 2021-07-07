export type User = {
  firstName: string;
  lastName: string;
  email: string;
  addres: string;
  phoneNumber: string;
  bithDate: string;
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
