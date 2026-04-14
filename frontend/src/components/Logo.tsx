export function Logo() {
  return (
    <img 
     src="/sera.svg" 
     alt="meem logo" 
     className="w-6"
    />
  )
}

export function Text() {
  return (
      <p className="text-xl font-bold font-[ClashDisplay] text-green-700">Sera</p>
  )
}

export function LogoWithText() {
  return (
    <div className="flex items-center gap-1">
      <img 
        src="/sera.svg" 
        alt="meem logo" 
        className="w-6"
       />
      <p className="text-xl font-bold font-[ClashDisplay] text-green-700">Sera</p>
    </div>
  )
}

