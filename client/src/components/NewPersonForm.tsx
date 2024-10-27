"use client";

import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

import { getFilteredCities, postPerson } from "@/services/PersonService";

import { personSchema, PersonFormData } from "@/schema/personSchema";
import { useGetStates } from "@/hooks/useFetchPerson";

function NewPersonForm() {
  const [cities, setCities] = useState<City[]>([]);
  const router = useRouter();

  const { states } = useGetStates();

  // Integrate react-hook-form with zod validation library
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<PersonFormData>({
    resolver: zodResolver(personSchema),
    defaultValues: {
      name: "",
      email: "",
      state: "",
      city: "",
    },
  });

  // Submit handler
  async function onSubmit(data: PersonFormData) {
    const dataToSend = {
      name: data.name,
      email: data.email,
      state: { id: data.state },
      city: { id: data.city },
    };

    const response = await postPerson(dataToSend);

    if (response.error?.type === "email") {
      setError("email", { message: "Este e-mail já está cadastrado" });
      return
    }

    const id = response.data.data.id;
    router.push(`/pessoa/${id}`);
  }

  async function handleCitySelection(e: ChangeEvent<HTMLSelectElement>) {
    const { data } = await getFilteredCities(e.target.value);
    setCities(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div className="relative">
        <input
          {...register("name")}
          placeholder="Seu nome"
          className={`bg-slate-700/10 px-3 py-2 mb-1 w-full rounded-sm outline-none ${errors.city?.message ? "border border-red-600/40" : ""}`}
        />
        {errors.name?.message && (
          <p className="flex items-center justify-center absolute top-full left-0.5 text-xs text-red-600">
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
          className={`bg-slate-700/10 px-3 py-2 mb-1 w-full rounded-sm outline-none ${errors.city?.message ? "border border-red-600/40" : ""}`}
        />
        {errors.email?.message && (
          <p className="flex absolute top-full left-0.5 text-xs text-red-600">
            <span>
              <ExclamationTriangleIcon className="w-3.5 h-3.5 mr-0.5 pt-0.5" />
            </span>
            {errors.email?.message}
          </p>
        )}
      </div>
      <div className="grid sm:grid-cols-6 gap-5 sm:gap-2">
        <div className="relative sm:col-span-2">
          <select
            defaultValue=""
            {...register("state")}
            onChange={handleCitySelection}
            className={`w-full bg-slate-700/10 px-3 py-2 mb-1 rounded-sm outline-none ${errors.city?.message ? "border border-red-600/40" : ""}`}
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
            <p className="flex absolute top-full left-0.5 text-xs text-red-600">
              <span>
                <ExclamationTriangleIcon className="w-3.5 h-3.5 mr-0.5 pt-0.5" />
              </span>
              {errors.state?.message}
            </p>
          )}
        </div>
        <div className="relative sm:col-span-4">
          <select
            defaultValue=""
            {...register("city")}
            className={`w-full bg-slate-700/10 px-3 py-2 mb-1 rounded-sm outline-none ${errors.city?.message ? "border border-red-600/40" : ""}`}
            disabled={!cities[0]}
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
            <p className="flex absolute top-full left-0.5 text-xs text-red-600">
              <span>
                <ExclamationTriangleIcon className="w-3.5 h-3.5 mr-0.5 pt-0.5" />
              </span>
              {errors.city?.message}
            </p>
          )}
        </div>
      </div>
      <input
        type="submit"
        value="Cadastrar"
        className="rounded-full bg-secondary text-secondary-foreground py-2 w-full mt-1"
      />
    </form>
  );
}

export default NewPersonForm;
