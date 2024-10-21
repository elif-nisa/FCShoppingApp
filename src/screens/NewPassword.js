import React, { useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
} from 'react-native';
import {  PasswordInput, Button } from '../lib/theme';
import { useFocusEffect } from '@react-navigation/native';

const NewPassword = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage]=useState(false)

  useFocusEffect(
    React.useCallback(() => {
      setPassword('')
      setConfirmPassword('')
      setErrorMessage(false)
  }, [])
  );

  const checkPasswordsMatch = (text) => {
    setConfirmPassword(text)
    setErrorMessage(text !== password);
  };
  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <View style={{ height: 229 }}>
        <ImageBackground
          source={require('../assets/image.jpeg')}
          style={{ flex: 1 }}
          resizeMode="cover"
        />
      </View>

      <View style={{ flex: 1, alignItems: 'center' }}>
        <Text
          style={{
            color: '#939393',
            marginTop: 30,
            fontWeight: 400,
            fontSize: 16,
            lineHeight: 21.6,
            alignItems: 'flex-start',
          }}
        >
          Alışverişe başlamak için yeni parola oluşturun.
        </Text>

        <PasswordInput
          value={password}
          setValue={setPassword}
          placeholder={'Yeni Şifre*'}
        />
        <PasswordInput
          value={confirmPassword}
          setValue={checkPasswordsMatch}
          placeholder={'Yeni Şifre Tekrar*'}
        />
         {errorMessage === true ? (
          <Text
            style={{
              fontSize: 13,
              lineHeight: 15.6,
              fontWeight: '400',
              color: '#FF3D00',
              width: 340,
              alignItems: 'flex-start',
              marginTop: 10,
            }}
          >
            Şifreler uyuşmuyor.
          </Text>
        ) : null}
        <View style={{ marginTop: 30 }}></View>
        <Button onPress={()=> navigation.navigate('Login')} text={'Kaydet ve Giriş Yap'} />
      </View>
    </View>
  );
};

export default NewPassword;
