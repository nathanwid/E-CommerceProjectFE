import { auth } from "@/auth";
import ProductList from "@/components/products/ProductList";
import { getProducts } from "@/lib/api";

export default async function HomePage() {
  const session = await auth();

  // Ambil 6 produk pertama saja tanpa filter
  const { products } = await getProducts({
    pageNumber: 1,
    pageSize: 8,
    orderBy: "productName",
    orderState: "asc",
  });

  return (
    <div className="max-w-screen-xl mx-auto py-6 p-4">
      <h1 className="text-2xl mb-8">
        Welcome back, <span className="font-bold">{session?.user?.name}</span>!
      </h1>
      <div className="carousel rounded-box mb-8">
        <div className="carousel-item">
          <img
            src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
            alt="Burger"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp"
            alt="Burger"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp"
            alt="Burger"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp"
            alt="Burger"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.webp"
            alt="Burger"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.webp"
            alt="Burger"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.webp"
            alt="Burger"
          />
        </div>
      </div>
      <h3 className="text-2xl font-semibold mb-4">Featured Products</h3>
      {products.length > 0 ? (
        <div className="mb-8">
          <ProductList products={products} />
        </div>
      ) : (
        <p className="text-gray-500 text-center">No products found.</p>
      )}
    </div>
  );
}
