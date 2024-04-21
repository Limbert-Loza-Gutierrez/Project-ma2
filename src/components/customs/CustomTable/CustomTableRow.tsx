import PropTypes from "prop-types";
import {collection,getDocs} from "firebase/firestore";
import { db } from "../../../config/firebase";
import { useEffect, useState } from "react";

const CustomTableRow = ({ data }) => {
  const objects = data;
  const keysData = Object.keys(objects[0]);
  // const [informe,setInforme] = useState(null);
  const [informes1,setInformes1] = useState(null);
  const [informes2,setInformes2] = useState(null);
  const [informes3,setInformes3] = useState(null);
  const [informes4,setInformes4] = useState(null);



  // tengo las colecciones informes , informes1 , informes2 , informes3 , informes4
  // cada una de estas contiene una parte de el documento que se va a descargar
  // se debe hacer un merge de estos documentos para poder descargar el pdf
  useEffect(() => {
    const getInformes = async () => {
      const informesCollection = collection(db, "informes");
      const informesCollection2 = collection(db, "informes2");
      const informesCollection3 = collection(db, "informes3");
      const informesCollection4 = collection(db, "informes4");
      const informesSnapshot = await getDocs(informesCollection);
      const informesSnapshot2 = await getDocs(informesCollection2);
      const informesSnapshot3 = await getDocs(informesCollection3);
      const informesSnapshot4 = await getDocs(informesCollection4);
      const informesData = informesSnapshot.docs.map((doc) => doc.data());
      const informesData2 = informesSnapshot2.docs.map((doc) => doc.data());
      const informesData3 = informesSnapshot3.docs.map((doc) => doc.data());
      const informesData4 = informesSnapshot4.docs.map((doc) => doc.data());
      setInformes1(informesData);
      setInformes2(informesData2);
      setInformes3(informesData3);
      setInformes4(informesData4);
    };
    getInformes();
  }, []);

  const mergeInformesByIdDoc = (idDoc) => {
    const informe = informes1?.find((informe) => informe.idDoc === idDoc);
    const informe2 = informes2?.find((informe) => informe.idDoc === idDoc);
    const informe3 = informes3?.find((informe) => informe.idDoc === idDoc);
    const informe4 = informes4?.find((informe) => informe.idDoc === idDoc);
    // console.log("informe",informe)
    // console.log("informe2",informe2)
    // console.log("informe3",informe3)
    // console.log("informe4",informe4)
    const pdfConcatenado = informe?.pdf + informe2?.pdf + informe3?.pdf + informe4?.pdf;

    const informeCompleto = {
      documento : informe?.documento,
      idDoc : informe?.idDoc,
      nombre : informe?.nombre,
      pdf : pdfConcatenado,
    }
    console.log("informeCompleto",informeCompleto)
    return informeCompleto;
  }
  

  
  // const findInformeById = (id) => {
  //   return informes.find((informe) => informe.id === id);
  // }
  return (
    <>{objects.map((object) => {
      const informeT =  mergeInformesByIdDoc(object.idDoc);
      const href = informeT ? informeT.pdf : null;

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
                {/* {console.log(object[key])} */}
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
