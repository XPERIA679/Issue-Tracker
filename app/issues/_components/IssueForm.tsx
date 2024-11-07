'use client';
import { z } from 'zod';
import axios from 'axios';
import { useState } from 'react';
import "easymde/dist/easymde.min.css";
import { Issue } from '@prisma/client';
import { useRouter } from 'next/navigation';
import SimpleMDE from 'react-simplemde-editor';
import validationschema from '@/app/validationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { ErrorMessage, Spinner } from '@/app/components';
import { Button, Callout, TextField } from '@radix-ui/themes';

type IssueFormData = z.infer<typeof validationschema>;

const IssueForm = ({ issue }: { issue?: Issue}) => {
  const router = useRouter();  
  const {register, control, handleSubmit, formState: { errors }} = useForm<IssueFormData>({
    resolver: zodResolver(validationschema)
  });  
  const [error, setError] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);
  const onSubmit = handleSubmit(async (data) => { 
      try {
        setSubmitting(true);
        if (issue)
          await axios.patch('/api/issues/' + issue.id, data);
        else
          await axios.post('/api/issues', data);
        router.push('/issues');
        router.refresh();  
      } catch (error) {
        setSubmitting(false);
        setError('An Unexpected Error Occured.')
      }});

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
          onSubmit={onSubmit}>
      <TextField.Root>
          <TextField.Input defaultValue={issue?.title} placeholder="Title" {...register('title')}/>
      </TextField.Root>
      <ErrorMessage>{errors.title?.message}</ErrorMessage>
      <Controller name='description' control={control} defaultValue={issue?.description} render={({ field }) => <SimpleMDE placeholder='Description' {...field}/>} />
      <ErrorMessage>{errors.description?.message}</ErrorMessage>
      <Button disabled={isSubmitting}> { issue ? 'Update' : 'Submit Issue' }{' '}
        {isSubmitting && <Spinner />}
      </Button>
      </form>
    </div>
  )
}

export default IssueForm
