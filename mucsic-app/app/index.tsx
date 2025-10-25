import { Redirect } from "expo-router";

export default function Index() {
  // Redirect to the launch screen which lives at /launch
  return <Redirect  href="/launch" />;
}
