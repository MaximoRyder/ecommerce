
import ProductCard from "../components/common/ProductCard";

const products = [
  {
    id: 1,
    name: "Laptop Pro X",
    category: "Electrónica",
    price: 1200,
    image: "/placeholder-images/laptop.jpg",
  },
  {
    id: 2,
    name: "Smartphone Z",
    category: "Electrónica",
    price: 850,
    image: "/placeholder-images/smartphone.jpg",
  },
  {
    id: 3,
    name: "Ratón Inalámbrico",
    category: "Accesorios",
    price: 49.99,
    image: "/placeholder-images/mouse.jpg",
  },
  {
    id: 4,
    name: "Teclado Mecánico RGB",
    category: "Accesorios",
    price: 120,
    image: "/placeholder-images/keyboard.jpg",
  },
  {
    id: 5,
    name: "Clean Code Book",
    category: "Libros",
    price: 30,
    image: "/placeholder-images/clean-code-book.jpg",
  },
  {
    id: 6,
    name: "React Book",
    category: "Libros",
    price: 40,
    image: "/placeholder-images/react-book.jpg",
  },
];

const Home = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Todos los Productos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
