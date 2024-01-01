interface IHeader {
  label: string
}

export const Header: React.FC<IHeader> = ({ label }) => {
  return (
    <div className='flex w-full flex-col items-center justify-center gap-y-4'>
      <h1 className='text-3xl font-semibold'>🔐 Auth</h1>
      <p className='text-sm text-muted-foreground'>{label}</p>
    </div>
  )
}
