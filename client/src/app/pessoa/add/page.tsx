import NewPersonForm from "@/components/NewPersonForm";

function page() {
  return (
    <section className="flex justify-center items-center w-full min-h-screen">
      <div className="card max-w-md w-full mx-2">
        <p className="upperTitle">Cadastro</p>
        <h1 className="title">Adicionar pessoa</h1>
        <NewPersonForm />
      </div>
    </section>
  );
}

export default page;
