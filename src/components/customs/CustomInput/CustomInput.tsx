import PropTypes from "prop-types";
import "./CustomInput.styles.css";

const CustomInput = ({ label, type, placeholder, value, onchange, name, id, icon }) => {
  return (
    <div className="custom-input">
      {label && (
        <label style={{ fontWeight: "bold"}} className="custom-input__label">
          {icon && <div className="input_icon">{icon}</div>}
          {label}
        </label>
      )}
      <input
        className="custom-input__input"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onchange}
        name={name}
        id={id}
      />
    </div>
  );
};

CustomInput.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onchange: PropTypes.func,
  name: PropTypes.string,
  id: PropTypes.string,
  icon: PropTypes.element,
};

export default CustomInput;