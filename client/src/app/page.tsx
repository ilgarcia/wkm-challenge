import Link from "next/link";

export default function Home() {
  return (
    <section className="max-w-6xl mx-auto my-6">
      <div className="border border-red-600 bg-red-600/10 mx-4 px-6 py-4 rounded-2xl text-red-600">
        Para testar a aplicação, acesse a seguinte rota &quot;/pessoa/add&quot;
        (
        {
          <Link href={"/pessoa/add"} className="font-bold">
            Link
          </Link>
        }
        )
      </div>
    </section>
  );
}
