// Import necessary libraries and components for navigation and UI.
import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { MaterialCommunityIcons, Entypo, AntDesign } from "@expo/vector-icons";

// Import custom components.
import MyStacks from "./components/MyStacks";
import MyPokemons from "./components/MyPokemons";
import Pokedex from "./components/Pokedex";

// Create a bottom tab navigation component using createBottomTabNavigator.
const Tab = createBottomTabNavigator();

// Define the main application component.
const App = () => {
  return (
    // Main navigation container.
    <NavigationContainer>
      {/* Configuration and definition of screens for the bottom tab navigation. */}
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarActiveTintColor: "white",
          tabBarStyle: { backgroundColor: "#000000" },
        }}
      >
        {/* First screen: MyStacks */}
        <Tab.Screen
          name="Home"
          component={MyStacks}
          options={{
            headerShown: false,
            tabBarLabelStyle: { fontSize: 12 },
            tabBarIcon: () => (
              <MaterialCommunityIcons name="home" size={24} color="white" />
            ),
          }}
        />

        {/* Second screen: MyPokemons */}
        <Tab.Screen
          name="Pokemon"
          component={MyPokemons}
          options={{
            headerShown: false,
            tabBarLabelStyle: { fontSize: 12 },
            tabBarIcon: () => <Entypo name="trophy" size={24} color="white" />,
          }}
        />

        {/* Third screen: Pokedex */}
        <Tab.Screen
          name="Pokedex"
          component={Pokedex}
          options={{
            headerShown: false,
            tabBarLabelStyle: { fontSize: 12 },
            tabBarIcon: () => (
              <AntDesign name="appstore1" size={24} color="white" />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

// Export the main component.
export default App;
