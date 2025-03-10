import { useState } from "react";
import { registerUser, loginUser } from "../utils/auth"; // ✅ Ensure correct import path

export default function AuthPage() {
    const [formData, setFormData] = useState({ username: "", email: "", password: "" });
    const [isLogin, setIsLogin] = useState(true); // Toggle login/signup
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formErrors = {};
        
        if (!formData.email) formErrors.email = "Email is required.";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) formErrors.email = "Invalid email format.";

        if (!formData.password) formErrors.password = "Password is required.";
        else if (formData.password.length < 8) formErrors.password = "Password must be at least 8 characters.";

        if (!isLogin && !formData.username) formErrors.username = "Username is required.";

        setErrors(formErrors);

        if (Object.keys(formErrors).length === 0) {
            setIsLoading(true);
            try {
                const response = isLogin ? await loginUser(formData) : await registerUser(formData);
                console.log(response);
                alert(response.message || "Success!");
            } catch (error) {
                console.error("Authentication error:", error);
                alert("Something went wrong. Try again.");
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>{isLogin ? "Login" : "Sign Up"}</h1>
            <form onSubmit={handleSubmit}>
                {!isLogin && <input type="text" name="username" placeholder="Username" onChange={handleChange} />}
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <button type="submit" disabled={isLoading}>{isLoading ? "Processing..." : isLogin ? "Login" : "Sign Up"}</button>
            </form>
            <p onClick={() => setIsLogin(!isLogin)} style={{ cursor: "pointer" }}>
                {isLogin ? "Need an account? Sign Up" : "Already have an account? Login"}
            </p>
            {Object.keys(errors).length > 0 && (
                <div style={{ color: "red" }}>
                    {Object.values(errors).map((error, index) => (
                        <p key={index}>{error}</p>
                    ))}
                </div>
            )}
        </div>
    );
}