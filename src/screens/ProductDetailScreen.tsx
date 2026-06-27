import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import { RootStackParamList } from '../../App';
import AmazonHeader from '../components/AmazonHeader';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';

type Props = NativeStackScreenProps<RootStackParamList, 'ProductDetail'>;

export default function ProductDetailScreen({ route, navigation }: Props) {
  const { product } = route.params;
  const { addToCart } = useCart();
  const price = formatPrice(product.price);
  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;

  return (
    <View style={styles.container}>
      <AmazonHeader initialQuery="panela" />
      <ScrollView style={styles.body}>
        <View style={styles.metaRow}><Text style={styles.brand}>Marca: {product.brand}</Text><Text style={styles.stars}>{product.rating.toFixed(1).replace('.', ',')} ★★★★★ ({product.reviews})</Text></View>
        <Text style={styles.title}>{product.title}</Text>
        {product.badge && <Text style={styles.badge}>{product.badge}</Text>}
        <Text style={styles.bought}>{product.bought}</Text>
        <View style={[styles.imageStage, { backgroundColor: product.color }]}><Image source={product.image} style={styles.image} resizeMode="contain" /></View>
        <View style={styles.actions}><Text style={styles.dots}>●  ●  ●  ●  ●</Text><Ionicons name="heart-outline" size={42} /><Ionicons name="share-social-outline" size={42} /></View>
        <View style={styles.priceBlock}>
          {discount > 0 && <Text style={styles.discount}>-{discount}%</Text>}
          <Text style={styles.currency}>R$</Text><Text style={styles.price}>{price.reais}</Text><Text style={styles.cents}>{price.centavos}</Text>
        </View>
        {product.oldPrice && <Text style={styles.old}>De: R${product.oldPrice.toFixed(2).replace('.', ',')}</Text>}
        <View style={styles.couponRow}><Text style={styles.couponButton}>Resgatar</Text><Text style={styles.couponValue}>R$20</Text><Text style={styles.couponText}>off na primeira compra no app</Text></View>
        <Pressable style={styles.addButton} onPress={() => addToCart(product)}><Text style={styles.addText}>Adicionar ao carrinho</Text></Pressable>
        <Pressable style={styles.cartButton} onPress={() => navigation.navigate('Cart')}><Text style={styles.cartText}>Ir para o carrinho</Text></Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  body: { padding: 18 },
  metaRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 12 },
  brand: { color: '#2162a1', fontSize: 20, flex: 1 },
  stars: { color: '#ff6a00', fontSize: 18 },
  title: { fontSize: 25, lineHeight: 34, color: '#555', marginTop: 8 },
  badge: { alignSelf: 'flex-start', backgroundColor: '#202a36', color: '#fff', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4, fontSize: 18, marginTop: 8 },
  bought: { fontSize: 22, fontWeight: '800', marginTop: 28 },
  imageStage: { height: 420, alignItems: 'center', justifyContent: 'center', marginTop: 18 },
  image: { width: '100%', height: '100%' },
  actions: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', gap: 28, marginTop: 18 },
  dots: { flex: 1, textAlign: 'center', fontSize: 18, letterSpacing: 3 },
  priceBlock: { flexDirection: 'row', alignItems: 'flex-start', marginTop: 28 },
  discount: { color: '#cc0c39', fontSize: 41, marginRight: 22, marginTop: 10 },
  currency: { fontSize: 24, marginTop: 14 },
  price: { fontSize: 78, color: '#111' },
  cents: { fontSize: 32, marginTop: 10 },
  old: { color: '#666', textDecorationLine: 'line-through', fontSize: 22, marginTop: 8 },
  couponRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 28, flexWrap: 'wrap' },
  couponButton: { borderWidth: 1, borderColor: '#8a8f91', borderRadius: 28, paddingHorizontal: 18, paddingVertical: 10, fontSize: 22 },
  couponValue: { backgroundColor: '#78d663', paddingHorizontal: 12, paddingVertical: 8, fontSize: 26 },
  couponText: { fontSize: 22, flexShrink: 1 },
  addButton: { backgroundColor: '#ffd814', borderRadius: 28, alignItems: 'center', justifyContent: 'center', minHeight: 56, marginTop: 32 },
  addText: { fontSize: 22 },
  cartButton: { backgroundColor: '#ffa41c', borderRadius: 28, alignItems: 'center', justifyContent: 'center', minHeight: 56, marginTop: 12, marginBottom: 40 },
  cartText: { fontSize: 22 }
});
