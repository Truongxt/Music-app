import { Stack } from "expo-router";

export const unstable_settings = {
  initialRouteName: 'index',
};

const LibraryLayout = () => {
    return(
        <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen name="index"/>
            <Stack.Screen name="playlist/[id]" />
        </Stack>
    )
}

export default LibraryLayout;