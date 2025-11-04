import { Stack } from "expo-router";

const FeedLayout = () => {
    return(
        <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen name="index"/>
        </Stack>
    )
}

export default FeedLayout;