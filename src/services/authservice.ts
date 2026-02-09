import axiosInstance from '../helper/axios';

export interface AdminCreateUserResponse {
    success: boolean;
    detail: string;
    data?: {
        id: number;
        name: string;
        email: string;
        role: string;
        email_verified: boolean;
    };
}

export const adminCreateUser = async (
    name: string,
    email: string,
    password: string,
    role: string
): Promise<AdminCreateUserResponse> => {
    try {
        const response = await axiosInstance.post('/admin/create-user', {
            name,
            email,
            password,
            role,
        });
        return {
            success: true,
            detail: response.data.detail || 'User created successfully',
            data: response.data.user,
        };
    } catch (error: any) {
        console.error('Error in adminCreateUser:', error);
        return {
            success: false,
            detail: error.response?.data?.detail || 'Failed to create user',
        };
    }
};
