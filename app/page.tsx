import Image from "next/image";
import Link from "next/link";
import ProductCard from "./components/ProductCard";

export default function Home() {
  return (
    <>
      <main><p>Hello World!</p></main>
      <Link href="/users">Link to users</Link>
      <br />
      <Link href="/product">Link to products</Link>
      <ProductCard />
      
    </>
  );
}
