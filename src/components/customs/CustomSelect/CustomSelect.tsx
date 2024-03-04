import './CustomSelect.styles.css'
const CustomSelect = ({ onChange, arrayOptionsSelect, value, name, style }) => {
    return (
        <>
            <select
            style={style}

                onChange={onChange}
                value={value}
                name={name}
                className="custom-select"
            >
                {
                    arrayOptionsSelect.map(
                        (option, index) => {
                            return (
                                <option className="option-select" key={index} value={option}>
                                    {option}
                                </option>
                            )
                        }
                    )
                }
            </select>
        </>
    )
}

export default CustomSelect