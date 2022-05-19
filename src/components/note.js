import React, { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { categories as categoriesAtom } from '../atoms'
import { notes as notesAtom } from '../atoms'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import Select from './select';


const Note = ({ note }) => {

    const [notes, setNotes] = useRecoilState(notesAtom)
    const categories = useRecoilValue(categoriesAtom);
    const temp = categories.find((ext) => ext.id);
    const [category, setCategory] = useState(temp);

    const [editMode, setEditMode] = useState(false)
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: note.title,
            body: note.body
        },
        onSubmit: (values) => {
            setNotes(notes.map((nt)=> nt.id === note.id ? {...nt, title: values.title, body: values.body, category_id: category.id} : nt))
            setEditMode(false)
        },

        validationSchema: Yup.object({
            title: Yup.string().required('Required'),
            body: Yup.string().required('Required')
        }),
    })

    const deleteNote = (id) => {
        setNotes(notes.filter((nt) => (nt.id != id)))
    }

    const getCategoryById=(id)=>{
        setCategory(categories.filter((cat)=>(cat.id == id))[0]) 
    }

    const editNote = () => {
        setEditMode(true)
    }

    useEffect(() => {
        console.log('ddd',getCategoryById(note.category_id))

    }, [])
    

    return (
        <div className="rounded shadow-lg bg-white mb-3" onDoubleClick={editNote}>

            <div className="px-6 py-4">

                {
                    editMode ? 
                    <form action="" onSubmit={formik.handleSubmit}>
                        <div>
                            <input type="text" placeholder="Title" className={`appearance-none border-b w-full py-2 px-3 focus:outline-none focus:bg-white focus:border-indigo-500 ${formik.errors.title && formik.touched.title && 'border-red-400 bg-red-50'}`} value={formik.values.title} name="title" onBlur={formik.handleBlur} onChange={formik.handleChange} />
                        </div>
                        <div className="mt-4">
                            <textarea placeholder="Body" rows="4" className={`appearance-none border text-gray-700 text-base block w-full py-2 px-3 focus:outline-none focus:bg-white focus:border-indigo-500 ${formik.errors.body && formik.touched.body && 'border-red-400 bg-red-50'}`} value={formik.values.body} name="body" onBlur={formik.handleBlur} onChange={formik.handleChange}></textarea>
                        </div>
                        <div className="mt-4">
                            <div className="w-full">
                                <Select
                                    //className="flex-1"
                                    options={categories}
                                    selectedOption={category}
                                    handelChange={(event) => {
                                        console.log("parent", event);
                                        setCategory(event);
                                    }}
                                />
                            </div>
                        </div>

                        <div className="mt-4 flex items-center justify-end">
                            <button onClick={()=>(setEditMode(false))} className="text-gray-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                                Cancel
                            </button>
                            <button type="submit" className="rounded-full bg-green-500 text-white text-sm px-6 py-2 shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                                Update
                            </button>
                        </div>
                    </form>
                        : <div className="relative">
                            <div className="font-bold text-xl my-4">{note.title}</div>
                            <p className="text-gray-700 text-base block line-clamp-4">
                                {note.body}
                            </p>
                            <div className="pt-4 pb-2 relative">
                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{category.label}</span>
                            </div>
                            <div className="py-2 flex justify-end">
                                <button className="bg-red-400 text-white rounded-full px-3 py-1 text-sm font-semibold hover:bg-red-500" onClick={() => (deleteNote(note.id))}>Delete</button>
                            </div>
                        </div>
                }
            </div>

        </div>
    )
}

export default Note