// Import React and useState hook
import React, { useState } from "react";

// Import React Native components and elements
import { FlatList, Image, Text, View } from "react-native";
import { RefreshControl } from "react-native";

// Import the list of owned Pokemon from another file
import pokemonList from "../listOfMyPokemons";

// MyPokemons component to display the list of owned Pokemon
const MyPokemons = () => {
  // State variable to manage the refreshing state of FlatList
  const [refreshing, setRefreshing] = useState(false);

  // Function to capitalize the first letter of a word
  const capitalizeWord = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  const getPokemonTypes = (pokemon) => {
    return pokemon.types ? pokemon.types.map((type) => type.type.name) : [];
  };

  // Callback function for the RefreshControl to simulate refreshing
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    // Simulate a delay of 1 second before stopping refreshing
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-red-500">
      {pokemonList.length === 0 ? (
        // Display message when there are no owned Pokemon
        <Text className="font-['proggy-clean'] font-semibold text-3xl text-gray-200">
          You don't have pokemon yet
        </Text>
      ) : (
        // Display FlatList with owned Pokemon
        <FlatList
          data={pokemonList}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <View className="items-center">
              {/* Display the Pokémon's image */}
              <View className="w-[250px] mb-4 p-2 space-y-1 bg-red-400">
                <Image
                  source={{ uri: item.sprites.front_default }}
                  className="w-[200px] h-[120px] mx-auto"
                />
                {/* Display Pokémon information */}
                <View>
                  <Text className="font-[proggy-clean] text-xl text-gray-950">
                    Name: {capitalizeWord(item.name)}
                  </Text>

                  <Text className="font-[proggy-clean] text-xl text-gray-950">
                    Experience: {item.base_experience}
                  </Text>

                  <Text className="font-[proggy-clean] text-xl text-gray-950">
                    Types: {getPokemonTypes(item).join(", ")}
                  </Text>
                </View>
              </View>
            </View>
          )}
          // Add refresh control to the FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          className="w-full mt-12"
        />
      )}
    </View>
  );
};

// Export the MyPokemons component
export default MyPokemons;
