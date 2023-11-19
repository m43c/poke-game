import { Text, View } from "react-native";

const DividingLine = ({ text }) => {
  return (
    <View className="flex-row items-center px-8 mt-6">
      <View className="flex-1 border border-gray-200"></View>
      <Text className="mx-4 font-semibold text-lg text-gray-200">{text}</Text>
      <View className="flex-1 border border-gray-200"></View>
    </View>
  );
};

export default DividingLine;
