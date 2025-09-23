"use client";

type Product = { id: number; name: string; price: string; stock: number };

const products: Product[] = [
  { id: 1, name: "Laptop", price: "$1200", stock: 10 },
  { id: 2, name: "Shirt", price: "$30", stock: 50 },
  { id: 3, name: "Desk", price: "$200", stock: 15 },
];

export default function ProductsTable() {
  return (
    <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-xl shadow p-4">
      <table className="min-w-full text-left text-gray-900 dark:text-gray-100">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Stock</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border-t border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">{p.name}</td>
              <td className="px-4 py-2">{p.price}</td>
              <td className="px-4 py-2">{p.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
