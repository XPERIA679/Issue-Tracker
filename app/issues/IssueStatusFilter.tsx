'use client';
import { Status } from '@prisma/client';
import { Select } from '@radix-ui/themes'
import React from 'react'

const IssueStatusFilter = () => {
  const statuses: { label: string, value?: Status }[] = [
      { label: 'All' },
      { label: 'Open', value: 'OPEN' },
      { label: 'Closed', value: 'CLOSED' },
      { label: 'In Progress', value: 'IN_PROGRESS' },
  ]
      
  return (
    <Select.Root>
        <Select.Trigger placeholder="Filter"/>
        <Select.Content>
            <Select.Group>
                <Select.Label>Filter</Select.Label>
                {statuses.map(status => (<Select.Item key={status.value} value={status.value || ''}>{status.label}</Select.Item>))}
            </Select.Group>
        </Select.Content>
    </Select.Root>
  )
}

export default IssueStatusFilter
