import { useAuth, useRegister } from '../lib/auth.state';
import { useRef } from 'react';
import { Redirect } from 'react-router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from 'react-query';

export default function RegisterForm() {
    const email = useRef();
    const password = useRef();
    const name = useRef();
    const auth = useAuth();
    const register = useRegister();

    const { mutate, isLoading } = useMutation(data => register(data.nameInput, data.emailInput, data.passwordInput, data.avatarInput));

    const formik = useFormik({
        initialValues: {
            emailInput: '',
            passwordInput: '',
            nameInput: '',
            avatarInput: "https://th-thumbnailer.cdn-si-edu.com/F_HnNfT0IBSYIPo7ttW_WYGJ9DI=/1000x750/filters:no_upscale()/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/49/38/4938f123-986a-478c-8402-4c538201ebc4/gettyimages-1150889841.jpg"
        },
        validationSchema: Yup.object({
            emailInput: Yup.string()
                .max(30, 'Must be 30 characters or less')
                .required('Required'),
            passwordInput: Yup.string()
                .required('Required'),
            nameInput: Yup.string()
                .max(30, 'Must be 20 characters or less')
                .required('Required'),
        }),
        onSubmit: values => {
            console.log(values);
            mutate(values);
        }
    })

    return auth.status === "authenticated" ? <Redirect to="/" /> : (
        <div className="mx-auto max-w-md px-4 py-6 bg-white shadow">
            <p className="font-bold text-center text-3xl tracking-widest">REGISTER</p>
            <div className="mt-8">
                <form onSubmit={formik.handleSubmit}>
                    <div>
                        <label htmlFor="emailInput" className="block w-full">Email</label>
                        <input ref={email} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.emailInput} disabled={isLoading} id="emailInput" name="emailInput" type="email" className="block w-full shadow mt-4 h-10 px-5 border focus:outline-none focus:ring-2 focus:ring-red-300"></input>
                        {
                            formik.touched.emailInput && formik.errors.emailInput ? (
                                <div>
                                    {formik.errors.emailInput}
                                </div>
                            ) : null
                        }
                    </div>
                    <div className="mt-6">
                        <label htmlFor="passwordInput" className="block w-full">Password</label>
                        <input ref={password} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.passwordInput} disabled={isLoading} id="passwordInput" name="passwordInput" type="password" className="block w-full shadow mt-4 h-10 px-5 border focus:outline-none focus:ring-2 focus:ring-red-300"></input>
                        {
                            formik.touched.passwordInput && formik.errors.passwordInput ? (
                                <div>
                                    {formik.errors.passwordInput}
                                </div>
                            ) : null
                        }
                    </div>
                    <div className="mt-6">
                        <label htmlFor="nameInput" className="block w-full">Name</label>
                        <input ref={name} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.nameInput} disabled={isLoading} id="nameInput" name="nameInput" type="text" className="block w-full shadow mt-4 h-10 px-5 border focus:outline-none focus:ring-2 focus:ring-red-300"></input>
                        {
                            formik.touched.nameInput && formik.errors.nameInput ? (
                                <div>
                                    {formik.errors.nameInput}
                                </div>
                            ) : null
                        }
                    </div>
                    <button type="submit" className="mx-auto block h-10 w-full bg-red-400 text-white mt-8 hover:bg-red-500">ENTER</button>
                </form>
            </div>
        </div>
    )
}