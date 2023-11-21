// Import React and necessary hooks for functional components
import React, { useEffect, useState } from "react";

// Import React Native components and elements
import { FlatList, Image, Text, View } from "react-native";

// Pokedex component to display a list of wild Pokemon
const Pokedex = () => {
  // State variables to manage loading state and list of wild Pokemon
  const [loading, setLoading] = useState(true);
  const [wildPokemonList, setWildPokemonList] = useState([]);

  // Function to capitalize the first letter of a word
  const capitalizeWord = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  // Fetch wild Pokemon data from the PokeAPI on component mount
  useEffect(() => {
    const fetchWildPokemonData = async () => {
      try {
        // Fetch the list of wild Pokemon from the PokeAPI
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=151&offset=0"
        );
        const wildPokemonData = await response.json();

        // Fetch details for each wild Pokemon
        const wildPokemon = await Promise.all(
          wildPokemonData.results.map(async (wildPokemon) => {
            const response = await fetch(wildPokemon.url);
            const wildPokemonDetails = await response.json();

            return {
              name: wildPokemon.name,
              image: wildPokemonDetails.sprites.front_default,
            };
          })
        );

        // Set the list of wild Pokemon in state
        setWildPokemonList(wildPokemon);
      } catch (error) {
        console.error(error);
      } finally {
        // Set loading to false when data fetching is complete
        setLoading(false);
      }
    };

    fetchWildPokemonData();
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-red-500">
      {loading ? (
        // Display loading text while data is being fetched
        <Text className="font-['proggy-clean'] font-semibold text-3xl text-gray-200">
          Loading...
        </Text>
      ) : (
        // Display FlatList with the list of wild Pokemon
        <FlatList
          data={wildPokemonList}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <View className="items-center">
              {/* Display Pokemon name */}
              <Text className="font-['proggy-clean'] font-semibold text-3xl text-gray-200">
                {capitalizeWord(item.name)}
              </Text>

              {/* Display Pokemon image */}
              <Image
                source={{ uri: item.image }}
                className="w-[200px] h-[200px]"
              />
            </View>
          )}
          className="w-full mt-12"
        />
      )}
    </View>
  );
};

// Export the Pokedex component
export default Pokedex;
