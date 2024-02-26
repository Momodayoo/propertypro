import { createContext, useReducer } from "react";
// import { useContext, useEffect } from "react";
// import { layoutContext } from "../../layouts";
import GridItem from "../../components/GridItem";
import PropertyManager from "../../features/PropertyManager";
import { initialState, propertyReducer } from "../../features/PropertyManager/propertyReducer";

export const PropertyContext = createContext();

function Property() {
    // const { setPageTitle } = useContext(layoutContext);
    const [ state, dispatch ] = useReducer(propertyReducer, initialState);

    // useEffect(() => {
    //     setPageTitle('Browse Property');
    // }, [setPageTitle]);

    return (
        <GridItem>
            <PropertyContext.Provider value={{ state, dispatch }}>
                <PropertyManager />
            </PropertyContext.Provider>
        </GridItem>
    );
}

export default Property