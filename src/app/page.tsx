
import { Projector } from "lucide-react";
import Dashboard from "./dashboard/page";


export default function Home() {
  return (
    <>
      {/* <ProtectedRoute adminOnly={false}> */}

        <Dashboard />
      {/* </ProtectedRoute> */}

    </>
  );
}
