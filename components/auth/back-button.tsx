import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface IBackButton {
  href: string
  label: string
}

export const BackButton: React.FC<IBackButton> = ({ href, label }) => {
  return (
    <Button variant='link' className='w-full font-normal' size='sm' asChild>
      <Link href={href}>{label}</Link>
    </Button>
  )
}
