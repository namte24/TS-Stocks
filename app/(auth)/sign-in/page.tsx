"use client"
import FooterLink from '@/components/forms/FooterLink'
import InputField from '@/components/forms/InputField'
import { SubmitHandler, useForm } from 'react-hook-form'

const SignIn = () => {
   const {
      register,
      handleSubmit,
      control,
      formState: { errors, isSubmitting }
    } = useForm<SignUpFormData>({
        defaultValues:{
          email: '',
          password: '',
        },
        mode: 'onBlur' 
     })

      const onSubmit = async (data: SignUpFormData) => {
    try{
      console.log(data)
    }catch(e) {
      console.error(e)
    }
      }
  return (
    <>
      <h1 className='form-title'>Log In</h1>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
           <InputField name="email" label="Email"
         placeholder="johndoe@email.com" register={register}
          error={errors.email} validation={{required: 'Email is required', pattern:/^\w+@\w+\.\w+$/, message: "Email address is required"}}/>

          <InputField name="password" label="Password"
         placeholder="Enter Passowrd" register={register}
         type='password'
          error={errors.password} validation={{required: 'Password is required', miniLength: 8}}/>
        </form>
         <button type='submit' disabled={isSubmitting} className='yellow-btn w-full mt-5'>
          {isSubmitting? 'Signning In': 'Sign In'}
        </button>

        <FooterLink text="Don't have an account?" linkText='Create an account' href='/sign-up'/>

    </>
  )
}


export default SignIn