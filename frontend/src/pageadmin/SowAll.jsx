import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Config from "../Config";
import Siderbar from "./Siderbar";
import Pagination from "../components/Pagination";
import DownloadFile from "../components/DownloadFile";

const SowAll = () => {
    const [sow, setSow] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [allSows, setAllSows] = useState([]);

    useEffect(() => {
        const fetchSows = async (page) => {
            try {
                const response = await Config.getSowAll(page);

                if (response && response.data) {
                    if (Array.isArray(response.data)) {
                        setSow(response.data);
                        setTotalPages(response.last_page);
                    } else if (Array.isArray(response.data.data)) {
                        setSow(response.data.data);
                        setTotalPages(response.data.last_page);
                    } else {
                        console.error("Data is not an array:", response.data.data);
                    }
                } else {
                    console.error("Invalid response:", response);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchSows(currentPage);
    }, [currentPage]);

    useEffect(() => {
        const fetchAllSows = async () => {
            try {
                let allData = [];
                let page = 1;
                let lastPage = 1;

                do {
                    const response = await Config.getSowAll(page);
                    if (response && response.data) {
                        if (Array.isArray(response.data)) {
                            allData = allData.concat(response.data);
                            lastPage = response.last_page;
                        } else if (Array.isArray(response.data.data)) {
                            allData = allData.concat(response.data.data);
                            lastPage = response.data.last_page;
                        } else {
                            console.error("Data is not an array:", response.data.data);
                            break;
                        }
                    } else {
                        console.error("Invalid response:", response);
                        break;
                    }
                    page++;
                } while (page <= lastPage);

                setAllSows(allData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchAllSows();
    }, []);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        setLoading(true);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredSows = allSows.filter((item) =>
        item.ticket_sow.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.sow_description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.project_id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.delivery_team.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.ticket_date.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.sow_status.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const dataToDisplay = searchTerm ? filteredSows : sow;


   
        
    


          return (
        <div className="container-fluid">
            <div className="row">
                <Siderbar />
                <div className="col-sm-11 mt-4 mb-3">
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex">
                            <div className="col-sm-2 me-5">
                                <Link
                                    to={"/admin/sow/create"}
                                    className="btn btn-primary"
                                >
                                    <span className="material-symbols-outlined">
                                        add_circle
                                    </span>
                                    New
                                </Link>
                            </div>
                            <div className="col-sm-4 me-4">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search..."
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                />
                            </div>
                                <DownloadFile/>
                           
                            </div>
                            <div className="table-responsive-xl mt-3">
                                <table className="table table-hover table-bordered align-middle">
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
                                        ) : dataToDisplay.length > 0 ? ( // Usar datos a mostrar
                                            dataToDisplay.map((item) => (
                                                <tr key={item.ticket_sow}>
                                                    <td>{item.ticket_sow}</td>
                                                    <td>{item.sow_description}</td>
                                                    <td>{item.project_id}</td>
                                                    <td>{item.delivery_team}</td>
                                                    <td>{item.ticket_date}</td>
                                                    <td>{item.sow_status}</td>
                                                    <td>
                                                        <Link
                                                            id="btn-view"
                                                            to={`/admin/sow/details/${item.ticket_sow}`}
                                                            className="btn d-flex justify-content-center w-50">
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
                            {!searchTerm && (
                                <div>
                                    <Pagination
                                        totalPages={totalPages}
                                        currentPage={currentPage}
                                        handlePageChange={handlePageChange}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SowAll
