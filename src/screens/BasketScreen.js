import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import axios from 'axios';
import { AntDesign, EvilIcons, Entypo , Octicons} from 'react-native-vector-icons';
import { useDispatch, useSelector } from 'react-redux';


const BasketScreen = ({ route, navigation }) => {
  const { userID } = route.params;
  const [loading, setLoading] = useState(true);
  const [discountedTotal, setDiscountedTotal] = useState(0);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [discountedPrice, setDiscountedPrice] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart); 
  const [selectedItems, setSelectedItems] = useState(cartItems.map(item => item.id));
 
  const calculateTotal = () => {
    let total = 0;
    cartItems.forEach(item => {
      if (selectedItems.includes(item.id)) {
        const discountedPrice = item.price * (1 - item.discountPercentage / 100);
        total += discountedPrice * item.quantity;
        setDiscountedPrice(discountedPrice)
      }
    });
    setDiscountedTotal(total);
  };
  const calculateDiscountedPrice = (price , discountPercentage, quantity) => {
    const discountedPrice = price * (1 - discountPercentage / 100);
    return discountedPrice * quantity; 
  };
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return; 
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity: newQuantity } });
  };
 
  const getCartData = async () => {
    try {
      const response = await axios.get(`https://dummyjson.com/carts/${userID}`);
      dispatch({ type: 'SET_CART_ITEMS', payload: response.data.products });
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  const handleSelectItem = (item) => {
    if (selectedItems.includes(item.id)) {
      setSelectedItems(selectedItems.filter(id => id !== item.id));
    } else {
      setSelectedItems([...selectedItems, item.id]);
    }
    calculateTotal();
  };
  const selectAllItems = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([]);
    } else {
      const allItemIds = cartItems.map(item => item.id);
      setSelectedItems(allItemIds);
    }
  };
  useEffect(() => {
    getCartData();
  }, []);
  useEffect(() => {
    if (cartItems.length > 0) {
        calculateTotal();
    }
}, [cartItems, selectedItems]);
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
 
  const handleDeleteSelected = () => {
    dispatch({ type: 'DELETE_SELECTED', payload: selectedItems });
    setSelectedItems([]);
    setDiscountedTotal(0);
    setDeleteAlert(false);
  };
  return (
    <View style={{ flex: 1, backgroundColor: '#f3f3f3' }}>
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
        <View style={{ flex: 1 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={30} color="#484c52" />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 5, alignItems: 'center' }}>
          <Text style={{ color: '#484c52', fontSize: 18 }}>
            Sepetim
          </Text>
        </View>
        <View style={{ flex: 1, alignItems: 'center', flexDirection:'row', }}>
        <TouchableOpacity  onPress={selectAllItems}>
        <Octicons name={selectedItems.length === cartItems.length ? "check-circle" : "circle"} size={25} color="#174f28" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setDeleteAlert(true)} style={{ justifyContent:'center', alignItems:'center', marginBottom:5}}>
          <EvilIcons name="trash" size={40} color="#174f28" />
        </TouchableOpacity>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={deleteAlert}
        onRequestClose={() => setDeleteAlert(false)}
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
            <Text style={{ fontSize: 18, color: '#4f4f4f', marginBottom: 10 }}>
              Silmek istediğinizden emin misiniz?
            </Text>
            <TouchableOpacity
              onPress={handleDeleteSelected}
              style={{
                width: 340,
                height: 46,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#4caf50',
                borderRadius: 10,
                marginVertical: 20,
              }}
            >
              <Text style={{ color: '#ffffff', fontSize: 18 }}>Evet</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setDeleteAlert(false)}
              style={{
                width: 340,
                height: 46,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#4a4a4a',
                borderRadius: 10,
              }}
            >
              <Text style={{ color: '#ffffff', fontSize: 18 }}>Hayır</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {cartItems.length === 0 ? (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Text>Sepet Bos</Text>
        </View>
      ) : (
        <FlatList
          style={{ flexGrow: 1 }}
          data={cartItems}
          renderItem={({ item }) => (
            <View
              style={{
                backgroundColor: '#ffffff',
                width: '100%',
                marginBottom: 10,
                paddingVertical: 20,
              }}
            >
              <View style={{flexDirection:'row', alignItems:'center'}}>
                <TouchableOpacity  onPress={() => handleSelectItem(item)}  style={{marginHorizontal:10}}>
                <Octicons  name={selectedItems.includes(item.id) ? "check-circle" : "circle"} size={25} color='#979797'/>
                </TouchableOpacity>
              <Text
                    style={{ fontSize: 16, marginBottom: 5, fontWeight: '800' }}
                  >
                    {item.title}
                  </Text>
              </View>
              <View style={{ flexDirection: 'row', width: '100%' }}>
                <View
                  style={{
                    flex: 2,
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: 10,
                    borderColor: '#ebebeb',
                    borderWidth: 1,
                  }}
                >
                  <Image
                    style={{ width: '100%', height: 100 }}
                    source={{ uri: item.thumbnail }}
                    resizeMode="contain"
                  />
                </View>

                <View style={{ flex: 5, margin: 5 }}>
                 
                  <View style={{ flexDirection: 'row', width: '100%' }}>
                    <Text
                      style={{
                        color: '#353535',
                        fontSize: 14,
                        fontWeight: '600',
                      }}
                    >
                      İndirim Yüzdesi:
                    </Text>
                    <Text
                      style={{
                        color: '#353535',
                        fontSize: 14,
                        fontWeight: '400',
                      }}
                    >
                      {' '}
                      %{item.discountPercentage}
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row', width: '100%' }}>
                    <Text
                      style={{
                        color: '#353535',
                        fontSize: 14,
                        fontWeight: '600',
                      }}
                    >
                      Birim Fiyatı:
                    </Text>
                    <Text
                      style={{
                        color: '#353535',
                        fontSize: 14,
                        fontWeight: '400',
                      }}
                    >
                      {item.price} USD
                    </Text>
                  </View>
                  <Text
                      style={{
                        color: '#b1b1b1',
                        fontSize: 18,
                        fontWeight: '400',
                        textDecorationLine: 'line-through',
                        textDecorationColor: '#b1b1b1',
                      }}
                    >
                      {(item.price* item.quantity).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Text
                      style={{
                        color: '#5b5b5b',
                        fontSize: 19,
                        fontWeight: '600',
                      }}
                    >
                      {calculateDiscountedPrice(item.price, item.discountPercentage, item.quantity).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 })} 
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: 90,
                        borderRadius: 20,
                        borderColor: '#164e27',
                        borderWidth: 1,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <Text>-</Text>
                      </TouchableOpacity>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <Text>{item.quantity}</Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => updateQuantity(item.id, item.quantity + 1)}
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <Text>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
      <View
        style={{
          width: '100%',
          height: 90,
          backgroundColor: '#ffffff',
          paddingHorizontal: 20,
          paddingVertical: 10,
          flexDirection: 'row',
        }}
      >
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text
              style={{
                color: '#4a4a4a',
                fontSize: 23,
                fontWeight: '500',
                marginRight: 20,
              }}
            >
              Toplam
            </Text>
            <Entypo name="chevron-thin-up" size={18} color="#4a4a4a" />
          </View>

          <Text style={{ color: '#4a4a4a', fontSize: 23, fontWeight: '500' }}>
          {discountedTotal.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 })} 
          </Text>
        </View>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: '#353535',
              width: '90%',
              height: 45,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 16, color: '#ffffff' }}>Devam Et</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default BasketScreen;
