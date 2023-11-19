import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import MyStacks from "./components/MyStacks";
import MyPokemons from "./components/MyPokemons";
import Pokedex from "./components/Pokedex";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarActiveTintColor: "white",
          tabBarStyle: { backgroundColor: "#000000" },
        }}
      >
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

        <Tab.Screen
          name="Pokemon"
          component={MyPokemons}
          options={{
            headerShown: false,
            tabBarLabelStyle: { fontSize: 12 },
            tabBarIcon: () => <Entypo name="trophy" size={24} color="white" />,
          }}
        />
        
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

export default App;
