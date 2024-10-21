import React, { useState } from 'react';
import { TextInput, View, TouchableOpacity, Text } from 'react-native';
import { FontAwesome5 } from 'react-native-vector-icons';

export const Input = ({ value, placeholder, setValue }) => {
  return (
    <View
      style={{
        width: 340,
        height: 50,
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
        marginTop: 30,
      }}
    >
      <TextInput
        style={{ height: 50, fontSize: 18, paddingLeft: 10 }}
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        placeholderTextColor="#7C7C7C"
        autoCapitalize="none"
      />
    </View>
  );
};
export const PasswordInput = ({
  setValue,
  placeholder,
  value,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const passwordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  return (
    <View
      style={{
        flexDirection: 'row',
        width: 340,
        height: 50,
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
        marginTop: 30,
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <TextInput
        style={{ height: 50, fontSize: 18, paddingLeft: 10 , width:'85%'}}
        value={value}
        onChangeText={setValue}
        secureTextEntry={!isPasswordVisible}
        placeholder={placeholder}
        autoCapitalize="none"
        placeholderTextColor="#7C7C7C"
      />
      <TouchableOpacity
        onPress={passwordVisibility}
        style={{ marginRight: 10 ,}}
      >
        <FontAwesome5
          name={isPasswordVisible === false ? 'eye-slash' : 'eye'}
          color="#939393"
          size={23}
        />
      </TouchableOpacity>
    </View>
  );
};
export const Button = ({ onPress, text }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        alignItems: 'center',
        width: 340,
        height: 46,
        borderRadius: 10,
        backgroundColor: '#383838',
        justifyContent: 'center',
      }}
    >
      <Text
        style={{
          color: '#FFFFFF',
          fontSize: 18,
          fontWeight: '500',
          lineHeight: 21.6,
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};
