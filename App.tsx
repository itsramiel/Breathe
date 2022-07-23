import SkiaBreathe from "./skia/Breathe";
import Ionicons from "@expo/vector-icons/Ionicons";
import ReanimatedBreathe from "./reanimated/Breathe";
import { NavigationContainer, RouteProp } from "@react-navigation/native";
import { BottomTabNavigationOptions, createBottomTabNavigator } from "@react-navigation/bottom-tabs";

type Tabs = { Reanimated: undefined; Skia: undefined };

const { Navigator, Screen } = createBottomTabNavigator<Tabs>();

const reanimatedOptions = (props: { route: RouteProp<Tabs, "Reanimated">; navigation: any }): BottomTabNavigationOptions => {
  return {
    tabBarIcon: ({ color, size }) => {
      return <Ionicons name="chevron-back-sharp" color={color} size={size} />;
    },
  };
};

const skiaOptions = (props: { route: RouteProp<Tabs, "Skia">; navigation: any }): BottomTabNavigationOptions => {
  return {
    tabBarIcon: ({ color, size }) => {
      return <Ionicons name="chevron-forward-sharp" color={color} size={size} />;
    },
  };
};

export default function App() {
  return (
    <NavigationContainer>
      <Navigator
        sceneContainerStyle={{ backgroundColor: "black" }}
        screenOptions={{
          tabBarShowLabel: false,
          headerTintColor: "#59ADA1",
          headerStyle: { backgroundColor: "#111" },
          headerShadowVisible: false,
          tabBarActiveTintColor: "#59ADA1",
          tabBarActiveBackgroundColor: "#000",
          tabBarInactiveBackgroundColor: "#000",
          tabBarStyle: { borderTopColor: "#222", borderTopWidth: 1 },
        }}
      >
        <Screen name="Skia" component={SkiaBreathe} options={skiaOptions} />
        <Screen name="Reanimated" component={ReanimatedBreathe} options={reanimatedOptions} />
      </Navigator>
    </NavigationContainer>
  );
}
