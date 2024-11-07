'use client';
import { Button, AlertDialog, Flex } from '@radix-ui/themes';
import { TrashIcon } from '@radix-ui/react-icons';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const DeleteIssueButton = ({ issueId }: { issueId: number}) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const deleteIssue =  async () => {
    try {
        await axios.delete('/api/issues/' + issueId)
        router.push('/issues');
        router.refresh();
    } catch (error) {
        setError(true);
    }
}

  return (
    <>
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color='red'>
        <TrashIcon />
          Delete
        </Button>
      </AlertDialog.Trigger>  
      <AlertDialog.Content>
        <AlertDialog.Title>Delete Issue</AlertDialog.Title>
        <AlertDialog.Description>
            Are you sure? This will delete the issue and will not be accessible anymore.
        </AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">Cancel</Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant="solid" color="red" onClick={deleteIssue}>Delete Issue</Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>

    <AlertDialog.Root open={error}>
        <AlertDialog.Content>
            <AlertDialog.Title>Error</AlertDialog.Title>
            <AlertDialog.Description>Issue could not be deleted.</AlertDialog.Description>
            <Flex justify="end"><Button mt="2"  color="gray" variant="soft"
             onClick={ () => {
                setError(false)
             }}>OK</Button></Flex>
        </AlertDialog.Content>
    </AlertDialog.Root>
    </>
  )
}

export default DeleteIssueButton
