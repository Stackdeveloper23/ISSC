import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Config from "../Config";
import Pagination from "../components/Pagination";

const SowAll = () => {
    const [sow, setSow] = useState([]); // Inicializa como array vacío
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchSows = async (page) => {
            try {
                const response = await Config.getSowsAll(page);
                console.log("API Response:", response); 
                if (response && response.data) {
                    console.log("Data part of response:", response.data);

                    if (Array.isArray(response.data)) {
                        setSow(response.data); // Los datos de los sows están en response.data
                        setTotalPages(response.last_page);
                    } else if (Array.isArray(response.data.data)) {
                        setSow(response.data.data); // Los datos de los sows están en response.data.data
                        setTotalPages(response.data.last_page);
                    } else {
                        console.error("Data is not an array:", response.data.data);
                    }
                } else {
                    console.error("La respuesta no es válida:", response);
                }
            } catch (error) {
                console.error("Error al obtener datos:", error);
            } finally {
                setLoading(false); // Marcar que la carga ha terminado
            }
        };
        fetchSows(currentPage);
    }, [currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        setLoading(true); // Volver a poner loading en true al cambiar de página
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-12 mt-4 mb-3">
                    <div className="card">
                        <div className="card-body">
                            <div className="table-responsive mt-3">
                                <table className="table table-hover table-bordered table-striped">
                                    <thead>
                                        <tr className="table-secondary">
                                            <th className="col-sm-2">Sow-Ticket</th>
                                            <th className="col-sm-4">Description</th>
                                            <th className="col-sm-2">Project</th>
                                            <th className="col-sm-1">Team</th>
                                            <th className="col-sm-2">Date</th>
                                            <th className="col-sm-2">Status</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loading ? (
                                            <tr>
                                                <td colSpan="7">Loading...</td>
                                            </tr>
                                        ) : sow.length > 0 ? ( 
                                            sow.map((item) => (
                                                <tr key={item.ticket_sow}>
                                                    <td>{item.ticket_sow}</td>
                                                    <td>{item.sow_description}</td>
                                                    <td>{item.project_id}</td>
                                                    <td>{item.delivery_team}</td>
                                                    <td>{new Date(item.ticket_date).toLocaleDateString("es-CO")}</td>
                                                    <td className="uppercase-column">{item.sow_status}</td>
                                                    <td>
                                                        <Link
                                                            to={`/reader/sow/details/${item.ticket_sow}`}
                                                            className="btn d-flex justify-content-center w-50"
                                                        style={{ backgroundColor: "#F9E2AF"}}>
                                                            <span className="material-symbols-outlined">
                                                                pageview
                                                            </span>
                                                
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="7">Sows not found</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <div>
            <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                handlePageChange={handlePageChange}
            />
        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SowAll;