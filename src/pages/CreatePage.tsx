import { useNavigate } from "react-router-dom";
import CreateProductForm from "../components/CreateProductForm";
import HomeBackButton from "../components/HomeBackButton";

export default function CreatePage() {
  const nav = useNavigate();
  return (
    <div className="w-screen h-screen p-10 bg-white grid flex items-center flex-col gap-1">
      <CreateProductForm onBack={() => nav("/")} />
      <HomeBackButton />
    </div>
  );
}
