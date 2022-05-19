import React, { useState, useEffect } from 'react'
import Note from '../components/note'
import Modal from '../components/modal'
import { useRecoilState, useRecoilValue } from 'recoil'
import { notes as notesAtom } from '../atoms'
import { categories as categoriesAtom } from '../atoms'
import { currentCategoryId as currentCategoryIdAtom } from '../atoms'

const Home = () => {
    const [show, setShow] = useState(false)

    const [notes, setNotes] = useRecoilState(notesAtom)
    const [filtredNotes, setFiltredNotes] = useState(notes)
    const categories = useRecoilValue(categoriesAtom)
    const [currentCategoryId, setCurrentCategoryId] = useRecoilState(currentCategoryIdAtom)

    useEffect(() => {
        setFiltredNotes(notes.filter((nt) => (nt.category_id == currentCategoryId)))
    }, [currentCategoryId,notes])


    const filterNotes = (category_id) => {
        setCurrentCategoryId(category_id)
    }


    return (
        <>
            <main>
                <div className="container m-auto py-8 px-4 mb-16">

                    <h1 className="text-center font-bold text-4xl text-gray-800 py-8">Notifly On Azure 1.1</h1>
                    <div className="my-8">
                        <button onClick={() => (setShow(true))} className="bg-indigo-500 text-white active:bg-indigo-600 font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">New</button>
                    </div>
                    <div className="my-3 flex justify-center md:justify-end">
                        {categories && categories.map((category) => (<button key={category.id} onClick={() => filterNotes(category.id)} className={`rounded-full py-1 px-3 border border-blue-600  ${currentCategoryId == category.id ? 'text-white bg-blue-600':'bg-white text-blue-600'} mr-2`}>{category.label}</button>))}
                    </div>
                    {
                        filtredNotes && filtredNotes.length > 0 ?
                        <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-col-4 gap-4">
                            {filtredNotes && filtredNotes.map((note) => (<Note key={note.id} note={note} />))}
                        </div>
                        :
                         <p className="text-center font-medium text-xl text-gray-600 mt-12">No results</p>
                    }


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