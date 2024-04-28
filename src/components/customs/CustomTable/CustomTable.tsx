// import PropTypes from "prop-types";
// import CustomTableRow from "./CustomTableRow";
// import "./CustomTable.styles.css";
// const CustomTable = ({ headerData, bodyData }) => {
//   const header = Object.values(headerData);
//   // const newBodyData = bodyData.map((obj) => {
//   //   const newObj = {};
//   //   Object.keys(headerData).forEach((key) => {
//   //     newObj[key] = obj[key] !== undefined ? obj[key] : "";
//   //   });
//   //   return newObj;
//   // });
//   const newBodyData = bodyData.map((obj) => {
//     const newObj = {};
//     Object.keys(headerData).forEach((key) => {
//       if (key.includes(".")) {
        
//         const [outerKey, innerKey] = key.split(".");
//         newObj[outerKey] = obj[outerKey] !== undefined && obj[outerKey][innerKey] !== undefined ? obj[outerKey][innerKey] : "";
//       } else {
//         newObj[key] = obj[key] !== undefined ? obj[key] : "";
//       }
//     });
//     return newObj;
// });
//   return (
//     <div className="outer-wrapper">
//       <div className="table-wrapper">
//       <table>
//         <thead className='table-head'>
//           {header.map((prop) => (
//             <td key={prop}>{prop}</td>
//           ))}
//         </thead>
//         <tbody className='table-body'>
//           <CustomTableRow data={newBodyData} />
//         </tbody>
//       </table>
//       </div>
//     </div>
//   );
// };

// CustomTable.propTypes = {
//   headerData: PropTypes.object,
//   bodyData: PropTypes.arrayOf(PropTypes.object), 
// };

// export default CustomTable;
