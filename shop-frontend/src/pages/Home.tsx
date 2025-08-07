
import Header from '../components/Header';
import Banner from '../components/Banner';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';

// Mock product data
const mockProducts = [
  {
    id: 1,
    name: '[PRE-ORDER] 스트리머 A 티셔츠',
    price: 29000,
    image: 'https://via.placeholder.com/300x300.png?text=Product+A',
  },
  {
    id: 2,
    name: '스트리머 B 머그컵',
    price: 15000,
    image: 'https://via.placeholder.com/300x300.png?text=Product+B',
  },
  {
    id: 3,
    name: '스트리머 C 키링',
    price: 12000,
    image: 'https://via.placeholder.com/300x300.png?text=Product+C',
  },
  {
    id: 4,
    name: '[SALE] 스트리머 D 후드티',
    price: 45000,
    image: 'https://via.placeholder.com/300x300.png?text=Product+D',
  },
   {
    id: 5,
    name: '[PRE-ORDER] 스트리머 E 티셔츠',
    price: 29000,
    image: 'https://via.placeholder.com/300x300.png?text=Product+E',
  },
  {
    id: 6,
    name: '스트리머 F 머그컵',
    price: 15000,
    image: 'https://via.placeholder.com/300x300.png?text=Product+F',
  },
  {
    id: 7,
    name: '스트리머 G 키링',
    price: 12000,
    image: 'https://via.placeholder.com/300x300.png?text=Product+G',
  },
  {
    id: 8,
    name: '[SALE] 스트리머 H 후드티',
    price: 45000,
    image: 'https://via.placeholder.com/300x300.png?text=Product+H',
  },
];

const Home = () => {
  return (
    <div className="bg-gray-50">
      <Header />
      <main className="container mx-auto px-4">
        <Banner />
        
        <section>
          <h2 className="text-3xl font-bold text-center my-12">NEW ARRIVALS</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {mockProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default Home;
