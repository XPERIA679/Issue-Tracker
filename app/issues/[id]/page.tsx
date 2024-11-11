import { prisma } from '@/prisma/client';
import IssueDetails from './IssueDetails';
import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth';
import EditIssueButton from './EditIssueButton';
import authOptions from '@/app/auth/authOptions';
import { Box, Flex, Grid } from '@radix-ui/themes';
import DeleteIssueButton from './DeleteIssueButton';


interface Props {
  params: { id: string }
}

const IssueDetailsPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions)

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) }
  })

  if (!issue)
    notFound();

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className='md:col-span-4'>
        <IssueDetails issue={issue} />
      </Box>
      {session && <Box>
        <Flex  direction='column' gap='4'>
          <EditIssueButton issueId={issue.id} />
          <DeleteIssueButton issueId={issue.id} />
        </Flex>
      </Box>}
    </Grid>
  )
}

export default IssueDetailsPage
