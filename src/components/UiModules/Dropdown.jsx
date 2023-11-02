import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

function Dropdown({styles, options, onSelect,onBlur }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSelect = (value) => {


    setIsDropdownOpen(false);
    setSearchTerm("");
    onSelect(value);
    validate(value);
  
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <View style={{ flexDirection: "column",backgroundColor:"#FFF",position:"relative" }}>
      <TouchableOpacity onPress={() => setIsDropdownOpen(!isDropdownOpen)}>
        <Text style={{ padding: 10 }}>
          Seleccionar opción
        </Text>
      </TouchableOpacity>
      {isDropdownOpen && (
        <View style={{ position: "absolute", elevation:3,zIndex:9999,top: 50, left: 0, right: 0,backgroundColor:"#FFF",width:"85%" }}>
          <TextInput
            style={styles}
            placeholder="Buscar..."
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
          />
          {filteredOptions.map((option) => (
            <TouchableOpacity
              key={option.value}
              onPress={() => handleSelect(option.value)}
              style={{ padding: 10 }}
            >
              <Text>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}


export default Dropdown;