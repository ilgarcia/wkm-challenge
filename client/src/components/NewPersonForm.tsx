"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  getFilteredCities,
  getStates,
  postPerson,
} from "@/services/PersonApiService";
import { ChangeEvent, useEffect, useState } from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

// This will be type-safe and validated.
const personFormSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Digite o nome",
    })
    .max(250, {
      message: "O limite é de 250 caracteres para o nome",
    }),
  email: z
    .string()
    .min(1, {
      message: "Digite um email",
    })
    .email({ message: "Email invalido" }), 
  state: z.string().min(1, {
    message: "Escolha um estado",
  }),
  city: z.string().min(1, {
    message: "Escolha uma cidade",
  }),
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
    setError,
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
  async function onSubmit(data: z.infer<typeof personFormSchema>) {
    const response = await postPerson(data);

    if (response.status === "error" && response.error === "email") setError('email', { message: 'Este e-mail já está cadastrado' })
  }

  async function handleCitySelection(e: ChangeEvent<HTMLSelectElement>) {
    const { data } = await getFilteredCities(e.target.value);
    setCities(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-6">
      <div className="relative">
        <input
          {...register("name")}
          placeholder="Seu nome"
          className="bg-slate-700/10 px-3 py-2 mb-1 w-full"
        />
        {errors.name?.message && (
          <p className="flex items-center justify-center absolute top-full left-1 text-xs text-red-600">
            <span>
              <ExclamationTriangleIcon className="w-3.5 h-3.5 mr-0.5 pt-0.5" />
            </span>
            {errors.name?.message}
          </p>
        )}
      </div>
      <div className="relative">
        <input
          {...register("email")}
          placeholder="email@gmail.com"
          className="bg-slate-700/10 px-3 py-2 mb-1 w-full"
        />
        {errors.email?.message && (
          <p className="flex absolute top-full left-1 text-xs text-red-600">
            <span>
              <ExclamationTriangleIcon className="w-3.5 h-3.5 mr-0.5 pt-0.5" />
            </span>
            {errors.email?.message}
          </p>
        )}
      </div>
      <div className="grid grid-cols-6 space-x-4">
        <div className="relative col-span-2">
          <select
            defaultValue=""
            {...register("state")}
            onChange={handleCitySelection}
            className="w-full bg-slate-700/10 px-3 py-2 mb-1 required:invalid:text-red-800"
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
          {errors.state?.message && (
            <p className="flex absolute top-full left-1 text-xs text-red-600">
              <span>
                <ExclamationTriangleIcon className="w-3.5 h-3.5 mr-0.5 pt-0.5" />
              </span>
              {errors.state?.message}
            </p>
          )}
        </div>
        <div className="relative col-span-4">
          <select
            defaultValue=""
            {...register("city")}
            className="w-full bg-slate-700/10 px-3 py-2 mb-1"
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
          {errors.city?.message && (
            <p className="flex absolute top-full left-1 text-xs text-red-600">
              <span>
                <ExclamationTriangleIcon className="w-3.5 h-3.5 mr-0.5 pt-0.5" />
              </span>
              {errors.city?.message}
            </p>
          )}
        </div>
      </div>
      <input type="submit" />
    </form>
  );
}

export default NewPersonForm;
function setError(arg0: string, arg1: { message: string; }) {
  throw new Error("Function not implemented.");
}

