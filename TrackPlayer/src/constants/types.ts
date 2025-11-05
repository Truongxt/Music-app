export type Track = {
  _id: string;
  title: string;
  artist: [{ id: string; name: string }];
  img: string;
  file: string;
  likes: number;
  views: number;
  comments: number;
  album: string;
  duration: number;
};

export type Comment = {
  _id: string;
  content: string;
  likes: number;
  user: {id: string, displayName: string, avatar: string};
  track: string;
  post: string;
  createdAt: Date;
  responseFor: string;
};

export type User = {
  _id: string;
  username: string;
  displayName?: string;
  avatar?: string;
  likedTracks: string[];
};

export type Post = {
  _id: string;
  artist: { id: string; name: string; image: string };
  track: Track;
  content: string;
  likes: number;
  comments: number;
  createdAt: Date;
};

export type Artist = {
  _id: string;
  name: string;
  description: string;
  descriptionImg: string;
  image: string;
  albums: string;
  followers: number;
};

export type Album = {
  _id?: string;
  title: string;
  artist: { id: string; name: string };
  cover: string;
  track?: [string];
};

export type Playlist = {
  _id?: string;
  name: string;
  tracks: Track[];
  user: string;
}