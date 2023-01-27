export interface LoginProps {
    username: string | number;
    setUsername: (username: string) => void;
    password: string | number;
    setPassword: (password: string) => void;
}