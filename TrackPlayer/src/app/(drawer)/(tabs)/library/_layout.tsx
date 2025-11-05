import { Stack } from "expo-router";

export const unstable_settings = {
  initialRouteName: 'index',
};

const LibraryLayout = () => {
    return(
        <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen name="index"/>
            <Stack.Screen name="playlists" />
            <Stack.Screen name="playlist/[id]" />
            <Stack.Screen name="artist/[id]" />
        </Stack>
    )
}

export default LibraryLayout;