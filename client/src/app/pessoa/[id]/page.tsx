import PersonCard from "@/components/PersonCard";

type Props = {
  params: {
    id: string;
  };
};

function page({ params: { id } }: Props) {
  
  return (
    <section>
      <p className="upperTitle">Cadastro</p>
      <h1 className="title">Titulo</h1>
      <PersonCard id={id} />
    </section>
  );
}

export default page;