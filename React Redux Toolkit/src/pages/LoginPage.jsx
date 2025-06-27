import Login from "../components/Login";
import { useFetchDataQuery } from "../store/dataApiSlice";
export default function LoginPage() {
  useRef;
  const { data, isLoading, isError, error } = useFetchDataQuery();

  return <Login />;
}
