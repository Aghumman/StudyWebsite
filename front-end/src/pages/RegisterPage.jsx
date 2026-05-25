import {
  Button,
  Container,
  Field,
  Heading,
  Input,
  Stack,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import z from 'zod'

const registerSchema = z.object({
  email: z.email(),
  password: z.string().min(5, 'Must be 5 letters'),
})

const RegisterPage = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = handleSubmit(async (values) => {
    try {
      const response = await axios.post(
        'http://localhost:8000/auth/register',
        values,
      )
      if(response.data){
        navigate('/login')
      }

    } catch (err) {
      if (err.response) {
        const errorMessage = err.response.data.error

        if (errorMessage == 'Email already registered.') {
          setError('email', { message: errorMessage })
        } else {
          setError('password', { message: errorMessage })
        }
      }
    }
  })

  return (
    <Container>
      <form onSubmit={onSubmit}>
        <Stack maxW='md' mx='auto' my={10}>
          <Heading>Register Form</Heading>
          <Field.Root invalid={!!errors.email}>
            <Field.Label>Email</Field.Label>
            <Input placeholder='Enter your email' {...register('email')} />
            <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.password}>
            <Field.Label>Password</Field.Label>
            <Input
              type='password'
              placeholder='Enter your password'
              {...register('password')}
            />
            <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
          </Field.Root>

          <Button type='submit' colorPalette='blue'>
            Register
          </Button>
          <Button variant='ghost' onClick={()=>navigate('/login')}>
            Already have an account? Login
          </Button>
        </Stack>
      </form>
    </Container>
  )
}

export default RegisterPage