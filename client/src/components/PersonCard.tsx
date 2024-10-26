"use client";

import { useFetchById } from "@/hooks/useFetchPerson";
import { formatDate } from "@/utils/strapi-api-helpers";
import Link from "next/link";
import Loading from "./Loading";

function PersonCard({ id }: { id: string }) {
  const { person, loading } = useFetchById(id);

  return (
    <>
      {loading ? (
        <Loading />
      ) : person[0] ? (
        <div className="card max-w-md w-full mx-2">
          <p className="upperTitle">Cadastro</p>
          <h1 className="title">Pessoa cadastrada com sucesso</h1>
          <div className="grid sm:grid-cols-2 max-w-sm mx-auto gap-y-2 sm:gap-y-4 mb-6">
            <div>
              <p className="font-bold">Nome:</p>
              <p>{person[0].name}</p>
            </div>
            <div>
              <p className="font-bold">Email:</p>
              <p>{person[0].email}</p>
            </div>
            <div>
              <p className="font-bold">Estado:</p>
              <p>{person[0].state.state}</p>
            </div>
            <div>
              <p className="font-bold">Cidade:</p>
              <p>{person[0].city.city}</p>
            </div>
          </div>
          <div className="text-slate-400 text-sm text-right">
            Data cadastro:{" "}
            {person[0].publishedAt ? formatDate(person[0].publishedAt) : ""}
          </div>
        </div>
      ) : (
        <div className="border border-red-600 bg-red-600/10 mx-4 px-6 py-4 rounded-2xl text-red-600">
          Pessoa não cadastrada, para adicionar a pessoa acesse a seguinte rota
          &quot;/pessoa/add&quot; (
          {
            <Link href={"/pessoa/add"} className="font-bold">
              Link
            </Link>
          }
          )
        </div>
      )}
    </>
  );
}

export default PersonCard;
