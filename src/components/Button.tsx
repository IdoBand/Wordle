interface LightButtonProps {
    className: string
    text: string
    onClick: any
    dark: boolean
}
const BASIC_LIGHT_BUTTON = `px-8 py-2 border border:solid border-light rounded-md text-dark bg-light
hover:bg-dark hover:text-light
lg:text-sm lg:px-6 sm:px-1`
const BASIC_DARK_BUTTON = `px-4 py-2 border border:solid border-light rounded-md
hover:bg-light hover:text-dark
lg:text-sm lg:px-2 sm:px-1`
const Button = ({className, text, onClick, dark}: LightButtonProps) => {
  return (
    <button
        className={`${dark ? BASIC_DARK_BUTTON : BASIC_LIGHT_BUTTON} ${className}`}
        onClick={onClick}
        >
        {text}
    </button>
  )
}

export default Button