interface Person {
  id?: number | string;
  name: string;
  email: string;
  state: State;
  city: City;
  publishedAt?: string;
}

interface State {
  id: string;
  state?: string;
}

interface City {
  id: string;
  city?: string;
}
