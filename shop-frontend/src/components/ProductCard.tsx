// ProductCard.tsx
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer overflow-hidden">
      <div className="aspect-w-1 aspect-h-1">
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-indigo-600 font-bold text-xl">
          {product.price.toLocaleString()}원
        </p>
        <div className="mt-4 flex space-x-2">
          <button className="w-1/2 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors">
            옵션 보기
          </button>
          <button className="w-1/2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
            장바구니
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;