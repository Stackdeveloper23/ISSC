import { Link, useNavigate } from "react-router-dom";
import Siderbar from "./Siderbar"; 
import Config from "../Config";
import Enum from "../components/Enum"; 
import { useState } from "react";

const SowCreate = () => {
    const fields = [
        { label: "Sow Ticket", name: "ticket_sow", type: "text", col: 4 },
        { label: "CLS", name: "cls", type: "text", col: 8 },
        { label: "Opportunity Name", name: "opportunity_name", type: "text", col: 6 },
        { label: "Opportunity ID", name: "opportunity_id", type: "text", col: 6 },
        { label: "Account Name", name: "account_name", type: "text", col: 6 },
        { label: "Delivery Team", name: "delivery_team", type: "text", col: 6 },
        { label: "Create_at", name: "create_at", type: "date", col:6},
        { label: "Ticket Date", name: "ticket_date", type: "date", col: 6 },
        { label: "Description", name: "sow_description", type: "textarea", col: 12 },
        { label: "Priority", name: "priority", type: "select", col: 4, field: "priority" },
        { label: "Sow Due Date", name: "sow_due_date", type: "date", col: 4 },
        { label: "Effort Due Date", name: "effort_due_date", type: "date", col: 4 },
        { label: "Sow Status", name: "sow_status", type: "select", col: 6, field: "sow_status" },
        { label: "Delivery Date", name: "sow_delivery_date", type: "date", col: 6 },
        { label: "Effort Owner", name: "effort_owner", type: "text", col: 6 },
        { label: "Project ID", name: "project_id", type: "text", col: 6 },
        { label: "Sow Owner", name: "sow_owner", type: "text", col: 4 },
        { label: "Effort Status", name: "effort_status", type: "select", col: 4, field: "effort_status" },
        { label: "Effort Delivery Date", name: "effort_delivery_date", type: "date", col: 4 },
        { label: "Comments", name: "comments", type: "textarea", col: 12 },
        { label: "Sow Link", name: "sow_link", type: "text", col: 6 },
        { label: "Effort Link", name: "effort_link", type: "text", col: 6 },
    ];

    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const submitCreate = async (e) => {
        e.preventDefault();
        try {
            const response = await Config.getSowCreate(formData);
            console.log(response.data);
            navigate("/admin/sow");
        } catch (error) {
            if (
                error.response &&
                error.response.data &&
                error.response.data.errors
            ) {
                const serverErrors = error.response.data.errors;
                const newErrors = {};
                Object.keys(serverErrors).forEach((key) => {
                    newErrors[key] = serverErrors[key][0];
                });
                setErrors(newErrors);
            } else {
                console.error("Unexpected error:", error);
            }
        }
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <Siderbar />
                <div className="col-sm-11 mt-3 mb-3 ">
                    <div className="card border border-dark-subtle">
                    <div className="col-sm-1 ms-3 mt-3">
                                <Link
                                    to={-1}
                                    className="btn btn-secondary d-flex justify-content-center"
                                >
                                    <span className="material-symbols-outlined me-2">
                                        arrow_back
                                    </span>
                                    Back
                                </Link>
                            </div>
                        <div className="card-body ms-5 me-5">

                            
                            <form onSubmit={submitCreate}>
                                <div className="form-group row">
                                    {fields.map((field, index) => (
                                        <div
                                            key={index}
                                            className={`col-sm-${field.col}`}
                                            style={{ marginBottom: "15px"}}
                                        >
                                            <label>{field.label}</label>
                                            {field.type === "textarea" ? (
                                                <textarea
                                                    className="form-control"
                                                    name={field.name}
                                                    value={
                                                        formData[field.name] ||
                                                        ""
                                                    }
                                                    onChange={handleChange}
                                                />
                                            ) : field.type === "select" ? (
                                                <Enum
                                                    value={
                                                        formData[field.name] ||
                                                        ""
                                                    }
                                                    onChange={handleChange}
                                                    field={field.field}
                                                />
                                            ) : (
                                                <input
                                                    className="form-control"
                                                    type={field.type}
                                                    name={field.name}
                                                    value={
                                                        formData[field.name] ||
                                                        ""
                                                    }
                                                    onChange={handleChange}
                                                />
                                            )}
                                            {errors[field.name] && (
                                                <div className="text-danger">
                                                    {errors[field.name]}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary d-flex mt-3"
                                >
                                    <span className="material-symbols-outlined">
                                        add_circle
                                    </span>
                                    Create Sow
                                </button>
                            </form>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default SowCreate;