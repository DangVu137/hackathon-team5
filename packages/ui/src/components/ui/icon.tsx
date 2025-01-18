'use client'
import React from 'react'
import { ICONS } from '../../constants/icons'

interface IIcon extends React.HTMLAttributes<HTMLSpanElement> {
  name: (typeof ICONS)[number]
}

export type IconType = (typeof ICONS)[number]

export const Icon: React.FC<IIcon> = ({ name, className, ...rest }) => {
  const classes = `
    icon-${name}
    ${className ?? ''}
  `
  return <span className={classes} {...rest}></span>
}
