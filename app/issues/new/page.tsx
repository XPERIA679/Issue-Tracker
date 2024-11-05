'use client';
import { Button, Callout, Text, TextField } from '@radix-ui/themes'
import SimpleMDE from 'react-simplemde-editor';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import validationschema from '@/app/validationSchema';
import { z } from 'zod';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';

type IssueForm = z.infer<typeof validationschema>;

const NewsIssuePage = () => {
  const router = useRouter();  
  const {register, control, handleSubmit, formState: { errors }} = useForm<IssueForm>({
    resolver: zodResolver(validationschema)
  });  
  const [error, setError] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);

  return (
    <div className='max-w-xl'>
        {error &&  <Callout.Root color="red" className='mb-5'>
            <Callout.Icon>
                <InfoCircledIcon />
            </Callout.Icon>
            <Callout.Text>
                {error}
            </Callout.Text>
        </Callout.Root>}
      <form className='space-y-3'
          onSubmit={handleSubmit(async (data) => { 
          try {
            setSubmitting(true);
            await axios.post('/api/issues', data);
            router.push('/issues');
              
          } catch (error) {
            setSubmitting(false);
            setError('An Unexpected Error Occured.')
  
          }  
      })}>
      <TextField.Root>
          <TextField.Input placeholder="Title" {...register('title')}/>
      </TextField.Root>
      <ErrorMessage>{errors.title?.message}</ErrorMessage>
      <Controller name='description' control={control} render={({ field }) => <SimpleMDE placeholder='Description' {...field}/>} />
      <ErrorMessage>{errors.description?.message}</ErrorMessage>
      <Button disabled={isSubmitting}>Submit Issue {isSubmitting && <Spinner />} </Button>
      </form>
    </div>
  )
}

export default NewsIssuePage
