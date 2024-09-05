import { useEffect, useState } from "react";
import Config from "../../Config";

const TotalUser = () => {
    const [totalUser, setTotalUser] = useState(0); 

    useEffect(() => {
        const fetchTotalUser = async () => {
            try {
                const response = await Config.getUserTotal();
                console.log("numero de usuarios :" , response.data)
                setTotalUser(response.data.total); 
            } catch (error) {
                console.error('Error al conectarse con el backend:', error);
            }
        };

        fetchTotalUser();
    }, []); 
    return(
        <div>
            <button className="btn btn-primary">Total Users: {totalUser}</button>
        </div>
    )
}
export default TotalUser;