"use client";

import { getPersonById } from "@/services/PersonApiService";
import { useEffect, useState } from "react";

type Props = {
  params: {
    id: string;
  };
};

function page({ params: { id } }: Props) {
  const [person, setPerson] = useState<Person | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getPersonById(id);
      setPerson(data[0])
    };

    fetchData();
  }, []);

  return (
    <section>
      {person ? (
        <div className="card m-4">
          <div>{person.id}</div>
          <div>{person.name}</div>
          <div>{person.email}</div>
          <div>{person.state.state}</div>
          <div>{person.city.city}</div>
        </div>
      ) : (
        ""
      )}
    </section>
  );
}

export default page;
