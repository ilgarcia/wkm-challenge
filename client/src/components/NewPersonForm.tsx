"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// This will be type-safe and validated.
const personFormSchema = z.object({
  nome: z.string().min(1).max(250),
  email: z.string().min(1).email(),
  estado: z.string().min(1),
  cidade: z.string().min(1),
});

function NewPersonForm() {
  const router = useRouter();

  // Integrate react-hook-form with zod validation library
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof personFormSchema>>({
    resolver: zodResolver(personFormSchema),
    defaultValues: {
      nome: "",
      email: "",
      estado: "",
      cidade: "",
    },
  });

  // Submit handler
  function onSubmit(data: z.infer<typeof personFormSchema>) {
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-5">
      <input
        {...register("nome")}
        placeholder="Seu nome"
        className="bg-slate-700/10 px-3 py-2"
      />
      {errors.nome?.message && <p>{errors.nome?.message}</p>}
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
            {...register("estado")}
            className="w-full bg-slate-700/10 px-3 py-2 required:invalid:text-red-800"
          >
            <option value="" disabled hidden>
              Estado
            </option>
            <option value="SP">SP</option>
            <option value="RJ">RJ</option>
          </select>
          {errors.estado?.message && <p>{errors.estado?.message}</p>}
        </div>
        <div className="col-span-4">
          <select
            defaultValue=""
            {...register("cidade")}
            className="w-full bg-slate-700/10 px-3 py-2"
          >
            <option value="" disabled hidden>
              Cidade
            </option>
            <option value="SP">SP</option>
            <option value="RJ">RJ</option>
          </select>
          {errors.cidade?.message && <p>{errors.cidade?.message}</p>}
        </div>
      </div>
      <input type="submit" />
    </form>
  );
}

export default NewPersonForm;
