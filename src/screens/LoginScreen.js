import React, { useState } from 'react';
import {
  View,
  Text,
  Alert,
  ImageBackground,
  TouchableOpacity,
  Modal,
  Image,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import { Input, PasswordInput, Button } from '../lib/theme';
import { AntDesign } from 'react-native-vector-icons';
import { useFocusEffect } from '@react-navigation/native';

const LoginScreen = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [userNameError, setUserNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [successSendMail, setSuccessSendMail] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
    setUserName('')
    setPassword('')
    setUserNameError(false)
    setPasswordError(false)
  }, [])
  );
  const handleLogin = async () => {
    let isValid = true;
    if (userName.trim() === '') {
      setUserNameError(true);
      isValid = false;
    } else {
      setUserNameError(false);
    }

    if (password.trim() === '') {
      setPasswordError(true);
      isValid = false;
    } else {
      setPasswordError(false);
    }


    if (isValid) {

      try {
        const response = await axios.post(
          'https://dummyjson.com/auth/login',
          {
            username: userName,
            password: password,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.status === 200) {
          const token = response.data.token;
          const userID = response.data.id;
          console.log(response.data.id);
          navigation.navigate('ProductList', { token, userID })
         
        } else {
          Alert.alert('Login Failed', 'Invalid username or password');
        }
      } catch (error) {
        console.error(error);
        Alert.alert('Login Error', 'Something went wrong!');
      }
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <View style={{ height: 229 }}>
        <ImageBackground
          source={require('../assets/image.jpeg')}
          style={{ flex: 1 }}
          resizeMode="cover"
        >
          <View
            style={{
              flexDirection: 'row',
              marginTop: 73,
              marginLeft: 41,
              height: 36,
            }}
          >
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 30,
                lineHeight: 36,
                fontWeight: '600',
                marginRight: 10,
              }}
            >
              Giriş
            </Text>
            <AntDesign name="user" size={30} color="#ffffff" />
          </View>
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 20,
              lineHeight: 24,
              fontWeight: '400',
              height: 24,
              marginTop: 10,
              marginLeft: 41,
            }}
          >
            Hoşgeldiniz
          </Text>
        </ImageBackground>
      </View>

      <View style={{ flex: 1, alignItems: 'center' }}>
        <Text
          style={{
            color: '#939393',
            height: 22,
            marginTop: 30,
            fontWeight: 400,
            fontSize: 18,
            lineHeight: 21.6,
            width: 340,
            alignItems: 'flex-start',
          }}
        >
          Alışverişe başlamak için giriş yapınız.
        </Text>
        <Input placeholder={'Kullanıcı Adı*'} value={userName} setValue={setUserName} />
        {userNameError === true ? (
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
            Bu alanın girilmesi zorunludur.
          </Text>
        ) : null}
        <PasswordInput
          placeholder={'Şifre*'}
          value={password}
          setValue={setPassword}
        />
        {passwordError === true ? (
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
            Bu alanın girilmesi zorunludur.
          </Text>
        ) : null}
        <TouchableOpacity
          onPress={() => setPasswordModalVisible(true)}
          style={{ marginVertical: 30, width: 340, alignItems: 'flex-start' }}
        >
          <Text
            style={{
              color: '#4F4F4F',
              fontSize: 18,
              fontWeight: '400',
              lineHeight: 21.6,
            }}
          >
            Şifremi Unuttum
          </Text>
        </TouchableOpacity>
        <Button onPress={() => handleLogin()} text={'Giriş Yap'} />
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 20,
            alignItems: 'center',
          }}
        >
          <View style={{ backgroundColor: '#B9C0C9', height: 1, width: 130 }} />
          <Text style={{ paddingHorizontal: 20, color: '#939393' }}>veya</Text>
          <View style={{ backgroundColor: '#B9C0C9', height: 1, width: 130 }} />
        </View>
        <Button
          text={'Kayıt Ol'}
          onPress={() => navigation.navigate('RegisterScreen')}
        />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={passwordModalVisible}
        onRequestClose={() => {
          setPasswordModalVisible(false);
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
        >
          <View
            style={{
              backgroundColor: 'white',
              padding: 20,
              height: 430,
              alignItems: 'center',
            }}
          >
            <View style={{ flexDirection: 'row', width: '100%' }}>
              <TouchableOpacity
                onPress={() => {
                  setPasswordModalVisible(false);
               successSendMail === true?    navigation.navigate('NewPassword') : null
                }}
                style={{ flex: 1 }}
              >
                <AntDesign name="arrowleft" size={30} />
              </TouchableOpacity>
              <View
                style={{ flex: 10, alignItems: 'center', paddingRight: 10 }}
              >
                <Text style={{ fontSize: 18 }}>Şifremi Unuttum</Text>
              </View>
            </View>
            {successSendMail === false ? (
              <>
                <Image
                  source={require('../assets/Password.png')}
                  style={{ width: 150, height: 150 }}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    color: '#939393',
                    fontSize: 16,
                    lineHeight: 19.2,
                    fontWeight: '400',
                  }}
                >
                  Kayıt olurken kullandığınız e-posta adresini giriniz.
                </Text>
                <Input placeholder={'E-Posta*'} />
                <View style={{ marginTop: 30 }} />
                <Button
                  onPress={() => setSuccessSendMail(true)}
                  text={'Gönder'}
                />
              </>
            ) : (
              <>
                <Image
                  source={require('../assets/tick-icon.png')}
                  style={{ width: 100, height: 100, marginVertical: 30 }}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    color: '#484c52',
                    fontSize: 16,
                    lineHeight: 19.2,
                    fontWeight: '400',
                    textAlign: 'center',
                  }}
                >
                  Size bir e-posta gönderdik, adımları izleyerek şifrenizi
                  sıfırlayabilirsiniz.
                </Text>

                <View
                  style={{
                    width: 340,
                    height: 46,
                    backgroundColor: '#383838',
                    borderRadius: 10,
                    marginTop: 90,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text style={{ color: '#ffffff', fontSize: 16 }}>
                    Lütfen, e-posta adresinizi kontrol edin.
                  </Text>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default LoginScreen;
