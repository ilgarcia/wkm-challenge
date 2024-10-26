"use client";

import { getPersonById, getStates } from "@/services/PersonService";
import { useEffect, useState } from "react";

export const useGetStates = () => {
  const [states, setStates] = useState<State[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data } = await getStates();
      setStates(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  return { states, loading };
};

export const useFetchById = (id: string) => {
  const [person, setPerson] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data } = await getPersonById(id);
      setPerson(data[0]);
      setLoading(false);
    };

    fetchData();
  }, []);

  return { person, loading };
};
