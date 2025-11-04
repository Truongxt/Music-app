import { Stack } from "expo-router";

const SearchLayout = () => {
  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name="index" />
      <Stack.Screen name="artist/[id]"/>
    </Stack>
  );
};

export default SearchLayout;