import { useEffect } from "react";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { IoSave } from "react-icons/io5";
import { deleteNote, getAllNotes, updateNote } from "../api/connection";
import Lottie from 'react-lottie';
import animationData from '../img/loading.json';

function Notas(note) {
    const [notas, setNotas] = useState([]);
    const [cambio, setCambio] = useState(false);
    const [isLoading, setIsLoading] = useState(false)

    const cargarNotas = async () => {
        try {
            setIsLoading(true)
            const res = await getAllNotes();
            setIsLoading(false)
            const resOrdenada = res.sort((a, b) => {
                const fechaA = new Date(a.fecha);
                const fechaB = new Date(b.fecha);

                return fechaA - fechaB;
            }).reverse();
            setNotas(resOrdenada);
        } catch (e) {
            console.log(e);
        }
    }

    const saveNote = async (note) => {
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

        note.fecha = formattedDate

        try {
            await updateNote(note);
            if (cambio) {
                setCambio(false)
            } else {
                setCambio(true)
            }
        } catch (e) {
            console.log(e)
        }
    }

    const removeNote = async (note) => {
        try {
            await deleteNote(note);
            if (cambio) {
                setCambio(false)
            } else {
                setCambio(true)
            }
        } catch (e) {
            console.log(e)
        }
    }

    const handleTituloChange = (index, value) => {
        const updatedNotas = [...notas];
        updatedNotas[index].titulo = value;
        setNotas(updatedNotas);
    };

    const handleDescripcionChange = (index, value) => {
        const updatedNotas = [...notas];
        updatedNotas[index].descripcion = value;
        setNotas(updatedNotas);
    };

    useEffect(() => {
        cargarNotas();
    }, [note, cambio])

    return (
        isLoading ? (
            <div className="grid justify-center content-center">
                <Lottie
                    options={{
                        loop: true,
                        autoplay: true,
                        animationData: animationData
                    }}
                    height={50}
                    width={50}
                    eventListeners={[
                        {
                            eventName: 'complete',
                        }
                    ]}
                />
            </div>
        ) : (
            notas && notas.map((nota, index) => (
                <div key={index} className="grid grid-rows-4 w-60 h-60 bg-neutral-700 rounded-xl border-4 border-indigo-500 overflow-hidden">

                    <input type="text" placeholder="Titulo..." value={nota.titulo} className="w-full grid border-b-4 border-indigo-500 content-center text-center text-2xl bg-neutral-700 px-4" onChange={(e) => handleTituloChange(index, e.target.value)} />

                    <textarea type="text" placeholder="Descripción..." value={nota.descripcion} className="custom-scrollbar w-full h-28 focus:outline-none focus:border-transparent resize-none row-span-2 bg-neutral-700 p-4" onChange={(e) => handleDescripcionChange(index, e.target.value)} />

                    <div className="flex w-full justify-between items-center border-t-4 border-indigo-500 overflow-hidden p-4">
                        <div className="text-xs">{nota.fecha}</div>
                        <div className="flex gap-4">
                            <IoSave onClick={() => saveNote(nota)} className="text-lg cursor-pointer hover:text-indigo-500" />
                            <FaTrash onClick={() => removeNote(nota)} className="text-lg cursor-pointer hover:text-red-500" />
                        </div>
                    </div>
                </div>
            ))
        )

    )

}

export default Notas;