'use client'
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'
import classes from './nav-link.module.css'

export default function Navlink({ path, title }) {
  const pathName = usePathname()
  return (
    <Link className={pathName.startsWith({ path }) ? `${classes.link} ${classes.active}` : `${classes.link}`} href={path}>{title}</Link>
  )
}
