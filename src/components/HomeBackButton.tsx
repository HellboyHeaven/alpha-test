import { useNavigate } from "react-router-dom"

export default function HomeBackButton() {
    const nav = useNavigate();

    return <button onClick={() => nav('/')} className="text-blue-200 hover:underline mx-auto">
          Go home back
        </button>

}