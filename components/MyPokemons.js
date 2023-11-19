import React, { useState } from "react";

import { FlatList, Image, Text, View } from "react-native";
import { RefreshControl } from "react-native";

import pokemonList from "../listOfMyPokemons";

const MyPokemons = () => {
  const [refreshing, setRefreshing] = useState(false);

  const capitalizeWord = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-red-500">
      {pokemonList.length === 0 ? (
        <Text className="font-['proggy-clean'] font-semibold text-3xl text-gray-200">
          You don't have pokemon yet
        </Text>
      ) : (
        <FlatList
          data={pokemonList}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <View className="items-center">
              <Text className="font-['proggy-clean'] font-semibold text-3xl text-gray-200">
                {capitalizeWord(item.name)}
              </Text>
              
              <Image
                source={{ uri: item.sprites.front_default }}
                className="w-[200px] h-[200px]"
              />
            </View>
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          className="w-full mt-12"
        />
      )}
    </View>
  );
};

export default MyPokemons;
