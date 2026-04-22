export function Logo() {
  return (
    <img 
     src="/sera.png" 
     alt="meem logo" 
     className="w-6"
    />
  )
}

export function Text() {
  return (
      <p className="text-xl font-bold font-[ClashDisplay] text-black">Voris</p>
  )
}

export function LogoWithText() {
  return (
    <div className="flex items-center gap-1">
      <img 
        src="/sera.png" 
        alt="meem logo" 
        className="w-6"
       />
      <p className="text-xl font-bold font-[ClashDisplay] text-black">Voris</p>
    </div>
  )
}

