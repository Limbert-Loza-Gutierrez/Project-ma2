import PropTypes from "prop-types";

const CustomTableRow = ({ data }) => {
  const objects = data;
  const keysData = Object.keys(objects[0]);
  const informes = JSON.parse(localStorage.getItem("informes")) || [];

  const findInformeByDocumento = (documento) => {
    return informes.find((informe) => informe.documento === documento);
  };

  return (
    <>
      {objects.map((object) => {
        const informe = findInformeByDocumento(object.documento);
        const href = informe ? informe.pdf : null;

        return (
          <tr key={object.id}>
            {keysData.map((key) =>
              key === "reporte" ? (
                <td key={key}>
                  {href ? (
                    <a
                      style={{ color: "blue", textDecoration: "none" }}
                      href={href}
                      download={
                        object.nombre
                          ? `${object.nombre}_${object.documento}.pdf`
                          : "reporte.pdf"
                      }
                    >
                      Descargar PDF
                    </a>
                  ) : (
                    "Sin reporte"
                  )}
                </td>
              ) : (
                // <td key={key}>{object[key]}</td>
                <>
                  <td key={key}>{object[key]}</td>
                  {console.log(object[key])}
                  </>


              )
            )}
          </tr>
        );
      })}
    </>
  );
};

CustomTableRow.propTypes = {
  data: PropTypes.object,
};

export default CustomTableRow;
