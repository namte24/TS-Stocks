'use client'

import FooterLink from '@/components/forms/FooterLink'
import InputField from '@/components/forms/InputField'
import { useForm } from 'react-hook-form'
import { signInWithEmail } from '@/lib/actions/auth_actions' // Import the action
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const SignIn = () => {
   const router = useRouter();

   const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting }
    } = useForm<SignInFormData>({ // Ensure this type matches your schema (e.g., SignInFormData or SignUpFormData)
        defaultValues:{
          email: '',
          password: '',
        },
        mode: 'onBlur' 
     })

    const onSubmit = async (data: any) => { // Use proper type if available
        try {
            const result = await signInWithEmail(data);
            
            if (result.success) {
                router.push('/'); // Redirect to dashboard
                router.refresh(); // Ensure the layout updates with the new session
            } else {
                toast.error(result.error || 'Invalid email or password');
            }
        } catch (e) {
            console.error(e);
            toast.error('An unexpected error occurred');
        }
    }

  return (
    <>
      <h1 className='form-title'>Log In</h1>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
           <InputField 
             name="email" 
             label="Email"
             placeholder="johndoe@email.com" 
             register={register}
             error={errors.email} 
             validation={{
                required: 'Email is required', 
                pattern: {
                    value: /^\w+@\w+\.\w+$/, 
                    message: "Email address is required"
                }
             }}
           />

          <InputField 
            name="password" 
            label="Password"
            placeholder="Enter Password" 
            register={register}
            type='password'
            error={errors.password} 
            // FIXED: Changed 'miniLength' to 'minLength'
            validation={{ required: 'Password is required', minLength: 8 }}
          />

         {/* FIXED: Button moved INSIDE the form tag */}
         <button type='submit' disabled={isSubmitting} className='yellow-btn w-full mt-5'>
          {isSubmitting ? 'Signing In...' : 'Sign In'}
        </button>
      </form>
      
      <FooterLink text="Don't have an account?" linkText='Create an account' href='/sign-up'/>
    </>
  )
}

export default SignIn