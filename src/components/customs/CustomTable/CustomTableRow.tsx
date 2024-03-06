import PropTypes from "prop-types";

const CustomTableRow = ({ data }) => {
  const objects = data;
  const keysData = Object.keys(objects[0]);
  

  const eliminarprefix = (base64String) => {
    const dataUriPrefix = "data:application/pdf;filename=generated.pdf;base64,";
    const encodedData = base64String.startsWith(dataUriPrefix)
      ? base64String.slice(dataUriPrefix.length)
      : base64String;
    return encodedData;
  };
  return (
    <>
      {objects.map((object) => (
        <tr key={object.id}>
          {keysData.map((key) =>
            key !== "reporte" ? (
              <td key={key}>{object[key]}</td>
            ) : (
              <a
                style={{ color: "blue", textDecoration: "none" }}
                href={`${object[key]}`}
                download={
                  object.nombre
                    ? `${object.nombre}_${object.documento}.pdf`
                    : "reporte.pdf"
                }
              >
                Descargar PDF
              </a>
            )
          )}
        </tr>
      ))}
    </>
  );
};

CustomTableRow.propTypes = {
  data: PropTypes.object,
};

export default CustomTableRow;
