import LoginForm from "../components/login/LoginForm";

import "../assets/LoginView.css";

const LoginView = () => {
    return (
        <>
            <section className="animate panel-left w-1/2 h-full bg-(--bg-dark) text-(--text) flex items-center justify-center"></section>
            <LoginForm />

            <section className="animate panel-right w-1/2 h-full bg-(--bg-dark) text-(--text) flex items-center justify-center"></section>
        </>
    );
};

export default LoginView;
