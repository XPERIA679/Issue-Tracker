'use client';

import Link from 'next/link'
import React from 'react'
import { BsBugFill } from 'react-icons/bs'
import { usePathname } from 'next/navigation';
import classnames from 'classnames';
import { useSession } from 'next-auth/react';
import { Spinner } from './components';
import { Box, Container, Flex } from '@radix-ui/themes';

const NavBar = () => {
  const currentPage = usePathname();
  const { status, data: session } = useSession();

  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues' },
  ]

  return (
    <nav className='border-b mb-5 px-5 py-3'>
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/" className=''><BsBugFill /></Link>
            <ul className='flex space-x-6'>
              {links.map((link) => (
                <li key={link.href} >
                  <Link
                    className={classnames({
                      'text-zinc-900': link.href === currentPage,
                      'text-zinc-500': link.href !== currentPage,
                      'hover:text-zinc-800 transition-colors': true
                    })}
                    href={link.href}>{link.label}</Link></li>))}
            </ul>
          </Flex>
          <Box>
            {status === 'loading' && <Spinner />}
            {status === 'authenticated' &&
              <div>
                {session.user!.name}
                <Link href="/api/auth/signout" className='ml-5'>Sign Out</Link>
              </div>}
            {status === 'unauthenticated' && <Link href="/api/auth/signin" className='mr-5'> Sign In </Link>}
          </Box>
        </Flex>
      </Container>
    </nav>
  )
}

export default NavBar
