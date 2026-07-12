import { useDispatch } from "react-redux";

import {
    setLoading,
    setProperties,
    setProperty,
    setMyProperties,
} from "../state/propertySlice"

import {
    getAllPropertiesApi,
    getPropertyByIdApi,
    createPropertyApi,
    getMyPropertiesApi,
    updatePropertyApi,
    deletePropertyApi,
} from "../service/property.api"

export default function useProperty() {

    const dispatch = useDispatch();

    const handleGetAllProperties = async () => {
        try {

            dispatch(setLoading(true));

            const { data } = await getAllPropertiesApi();

            dispatch(setProperties(data.properties));

            return data;

        } catch (err) {

            throw err;

        } finally {

            dispatch(setLoading(false));

        }
    };

    const handleGetPropertyById = async (id) => {

        try {

            dispatch(setLoading(true));

            const { data } = await getPropertyByIdApi(id);

            dispatch(setProperty(data.property));

        } catch (err) {

            console.log(err);

        } finally {

            dispatch(setLoading(false));

        }

    };

    const handleCreateProperty = async (formData) => {

        try {

            dispatch(setLoading(true));

            const { data } = await createPropertyApi(formData);

            return data;

        } catch (err) {

            throw err.response?.data || err;

        } finally {

            dispatch(setLoading(false));

        }

    };

    const handleGetMyProperties = async () => {

        try {

            dispatch(setLoading(true));

            const { data } = await getMyPropertiesApi();

            dispatch(setMyProperties(data.properties));

        } catch (err) {

            console.log(err);

        } finally {

            dispatch(setLoading(false));

        }

    };

    const handleUpdateProperty = async (id, payload) => {

        try {

            dispatch(setLoading(true));

            const { data } = await updatePropertyApi(id, payload);

            return data;

        } catch (err) {

            throw err.response?.data || err;

        } finally {

            dispatch(setLoading(false));

        }

    };

    const handleDeleteProperty = async (id) => {

        try {

            dispatch(setLoading(true));

            const { data } = await deletePropertyApi(id);

            return data;

        } catch (err) {

            throw err.response?.data || err;

        } finally {

            dispatch(setLoading(false));

        }

    };

    return {

        handleGetAllProperties,
        handleGetPropertyById,
        handleCreateProperty,
        handleGetMyProperties,
        handleUpdateProperty,
        handleDeleteProperty,

    };
}