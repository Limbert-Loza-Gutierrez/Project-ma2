import PropTypes from "prop-types";
import "./CustomInput.styles.css";
const CustomInput = ({ ...props }) => {
    return (
        <div className="custom-input">
            {props.label && (
                <label className="custom-input__label">
                    {props.icon && <div className="input_icon">{props.icon}</div>}
                    {props.label}
                </label>
            )}
            <input
                className="custom-input__input"
                type={props.type}
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange}
                name={props.name}
            />
        </div>
    );
};

CustomInput.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    name: PropTypes.string,
    icon: PropTypes.element,
};

export default CustomInput;
