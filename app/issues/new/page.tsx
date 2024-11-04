'use client';
import { Button, Callout, TextField } from '@radix-ui/themes'
import SimpleMDE from 'react-simplemde-editor';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { useState } from 'react';

interface IssueForm {
    title: string;
    description: string;
}

const NewsIssuePage = () => {
  const router = useRouter();  
  const {register, control, handleSubmit} = useForm<IssueForm>();  
  const [error, setError] = useState('');

  return (
    <div className='max-w-xl'>
        {error &&  <Callout.Root color="red" className='mb-5'>
            <Callout.Icon>
                <InfoCircledIcon />
            </Callout.Icon>
            <Callout.Text>
                Some fields were not filled
            </Callout.Text>
        </Callout.Root>}
      <form className='space-y-3'
          onSubmit={handleSubmit(async (data) => { 
          try {
              await axios.post('/api/issues', data);
              router.push('/issues');
              
          } catch (error) {
              setError('An Unexpected Error Occured.')
  
          }  
      })}>
      <TextField.Root>
          <TextField.Input placeholder="Title" {...register('title')}/>
      </TextField.Root>
      <Controller name='description' control={control} render={({ field }) => <SimpleMDE placeholder='Description' {...field}/>} />
      <Button>Submit Issue</Button>
      </form>
    </div>
  )
}

export default NewsIssuePage
