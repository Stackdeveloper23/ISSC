import React, { useState, useEffect } from "react";
import Config from "../Config";
import { Form, FormControl, Button, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


const SearchBar = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (query.length > 0) {
            handleSearch();
        } else {
            setResults([]);
        }
    }, [query]);

    const handleSearch = async () => {
        setLoading(true);
        try {
            const response = await Config.getSearchBar(query);
            console.log(response.data); // Verifica que aquí obtienes el array esperado
            if (Array.isArray(response.data)) {
                setResults(response.data);
                console.log("Results set:", response.data); // Verificar que se actualiza el estado
            } else {
                setResults([]);
            }
        } catch (error) {
            console.error("Error searching sows:", error);
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    const handleResultClick = (ticket_sow) => {
        setResults([]);
        navigate(`/admin/sow/details/${ticket_sow}`);
    };

    const renderResults = () => {
        if (loading) return <p>Loading...</p>;
        // if (results.length === 0) return <p>No results found.</p>;

        return (
            <ListGroup className="search-results">
                {results.map((result) => {
                    console.log(result); // Verifica cada elemento de result
                    return (
                        <ListGroup.Item
                            key={result.ticket_sow}
                            onClick={() => handleResultClick(result.ticket_sow)}
                            style={{ cursor: "pointer" }}
                        >
                            Sow: {result.ticket_sow} - Project: (
                            {result.project_id})
                        </ListGroup.Item>
                    );
                })}
            </ListGroup>
        );
    };

    return (
        <div className="search-container">
            <Form className="d-flex">
                <FormControl
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    value={query || ""}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <Button
                    variant="outline-warning"
                    className="d-flex"
                    onClick={handleSearch}
                >
                    <span className="material-symbols-outlined">search</span>
                </Button>
            </Form>
            {renderResults()}
        </div>
    );
};

export default SearchBar;