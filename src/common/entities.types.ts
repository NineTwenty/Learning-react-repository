import { EntityId } from '@reduxjs/toolkit';

export type User = {
  fullName: string;
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
  feed: string;
};

export type Image = {
  src: string;
  id: number;
};

export type Post = {
  feed: string;
  views: number;
  created: number;
  postText: string;
  id: string;
  author: string;
};

export type Dialog = {
  id: EntityId;
  count: number | null;
  time: string | null;
  messages: EntityId[];
  members: EntityId[];
};

export type Message = {
  id: EntityId;
  created: number;
  unread: boolean;
  text: string;
  author: EntityId;
  dialog: EntityId;
};

export type Feed = {
  ownerId: string;
  posts: string[];
};
