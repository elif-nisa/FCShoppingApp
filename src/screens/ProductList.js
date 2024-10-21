import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import {
  Ionicons,
  FontAwesome,
  MaterialIcons,
  AntDesign,
} from 'react-native-vector-icons';
import Stars from 'react-native-stars';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/store';

const ProductList = ({ route, navigation }) => {
  const { token, userID } = route.params;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [succsessAddModal, setSuccessModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get(
          'https://dummyjson.com/products?limit=50',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProducts(response.data.products);
        setFilteredProducts(response.data.products);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    getProducts();
  }, [token]);

  useEffect(() => {
    if (query.length >= 1) {
      const results = products.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(results);
    } else {
      setFilteredProducts(products);
    }
  }, [query, products]);
  useFocusEffect(
    React.useCallback(() => {
      setQuery('')
  }, [])
  );
 
  const shortenDescription = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  };
  const addToCartHandler = (product) => {
    dispatch(addToCart(product)); 
    setSuccessModal(true);
  };
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: '#f3f3f3' }}>
        
        <View style={{ flex: 1, alignItems: 'space-between' , width:'100%'}}>
        <View
            style={{
              width: '100%',
              height: 50,
              backgroundColor: '#ffffff',
              marginTop: 30,
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              paddingHorizontal: 10,
              marginBottom:5
            }}
          >
            <TextInput
              style={{ paddingLeft: 10, fontSize: 14, fontWeight: '500' , width:'90%',height:'100%'}}
              placeholderTextColor={'#595959'}
              placeholder="Ürün ara"
              value={query}
              onChangeText={(text) => setQuery(text)}
            />
            <Ionicons name="search-outline" color="#595959" size={30} />
          </View>
          <FlatList
            numColumns={2}
            data={filteredProducts}
            // keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={{width:filteredProducts.length === 1 ? '100%' : '50%',alignItems:'center'}}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ProductDetail', {
                      productId: item.id,
                      userID,
                    })
                  }
                  style={{
                    width: '95%',
                    height: 300,
                    backgroundColor: '#ffffff',
                    padding: 15,
                    marginBottom: 5,
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 1,
                    },
                    shadowOpacity: 0.22,
                    shadowRadius: 2.22,

                    elevation: 3,
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Text
                      style={{ color: '#34c231', fontSize: 12, lineHeight: 16 }}
                    >
                      Kargo Bedava
                    </Text>

                    <FontAwesome name="heart-o" size={25} color="#757575" />
                  </View>
                  <View
                    style={{
                      alignItems: 'center',
                      width: '100%',
                      height: '40%',
                    }}
                  >
                    <Image
                      style={{ width: '80%', height: '100%' }}
                      source={{ uri: item.thumbnail }}
                      resizeMode="contain"
                    />
                  </View>
                  <View
                    style={{ alignItems: 'flex-start', marginVertical: 10 }}
                  >
                    <Stars
                      default={item.rating}
                      count={5}
                      half={true}
                      starSize={20}
                      spacing={5}
                      fullStar={
                        <MaterialIcons name="star" size={15} color="#ffc107" />
                      }
                      emptyStar={
                        <MaterialIcons name="star" size={15} color="#bcbcbc" />
                      }
                      halfStar={
                        <MaterialIcons name="star" size={15} color="#ffc107" />
                      }
                      disabled={true}
                    />
                  </View>

                  <Text
                    style={{
                      color: '#353535',
                      fontSize: 13,
                      lineHeight: 16,
                      fontWeight: '400',
                      marginBottom: 5,
                    }}
                  >
                    {item.brand} {item.title}
                  </Text>
                  <Text
                    style={{
                      color: '#9e9e9e',
                      fontSize: 13,
                      lineHeight: 16,
                      fontWeight: '400',
                    }}
                  >
                    {shortenDescription(item.description, 20)}
                  </Text>
                  <Text
                    style={{
                      color: '#4a4a4a',
                      fontSize: 19,
                      fontWeight: '600',
                      marginTop: 10,
                    }}
                  >
                    {item.price} USD
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => addToCartHandler(item)}
                  style={{
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 1,
                    },
                    shadowOpacity: 0.22,
                    shadowRadius: 2.22,

                    elevation: 3,
                    backgroundColor: '#ffffff',
                    width: '95%',
                    height: 50,
                    marginBottom: 10,
                    marginHorizontal: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text
                    style={{
                      color: '#6d6d6d',
                      fontSize: 16,
                      fontWeight: '400',
                    }}
                  >
                    Sepete Ekle
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      </View>
      <View
        style={{
          paddingHorizontal: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#ffffff',
          height: 70,
          width: '100%',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.36,
          shadowRadius: 6.68,

          elevation: 12,
        }}
      >
        <AntDesign name="home" color="#ff5714" size={28} />
        <Ionicons name="search-outline" color="#595959" size={28} />
        <FontAwesome name="heart-o" size={28} color="#595959" />
        <TouchableOpacity
          onPress={() => navigation.navigate('BasketScreen', { userID })}
        >
          <Ionicons name="bag-outline" color="#595959" size={28} />
        </TouchableOpacity>
        <AntDesign name="user" color="#595959" size={28} />
      </View>
      <Modal
                  animationType="slide"
                  transparent={true}
                  visible={succsessAddModal}
                  onRequestClose={() => setSuccessModal(false)}
                >
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: '#ffffff',
                        width: '100%',
                        height: 230,
                        alignItems: 'center',
                        padding: 20,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => setSuccessModal(false)}
                        style={{
                          marginHorizontal: 20,
                          alignItems: 'flex-end',
                          width: '100%',
                        }}
                      >
                        <AntDesign name="close" size={25} color="#4f4f4f" />
                      </TouchableOpacity>
                      <Image
                        source={require('../assets/tick-icon.png')}
                        style={{ width: 100, height: 100, marginVertical: 16 }}
                        resizeMode="contain"
                      />
                      <Text
                        style={{
                          fontSize: 18,
                          color: '#4f4f4f',
                          marginBottom: 10,
                        }}
                      >
                        Sepete ekleme başarılı!
                      </Text>
                    </View>
                  </View>
                </Modal>
    </View>
  );
};

export default ProductList;
