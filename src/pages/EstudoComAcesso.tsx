import Estudo from "./Estudo";
import { useCourseAccess } from "./EstudoAccess";

export default function EstudoComAcesso() {
  useCourseAccess();
  return <Estudo />;
}
