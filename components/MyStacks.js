import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";
import BoardScreen from "../screens/BoardScreen";

const Stack = createStackNavigator();

const MyStacks = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="Board" component={BoardScreen} />
    </Stack.Navigator>
  );
};

export default MyStacks;
