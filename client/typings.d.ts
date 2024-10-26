interface Person {
  id?: number;
  name: string;
  email: string;
  state: State;
  city: City;
}

interface State {
  id: string;
  state?: string;
}

interface City {
  id: string;
  city?: string;
}
