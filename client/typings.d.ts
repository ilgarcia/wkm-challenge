interface State {
  id: string;
  state?: string;
}

interface City {
  id: string;
  city?: string;
  state?: State;
}

interface Person {
  id?: number | string;
  name: string;
  email: string;
  city: City;
  publishedAt?: string;
}


