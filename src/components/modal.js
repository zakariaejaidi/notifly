import React,{useState} from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { notes as notesAtom } from '../atoms'
import { categories as categoriesAtom } from '../atoms'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import Select from './select';
import { v4 as uuid } from 'uuid';
import { currentCategoryId as currentCategoryIdAtom } from '../atoms'

const Modal = ({ show, closeModal }) => {

    const [currentCategoryId, setCurrentCategoryId] = useRecoilState(currentCategoryIdAtom)

    const [notes, setNotes] = useRecoilState(notesAtom)

    const categories = useRecoilValue(categoriesAtom);

    const temp = categories.find((ext) => ext.id);

    const [category, setCategory] = useState(temp);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: '',
            body: '',
            category_id: 1
        },
        onSubmit: (values, { resetForm }) => {
            addNote(values)
            resetForm()
        },

        validationSchema: Yup.object({
            title: Yup.string().required('Required'),
            body: Yup.string().required('Required')
        }),
    })

    const addNote = async (values) => {
        setNotes([...notes, { id: uuid(), title: values.title, body: values.body,category_id: category.id }])
        setCurrentCategoryId(category.id)
        closeModal()
    }

    return (
        <>
            <div className={`${!show && 'hidden'} backdrop-blur overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center`} id="modal-id">
                <div className="relative w-auto my-12 mx-auto max-w-2xl">

                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">

                        <div className="flex items-start justify-between px-6 pt-6 rounded-t">
                            <h3 className="text-xl font-medium text-center">
                                New Note
                            </h3>
                            <button onClick={closeModal} className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none">
                                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                    ×
                                </span>
                            </button>
                        </div>

                        <div className="relative px-6 pb-6 flex-auto">
                            <form onSubmit={formik.handleSubmit}>
                                <div className="my-4 text-slate-500 text-lg leading-relaxed">
                                    <div>
                                        <label className="text-gray-400 font-light">Title</label>
                                        <input type="text" className={`appearance-none border border-gray-200 rounded w-full py-2 px-3 focus:outline-none focus:bg-white focus:border-indigo-500 ${formik.errors.title && formik.touched.title && 'border-red-400 bg-red-50'}`} value={formik.values.title} name="title" onBlur={formik.handleBlur} onChange={formik.handleChange} />
                                    </div>
                                    <div className="mt-4">
                                    <label className="text-gray-400 font-light">Description</label>
                                        <textarea rows="8" className={`appearance-none border border-gray-200 rounded w-full py-2 px-3 focus:outline-none focus:bg-white focus:border-indigo-500 ${formik.errors.body && formik.touched.body && 'border-red-400 bg-red-50'}`} value={formik.values.body} name="body" onBlur={formik.handleBlur} onChange={formik.handleChange}></textarea>
                                    </div>
                                    <div>
                                    <label className="text-gray-400 font-light">Category</label>
                                        <div className="flex justify-center">
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
                                    </div>
                                </div>

                                <div className="flex items-center justify-end rounded-b">
                                    <button onClick={closeModal} className="text-gray-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                                        Close
                                    </button>
                                    <button type="submit" className="rounded-full bg-indigo-500 text-white active:bg-indigo-600 font-bold uppercase text-sm px-6 py-3 shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>


                    </div>
                </div>
            </div>
            <div className="hidden opacity-25 fixed inset-0 z-40 bg-black"></div></>
    )
}

export default Modal