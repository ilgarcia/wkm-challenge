"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { getFilteredCities, getStates, postPerson } from "@/services/PersonApiService";
import { ChangeEvent, useEffect, useState } from "react";

// This will be type-safe and validated.
const personFormSchema = z.object({
  name: z.string().min(1).max(250),
  email: z.string().min(1).email(),
  state: z.string().min(1),
  city: z.string().min(1),
});

function NewPersonForm() {
  const [states, setStates] = useState<State[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  // const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getStates();
      setStates(data);
    };

    fetchData();
  }, []);

  // Integrate react-hook-form with zod validation library
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof personFormSchema>>({
    resolver: zodResolver(personFormSchema),
    defaultValues: {
      name: "",
      email: "",
      state: "",
      city: "",
    },
  });

  // Submit handler
  function onSubmit(data: z.infer<typeof personFormSchema>) {
    postPerson(data)
  }

  async function handleCitySelection(e: ChangeEvent<HTMLSelectElement>) {
    const {data} = await getFilteredCities(e.target.value)
    setCities(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-5">
      <input
        {...register("name")}
        placeholder="Seu nome"
        className="bg-slate-700/10 px-3 py-2"
      />
      {errors.name?.message && <p>{errors.name?.message}</p>}
      <input
        {...register("email")}
        placeholder="email@gmail.com"
        className="bg-slate-700/10 px-3 py-2"
      />
      {errors.email?.message && <p>{errors.email?.message}</p>}
      <div className="grid grid-cols-6 space-x-4">
        <div className="col-span-2">
          <select
            defaultValue=""
            {...register("state")}
            onChange={handleCitySelection}
            className="w-full bg-slate-700/10 px-3 py-2 required:invalid:text-red-800"
          >
            <option value="" disabled hidden>
              Estado
            </option>
            {states.map((state) => (
              <option key={state.id} value={state.id}>
                {state.state}
              </option>
            ))}
          </select>
          {errors.state?.message && <p>{errors.state?.message}</p>}
        </div>
        <div className="col-span-4">
          <select
            defaultValue=""
            {...register("city")}
            className="w-full bg-slate-700/10 px-3 py-2"
          >
            <option value="" disabled hidden>
              Cidade
            </option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.city}
              </option>
            ))}
          </select>
          {errors.city?.message && <p>{errors.city?.message}</p>}
        </div>
      </div>
      <input type="submit" />
    </form>
  );
}

export default NewPersonForm;
