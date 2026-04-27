import dotenv from "dotenv"
dotenv.config()

export default function getUrl() {
    return import.meta.env.VITE_API_URL;
}