import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Globe } from 'lucide-react';

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 border-b">
      <div className="flex items-center gap-8">
        <Link to="/" className="text-2xl font-bold text-gray-800">
          eStoreFront
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/electronics" className="text-gray-600 hover:text-gray-900">
            Electrónica
          </Link>
          <Link to="/accessories" className="text-gray-600 hover:text-gray-900">
            Accesorios
          </Link>
          <Link to="/books" className="text-gray-600 hover:text-gray-900">
            Libros
          </Link>
        </nav>
      </div>
      <div className="flex items-center gap-6">
        <Button variant="ghost" size="icon" className="relative">
          <Globe className="h-5 w-5 text-gray-600" />
        </Button>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5 text-gray-600" />
        </Button>
        <Link to="/login">
          <Button>Iniciar Sesión</Button>
        </Link>
      </div>
    </header>
  );
}
