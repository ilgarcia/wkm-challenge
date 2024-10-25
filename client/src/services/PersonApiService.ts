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
    state: { populate: "*" },
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
    populate: "*",
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

export async function postPerson(data: Person) {
  const baseURL = getStrapiURL();
  const path = "/persons";

  const query = {
    populate: "*",
  };

  const url = new URL("/api" + path, baseURL);
  url.search = qs.stringify(query);

  const { name, email, state, city } = data;

  const dataToSend = {
    data: {
      name,
      email,
      state: { id: state },
      city: { id: city },
    },
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    });
    const personData = await response.json();

    return personData;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
