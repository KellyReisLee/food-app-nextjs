
import Link from 'next/link'
import React from 'react'
import logo from '@/assets/logo.png'
import classes from './main-header.module.css'
import Image from 'next/image'
import Navlink from './nav-link'


export default function MainHeader() {

  return (
    <header className={classes.header}>
      <Link className={classes.logo} href='/'>
        <Image
          src={logo}
          alt='A plate with food on it.'
          priority

        />
        Nextjs Food
      </Link>
      <nav className={classes.nav}>
        <ul>
          <li>

            <Navlink path='/meals' title='Browse Meals' />
          </li>
          <li>

            <Navlink path='/community' title='Foodies Community' />
          </li>
        </ul>
      </nav>
    </header>
  )
}


