'use client';
import { Select } from '@radix-ui/themes'
import React from 'react'

const AssigneeSelect = () => {
  return (
    <Select.Root>
      <Select.Trigger placeholder='Assign a User' />
      <Select.Content>
        <Select.Group>
            <Select.Label>Users</Select.Label>
            <Select.Item value='user1'>User1</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  )
}

export default AssigneeSelect
