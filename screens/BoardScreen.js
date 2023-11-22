// Import React and necessary hooks for functional components
import React, { useEffect, useState } from "react";

// Import React Native components and elements
import {
  Image,
  ImageBackground,
  TouchableOpacity,
  ToastAndroid,
  Text,
  View,
} from "react-native";

// Import the list of owned Pokemon from another file
import pokemonList from "../listOfMyPokemons";

// BoardScreen component that receives navigation parameters
const BoardScreen = ({
  route: {
    params: { myPokemon },
  },
}) => {
  // State variables to manage game state
  const [loading, setLoading] = useState(true);
  const [wildPokemon, setWildPokemon] = useState([]);
  const [wildPokemonWeaknesses, setWildPokemonWeaknesses] = useState([]);
  const [weaknessesOfMyPokemon, setWeaknessesOfMyPokemon] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to display Android Toast notifications
  const showNotification = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
  };

  // Function to get types of a Pokemon
  const getPokemonTypes = (pokemon) => {
    return pokemon.types ? pokemon.types.map((type) => type.type.name) : [];
  };

  // Function to fetch weaknesses of a Pokemon from the PokeAPI
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
      // Set loading to false when data fetching is complete
      setLoading(false);
    }
  };

  // Function to get a random wild Pokemon
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
      // Set loading to false when data fetching is complete
      setLoading(false);
    }
  };

  // Function to reload the wild Pokemon
  const reloadWildPokemon = async () => {
    await getRandomWildPokemon();
  };

  // Function to attempt catching the wild Pokemon
  const catchPokemon = () => {
    const myCurrentPokemon = pokemonList[currentIndex];
    const typesOfMyCurrentPokemon = getPokemonTypes(myCurrentPokemon);

    let probabilityOfVictory = 0;

    typesOfMyCurrentPokemon.forEach((type) => {
      if (wildPokemonWeaknesses.includes(type)) {
        probabilityOfVictory += 50;
      }
    });

    if (probabilityOfVictory >= 50) {
      showNotification(`You caught a ${wildPokemon.name}!`);
      pokemonList.push(wildPokemon);
      reloadWildPokemon();
    } else {
      showNotification(`${wildPokemon.name} has escaped!`);
      reloadWildPokemon();
    }
  };

  // Function to change to the next owned Pokemon
  const changeToNextPokemon = async () => {
    const nextPokemonIndex = (currentIndex + 1) % pokemonList.length;
    const nextPokemon = pokemonList[nextPokemonIndex];

    const weaknessesOfNextPokemon = await getPokemonWeaknesses(nextPokemon);

    setCurrentIndex(nextPokemonIndex);
    setWeaknessesOfMyPokemon(weaknessesOfNextPokemon);
  };

  // Fetch random wild Pokemon and weaknesses of the player's Pokemon on component mount
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
        // Loading text
        <Text className="font-['proggy-clean'] font-semibold text-3xl text-gray-200">
          Loading...
        </Text>
      ) : (
        // Display game content after loading
        <>
          {/* Display wild Pokemon information */}
          <View className="w-full border p-2 bg-slate-200">
            <Text className="font-['proggy-clean'] font-semibold text-2xl text-start">
              Name: {wildPokemon.name}
            </Text>

            <Text className="font-['proggy-clean'] font-semibold text-2xl text-start">
              Types: {getPokemonTypes(wildPokemon).join(", ")}
            </Text>

            <Text className="font-['proggy-clean'] font-semibold text-2xl text-start">
              Base Experience: {wildPokemon.base_experience}
            </Text>

            <Text className="font-['proggy-clean'] font-semibold text-2xl">
              Weaknesses: {wildPokemonWeaknesses.join(", ")}
            </Text>
          </View>

          {/* Display combat scenario with wild Pokemon */}
          <ImageBackground
            source={require("../assets/combat-scenario.png")}
            resizeMode="stretch"
            className="w-full h-[300px] relative"
          >
            {/* Reload button for wild Pokemon */}
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

            {/* Button to change to the next owned Pokemon */}
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

          {/* Display player's Pokemon information */}
          <View className="w-full border p-2 bg-slate-200">
            <Text className="font-['proggy-clean'] font-semibold text-2xl">
              Name: {pokemonList[currentIndex].name}
            </Text>

            <Text className="font-['proggy-clean'] font-semibold text-2xl">
              Type: {getPokemonTypes(pokemonList[currentIndex]).join(", ")}
            </Text>

            <Text className="font-['proggy-clean'] font-semibold text-2xl text-start">
              Base Experience: {pokemonList[currentIndex].base_experience}
            </Text>

            <Text className="font-['proggy-clean'] font-semibold text-2xl">
              Weaknesses: {weaknessesOfMyPokemon.join(", ")}
            </Text>
          </View>

          {/* Display button to catch the wild Pokemon */}
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

// Export the BoardScreen component
export default BoardScreen;
