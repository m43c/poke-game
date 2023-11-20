import React, { useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  TouchableOpacity,
  ToastAndroid,
  Text,
  View,
} from "react-native";

import pokemonList from "../listOfMyPokemons";

const BoardScreen = ({
  route: {
    params: { myPokemon },
  },
}) => {
  const [loading, setLoading] = useState(true);
  const [wildPokemon, setWildPokemon] = useState([]);
  const [wildPokemonWeaknesses, setWildPokemonWeaknesses] = useState([]);
  const [weaknessesOfMyPokemon, setWeaknessesOfMyPokemon] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const showNotification = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
  };

  const getPokemonTypes = (pokemon) => {
    return pokemon.types ? pokemon.types.map((type) => type.type.name) : [];
  };

  const getPokemonWeaknesses = async (pokemon) => {
    try {
      const pokemonWeaknesses = [];
      const typesOfPokemon = getPokemonTypes(pokemon);

      for (const typeOfPokemon of typesOfPokemon) {
        const response = await fetch(
          `https://pokeapi.co/api/v2/type/${typeOfPokemon}`
        );
        const weaknessesData = await response.json();

        const typeWeaknesses = weaknessesData.damage_relations
          ? weaknessesData.damage_relations.double_damage_from.map(
              (weakness) => weakness.name
            )
          : [];
        pokemonWeaknesses.push(...typeWeaknesses);
      }

      return [...new Set(pokemonWeaknesses)];
    } catch (error) {
      console.error(error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getRandomWildPokemon = async () => {
    try {
      const randomPokemonId = Math.floor(Math.random() * (151 - 1 + 1)) + 1;

      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${randomPokemonId}`
      );
      const pokemonData = await response.json();
      setWildPokemon(pokemonData);

      const weaknesses = await getPokemonWeaknesses(pokemonData);
      setWildPokemonWeaknesses(weaknesses);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const reloadWildPokemon = async () => {
    await getRandomWildPokemon();
  };

  const catchPokemon = () => {
    let probabilityOfVictory = 0;
    const typesOfMyPokemon = getPokemonTypes(pokemonList[currentIndex]);

    typesOfMyPokemon.forEach((type) => {
      if (wildPokemonWeaknesses.includes(type)) {
        probabilityOfVictory += 50;
      }
    });

    if (probabilityOfVictory >= 50) {
      showNotification(`You caught a ${wildPokemon.name}!`);
      pokemonList.push(wildPokemon);
    } else {
      showNotification(`${wildPokemon.name} has escaped!`);
    }
  };

  const changeToNextPokemon = async () => {
    const nextPokemonIndex = (currentIndex + 1) % pokemonList.length;
    const nextPokemon = pokemonList[nextPokemonIndex];

    const weaknessesOfNextPokemon = await getPokemonWeaknesses(nextPokemon);

    setCurrentIndex(nextPokemonIndex);
    setWeaknessesOfMyPokemon(weaknessesOfNextPokemon);
  };

  useEffect(() => {
    const loadRandomWildPokemon = async () => {
      await getRandomWildPokemon();
    };

    const loadWeaknessesOfMyPokemon = async () => {
      try {
        const weaknesses = await getPokemonWeaknesses(myPokemon);
        setWeaknessesOfMyPokemon(weaknesses);
      } catch (error) {
        console.error(error);
      }
    };

    loadRandomWildPokemon();
    loadWeaknessesOfMyPokemon();
  }, []);

  return (
    <View className="flex-1 items-center justify-center space-y-4 p-2 bg-red-500">
      {loading ? (
        <Text className="font-['proggy-clean'] font-semibold text-3xl text-gray-200">
          Loading...
        </Text>
      ) : (
        <>
          <View className="w-full border p-2 bg-slate-200">
            <Text className="font-['proggy-clean'] font-semibold text-2xl text-start">
              Name: {wildPokemon.name}
            </Text>

            <Text className="font-['proggy-clean'] font-semibold text-2xl text-start">
              Types: {getPokemonTypes(wildPokemon).join(", ")}
            </Text>

            <Text className="font-['proggy-clean'] font-semibold text-2xl">
              Weaknesses: {wildPokemonWeaknesses.join(", ")}
            </Text>
          </View>

          <ImageBackground
            source={require("../assets/combat-scenario.png")}
            resizeMode="stretch"
            className="w-full h-[300px] relative"
          >
            <TouchableOpacity
              className="absolute top-9 right-[30px]"
              onPress={() => {
                reloadWildPokemon();
              }}
            >
              {wildPokemon.sprites && wildPokemon.sprites.front_default && (
                <Image
                  source={{ uri: wildPokemon.sprites.front_default }}
                  className="w-[130px] h-[150px] "
                />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              className="absolute bottom-2 left-[60px]"
              onPress={() => {
                changeToNextPokemon();
              }}
            >
              {pokemonList[currentIndex].sprites &&
                pokemonList[currentIndex].sprites.back_default && (
                  <Image
                    source={{
                      uri: pokemonList[currentIndex].sprites.back_default,
                    }}
                    className="w-[200px] h-[150px]"
                  />
                )}
            </TouchableOpacity>
          </ImageBackground>

          <View className="w-full border p-2 bg-slate-200">
            <Text className="font-['proggy-clean'] font-semibold text-2xl">
              Name: {pokemonList[currentIndex].name}
            </Text>

            <Text className="font-['proggy-clean'] font-semibold text-2xl">
              Type: {getPokemonTypes(pokemonList[currentIndex]).join(", ")}
            </Text>

            <Text className="font-['proggy-clean'] font-semibold text-2xl">
              Weaknesses: {weaknessesOfMyPokemon.join(", ")}
            </Text>
          </View>

          <TouchableOpacity className="w-full p-2 rounded bg-[#4e76a7]">
            <Text
              className="font-['proggy-clean'] font-semibold text-2xl text-center text-gray-200"
              onPress={() => {
                catchPokemon();
              }}
            >
              Catch them now!
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default BoardScreen;
