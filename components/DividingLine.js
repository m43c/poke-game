// Import React Native components
import { Text, View } from "react-native";

// DividingLine component to display a horizontal line with text in the center
const DividingLine = ({ text }) => {
  return (
    // Container with a horizontal line and text in the center
    <View className="flex-row items-center px-8 mt-6">
      {/* Left border of the line */}
      <View className="flex-1 border border-gray-200"></View>

      {/* Text in the center of the line */}
      <Text className="mx-4 font-semibold text-lg text-gray-200">{text}</Text>

      {/* Right border of the line */}
      <View className="flex-1 border border-gray-200"></View>
    </View>
  );
};

// Export the DividingLine component
export default DividingLine;
