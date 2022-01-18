

interface InputGroupProps {
    className?: string,
    type: string,
    placeholder: string,
    value: string,
    name: string,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    Svg: React.ReactNode,
    erorrMessage?: string | undefined,
    hasErrors?: boolean

}


const InputGroup: React.FC<InputGroupProps> = ({
    type,
    placeholder,
    value,
    name,
    handleChange,
    Svg,
    erorrMessage,
    hasErrors


}) => {
    return (
        <div className={`flex items-center border-2 py-2 px-3 rounded-2xl mb-4 text-gray-400`}>
            {/* <Svg /> */}
            {Svg}
            <input
                className="pl-2 outline-none border-none text-black"
                type={type}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={handleChange}
            />
            <small className=" font-medium text-red-600">{erorrMessage}</small>
        </div>
    )
}

export default InputGroup