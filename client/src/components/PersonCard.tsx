"use client"

import { useFetchById } from "@/hooks/useFetchPerson";

function PersonCard({id}: {id: string}) {

  const { person, loading } = useFetchById(id);

  return (
    <div>data</div>
  )
}

export default PersonCard


