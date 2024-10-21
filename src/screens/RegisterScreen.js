import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import { Input, PasswordInput, Button } from '../lib/theme';
import { AntDesign } from 'react-native-vector-icons';
import { useFocusEffect } from '@react-navigation/native';

const RegisterScreen = ({ navigation }) => {
  const [name, setname] = useState('');
  const [surName, setSurname] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [errorMessage, setErrorMessage]=useState(false)

  useFocusEffect(
    React.useCallback(() => {
      setname('')
      setSurname('')
      setUserName('')
      setEmail('')
      setPassword('')
      setConfirmPassword('')
      setSuccessModalVisible(false)
      setErrorMessage(false)
  }, [])
  );
  const registerUser = async (name, surName, username, password, email ) => {
    try {
      const response = await axios.post('https://dummyjson.com/users/add', {
       firstName: name,
       lastName: surName,
       username: username,
       password: password,
       email: email,
       
      });

      if (response.status === 201 || response.status === 200) {
        setSuccessModalVisible(true)
        console.log('Kullanıcı oluşturuldu:', response.data);
      } else {
        console.error('hata:', response);
      }
    } catch (error) {
      console.error(error.response.data);
    }
  };
  const checkPasswordsMatch = (text) => {
    setConfirmPassword(text)
    setErrorMessage(text !== password);
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
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
            height: 22,
            marginTop: 30,
            fontWeight: 400,
            fontSize: 18,
            lineHeight: 21.6,
            width: 340,
            alignItems: 'flex-start',
          }}
        >
          Alışverişe başlamak için kayıt olunuz.
        </Text>
        <Input value={name} setValue={setname} placeholder={'Ad*'} />
        <Input value={surName} setValue={setSurname} placeholder={'Soyad*'} />
        <Input value={email} setValue={setEmail} placeholder={'E-posta*'} />
        <Input
          value={userName}
          setValue={setUserName}
          placeholder={'Kullanıcı Adı*'}
        />
        <PasswordInput
          value={password}
          setValue={setPassword}
          placeholder={'Şifre*'}
        />
        <PasswordInput
          value={confirmPassword}
          setValue={checkPasswordsMatch}
          placeholder={'Şifre Tekrar*'}
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
        <Button
          onPress={() => registerUser(name,surName, userName, password, email)}
          text={'Kayıt Ol'}
        />
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 20,
            alignItems: 'center',
            justifyContent: 'space-between',
            width: 340,
          }}
        >
          <Text
            style={{
              color: '#939393',
              fontSize: 18,
              lineHeight: 21.6,
              fontWeight: '400',
            }}
          >
            Zaten bir hesabın mı var?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text
              style={{
                color: '#FF3D00',
                fontSize: 18,
                lineHeight: 21.6,
                fontWeight: '400',
              }}
            >
              Giriş yap
            </Text>
          </TouchableOpacity>
        </View>
        <Modal
        animationType="slide"
        transparent={true}
        visible={successModalVisible}
        onRequestClose={() => {
          setSuccessModalVisible(false);
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
                  setSuccessModalVisible(false);
                }}
                style={{ flex: 1 }}
              >
                <AntDesign name="arrowleft" size={30} />
              </TouchableOpacity>
              <View
                style={{ flex: 10, alignItems: 'center', paddingRight: 10 }}
              >
                <Text style={{ fontSize: 18 }}>Kayıt Ol</Text>
              </View>
            </View>
        
             
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
                  Size bir e-posta gönderdik, e-posta onayından sonra giriş yapabilirsiniz.
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
                    Lütfen, e-posta adresinizi onaylayın.
                  </Text>
                </View>
            
         
          </View>
        </View>
      </Modal>
      </View>
    </ScrollView>
  );
};

export default RegisterScreen;
