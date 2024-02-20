import PropTypes from "prop-types";
import CustomTableRow from "./CustomTableRow";
import "./CustomTable.styles.css";
const CustomTable = ({ headerData, bodyData }) => {
  const header = Object.values(headerData);
  // quiero extraer todos los values que tengan las key que contiene el array headerKey de el objeto body data
  const newBodyData = bodyData.map((obj) => {
    const newObj = {};
    Object.keys(headerData).forEach((key) => {
      newObj[key] = obj[key] !== undefined ? obj[key] : "";
    });
    return newObj;
  });
  return (
    <>
      <table>
        <thead className='table-head'>
          {header.map((prop) => (
            <td key={prop}>{prop}</td>
          ))}
        </thead>
        <tbody className='table-body'>
          <CustomTableRow data={newBodyData} />
        </tbody>
      </table>
    </>
  );
};

CustomTable.propTypes = {
  headerData: PropTypes.object,
  bodyData: PropTypes.object,
};

export default CustomTable;
