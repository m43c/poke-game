import { Image, ToastAndroid, TouchableOpacity } from "react-native";
import pokemonList from "../listOfMyPokemons";

const StarterPokemon = ({ pokemon, updatePokemon }) => {
  const showNotfication = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
  };

  const capitalizeWord = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  const getPikachu = () => {
    const luckyNumber = Math.round(Math.random());

    if (luckyNumber == 1) {
      showNotfication("You chose Pikachu!");
      updatePokemon(pokemon);
      pokemonList.push(pokemon);
    } else {
      showNotfication("Pikachu has escaped!");
      updatePokemon(null);
    }
  };

  return (
    <TouchableOpacity
      key={pokemon.id}
      onPress={
        pokemon.name !== "pikachu"
          ? () => {
              showNotfication(`You chose ${capitalizeWord(pokemon.name)}!`);
              updatePokemon(pokemon);
              pokemonList.push(pokemon);
            }
          : () => {
              getPikachu();
            }
      }
    >
      <Image
        source={{
          uri: pokemon.sprites.front_default,
        }}
        className="w-[130px] h-[180px]"
      />
    </TouchableOpacity>
  );
};

export default StarterPokemon;
