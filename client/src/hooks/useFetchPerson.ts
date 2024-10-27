"use client";

import { getPersonById, getStates } from "@/services/PersonService";
import { useEffect, useState } from "react";

export const useGetStates = () => {
  const [states, setStates] = useState<State[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getStates();
      setStates(data);
    };

    fetchData();
  }, []);

  return { states };
};

export const useFetchById = (id: string) => {
  const [person, setPerson] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data } = await getPersonById(id);
      setPerson(data);
      setLoading(false);
    };

    fetchData();
  }, [id]);

  return { person, loading };
};
