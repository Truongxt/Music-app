import { Album } from '@/src/constants/types';
import React from 'react';
import { FlatList } from 'react-native';
import AlbumCard from './AlbumCard';

type AlbumListProps = {
  albums: Album[];
  horizontal: boolean
}

export default function AlbumList({albums, horizontal = true} : AlbumListProps) {
  return (
    <FlatList horizontal={horizontal}  data={albums} renderItem={({item})=><AlbumCard album={item}/>}/>
  )
}
