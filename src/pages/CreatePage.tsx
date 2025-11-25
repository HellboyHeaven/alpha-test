import { useNavigate } from "react-router-dom";
import CreateProductForm from "../components/CreateProductForm";

export default function CreatePage() {
    const nav = useNavigate()
    return (
        <div className="w-screen h-screen bg-white flex items-center">
            <CreateProductForm onBack={() => nav('/')}/>
        </div>
    )
}