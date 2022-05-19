import React, { useState, useEffect } from 'react'
import Note from '../components/note'
import Modal from '../components/modal'
import { useRecoilState, useRecoilValue } from 'recoil'
import { notes as notesAtom } from '../atoms'

const Home = () => {
    const [show, setShow] = useState(false)

    const notes = useRecoilValue(notesAtom)


    useEffect(() => {
        console.log(notes)

    }, [])


    return (
        <>
            <main>
                <div className="container m-auto py-8 px-4 mb-16">

                    <h1 className="text-center font-bold text-4xl text-gray-800 py-8">Notifly On Azure 1.0</h1>
                    <div className="my-8">
                        <button onClick={() => (setShow(true))} className="bg-indigo-500 text-white active:bg-indigo-600 font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">New</button>
                    </div>
                    <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-col-4 gap-4">
                        {notes && notes.map((note) => (<Note key={note.id} note={note} />))}
                    </div>
                    <Modal show={show} closeModal={() => (setShow(false))} />
                </div>
            </main>
            <footer className="bg-white py-4 fixed w-full bottom-0">
                <div>
                    <p className="text-center text-gray-400">Created by <a href="https://zakariae.jaidi.pw/" target="_blank" className="text-blue-400 hover:text-blue-600">Zakariae Jaidi</a></p>
                </div>
            </footer>
        </>
    )
}

export default Home