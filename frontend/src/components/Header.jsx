import Notas from "./Notas";
import { MdAdd } from "react-icons/md";
import { postNotes } from "../api/connection";
import { useState } from "react";

function Header() {

    const [note, setNote] = useState()

    const handle = async () => {
        const currentDate = new Date();

        const options = {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            hour12: false
        };

        const formattedDate = currentDate.toLocaleString("en-US", options);

        const note = {
            titulo: "",
            descripcion: "",
            fecha: formattedDate
        };

        try {
            const res = await postNotes(note);
            setNote(res)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="w-full h-screen text-center ">
            <div className="py-10 text-5xl text-gray-400">
                <p>Notas</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-20 justify-items-center content-center text-gray-300 font-semibold tracking-wide p-10">
                <div className="w-60 h-60  grid justify-center content-center">
                    <MdAdd onClick={() => handle()} className="text-9xl text-gray-500 cursor-pointer animate-pulse hover:text-indigo-500" />
                </div>
                <Notas note={note} />
            </div>

        </div>
    )
}

export default Header;