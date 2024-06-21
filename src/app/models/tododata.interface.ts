export interface Todo {
  id: number;
  value: string;
}

export interface TodoValues {
  data: {
    count: number;
    data: Todo[];
  };
  error: string;
  status: string;
}
