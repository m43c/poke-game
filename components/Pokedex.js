import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, View } from "react-native";

const Pokedex = () => {
  const [loading, setLoading] = useState(true);
  const [wildPokemonList, setWildPokemonList] = useState([]);

  const capitalizeWord = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  useEffect(() => {
    const fetchWildPokemonData = async () => {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/");
        const wildPokemonData = await response.json();

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

        setWildPokemonList(wildPokemon);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchWildPokemonData();
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-red-500">
      {loading ? (
        <Text className="font-['proggy-clean'] font-semibold text-3xl text-gray-200">
          Loading...
        </Text>
      ) : (
        <FlatList
          data={wildPokemonList}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <View className="items-center">
              <Text className="font-['proggy-clean'] font-semibold text-3xl text-gray-200">
                {capitalizeWord(item.name)}
              </Text>
              
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

export default Pokedex;
