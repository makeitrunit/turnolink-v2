import {axiosInstance} from "@/plugins/axios.js";

const getAppointments = async () => {
    try {
        const response = await axiosInstance.get("/api/appointments");
        return response.data;
    } catch {
        return [];
    }
};

const updateStatus = async (id, status) => {
    try {
        const response = await axiosInstance.patch(`/api/appointments/${id}/status`, {
            "status": status,
        });
        return response.data;
    } catch {
        return [];
    }
};

export {getAppointments, updateStatus};