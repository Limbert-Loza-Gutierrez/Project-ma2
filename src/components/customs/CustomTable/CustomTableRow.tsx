import PropTypes from "prop-types";


const CustomTableRow = ({ data }) => {
    const objects = data;
    const keysData = Object.keys(objects[0]);
    return (
        <>
            { objects.map((object) => (
                <tr key={ object.id }>
                    {
                        keysData.map((key) => (
                            <td key={ key }>{ object[key] }</td>
                        ))
                    }
                </tr>
            )) }
        </>
    )
}

CustomTableRow.propTypes = {
    data: PropTypes.object,
}

export default CustomTableRow