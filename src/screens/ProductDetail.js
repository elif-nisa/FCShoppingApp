import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Modal,
} from 'react-native';
import axios from 'axios';
import {
  AntDesign,
  FontAwesome,
  Entypo,
  MaterialIcons,
} from 'react-native-vector-icons';
import Stars from 'react-native-stars';
import moment from 'moment';

const ProductDetail = ({ route, navigation }) => {
  const productId = route.params.productId;
  const { userID } = route.params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [succsessAddModal, setSuccessModal] = useState(false);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axios.get(
          `https://dummyjson.com/products/${productId}`
        );
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Ürün yüklenirken hata oluştu:', error);
        setLoading(false);
      }
    };

    getProduct();
  }, [productId]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  const handleScroll = (event) => {
    const index = Math.floor(
      event.nativeEvent.contentOffset.x /
        event.nativeEvent.layoutMeasurement.width
    );
    setCurrentIndex(index);
  };
  const addToCart = async () => {
    try {
      const response = await axios.post(
        'https://dummyjson.com/carts/add',
        {
          userId: userID,
          products: [
            {
              id: productId,
              quantity: 1,
            },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log( response.data);
      setSuccessModal(true);
    } catch (error) {
      console.error('Hata:', error);
    }
  };
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f3f3f3' }}>
      <View
        style={{
          width: '100%',
          height: 100,
          backgroundColor: '#ffffff',
          marginBottom: 10,
          paddingTop: 30,
          paddingHorizontal: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <View style={{ flex: 2 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={30} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            width: '100%',
            justifyContent: 'flex-end',
            flexDirection: 'row',
          }}
        >
          <FontAwesome name="heart-o" size={26} color="#595959" />
          <Entypo
            name="share"
            size={28}
            color="#595959"
            style={{ marginLeft: 10 }}
          />
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <View
          style={{
            backgroundColor: '#ffffff',
            width: '100%',
            height: 500,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <FlatList
            data={product.images}
            renderItem={({ item }) => (
              <Image
                source={{ uri: item }}
                style={{ width: Dimensions.get('window').width, height: 500 }}
                resizeMode="contain"
              />
            )}
            keyExtractor={(index) => index.toString()}
            horizontal
            pagingEnabled
            onScroll={handleScroll}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginVertical: 10,
          }}
        >
          {product.images.map((_, index) => (
            <View
              key={index}
              style={{
                height: 3,
                width: 20,
                borderRadius: 2,
                backgroundColor: currentIndex === index ? '#000' : '#ccc',
                marginHorizontal: 5,
              }}
            />
          ))}
        </View>

        <View
          style={{
            width: '100%',
            backgroundColor: '#ffffff',
            paddingVertical: 25,
            marginBottom: 10,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'flex-start',
            }}
          >
            <Text
              style={{
                color: '#ff6923',
                fontSize: 18,
                fontWeight: '600',
                paddingLeft: 20,
              }}
            >
              {product.brand}
            </Text>
            <Text style={{ color: '#353535', fontSize: 18, paddingLeft: 5 }}>
              {product.title}
            </Text>
          </View>
          <Text style={{ color: '#353535', fontSize: 18, paddingLeft: 20 }}>
            {product.sku}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
              paddingHorizontal: 20,
              marginVertical: 10,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Stars
                default={product.rating}
                count={5}
                half={true}
                starSize={15}
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
              <Text>
                (
                {product.reviews && product.reviews.length > 0
                  ? product.reviews.length
                  : 0}
                )
              </Text>
            </View>

            <Text style={{ color: '#34c231', fontSize: 14 }}>
              {product.shippingInformation}
            </Text>
          </View>
        </View>

        <View
          style={{
            width: '100%',
            backgroundColor: '#ffffff',
            paddingVertical: 25,
            marginBottom: 10,
          }}
        >
          <Text
            style={{
              color: '4a4a4a',
              fontSize: 30,
              fontWeight: '600',
              paddingLeft: 20,
              marginBottom: 20,
            }}
          >
            {product.price} USD
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 20,
            }}
          >
            <TouchableOpacity
              onPress={() => addToCart()}
              style={{
                backgroundColor: '#34c231',
                width: '45%',
                height: 45,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ fontSize: 16, color: '#ffffff' }}>
                Sepete Ekle
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: '#ef5f4b',
                width: '45%',
                height: 45,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ fontSize: 16, color: '#ffffff' }}>Hemen Al</Text>
            </TouchableOpacity>
          </View>
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
                style={{ fontSize: 18, color: '#4f4f4f', marginBottom: 10 }}
              >
                Sepete ekleme başarılı!
              </Text>
            </View>
          </View>
        </Modal>
        <View
          style={{
            width: '100%',
            backgroundColor: '#ffffff',
            paddingVertical: 25,
            paddingLeft: 20,
            marginBottom: 10,
          }}
        >
          <Text style={{ color: '#353535', fontSize: 16 }}>
            Değerlendirme (
            {product.reviews && product.reviews.length > 0
              ? product.reviews.length
              : 0}
            )
          </Text>
        </View>

        <View
          style={{
            width: '100%',
            backgroundColor: '#ffffff',
            paddingVertical: 25,
            paddingLeft: 20,
            marginBottom: 10,
          }}
        >
          <Text
            style={{
              color: '#353535',
              fontSize: 16,
              fontWeight: '500',
              marginBottom: 25,
            }}
          >
            Ürün Açıklamaları
          </Text>
          <Text style={{ color: '#353535', fontSize: 14 }}>
            {product.description}
          </Text>
        </View>

        <View
          style={{
            width: '100%',
            backgroundColor: '#ffffff',
            paddingVertical: 25,
            paddingLeft: 20,
            marginBottom: 10,
          }}
        >
          <Text
            style={{
              color: '#353535',
              fontSize: 16,
              fontWeight: '400',
              marginBottom: 25,
            }}
          >
            Ürün Hakkında
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1, alignItems: 'flex-start' }}>
              <Text style={{ fontSize: 14, marginBottom: 5 }}>
                Stok Miktarı:
              </Text>
              <Text style={{ fontSize: 14, marginBottom: 5 }}>
                Stok Durumu:
              </Text>
              <Text style={{ fontSize: 14, marginBottom: 5 }}>
                Teslimat Bilgisi:
              </Text>
              <Text style={{ fontSize: 14, marginBottom: 5 }}>
                İade Politikası:
              </Text>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-start' }}>
              <Text style={{ fontSize: 14, marginBottom: 5 }}>
                {product.stock}
              </Text>
              <Text style={{ fontSize: 14, marginBottom: 5 }}>
                {product.availabilityStatus}
              </Text>
              <Text style={{ fontSize: 14, marginBottom: 5 }}>
                {product.shippingInformation}
              </Text>
              <Text style={{ fontSize: 14, marginBottom: 5 }}>
                {product.returnPolicy}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            width: '100%',
            backgroundColor: '#ffffff',
            paddingVertical: 25,
            paddingLeft: 20,
            marginBottom: 10,
          }}
        >
          <Text
            style={{
              color: '#353535',
              fontSize: 16,
              fontWeight: '400',
              marginBottom: 25,
            }}
          >
            Ürün Değerlendirmeleri
          </Text>

          {product.reviews.map((item, index) => (
            <View
            key={index}
              style={{
                width: '95%',
                marginBottom: 10,
                padding: 10,
                borderWidth: 1,
                borderStyle: 'dashed',
                borderColor: '#353535',
              }}
            >
              <Text
                style={{
                  color: '#353535',
                  fontSize: 13,
                  fontWeight: '600',
                  marginBottom: 10,
                }}
              >
                {item.reviewerName}({item.rating})
              </Text>
              <Text style={{ color: '#353535', fontSize: 13 }}>
                {item.comment}
              </Text>
              <Text
                style={{
                  width: '100%',
                  textAlign: 'right',
                  paddingRight: 10,
                  fontSize: 13,
                }}
              >
                {moment(item.date).format('DD.MM.YYYY HH:mm')}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};
export default ProductDetail;
