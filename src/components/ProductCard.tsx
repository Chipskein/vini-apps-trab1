import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, StyleSheet, Text, View, Image } from 'react-native';
import { RootStackParamList } from '../../App';
import { useCart } from '../context/CartContext';
import { Product, formatPrice } from '../data/products';

type Navigation = NativeStackNavigationProp<RootStackParamList>;

export default function ProductCard({ product }: { product: Product }) {
  const navigation = useNavigation<Navigation>();
  const { addToCart } = useCart();
  const price = formatPrice(product.price);

  return (
    <Pressable style={styles.card} onPress={() => navigation.navigate('ProductDetail', { product })}>
      <View style={styles.imageColumn}>
        {product.badge && <Text style={[styles.badge, product.badge.includes('1º') && styles.orangeBadge]}>{product.badge}</Text>}
        <View style={[styles.imageBox, { backgroundColor: product.color }]}>
          <Image source={product.image} style={styles.image} resizeMode="contain" />
        </View>
        <View style={styles.iconRow}><View style={styles.circle}><Ionicons name="albums-outline" size={28} /></View><View style={styles.circle}><Ionicons name="heart-outline" size={34} /></View></View>
      </View>
      <View style={styles.info}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.rating}>{product.rating.toFixed(1).replace('.', ',')} ★★★★★ <Text style={styles.muted}>({product.reviews})</Text></Text>
        <Text style={styles.muted}>{product.bought}</Text>
        <View style={styles.priceRow}><Text style={styles.currency}>R$</Text><Text style={styles.price}>{price.reais}</Text><Text style={styles.cents}>{price.centavos}</Text>{product.oldPrice && <Text style={styles.old}> De: R${product.oldPrice.toFixed(2).replace('.', ',')}</Text>}</View>
        <Text style={styles.installments}>em até 12x com juros</Text>
        {product.prime && <Text style={styles.prime}><Text style={styles.primeMark}>✓prime</Text> Entrega Desbloqueada</Text>}
        <Text style={styles.delivery}>{product.delivery}</Text>
        <Pressable style={styles.button} onPress={() => addToCart(product)}><Text style={styles.buttonText}>Adicionar ao carrinho</Text></Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', marginHorizontal: 10, marginVertical: 8, backgroundColor: '#fff', borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 8, overflow: 'hidden' },
  imageColumn: { width: '41%', backgroundColor: '#f7f7f7', padding: 8, justifyContent: 'space-between' },
  badge: { alignSelf: 'flex-start', backgroundColor: '#202a36', color: '#fff', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4, fontSize: 16 },
  orangeBadge: { backgroundColor: '#cc4b00' },
  imageBox: { height: 210, alignItems: 'center', justifyContent: 'center' },
  image: { width: '100%', height: '100%' },
  iconRow: { flexDirection: 'row', justifyContent: 'space-between' },
  circle: { width: 52, height: 52, borderRadius: 26, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', elevation: 3 },
  info: { flex: 1, padding: 12 },
  title: { fontSize: 23, lineHeight: 31, color: '#111' },
  rating: { color: '#ff6a00', fontSize: 18, marginTop: 8 },
  muted: { color: '#666', fontSize: 18, lineHeight: 25 },
  priceRow: { flexDirection: 'row', alignItems: 'flex-start', marginTop: 10, flexWrap: 'wrap' },
  currency: { fontSize: 18, marginTop: 8 },
  price: { fontSize: 42 },
  cents: { fontSize: 22, marginTop: 4 },
  old: { color: '#666', textDecorationLine: 'line-through', fontSize: 18, marginTop: 12, marginLeft: 8 },
  installments: { color: '#666', fontSize: 18 },
  prime: { fontSize: 19, marginTop: 10 },
  primeMark: { color: '#1685d9', fontWeight: '900' },
  delivery: { fontSize: 18, fontWeight: '700', marginTop: 6 },
  button: { marginTop: 14, backgroundColor: '#ffd814', borderRadius: 28, minHeight: 52, alignItems: 'center', justifyContent: 'center' },
  buttonText: { fontSize: 21, color: '#111' }
});
