import NewPersonForm from "@/components/NewPersonForm";

function page() {
  return (
    <section className="flex justify-center items-center w-full min-h-screen">
      <div className="card max-w-lg w-full">
        <p className="upperTitle">Cadastro</p>
        <h1 className="title">Titulo</h1>
        <NewPersonForm />
      </div>
    </section>
  );
}

export default page;
