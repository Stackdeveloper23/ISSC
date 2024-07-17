import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Config from "../Config";
import Enum from "../components/Enum";

const SowDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        ticket_sow: "",
        cls: "",
        opportunity_name: "",
        opportunity_id: "",
        account_name: "",
        delivery_team: "",
        ticket_date: "",
        sow_description: "",
        priority: "",
        sow_due_date: "",
        effort_due_date: "",
        project_id: "",
        sow_owner: "",
        sow_status: "",
        sow_delivery_date: "",
        effort_owner: "",
        effort_status: "",
        effort_delivery_date: "",
        comments: "",
        sow_link: "",
        effort_link: "",
    });

    useEffect(() => {
        const getSowById = async () => {
            try {
                const response = await Config.getSowsById(id);
                const data = response.data;
                setFormData(data);
            } catch (error) {
                console.error("Error fetching SOW:", error);
                navigate("/error");
            }
        };
        getSowById();
    }, [id, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };


    const fields = [
        { label: "Sow Ticket", name: "ticket_sow", type: "text", col: 4 },
        { label: "CLS", name: "cls", type: "text", col: 8 },
        { label: "Opportunity Name", name: "opportunity_name", type: "text", col: 6 },
        { label: "Opportunity ID", name: "opportunity_id", type: "text", col: 6 },
        { label: "Account Name", name: "account_name" , type: "text" ,col:6},
        { label: "Delivery Team", name: "delivery_team", type: "text", col: 6 },
        { label: "Ticket Date", name: "ticket_date", type: "text", col: 6 },
        { label: "Description", name: "sow_description", type: "textarea", col: 12 },
        { label: "Priority", name: "priority", type: "select", col: 4, field: "priority" },
        { label: "Sow Due Date", name: "sow_due_date", type: "text", col: 4 },
        { label: "Effort Due Date", name: "effort_due_date", type: "text", col: 4 },
        { label: "Sow Status", name: "sow_status", type: "select", col: 6, field: "sow_status" },
        { label: "Delivery Date", name: "sow_delivery_date", type: "text", col: 6 },
        { label: "Effort Owner", name: "effort_owner", type: "text", col: 6 },
        { label: "Project ID", name: "project_id", type: "text", col: 6 },
        { label: "Sow Owner", name: "sow_owner", type: "text", col: 4 },
        { label: "Effort Status", name: "effort_status", type: "select", col: 4, field: "effort_status" },
        { label: "Effort Delivery Date", name: "effort_delivery_date", type: "text", col: 4 },
        { label: "Comments", name: "comments", type: "textarea", col: 12 },
        { label: "Sow Link", name: "sow_link", type: "text", col: 6 },
        { label: "Effort Link", name: "effort_link", type: "text", col: 6 },
    ];

    return (
        <div className="container">
            <div className="row mt-5 d-flex justify-content-center">
                <div className="mt-3 mb-3">
                    <div className="card">
                        <div className="card-body">
                            <form>
                                <div className="form-group row">
                                    <div className="col-sm-2">
                                        <Link
                                            to="/reader/sow"
                                            className="btn btn-secondary  d-flex align-items-center"
                                            style={{ width:"100px"}}
                                        >
                                            <span className="material-symbols-outlined me-2">
                                                arrow_back
                                            </span>{" "}
                                            Back
                                        </Link>
                                    </div>
                                    {fields.map((field, index) => (
                                        <div
                                            key={index}
                                            className={`col-sm-${field.col}`}
                                        >
                                            <label>{field.label}</label>
                                            {field.type === "textarea" ? (
                                                <textarea
                                                    className="form-control"
                                                    name={field.name}
                                                    value={formData[field.name] || ''}
                                                    onChange={handleChange}
                                                />
                                            ) : field.type === "select" ? (
                                                <Enum
                                                    value={formData[field.name] || ''}
                                                    onChange={handleChange}
                                                    field={field.name}
                                                />
                                            ) : (
                                                <input
                                                    className="form-control"
                                                    type={field.type}
                                                    name={field.name}
                                                    value={formData[field.name] || ''}
                                                    onChange={handleChange}
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SowDetails;
