type IPropValue = number | string
type IFontSize = IPropValue

interface ITypoValue {
  fontWeight: IPropValue
  lineHeight: IPropValue
  letterSpacing: IPropValue
}

type ITypoKey =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'body12'
  | 'body14'
  | 'body16'
  | 'body12-bold'
  | 'body14-bold'
  | 'body16-bold'
  | 'button1'
  | 'button2'

type ITypoConfig = Record<ITypoKey, [IFontSize, ITypoValue]>

const typoConfig: ITypoConfig = {
  h1: [
    '3rem',
    {
      fontWeight: '400',
      lineHeight: '4rem',
      letterSpacing: '0em',
    },
  ],
  h2: [
    '1.5rem',
    {
      fontWeight: '500',
      lineHeight: '2rem',
      letterSpacing: '0em',
    },
  ],
  h3: [
    '1.25rem',
    {
      fontWeight: '500',
      lineHeight: '2rem',
      letterSpacing: '0em',
    },
  ],
  h4: [
    '1.125rem',
    {
      fontWeight: '500',
      lineHeight: '1.5rem',
      letterSpacing: '0em',
    },
  ],
  h5: [
    '1rem',
    {
      fontWeight: '500',
      lineHeight: '1.5rem',
      letterSpacing: '0em',
    },
  ],
  h6: [
    '0.875rem',
    {
      fontWeight: '500',
      lineHeight: '1.5rem',
      letterSpacing: '0em',
    },
  ],
  body16: [
    '1rem',
    {
      fontWeight: '400',
      lineHeight: '1.5rem',
      letterSpacing: '0em',
    },
  ],
  body14: [
    '0.875rem',
    {
      fontWeight: '400',
      lineHeight: '1.25rem',
      letterSpacing: '0em',
    },
  ],
  body12: [
    '0.75rem',
    {
      fontWeight: '400',
      lineHeight: '1.125rem',
      letterSpacing: '0em',
    },
  ],
  'body14-bold': [
    '0.875rem',
    {
      fontWeight: '600',
      lineHeight: '1.25rem',
      letterSpacing: '0em',
    },
  ],
  'body16-bold': [
    '1rem',
    {
      fontWeight: '600',
      lineHeight: '1.5rem',
      letterSpacing: '0em',
    },
  ],
  'body12-bold': [
    '0.75rem',
    {
      fontWeight: '600',
      lineHeight: '1.125rem',
      letterSpacing: '0em',
    },
  ],
  button1: [
    '1.25rem',
    {
      fontWeight: '500',
      lineHeight: '1.5rem',
      letterSpacing: '0em',
    },
  ],
  button2: [
    '1rem',
    {
      fontWeight: '500',
      lineHeight: '1.5rem',
      letterSpacing: '0em',
    },
  ],
}

export default typoConfig
