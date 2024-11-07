import Link from 'next/link';
import { Button } from '@radix-ui/themes';
import { TrashIcon } from '@radix-ui/react-icons';

const DeleteIssueButton = ({ issueId }: { issueId: number}) => {
  return (
    <Button color='red'>
      <TrashIcon />
      <Link href={`/issues/${issueId}/delete`}>
      </Link>
      Delete
    </Button>
  )
}

export default DeleteIssueButton
