import PersonCard from "@/components/PersonCard";

type Props = {
  params: {
    id: string;
  };
};

function page({ params: { id } }: Props) {
  return (
    <section className="flex justify-center items-center w-full min-h-screen">
      <PersonCard id={id} />
    </section>
  );
}

export default page;
