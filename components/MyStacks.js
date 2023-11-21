// Import the createStackNavigator function from @react-navigation/stack
import { createStackNavigator } from "@react-navigation/stack";

// Import the HomeScreen and BoardScreen components from their respective files
import HomeScreen from "../screens/HomeScreen";
import BoardScreen from "../screens/BoardScreen";

// Create a stack navigator
const Stack = createStackNavigator();

// MyStacks component to define the navigation stack
const MyStacks = () => {
  return (
    // Stack navigator with options to hide the header
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Screen for the HomeScreen component */}
      <Stack.Screen name="HomeScreen" component={HomeScreen} />

      {/* Screen for the BoardScreen component */}
      <Stack.Screen name="Board" component={BoardScreen} />
    </Stack.Navigator>
  );
};

// Export the MyStacks component
export default MyStacks;
