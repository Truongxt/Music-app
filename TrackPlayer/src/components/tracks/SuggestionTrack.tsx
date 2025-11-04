import { unknownTrackImageUri } from "@/src/constants/images";
import { fontSize } from "@/src/constants/tokens";
import { Track } from "@/src/constants/types";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";

type SuggestionTrackProps = {
  track: Track;
  handleOnSelect?: (track: Track) => void;
};

export default function SuggestionTrack({
  track,
  handleOnSelect,
}: SuggestionTrackProps) {
  return (
    <Pressable onPress={() => handleOnSelect && handleOnSelect(track)}>
      <Image source={{ uri: track.img ? track.img : unknownTrackImageUri }} style={{height: 200, width:180, borderRadius: 4}} />
      <View style={{width: "100%",position: "absolute", bottom: 0, padding: 10, backgroundColor: "rgba(0,0,0,0.5)"}}>
        <Text style={{color: "white", fontSize: fontSize.sm, fontWeight: "600"}}>{track.title}</Text>
        <Text style={{color: "white", fontSize: fontSize.xs, fontWeight: "500"}}>{track.artist.map((a) => a.name).join(", ")}</Text>
      </View>
    </Pressable>
  );
}
