import { ImageSourcePropType } from "react-native";

export type Product = {
  id: string;
  title: string;
  brand: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: string;
  bought: string;
  badge?: string;
  prime?: boolean;
  delivery: string;
  image: ImageSourcePropType;
  color: string;
};

export const products: Product[] = [
  {
    id: 'panela-10p',
    title: 'Jogo de Panelas 10 Peças Branco Antiaderente com Tampa de Vidro',
    brand: "D'Italia",
    price: 204.2,
    oldPrice: 299.99,
    rating: 4.3,
    reviews: '1,2 mil',
    bought: 'Mais de 1 mil compras no mês passado',
    badge: 'Escolha da Amazon',
    prime: true,
    delivery: 'Entrega GRÁTIS: qui., 30 de abr.',
    image: require('../../assets/images/frigideira.webp'),
    color: '#ead7c5'
  },
  {
    id: 'panela-5p',
    title: 'Brinox - Jogo de Panelas 5 Peças Ceramic Life Easy - Cinza',
    brand: 'Brinox',
    price: 299.99,
    oldPrice: 587.69,
    rating: 4.6,
    reviews: '1,2 mil',
    bought: 'Mais de 700 compras no mês passado',
    badge: 'Escolha da Amazon',
    prime: true,
    delivery: 'Entrega GRÁTIS: qui., 30 de abr.',
    image: require('../../assets/images/panelas.webp'),
    color: '#ececec'
  },
  {
    id: 'fone-philips',
    title: 'PHILIPS, Fone de Ouvido com Microfone, TAUE101B Preto',
    brand: 'Philips',
    price: 25.95,
    rating: 4.5,
    reviews: '8,4 mil',
    bought: 'Mais de 5 mil compras no mês passado',
    badge: '1º mais vendido',
    prime: false,
    delivery: 'Entrega GRÁTIS: qui., 30 de abr.',
    image: require('../../assets/images/fone.webp'),
    color: '#f4f6f8'
  }
];

export const formatPrice = (value: number) => {
  const [reais, centavos] = value.toFixed(2).replace('.', ',').split(',');
  return { reais, centavos };
};
