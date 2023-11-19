import React, { useEffect, useState } from "react";

import { Image, Text, TouchableOpacity, View } from "react-native";

import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";

import { useNavigation } from "@react-navigation/native";

import StarterPokemon from "../components/StarterPokemon";
import DividingLine from "../components/DividingLine";

const HomeScreen = () => {
  const [pokemons, setPokemons] = useState([]);
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    "proggy-clean": require("../assets/fonts/ProggyClean.ttf"),
  });

  const updatePokemon = (newData) => {
    setPokemon(newData);
  };

  const fetchPokemon = async (name) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const data = await response.json();

      return data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const startingPokemons = [
          "pikachu",
          "charmander",
          "bulbasaur",
          "squirtle",
        ];
        const pokemonDataArray = await Promise.all(
          startingPokemons.map((name) => fetchPokemon(name))
        );

        setPokemons(pokemonDataArray);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View className="flex-1 items-center justify-center bg-red-500">
      {loading ? (
        <Text className="font-['proggy-clean'] font-semibold text-3xl text-gray-200">
          Loading...
        </Text>
      ) : (
        <View className="w-full items-center">
          <Image source={require("../assets/logo.png")} />

          <View className="w-full flex-row justify-between">
            {pokemons
              .filter((pokemon) => pokemon.name !== "pikachu")
              .map((pokemon) => (
                <StarterPokemon
                  key={pokemon.id}
                  pokemon={pokemon}
                  updatePokemon={updatePokemon}
                />
              ))}
          </View>

          <Text className="font-['proggy-clean'] font-semibold text-2xl text-gray-200">
            SELECT YOUR STARTING POKEMON
          </Text>

          <DividingLine text="Or" />

          <Text className="mt-8 font-['proggy-clean'] font-semibold text-2xl text-gray-200">
            TRY TO GET A PIKACHU
          </Text>
          <StarterPokemon pokemon={pokemons[0]} updatePokemon={updatePokemon} />

          <TouchableOpacity
            className="w-[90%] p-2 rounded bg-[#4e76a7]"
            onPress={() => {
              if (pokemon) {
                navigation.navigate("Board", { myPokemon: pokemon });
                return;
              }
            }}
          >
            <Text className="font-['proggy-clean'] font-semibold text-3xl text-center text-gray-200">
              Start
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <StatusBar style="light" backgroundColor="#000000" />
    </View>
  );
};

export default HomeScreen;
