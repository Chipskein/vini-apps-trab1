import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import AmazonHeader from '../components/AmazonHeader';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';

export default function CartScreen() {
  const { items, totalItems, subtotal, increment, decrement, remove, toggleSelected } = useCart();
  const total = formatPrice(subtotal);
  return (
    <View style={styles.container}>
      <AmazonHeader />
      <ScrollView style={styles.body} contentContainerStyle={styles.content}>
        <Text style={styles.tabs}>Carrinho   Listas   Comprar novamente</Text>
        <View style={styles.summary}>
          <Text style={styles.subtotal}>Subtotal R$<Text style={styles.total}>{total.reais}</Text><Text style={styles.cents}>{total.centavos}</Text></Text>
          <Text style={styles.free}>✓ Entrega GRÁTIS em pedidos qualificados</Text>
          <Text style={styles.link}>Ver detalhes</Text>
        </View>
        <Text style={styles.linkBig}>Desmarcar todos os itens</Text>
        {items.map(({ product, quantity, selected }) => (
          <View key={product.id} style={styles.item}>
            <Pressable onPress={() => toggleSelected(product.id)} style={[styles.checkbox, selected && styles.checked]}>{selected && <Ionicons name="checkmark" size={30} color="#fff" />}</Pressable>
            <View style={[styles.productImage, { backgroundColor: product.color }]}>
              <Image source={product.image} style={{ width: '100%', height: '100%' }} resizeMode="contain" />
            </View>
            <View style={styles.info}>
              <Text style={styles.title} numberOfLines={3}>{product.title}</Text>
              {product.badge && <Text style={styles.badge}>{product.badge}</Text>}
              <Text style={styles.price}>R${formatPrice(product.price).reais},{formatPrice(product.price).centavos}</Text>
              <Text style={styles.delivery}>{product.delivery}</Text>
              <Text style={styles.stock}>Em estoque</Text>
            </View>
            <View style={styles.fullRow}>
              <View style={styles.quantity}>
                <Pressable onPress={() => quantity === 1 ? remove(product.id) : decrement(product.id)}><Ionicons name={quantity === 1 ? 'trash-outline' : 'remove'} size={28} /></Pressable>
                <Text style={styles.qtyText}>{quantity}</Text>
                <Pressable onPress={() => increment(product.id)}><Ionicons name="add" size={30} /></Pressable>
              </View>
              <Pressable style={styles.outline} onPress={() => remove(product.id)}><Text style={styles.outlineText}>Excluir</Text></Pressable>
              <Pressable style={styles.outline}><Text style={styles.outlineText}>Salvar para mais tarde</Text></Pressable>
              <Pressable style={styles.outline}><Text style={styles.outlineText}>Compartilhar</Text></Pressable>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.footer}><Pressable style={styles.checkout}><Text style={styles.checkoutText}>Fechar pedido ({totalItems} item{totalItems === 1 ? '' : 's'})</Text></Pressable></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  body: { flex: 1 },
  content: { paddingBottom: 112 },
  tabs: { fontSize: 24, padding: 18, borderBottomWidth: 1, borderBottomColor: '#e5e7eb' },
  summary: { padding: 18, borderBottomWidth: 1, borderBottomColor: '#d5d9d9' },
  subtotal: { fontSize: 27 },
  total: { fontSize: 43, fontWeight: '900' },
  cents: { fontSize: 22, fontWeight: '900' },
  free: { color: '#11813a', fontSize: 24, marginTop: 8 },
  link: { color: '#2162a1', fontSize: 22, marginTop: 8 },
  linkBig: { color: '#2162a1', fontSize: 25, padding: 18 },
  item: { margin: 10, padding: 12, backgroundColor: '#f7f8f8', borderRadius: 8, flexDirection: 'row', flexWrap: 'wrap' },
  checkbox: { width: 34, height: 34, borderRadius: 6, borderWidth: 2, borderColor: '#2f6fab', alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  checked: { backgroundColor: '#2f6fab' },
  productImage: { width: 140, height: 190, alignItems: 'center', justifyContent: 'center' },
  emoji: { fontSize: 72 },
  info: { flex: 1, paddingLeft: 12 },
  title: { fontSize: 22, lineHeight: 29 },
  badge: { alignSelf: 'flex-start', backgroundColor: '#cc4b00', color: '#fff', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4, fontSize: 17, marginTop: 4 },
  price: { fontSize: 34, fontWeight: '900', marginTop: 8 },
  delivery: { fontSize: 19, fontWeight: '700', marginTop: 4 },
  stock: { color: '#11813a', fontSize: 20, marginTop: 6 },
  fullRow: { width: '100%', flexDirection: 'row', gap: 10, flexWrap: 'wrap', alignItems: 'center', marginTop: 16 },
  quantity: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', borderWidth: 4, borderColor: '#ffd814', borderRadius: 28, height: 50, minWidth: 160, backgroundColor: '#fff' },
  qtyText: { fontSize: 24, fontWeight: '700' },
  outline: { borderWidth: 1, borderColor: '#8a8f91', borderRadius: 24, paddingHorizontal: 16, paddingVertical: 9, backgroundColor: '#fff' },
  outlineText: { fontSize: 18 },
  footer: { position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: '#fff', padding: 18, borderTopWidth: 1, borderTopColor: '#d5d9d9' },
  checkout: { backgroundColor: '#ffd814', borderRadius: 32, minHeight: 64, alignItems: 'center', justifyContent: 'center' },
  checkoutText: { fontSize: 24 }
});
