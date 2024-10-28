import qs from "qs";

import { getStrapiURL } from "@/utils/strapi-api-helpers";

export async function getStates() {
  const baseURL = getStrapiURL();
  const path = "/states";

  const url = new URL("/api" + path, baseURL);
  url.search = qs.stringify({ sort: ["state:asc"] });

  try {
    const response = await fetch(url);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

export async function getFilteredCities(stateId: string) {
  const baseURL = getStrapiURL();
  const path = "/cities";

  const query = {
    sort: ["city:asc"],
    filters: { state: { id: stateId } },
  };

  const url = new URL("/api" + path, baseURL);
  url.search = qs.stringify(query);

  try {
    const response = await fetch(url);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

export async function getPersonById(id: string) {
  const baseURL = getStrapiURL();
  const path = "/persons";

  const query = {
    populate: {
      city: {
        populate: ["state"],
      },
    },
    filters: { id: id },
  };

  const url = new URL("/api" + path, baseURL);
  url.search = qs.stringify(query);

  try {
    const response = await fetch(url);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

export async function postPerson(dataToSend: Person) {
  const baseURL = getStrapiURL();
  const path = "/persons";

  console.log({ data: dataToSend });

  const query = {
    populate: "*",
  };

  const url = new URL("/api" + path, baseURL);
  url.search = qs.stringify(query);

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: dataToSend }),
    });

    const data = await res.json();
    console.log(data);

    if (data.error) {
      const emailError = [
        ...data.error.details.errors.map(
          (error: { name: string; path: string[] }) => {
            if (error.name === "ValidationError") return error.path;
          }
        ),
      ]
        .flat()
        .some((e: string) => e === "email");
      return {
        error: { type: "email", message: "Este e-mail já está cadastrado" },
        data: emailError,
      };
    }

    console.log("Valor incluído com sucesso");
    return { data };
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
