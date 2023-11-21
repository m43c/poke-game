// React and Hooks for functional components
import React, { useEffect, useState } from "react";

// Components and UI elements from React Native
import { Image, Text, TouchableOpacity, View } from "react-native";

// StatusBar component from Expo for managing the status bar appearance
import { StatusBar } from "expo-status-bar";

// Hook for loading custom fonts using Expo Fonts
import { useFonts } from "expo-font";

// Hook for accessing navigation functionality in React Navigation
import { useNavigation } from "@react-navigation/native";

// Custom components for this screen
import StarterPokemon from "../components/StarterPokemon";
import DividingLine from "../components/DividingLine";

// Declaration of the HomeScreen functional component
const HomeScreen = () => {
  // State variables for managing Pokemon data and loading state
  const [pokemons, setPokemons] = useState([]);
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  // Navigation hook for accessing navigation functionality
  const navigation = useNavigation();

  // Font loading hook from Expo Fonts
  const [fontsLoaded] = useFonts({
    "proggy-clean": require("../assets/fonts/ProggyClean.ttf"),
  });

  // Function to update selected Pokemon
  const updatePokemon = (newData) => {
    setPokemon(newData);
  };

  // Function to fetch Pokemon data from the API
  const fetchPokemon = async (name) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const data = await response.json();

      return data;
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch initial Pokemon data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // List of starting Pokemon names
        const startingPokemons = [
          "pikachu",
          "charmander",
          "bulbasaur",
          "squirtle",
        ];

        // Fetch data for each starting Pokemon
        const pokemonDataArray = await Promise.all(
          startingPokemons.map((name) => fetchPokemon(name))
        );

        // Set Pokemon data and update loading state
        setPokemons(pokemonDataArray);
        setLoading(false);
      } catch (error) {
        console.error(error);
        // Set loading to false when data fetching is complete
        setLoading(false);
      }
    };

    // Invoke the fetchData function
    fetchData();
  }, []);

  // Return null while fonts are loading
  if (!fontsLoaded) {
    return null;
  }

  return (
    <View className="flex-1 items-center justify-center bg-red-500">
      {/* Conditional rendering based on loading state */}
      {loading ? (
        // Display loading text
        <Text className="font-['proggy-clean'] font-semibold text-3xl text-gray-200">
          Loading...
        </Text>
      ) : (
        // Display content after loading
        <View className="w-full items-center">
          {/* App logo */}
          <Image source={require("../assets/logo.png")} />

          {/* Pokemon selection */}
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

          {/* Selection instructions */}
          <Text className="font-['proggy-clean'] font-semibold text-2xl text-gray-200">
            SELECT YOUR STARTING POKEMON
          </Text>

          {/* Divider */}
          <DividingLine text="Or" />

          {/* Instructions for Pikachu */}
          <Text className="mt-8 font-['proggy-clean'] font-semibold text-2xl text-gray-200">
            TRY TO GET A PIKACHU
          </Text>

          {/* Render the StarterPokemon component with the first Pokemon from the 'pokemons' array (Pikachu). */}
          <StarterPokemon pokemon={pokemons[0]} updatePokemon={updatePokemon} />

          {/* Start button */}
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

      {/* Status bar */}
      <StatusBar style="light" backgroundColor="#000000" />
    </View>
  );
};

// Export the HomeScreen component as the default export
export default HomeScreen;
