import { getAuth, updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { DataBase } from "../firebase.config";

function Profile() {
    const auth = getAuth();

    const [formData, setFormData] = useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email,
    });
    const { name, email } = formData;

    const [changeDetails, setChangeDetails] = useState(false);

    const navigate = useNavigate();

    const onLogout = () => {
        auth.signOut();
        navigate("/");
    };

    const handleChangeDetails = () => {
        if (changeDetails) {
            onSubmit();
        }
        setChangeDetails((prevState) => !prevState);
    };

    const onSubmit = async () => {
        try {
            if (auth.currentUser.displayName !== name) {
                await updateProfile(auth.currentUser, {
                    displayName: name,
                });

                const userRef = doc(DataBase, "users", auth.currentUser.uid);
                await updateDoc(userRef, {
                    name,
                });
            }
        } catch (error) {
            toast.error("Could not update profile details");
        }
    };

    const handleChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));
    };

    return (
        <div className="profile">
            <header className="profileHeader">
                <p className="pageHeader">My Profile</p>
                <button onClick={onLogout} type="button" className="logOut">
                    Logout
                </button>
            </header>

            <main>
                <div className="profileDetailsHeader">
                    <p className="profileDetailsText">Personal Details</p>
                    <p onClick={handleChangeDetails} className="changePersonalDetails">
                        {changeDetails ? "done" : "change"}
                    </p>
                </div>
                <div className="profileCard">
                    <form>
                        <input
                            type="text"
                            id="name"
                            className={changeDetails ? "profileNameActive" : "profileName"}
                            disabled={!changeDetails}
                            value={name}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            id="email"
                            className="profileEmail"
                            disabled
                            value={email}
                        />
                    </form>
                </div>
            </main>
        </div>
    );
}

export default Profile;
