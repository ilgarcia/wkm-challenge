type Props = {
  params: {
    id: string;
  };
};

const dataMockUp: Person = {
  id: 1,
  nome: "teste",
  email: "teste@teste.com",
  estado: "SP",
  cidade: "Osasco",
};

function page({ params: { id } }: Props) {
  return (
    <section>
      <div className="card m-4">
        <div>{dataMockUp.id}</div>
        <div>{dataMockUp.nome}</div>
        <div>{dataMockUp.email}</div>
        <div>{dataMockUp.estado}</div>
        <div>{dataMockUp.cidade}</div>
      </div>
    </section>
  );
}

export default page;
